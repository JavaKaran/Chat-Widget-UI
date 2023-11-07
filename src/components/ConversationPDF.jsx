import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    page: {
        padding: 20,
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
        lineHeight: 1.2
    },
    userText: {
        fontSize: 11,
        // backgroundColor: '#912d2a',
        // paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        maxWidth: '85%',
        lineHeight: 1.2
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
        borderColor: '#912d2a',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
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
        marginBottom: 5
    },
    siteLink: {
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 'heavy',
        textDecoration: 'underline'
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
        fontWeight: 'heavy'
    },
    date: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 30,
    }
})

const ConversationPDF = ({ messages, bot, dateInfo }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.imageContainer}>
                <Image src="/assets/images/eaa-logo.png" style={styles.logo} />
            </View>
            <ChatMessage messages={messages} bot={bot} />
            <View style={styles.moreInfoContainer}>
                <Text style={styles.moreInfoText}>check out more info here:</Text>
                <Text style={styles.siteLink}>https://www.educationaboveall.org/</Text>
            </View>
            <Text style={styles.date}>{dateInfo}</Text>
        </Page>
    </Document>
)

const ChatMessage = ({ messages, bot }) => {

    const rows = messages.map((item, key) =>
        <View style={item.sender === 'bot' ? styles.botMessage : styles.userMessage} key={key}>
            <Text style={item.sender === 'bot' ? styles.botName : styles.name}>{item.sender === 'bot' ? bot?.name : "User"}:</Text>
            <Text style={item.sender === 'bot' ? styles.botText : styles.userText}>
                {item.text}
            </Text>
        </View>
    );
    return (<>{rows}</>)
}

export default ConversationPDF;