FSR.surveydefs = [{
    name: 'browse',
    section: 'members',
    invite: {
        when: 'onentry',
        siteLogo: "sitelogo.gif",
        dialogs: [{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"
        }]
    },
    pin: 1,
    pop: {
        when: 'later',
        what: 'qualifier',
        pu: true
    },
    criteria: {
        sp: 90,
        lf: 1
    },
    tracker: {
        url: 'tracker.html'
    },
    include: {
        cookies: [{
            name: 'loggedin',
            value: '1'
        }, {
            name: 'rememberMe',
            value: '.'
        }]
    }
}, {
    name: 'browse',
    section: 'public',
    invite: {
        when: 'onentry',
        siteLogo: "pro_logo.png",
        dialogs: [{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting proactiv.com. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"
        }]
    },
    pop: {
        when: 'later',
        pu: false
    },
    criteria: {
        sp: 10,
        lf: 2
    },
    tracker: {
        url: 'tracker_pub.html'
    },
    links: {
        pop: [{
            pu: true,
            tag: 'button',
            attribute: 'id',
            patterns: ['contYourOrder'],
            check: function(){
                var selected = document.forms["dwfrm_cart"].dwfrm_personinf_creditcard_type.selectedIndex;
                var options = document.forms["dwfrm_cart"].dwfrm_personinf_creditcard_type.options;
                var value = options[selected].value
                if (value == 'PayPal') {
                    FSR.CPPS.set('paypal', 'true');
                    return true
                }
                return false;
            }
        }]
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {},
    
    zIndexPopup: 10000,
    
    ignoreWindowTopCheck: false,
    
    
    ipexclude: 'fsr$ip',
    
    mobileHeartbeat: {
        delay: 60, /*mobile on exit heartbeat delay seconds*/
        max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },
    
    invite: {
        isMDOT: false,
        isZoomable: false,
        
        exclude: {
            local: ['/COCart-AddProduct'],
            referrer: []
        },
        
        include: {
            local: ['.']
        },
        
        delay: 0,
        timeout: 0,
        
        hideOnClick: false,
        hideCloseButton: false,
        
        css: 'foresee-dhtml.css',
        
        hide: [],
        hideFlash: false,
        
        type: 'dhtml',
        url: 'invite-mobile.html',
        back: 'url'
    },
    
    tracker: {
        width: '690',
        height: '415',
        timeout: 8,
        adjust: false,
        alert: {
            enabled: true,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 690,
        height: 600
    },
    
    qualifier: {
        footer: '<div div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        width: '690',
        height: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '690',
        height: '400'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false,
        user_agent: false,
        entry: false,
        entry_params: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802,
            followup: 803,
            information: 804,
            content: 805
        },
        pd: 7,
        custom: {}
    },
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    cpps: {
        Acct_No: {
            source: 'variable',
            name: 's.prop21'
        },
        Campaign_ID: {
            source: 'cookie',
            name: 'UCI'
        },
        GR_Chat_ID: {
            source: 'cookie',
            name: 'grchatid'
        },
        uci: {
            source: 'variable',
            name: 'uci'
        },
        orderTotal: {
            source: 'variable',
            name: 'orderTotal'
        },
        orderID: {
            source: 'variable',
            name: 'orderID'
        },
        mainOfferCode: {
            source: 'variable',
            name: 'mainOfferCode'
        },
        quantityArray: {
            source: 'variable',
            name: 'quantityArray'
        },
        revenueArray: {
            source: 'variable',
            name: 'revenueArray'
        },
        shippingArray: {
            source: 'variable',
            name: 'shippingArray'
        },
        offerArray: {
            source: 'variable',
            name: 'offerArray'
        },
        paypal: {
            init: 'false',
            source: 'static'
        },
        CurrentLoginStatus: {
            init: '0',
            source: 'cookie',
            name: 'loggedin'
        },
        rememberMe: {
            source: 'function',
            init: '0',
            value: function(){
                var rememberMe = getCookie("rememberMe");
                if (rememberMe != null) {
                    return '1'
                }
            }
        }
    },
    mode: 'hybrid'
};
