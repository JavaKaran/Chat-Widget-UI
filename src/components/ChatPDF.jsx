import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
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
        padding: 20,
    },
    message: {
        fontSize: 11,
        paddingVertical: 5,
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
        marginBottom: 40
    },
    moreInfoContainer: {
        // marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        // borderColor: '#912d2a',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth: '70%',
        margin: 'auto',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '75px'
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
        textDecoration: 'underline'
    },
    date: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 30,
    }
})

const ChatPDF = ({ message, dateInfo, primary }) => {

    const { t, i18n } = useTranslation();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                    <Image src="/assets/images/eaa-logo.png" style={styles.logo} />
                </View>
                <Text style={[styles.message, { fontFamily: i18n.language == 'ar' ? 'NotoSansArabic' : 'NotoSans' }]}>{message}</Text>
                <View style={[styles.moreInfoContainer, { borderColor: primary }]}>
                    <Text style={[styles.moreInfoText, { fontFamily: i18n.language == 'ar' ? 'NotoSansArabic' : 'NotoSans' }]}>{t('check out more info here:')}</Text>
                    <Text style={styles.siteLink}>https://www.educationaboveall.org/</Text>
                </View>
                <Text style={styles.date}>{dateInfo}</Text>
            </Page>
        </Document>
    )
}


export default ChatPDF;