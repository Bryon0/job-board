import { getSession, useSession } from 'next-auth/react'
import Jobs from 'components/Jobs'
import prisma  from 'lib/prisma'
import { getJobsPosted, getUser } from 'lib/data.js'

export default function Dashboard() { 
    const { data: session, status} = useSession()



    return (
      <div className='mt-10'>
                <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Dashboard</h2>
        {user.company && (
          <span className='bg-black text-white uppercase text-sm p-2 '>
            Company
          </span>
        )}
        {session && (
          <>
            {user.company && (
              <p className='mt-10 mb-10 text-2xl font-normal'>
                all the jobs you posted
              </p>
            )}
          </>
        )}
      </div>
            <Jobs jobs={jobs} isDahsboard={true} />
      </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    let user = getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let jobs = getJobsPosted(user.id, prisma)
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props:
        {
            user,
            jobs,
        }
    }
}