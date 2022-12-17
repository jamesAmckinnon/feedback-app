import { useRouter, Router } from 'next/router'

// D:\Desktop\feedback-app> npm run dev <--- make sure Desktop has capital d
// git push origin main
//git push -u heroku <branch>
//git push -u origin <branch >

// export NODE_OPTIONS=--openssl-legacy-provider

function Page({ ctx }) {
  const router = useRouter()
    // Make sure we're in the browser
    if (typeof window !== 'undefined') {
      router.push('/new-user');
      return; 
    }
}

Page.getInitialProps = ctx => {
  // We check for ctx.res to make sure we're on the server.
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/new-user' });
    ctx.res.end();
  }
  return { };
}

export default Page