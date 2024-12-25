

export default async function ErrorPage({searchParams}) {
    const sp = await searchParams;
    return <p>There has been an error! <br></br> more information {sp.error}</p>
}