# create-t3-turbo

Special thanks to for enabling building this app:

https://github.com/t3-oss/create-t3-turbo/tree/main
https://github.com/sadmann7/shadcn-table

***
First time use: `pnpm install` from the root directory.

In order to run the whole project, run `pnpm run dev`, also from the root directory.

Also, in order for the NextJS app to not crash, create an `.env` file with the example values from the `.env.example` file.


***
# Intro
GitHub is a powerful platform for developers, but managing issues across multiple repositories can be cumbersome. Whether you're tracking bugs, planning new features, or keeping up with project progress, the default issue tracker on GitHub can feel limited, especially if you're working with many repositories.

But what if you wanted to see Issues from all sorts of repositories? 
## What is Res Publica?


Res Publica is an open source issue tracker designed to streamline this process. By scraping GitHub Issues, we've created a unified, comprehensive view that makes managing issues from various repositories effortless.

Hosted on Vercel and leveraging EdgeDB Cloud, Res Publica offers an advanced filtering system, enabling users to sort issues by repository, labels, and more. Optimized for speed, our platform ensures a seamless experience, allowing you to focus on what matters most: resolving issues efficiently.


## What we implemented
Our goal with Res Publica was ambitious. Despite some personal and business constraints, we are thrilled with what we've achieved. Here are the key features we've implemented and some exciting ones we plan to add:

- [x] **GitHub Issues Integration**: Seamlessly view and manage issues from multiple repositories.
- [x] **Advanced Filtering**: Filter issues by repository, labels, and more for a customized view.
- [x] **Performance Optimization**: Our platform is designed to be fast, ensuring quick access to issue data.
- [x] **Open Source**: Res Publica is fully open source, inviting contributions and transparency.
- [ ] **AI Recommendations**: Utilize AI to recommend issues based on user preferences, library knowledge, programming languages, and skill levels.
- [ ] **Senate Feature**: Allow the community to vote on new repositories being added, fostering a democratic and collaborative environment.
- [ ] **Community Initiatives**: Highlight selected repositories for a few weeks to increase visibility and encourage contributions.


## Leveraging Vercel's Capabilities
One of the unique challenges we faced was displaying the README files from GitHub repositories without overwhelming our database or overloading GitHub's servers. Our solution was to use Vercel's data cache with a custom Octokit fetch, allowing us to cache the README files efficiently on Vercel's network. This approach ensures that the data is readily available without frequent fetch requests, balancing performance and resource management.

## Tech Stack
Res Publica is built with a modern tech stack, ensuring reliability, scalability, and a great user experience:

- **Next.js**
- **Edgedb**
- **TRPC**
- **TailwindCSS**
- **Octokit**


## The Dev Journey

Building Res Publica was a challenging yet rewarding experience. Participating in the [Edgedb Hackathon](https://edgedb.com/hackathon) provided us with the perfect opportunity to innovate and create a tool that we believe will be incredibly beneficial for developers. Although time constraints prevented us from implementing all our envisioned features, the foundation we've laid is solid and promising.


## Future Plans
Our journey with Res Publica is just beginning. Moving forward, we plan to integrate more advanced features that will enhance the platform's capabilities:

### AI issue recommendation

We aim to leverage AI to provide personalized issue recommendations. Factors like the user's library knowledge, preferred programming languages, and skill level will be considered to suggest the most relevant issues. This feature will help users find issues they are best suited to resolve, improving productivity and engagement.


### Community-Driven Enhancements

A thriving community is essential for the success of any open source project. We plan to introduce a senate system where the community can vote on new repositories to be tracked and other significant decisions. This democratic approach will ensure that Res Publica evolves in a way that meets the needs and preferences of its users.
***

We invite you to explore Res Publica, contribute to its development, and join us on this exciting journey. Together, we can create a tool that not only simplifies issue tracking but also fosters a vibrant and collaborative open source community.
