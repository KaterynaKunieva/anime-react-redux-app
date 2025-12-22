import React from 'react'
import { useParams } from "react-router-dom";
import PageContainer from "./components/PageContainer";
import AnimeDetailsPage from "../pages/animeDetails";

const AnimeDetails = (props) => {
    const { id } = useParams();

    return (
        <PageContainer>
            <AnimeDetailsPage id={id} {...props} />
        </PageContainer>
    )
}

export default AnimeDetails;