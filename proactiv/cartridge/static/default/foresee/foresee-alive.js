var $$FSR = {
    'timestamp': 'September 28, 2012 @ 11:07 AM',
    'version': '15.1.6',
    'enabled': true,
    'sessionreplay': true,
    'auto': true,
    'encode': false,
    'files': '/foresee/',
    //'swf_files': '__swf_files_' needs to be sef when foresee-transport.swf is not located at 'files'
    'id': '6sJmheP5LU9igNllgCIbDg==',
    'definition': 'foresee-surveydef.js',
    'embedded': false,
    'replay_id': 'proactiv.com',
    'renderer': 'W3C', // or "ASRECORDED"
    'layout': 'CENTERFIXED', // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
    'pools': [{
        path: '.',
        sp: 10 // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
    }],
    'sites': [{
        path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
    }, {
        path: '.',
        domain: 'default'
    }],
    storageOption: 'cookie'
};
// -------------------------------- DO NOT MODIFY ANYTHING BELOW THIS LINE ---------------------------------------------
for(var a=$$FSR,b=window.document,c=a.sites,d=0,e=c.length;d<e;d++){var f;"[object Array]"!==Object.prototype.toString.call(c[d].path)&&(c[d].path=[c[d].path]);for(var g=0,h=c[d].path.length;g<h;g++)if(f=b.location.href.toLowerCase().match(c[d].path[g])){a.siteid=d;a.site=a.sites[d];a.site.domain?"default"==a.site.domain&&(a.site.domain=null):a.site.domain=f[0];a.site.secure||(a.site.secure=null);a.site.name||(a.site.name=f[0]);break}if(f)break} b.cookie="fsr.a"+(a.site.cookie?"."+a.site.cookie:"")+"=suspended;path=/"+(a.site.domain?";domain="+a.site.domain+";":";")+(a.site.secure?"secure":"");