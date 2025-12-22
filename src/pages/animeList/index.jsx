import React, { useMemo } from "react";
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import getMessages from "./intl";
import IntlProvider from "../../misc/providers/IntlProvider";
import AnimeListContainer from "./containers/AnimeListContainer";

const Index = (props) => {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <AnimeListContainer showNotification={props.showNotification} {...props} />
        </IntlProvider>
    );
}

export default Index;