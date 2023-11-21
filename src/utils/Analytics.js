
/*common dataLayer 
eg. type = name of event, if there multipal data then send data with otherData. 
if other data not available tha pass null
example : analytic("login",userData,method)*/

export const analytic = (type,data,otherData) =>{
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': type,
        ...(type == 'send_message') && {'bot_name': data.bot_name},
        ...(type == 'share_event') && {'share_type': data.share_type},
        ...(type == 'app_invokation') && {'parent_domain': data.parent_domain},
        // ...(data && data.email) && {'name':data.email},
        // ...(type == "login" || type == "logout" || type == "signup") && {'authentication_method':otherData, 'user_id':data.uid},
        // ...(type == "new_strom" || type == "bot_activation") && {'members':data.members.length},
        // ...(data && data.botId) && {'botId':data.botId},
        // ...(data && data.message) && {'message':data.message},
        // ...(data && data.url) && {'url':data.url},
        // ...(otherData && !data.url) && {'url':otherData.url},
        // ...(otherData && otherData.name) && {'name':otherData.name},
    })
}