'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '@/lib/validation';
import css from './AppointmentForm.module.css';
import toast from 'react-hot-toast';
import { db } from '@/lib/firebase'; 
import { ref, push, set, onValue } from 'firebase/database';

interface Props {
  psychologist: {
    id?: string;
    name: string;
    avatar_url: string;
  };
  onSuccess: () => void;
}

const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

export default function AppointmentForm({ psychologist, onSuccess }: Props) {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const timeRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    mode: 'onTouched',
  });

  const selectedTime = watch('time');
  const psychId = psychologist.id ? String(psychologist.id) : null;

  useEffect(() => {
    if (!psychId) return;

    const appointmentsRef = ref(db, `appointments/${psychId}`);
    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const times = Object.values(data).map((item: any) => item.time);
        setBookedTimes(times);
      } else {
        setBookedTimes([]);
      }
    });

    return () => unsubscribe();
  }, [psychId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
        setIsTimeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: any) => {
    if (!psychId) {
      toast.error("Error: Psychologist ID not found");
      return;
    }

    try {
      const appointmentsRef = ref(db, `appointments/${psychId}`);
      const newAppointmentRef = push(appointmentsRef);
      
      await set(newAppointmentRef, {
        ...data,
        psychologistName: psychologist.name,
        createdAt: new Date().toISOString(),
      });

      toast.success(`Appointment with ${psychologist.name} successfully booked!`, {
        icon: '📅',
        className: 'custom-toast',
      });

      onSuccess();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.formTitle}>Make an appointment with a psychologist</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment.
      </p>

      <div className={css.psychologistInfo}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={css.avatar}
        />
        <div>
          <p className={css.labelSmall}>Your psychologist</p>
          <p className={css.name}>{psychologist.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
        
        <div className={css.fieldWrapper}>
          <input
            {...register('name')}
            placeholder="Name"
            className={`${css.input} ${errors.name ? css.inputError : ''}`}
          />
          {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
        </div>

        <div className={css.inputRow}>
          <div className={css.fieldWrapper}>
            <input
              {...register('phone')}
              placeholder="+380"
              className={`${css.input} ${errors.phone ? css.inputError : ''}`}
            />
            {errors.phone && <p className={css.errorText}>{errors.phone.message}</p>}
          </div>

          <div className={css.fieldWrapper} ref={timeRef}>
            <div className={css.timeInputWrapper} onClick={() => setIsTimeOpen(!isTimeOpen)}>
              <input
                {...register('time')}
                readOnly
                placeholder="00:00"
                value={selectedTime || ''}
                className={`${css.input} ${css.timeInput} ${errors.time ? css.inputError : ''}`}
              />
              <svg width="20" height="20" className={css.clockIcon}>
                <use href="/symbol-defs.svg#icon-clock" />
              </svg>

              {isTimeOpen && (
                <div className={css.timeDropdown}>
                  <p className={css.dropdownTitle}>Meeting time</p>
                  <ul className={css.timeList}>
                    {timeSlots.map((slot) => {
                      const isBooked = bookedTimes.includes(slot);
                      return (
                        <li
                          key={slot}
                          className={`${css.timeItem} 
                            ${selectedTime === slot ? css.selectedTime : ''} 
                            ${isBooked ? css.booked : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isBooked) return; // Запрещаем выбор
                            setValue('time', slot, { shouldValidate: true });
                            setIsTimeOpen(false);
                          }}
                        >
                          {slot} {isBooked && <span className={css.bookedLabel}>(Booked)</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            {errors.time && <p className={css.errorText}>{errors.time.message}</p>}
          </div>
        </div>

        <div className={css.fieldWrapper}>
          <input
            {...register('email')}
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
          />
          {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
        </div>

        <div className={css.fieldWrapper}>
          <textarea
            {...register('comment')}
            placeholder="Comment"
            className={`${css.input} ${css.textarea} ${errors.comment ? css.inputError : ''}`}
          />
          {errors.comment && <p className={css.errorText}>{errors.comment.message}</p>}
        </div>

        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}