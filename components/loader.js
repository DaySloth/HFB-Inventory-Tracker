import styles from "../styles/Home.module.css";

export default function Loader() {
  return (
    <>
      <div className={styles.loading}>
        <img
          src="/HomeForeverBaths-Logo--blue.png"
          alt="home forever baths logo"
          className={styles.loadingImage}
        />
        <h1>Loading...</h1>
      </div>
    </>
  );
}
