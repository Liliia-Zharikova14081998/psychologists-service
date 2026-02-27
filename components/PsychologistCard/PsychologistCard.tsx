'use client';

import { Psychologist } from "@/types/psychologists";
import css from "./PsychologistCard.module.css";
import { useFavoritesStore } from "@/lib/stores/useFavoritesStore";
import { useEffect, useState } from "react";
import ReviewCard from "../Reviews/Reviews";
import Modal from "../Modal/Modal";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import { useAuthStore } from "@/lib/stores/authStore";
import toast from "react-hot-toast"; 

interface PsychologistProps {
  item: Psychologist;
}

const PsychologistCard = ({ item }: PsychologistProps) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); 

  const { favorites, toggleFavorite } = useFavoritesStore();
  const { user, isAuthLoading } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthLoading) {
        setIsFavorite(!!user && favorites.includes(String(item.id)));
      }
    }
  }, [mounted, favorites, user, isAuthLoading, item.id]);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    
    if (!user) {
      toast.error("This functionality is available only for authorized users!", {
        className: 'custom-toast',
        icon: '🔐',
      });
      e.currentTarget.blur(); 
      return;
    }

    toggleFavorite(String(item.id));

    if (!isFavorite) {
      toast.success(`${item.name} added to favorites!`, {
        className: 'custom-toast',
        icon: '❤️',
      });
    } else {
      toast.success(`${item.name} removed from favorites!`, {
        className: 'custom-toast',
        icon: '💔',
      });
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={item.avatar_url} alt={item.name} className={css.avatar} />
        <span className={css.onlineStatus}></span>
      </div>

      <div className={css.cardContent}>
        <div className={css.cardHeader}>
          <div className={css.titleWrapper}>
            <p className={css.cardType}>Psychologist</p>
            <h2 className={css.cardTitle}>{item.name}</h2>
          </div>

          <div className={css.priceWrapper}>
            <svg width="16" height="16" className={css.starIcon}>
              <use href="/symbol-defs.svg#icon-star" />
            </svg>
            <span className={css.ratingText}>Rating: {item.rating}</span>
            <svg width="1" height="16" className={css.vectorIcon}>
              <use href="/symbol-defs.svg#icon-Vector-3" />
            </svg>
            <p className={css.cardPrice}>
              Price / 1 hour: <span className={css.priceAccent}>{item.price_per_hour}$</span>
            </p>

            <button
              type="button"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`${css.heartBtn} ${isFavorite ? css.active : ''}`}
            >
              <svg width="26" height="26" className={css.heartIcon}>
                <use href="/symbol-defs.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <ul className={css.features}>
          <li className={css.featuresItem}>Experience:
            <span className={css.featureLabel}>{item.experience}</span></li>
          <li className={css.featuresItem}>License:
            <span className={css.featureLabel}>{item.license}</span></li>
          <li className={css.featuresItem}>Specialization:
            <span className={css.featureLabel}>{item.specialization}</span></li>
          <li className={css.featuresItem}>Initial consultation:
            <span className={css.featureLabel}>{item.initial_consultation}</span></li>
        </ul>

        <p className={css.description}>{item.about}</p>

        {!isOpen ? (
          <button type="button" className={`${css.cardBtn} button`} onClick={() => setIsOpen(true)}>
            Read more
          </button>
        ) : (
          <div className={css.reviewsWrapper}>
            <ReviewCard reviews={item.reviews} onAppointmentClick={handleOpenModal} />
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AppointmentForm psychologist={item} onSuccess={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default PsychologistCard;