

export const GaleriaVideos = ({iframe}) => {
    return (
        <iframe src={`${iframe.iframe}`} title="YouTube video player"
            allowFullScreen></iframe>
    )
}
