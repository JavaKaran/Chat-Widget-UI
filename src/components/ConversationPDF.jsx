import { Document, Page, Text, View, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NotoSansRegular from '../fonts/NotoSans-Regular.ttf';
import NotoArabicSans from '../fonts/NotoSansArabic-Regular.ttf';

Font.registerEmojiSource({
    format: 'png',
    url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

Font.register({ family: "NotoSans", src: NotoSansRegular });
Font.register({ family: "NotoSansArabic", src: NotoArabicSans });

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    userMessage: {
        marginBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'flex',
    },
    botMessage: {
        marginBottom: 10,
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botText: {
        fontSize: 11,
        // backgroundColor: '#f5f5f5',
        // paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        maxWidth: '85%',
        lineHeight: 1.2,
    },
    userText: {
        fontSize: 11,
        // backgroundColor: '#912d2a',
        // paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        maxWidth: '85%',
        lineHeight: 1.2,
    },
    icon: {
        width: 12,
        height: 12,
        marginLeft: 10,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 102,
        height: 55,
        marginTop: 10,
        marginBottom: 60
    },
    moreInfoContainer: {
        // marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        // borderColor: '#912d2a',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        minWidth: '70%',
        maxWidth: '70%',
        margin: 'auto',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    moreInfoText: {
        fontSize: 9,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    siteLink: {
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 'heavy',
        textDecoration: 'underline',
        color: 'black'
    },
    name: {
        fontSize: 11,
        lineHeight: 1.2,
        fontWeight: 'heavy'
    },
    botName: {
        fontSize: 11,
        lineHeight: 1.2,
        textAlign: 'right',
        fontWeight: 'heavy',
    },
    date: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 30,
    }
})

const ConversationPDF = ({ messages, bot, dateInfo, primary }) => {

    const { t, i18n } = useTranslation();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                    <Image src="/assets/images/eaa-logo.png" style={styles.logo} />
                </View>
                <ChatMessage messages={messages} bot={bot} language={i18n.language} />
                <View style={[styles.moreInfoContainer, { borderColor: primary}]}>
                    <Text style={[styles.moreInfoText, {fontFamily: i18n.language == 'ar' ? 'NotoSansArabic' : 'NotoSans'}]}>{t('check out more info here:')}</Text>
                    <Link src="https://www.educationaboveall.org/" style={styles.siteLink}><Text>https://www.educationaboveall.org/</Text></Link>
                </View>
                <Text style={styles.date}>{dateInfo}</Text>
            </Page>
        </Document>
    )
}


const ChatMessage = ({ messages, bot, language }) => {

    const rows = messages.map((item, key) =>
        <View style={[item.sender === 'bot' ? styles.botMessage : styles.userMessage, { fontFamily: language == 'ar' ? 'NotoSansArabic' : 'NotoSans' }]} key={key}>
            <Text style={[item.sender === 'bot' ? styles.botName : styles.name, { fontFamily: language == 'ar' ? 'NotoSansArabic' : 'NotoSans' }]}>{item.sender === 'bot' ? bot?.name : "User"}:</Text>
            <Text style={[item.sender === 'bot' ? styles.botText : styles.userText, { fontFamily: language == 'ar' ? 'NotoSansArabic' : 'NotoSans' }]}>
                {item.text}
            </Text>
        </View>
    );
    return (<>{rows}</>)
}

export default ConversationPDF;