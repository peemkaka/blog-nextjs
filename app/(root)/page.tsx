import SearchForm from "../../components/searchForm";
import StartupCard, { StartupCardType } from "../../components/startupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/lib/auth";
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query
  const params = { search: query || null };

  console.log('Search query:', query);
  console.log('Params:', params);

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params
  })
  
  const session = await auth();

  console.log('Session:', session?.user?.name);
  console.log('Posts found:', posts?.length);
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
      <SanityLive />
    </>
  );
}
