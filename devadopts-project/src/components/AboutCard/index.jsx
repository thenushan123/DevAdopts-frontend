import React from "react";
import "./About.css";

export default function About() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>
      <p style={styles.paragraph}>
        "Since 1891, we’ve been working for a better future for dogs and the
        people who love them. When a dog is in distress, we care for them. When
        a dog needs a home, we find them a loving family. When an owner needs a
        helping hand (or paw) – or they just can’t cope, we’re ready to step in.
        For every dog, for every owner, we’re by their side through thick and
        thin, throughout their lives. The bond they have is special to us. It
        changes lives, making each day happier and more complete. It’s why we
        believe A dog is for life. Discover who we are, what we do, and how
        we’ll never stop fighting to make tomorrow’s world a better place for
        all dogs."
      </p>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <img
            src="path_to_first_image"
            alt="Streamline Adoption"
            style={styles.image}
          />
          <h3 style={styles.cardHeading}>Streamline Adoption</h3>
          <p style={styles.cardText}>
            Here is some text which will be used to describe in short detail
            what our product or service is about
          </p>
        </div>

        <div style={styles.card}>
          <img
            src="path_to_second_image"
            alt="Make Informed Decisions"
            style={styles.image}
          />
          <h3 style={styles.cardHeading}>Make Informed Decisions</h3>
          <p style={styles.cardText}>
            Here is some text which will be used to describe in short detail
            what our product or service is about
          </p>
        </div>
      </div>
    </div>
  );
}
