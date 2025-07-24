import Image from "next/image";
import SearchForm from "../../components/searchForm";
import StartupCard, { StartupCardType } from "../../components/startupCard";
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query
  const posts = [{
    _createdAt: "2024-01-15T10:30:00Z",
    _id: "1",
    description: "This is a sample startup description.",
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    category: "Robots",
    title: "We Robots",
    views: 50,
    author:{
      _id: "1",
      name: "John Doe"
    }
  }]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) :
            (

              <p className="text-gray-500">No startups found.</p>
            )
          }
        </ul>
      </section>
    </>
  );
}
