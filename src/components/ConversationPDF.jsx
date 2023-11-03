import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    userMessage: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    botMessage: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botText: {
        fontSize: 12,
        color: '#4b5563',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        maxWidth: '85%',
        lineHeight: 1.2
    },
    userText: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#912d2a',
        paddingHorizontal: 15,
        paddingVertical: 10,
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
        marginBottom: 40
    },
    moreInfoContainer: {
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderColor: '#912d2a',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth: '70%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    moreInfoText: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5
    },
    siteLink: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'heavy',
        textDecoration: 'underline'
    }
})

const ConversationPDF = ({ messages }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.imageContainer}>
                <Image src="/assets/images/eaa-logo.png" style={styles.logo} />
            </View>
            <ChatMessage messages={messages} />
            <View style={styles.moreInfoContainer}>
                <Text style={styles.moreInfoText}>check out more info here:</Text>
                <Text style={styles.siteLink}>https://www.educationaboveall.org/</Text>
            </View>
        </Page>
    </Document>
)

const ChatMessage = ({ messages }) => {

    const rows = messages.map((item, key) =>
        <View style={item.sender === 'bot' ? styles.botMessage : styles.userMessage} key={key}>
            <Text style={item.sender === 'bot' ? styles.botText : styles.userText}>
                {item.text}
            </Text>
        </View>
    );
    return (<>{rows}</>)
}

export default ConversationPDF;