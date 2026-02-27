'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PuffLoader } from "react-spinners"; 
import { getPsychologists } from "@/lib/api";
import { Psychologist } from "@/types/psychologists";
import { SortOption } from "@/types/sort";
import { useFavoritesStore } from "@/lib/stores/useFavoritesStore";
import css from "../PsychologistsView/PsychologistsView.module.css"; 
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const options: { value: SortOption; label: string }[] = [
  { value: 'asc', label: 'A to Z' },
  { value: 'desc', label: 'Z to A' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Popular' },
  { value: 'not_popular', label: 'Not popular' },
  { value: 'all', label: 'Show all' },
];

const FavoritesView = () => {
  const { favorites } = useFavoritesStore();
  const [sortBy, setSortBy] = useState<SortOption>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const selectRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/');
    });
    return () => unsubscribe();
  }, [router]);

  const { data: allPsychologists = [], isLoading } = useQuery<Psychologist[]>({
    queryKey: ['psychologists'],
    queryFn: getPsychologists,
    staleTime: 60000,
  });

  const favoritePsychologists = allPsychologists.filter((p) =>
    favorites.includes(String(p.id))
  );

  const sortedPsychologists = [...favoritePsychologists].sort((a, b) => {
    if (sortBy === 'asc') return a.name.localeCompare(b.name);
    if (sortBy === 'desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price_low') return a.price_per_hour - b.price_per_hour;
    if (sortBy === 'price_high') return b.price_per_hour - a.price_per_hour;
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'not_popular') return a.rating - b.rating;
    return 0;
  });

  const visibleItems = sortedPsychologists.slice(0, visibleCount);
  const handleLoadMore = () => setVisibleCount(prev => prev + 3);
  const currentLabel = options.find(o => o.value === sortBy)?.label || 'Show all';

  return (
    <div className={css.container}>
      <div className={css.filterSection}>
        <label className={css.label}>Filters</label>
        <div className={css.selectWrapper} ref={selectRef}>
          <button 
            type="button" 
            className={`${css.selectTrigger} button ${isOpen ? css.active : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {currentLabel}
            <svg width="20" height="20" className={`${css.arrowIcon} ${isOpen ? css.rotate : ''}`}>
              <use href="/symbol-defs.svg#icon-chevron-down" />
            </svg>
          </button>
          {isOpen && (
            <ul className={css.optionsList}>
              {options.map((option) => (
                <li 
                  key={option.value} 
                  className={`${css.optionItem} ${sortBy === option.value ? css.selected : ''}`}
                  onClick={() => { setSortBy(option.value); setIsOpen(false); }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <main className={css.main}>
        {isLoading ? (
          <div className={css.loader}><PuffLoader color="#54be96" size={80} /></div>
        ) : (
          <>
            {sortedPsychologists.length === 0 ? (
              <div className={css.loadMoreWrapper}>
                <p className={css.label}>Your favorites list is empty.</p>
              </div>
            ) : (
              <div className={css.list}>
                {visibleItems.map((psychologist) => (
                  <div key={psychologist.id} className={css.cardPlaceholder}>
                    <PsychologistCard item={psychologist} />
                  </div>
                ))}
              </div>
            )}
            {visibleCount < sortedPsychologists.length && (
              <div className={css.loadMoreWrapper}>
                <button className={`${css.loadMoreBtn} button`} onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default FavoritesView;