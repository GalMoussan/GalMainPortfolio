export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Halcyon Theme',
    description:
      'A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more currently available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.',
    tech: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'],
    github: 'https://github.com/bchiang7/halcyon-site',
    external: 'https://halcyon-theme.netlify.com/',
    image: '/images/halcyon.png',
  },
  {
    title: 'Spotify Profile',
    description:
      'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    tech: ['React', 'Styled Components', 'Express', 'Spotify API', 'Heroku'],
    github: 'https://github.com/bchiang7/spotify-profile',
    external: 'https://spotify-profile.herokuapp.com/',
    image: '/images/spotify.png',
  },
  {
    title: 'Build a Spotify Connected App',
    description:
      'Having struggled myself with Spotify\'s developer documentation, I wanted to build a comprehensive course to help other developers make sense of the API and its many endpoints. This course takes a hands-on approach, walking viewers through building a full-stack Spotify connected app.',
    tech: ['React', 'Express', 'Spotify API', 'Styled Components'],
    external: 'https://www.newline.co/courses/build-a-spotify-connected-app',
    image: '/images/course.png',
  },
];
