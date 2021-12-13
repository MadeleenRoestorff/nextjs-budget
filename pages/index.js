import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const db = await fetch("http://127.0.0.1:8000/budget/budget/");
  const budgets = await db.json();

  return {
    props: {
      budgets,
    },
  };
  // ...
}

export default function Home(budgets) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {budgets.budgets.results.map((budget) => {
            const fixed_expenses = Object.keys(budget.fixed_expenses);
            console.log(fixed_expenses);

            return (
              <div key={budget.id}>
                <p>{budget.id}</p>
                <p>{budget.timestamp}</p>
                <p>{budget.total_remaining_in_cents}</p>
                {fixed_expenses.map((fixed_expense) => (
                  <div key={`${budget.id}-${fixed_expense}`}>
                    <span>{fixed_expense}</span>
                    <span>{budget.fixed_expenses[fixed_expense]}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
