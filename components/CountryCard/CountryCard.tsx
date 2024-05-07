import { FC, useEffect } from "react";
import Image from "next/image";
import { CountryCardProps } from "@/interfaces";

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  const countryName = country.name.official || country.name.common;
  useEffect(() => {
    const setMinHeightToCards = () => {
      const cards = document.querySelectorAll(
        ".card"
      ) as NodeListOf<HTMLElement>;
      let maxHeight = 0;

      cards.forEach((card) => {
        const cardHeight = card.clientHeight;
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
        }
      });

      cards.forEach((card) => {
        card.style.minHeight = `${maxHeight}px`;
      });
    };

    setMinHeightToCards();

    window.addEventListener("resize", setMinHeightToCards);

    return () => {
      window.removeEventListener("resize", setMinHeightToCards);
    };
  }, []);

  return (
    <article className="card rounded-lg shadow-md hover:shadow-xl bg-white dark:bg-dark-blue flex flex-1 flex-col h-full">
      <div className="relative overflow-hidden h-52 md:h-48 lg:h-36">
        <Image
          src={country.flags.svg || country.flags.png}
          alt={`${countryName} Flag`}
          priority
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="p-5 bg-white dark:bg-dark-blue rounded-b-lg">
        <h3 className="leading-none pb-4 text-md font-bold">{countryName}</h3>
        <div className="text-very-dark-blue-text dark:text-white text-sm">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country.capital}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CountryCard;
