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
GitHub is a great platform, but managing issues across multiple repositories can be tough. Whether you’re tracking bugs, planning features, or monitoring project progress, the default issue tracker can feel limited, especially if you have many repositories.

But what if you wanted to see Issues from all sorts of repositories? 
## What is Res Publica?


Res Publica is an open-source issue tracker that simplifies this process. We’ve unified GitHub Issues into one comprehensive view, making it easy to manage issues across different repositories.

Hosted on Vercel and using EdgeDB Cloud, Res Publica offers advanced filtering. You can sort issues by repository, labels, and more. Optimized for speed, our platform ensures a smooth experience, so you can focus on resolving issues efficiently.


## What we implemented
Our goal with Res Publica was ambitious. Despite some constraints, we’re thrilled with what we’ve achieved. Here are the key features:

- [x] **GitHub Issues Integration**: Manage issues from multiple repositories easily.
- [x] **Advanced Filtering**: Filter issues by repository, labels, and more.
- [x] **Performance Optimization**: Fast access to issue data.
- [x] **Open Source**: Fully open source, inviting contributions and transparency.
- [ ] **AI Recommendations**: Use AI to suggest issues based on user preferences and skills.
- [ ] **Senate Feature**: Let the community vote on new repositories to add.
- [ ] **Community Initiatives**: Highlight repositories for increased visibility.


## Leveraging Vercel's Capabilities
One challenge was displaying GitHub README files without overloading our database. We use Vercel’s data cache with a custom Octokit fetch. This caches README files efficiently on Vercel’s network, balancing performance and resource use.

## Tech Stack
Res Publica is built with a modern tech stack for reliability and scalability:

- **Next.js**
- **Edgedb**
- **TRPC**
- **TailwindCSS**
- **Octokit**


## The Dev Journey

Building Res Publica was challenging but rewarding. The [Edgedb Hackathon](https://edgedb.com/hackathon) sparked our innovation. Though we faced time constraints, we laid a solid, promising foundation.


## Future Plans
Our journey with Res Publica is just beginning. We plan to integrate advanced features to enhance our platform:

### AI issue recommendation

We aim to use AI for personalized issue recommendations. Factors include user library knowledge, preferred languages, and skill level. This will help users find suitable issues, boosting productivity.


### Community-Driven Enhancements

A thriving community is key for open-source success. We plan to introduce a senate system. The community will vote on new repositories and significant decisions. This ensures Res Publica evolves to meet user needs and preferences.
***

We invite you to explore Res Publica. Contribute to its development and join us on this exciting journey. Together, we can simplify issue tracking and build a vibrant, collaborative open-source community.
