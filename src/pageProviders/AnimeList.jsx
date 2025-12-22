import React from 'react'

import PageContainer from "./components/PageContainer";
import AnimeListPage from "../pages/animeList";

const AnimeList = (props) => {
    return (
        <PageContainer>
            <AnimeListPage {...props}></AnimeListPage>
        </PageContainer>
    )
}

export default AnimeList;