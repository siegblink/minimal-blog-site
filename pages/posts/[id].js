import * as React from 'react'
import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Implement a custom 'Head' tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      {/* Blog */}
      <article>
        {/* Blog title */}
        <h1 className={utilStyles.headingXL}>{postData.title}</h1>
        {/* prettier-ignore */}
        <div className={`${utilStyles.lightText} ${utilStyles.negativeMarginTop3}`}>
          <Date dateString={postData.date} />
        </div>
        {/* Blog content */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}
