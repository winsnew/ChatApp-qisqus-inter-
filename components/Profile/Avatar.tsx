import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Avatar({ src, alt, size = 'medium', className = '' }: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className={styles.avatarImage} />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {alt?.[0]?.toUpperCase() || 'U'}
        </div>
      )}
    </div>
  );
}