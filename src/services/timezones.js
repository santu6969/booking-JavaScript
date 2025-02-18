'use strict';

const map = require('lodash/map');
const filter = require('lodash/filter');
const orderBy = require('lodash/orderBy');
const moment = require('moment-timezone');

require('moment-timezone/builds/moment-timezone-with-data-2012-2022.js');

const oldTimeZones = [    
    { key: 'Pacific/Midway', name: '(-11:00) Midway Island' },
    { key: 'US/Mountain', name: '(-07:00) Mountain Time (US & Canada)' },
    { key: 'US/Central', name: '(-06:00) Central Time (US & Canada)' },
    { key: 'America/Monterrey', name: '(-06:00) Monterrey' },
    { key: 'US/Eastern', name: '(-05:00) Eastern Time (US & Canada)' },
    { key: 'US/East-Indiana', name: '(-05:00) Indiana (East)' },
    { key: 'America/Bogota', name: '(-05:00) Quito' },
    { key: 'Canada/Atlantic', name: '(-04:00) Atlantic Time (Canada)' },
    { key: 'Canada/Newfoundland', name: '(-03:30) Newfoundland' },
    { key: 'America/Argentina/Buenos_Aires', name: '(-03:00) Buenos Aires' },
    { key: 'America/Godthab', name: '(-03:00) Greenland' },
    { key: 'Etc/Greenwich', name: '(+00:00) Dublin (Greenwich Mean Time)' },
    { key: 'Africa/Monrovia', name: '(+00:00) Monrovia' },
    { key: 'Europe/Amsterdam', name: '(+01:00) Amsterdam' },
    { key: 'Europe/Belgrade', name: '(+01:00) Belgrade' },
    { key: 'Europe/Berlin', name: '(+01:00) Bern' },
    { key: 'Europe/Bratislava', name: '(+01:00) Bratislava' },
    { key: 'Africa/Lagos', name: '(+01:00) West Central Africa' },
    { key: 'Africa/Johannesburg', name: '(+02:00) Pretoria' },
    { key: 'Asia/Muscat', name: '(+04:00) Abu Dhabi' },
    { key: 'Asia/Karachi', name: '(+05:00) Islamabad' },
    { key: 'Asia/Tashkent', name: '(+05:00) Tashkent' },
    { key: 'Asia/Yekaterinburg', name: '(+06:00) Ekaterinburg' },
    { key: 'Asia/Bangkok', name: '(+07:00) Hanoi' },
    { key: 'Asia/Krasnoyarsk', name: '(+08:00) Krasnoyarsk' },
    { key: 'Asia/Ulan_Bator', name: '(+08:00) Ulaan Bataar' },
    { key: 'Pacific/Kwajalein', name: '(+12:00) International Date Line West' },
    { key: 'Pacific/Fiji', name: '(+12:00) Marshall Is.' },
    { key: 'Pacific/Tongatapu', name: '(+13:00) Nuku\'alofa' },

    // Fix for timezones
    { key: 'UTC', value: 'UTC', name: '(+00:00) UTC' },
    { key: 'EET', value: 'Europe/Zaporozhye', name: '(+02:00) EET' },
    { key: 'Hongkong', value: 'Asia/Hong_Kong', name: '(+08:00) Hong Kong' },
    { key: 'America/La_Paz', value: 'America/La_Paz', name: '(-04:00) La Paz' },
    { key: 'Europe/London', value: 'Europe/London', name: '(+00:00) Edinburgh' },
    { key: 'Pacific/Honolulu', value: 'Pacific/Honolulu', name: '(-10:00) Hawaii' },
    { key: 'Europe/Kiev', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Kiev' },
    { key: 'Europe/Riga', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Riga' },
    { key: 'Europe/Sofia', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Sofia' },
    { key: 'Europe/Vilnius', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Vilnius' },
    { key: 'Europe/Tallinn', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Tallinn' },
    { key: 'Asia/Nicosia', value: 'Europe/Zaporozhye', name: '(+02:00) Asia/Nicosia' },
    { key: 'Europe/Nicosia', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Nicosia' },
    { key: 'Europe/Uzhgorod', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Uzhgorod' },
    { key: 'Europe/Helsinki', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Helsinki' },
    { key: 'Europe/Bucharest', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Bucharest' },
    { key: 'Europe/Mariehamn', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Mariehamn' },
    { key: 'Europe/Zaporozhye', value: 'Europe/Zaporozhye', name: '(+02:00) Europe/Zaporozhye' },
    { key: 'Europe/Moscow', value: 'Europe/Moscow', name: '(+04:00) St. Petersburg' },
    { key: 'Pacific/Auckland', value: 'Pacific/Auckland', name: '(+12:00) Wellington' },
    { key: 'America/Noronha', value: 'America/Noronha', name: '(-02:00) Mid-Atlantic' },
    { key: 'America/Sao_Paulo', value: 'America/Sao_Paulo', name: '(-03:00) Brasilia' },
    { key: 'America/Managua', value: 'America/Managua', name: '(-06:00) Central America' },
    { key: 'Asia/Kuala_Lumpur', value: 'Asia/Kuala_Lumpur', name: '(+08:00) Kuala Lumpur' },
    { key: 'America/Mexico_City', value: 'America/Mexico_City', name: '(-06:00) Mexico City' },
    { key: 'Pacific/Port_Moresby', value: 'Pacific/Port_Moresby', name: '(+10:00) Port Moresby' },
    { key: 'Atlantic/Cape_Verde', value: 'Atlantic/Cape_Verde', name: '(-01:00) Cape Verde Is.' },
    { key: 'America/Los_Angeles', value: 'America/Los_Angeles', name: '(-08:00) Pacific Time (US & Canada)' },
];

const depericated = [
    { key: 'Africa/Asmera'}, 
    { key: 'Africa/Timbuktu'}, 
    { key: 'America/Argentina/ComodRivadavia'}, 
    { key: 'America/Atka'}, 
    { key: 'America/Buenos_Aires'}, 
    { key: 'America/Catamarca'}, 
    { key: 'America/Coral_Harbour'}, 
    { key: 'America/Cordoba'}, 
    { key: 'America/Ensenada'}, 
    { key: 'America/Fort_Wayne'}, 
    { key: 'America/Godthab'}, 
    { key: 'America/Indianapolis'}, 
    { key: 'America/Jujuy'}, 
    { key: 'America/Knox_IN'}, 
    { key: 'America/Louisville'}, 
    { key: 'America/Mendoza'}, 
    { key: 'America/Montreal'}, 
    { key: 'America/Porto_Acre'}, 
    { key: 'America/Rosario'}, 
    { key: 'America/Santa_Isabel'}, 
    { key: 'America/Shiprock'}, 
    { key: 'America/Virgin'}, 
    { key: 'Antarctica/South_Pole'}, 
    { key: 'Asia/Ashkhabad'}, 
    { key: 'Asia/Calcutta'}, 
    { key: 'Asia/Chongqing'}, 
    { key: 'Asia/Chungking'}, 
    { key: 'Asia/Dacca'}, 
    { key: 'Asia/Harbin'}, 
    { key: 'Asia/Istanbul'}, 
    { key: 'Asia/Kashgar'}, 
    { key: 'Asia/Katmandu'}, 
    { key: 'Asia/Macao'}, 
    { key: 'Asia/Rangoon'}, 
    { key: 'Asia/Saigon'}, 
    { key: 'Asia/Tel_Aviv'}, 
    { key: 'Asia/Thimbu'}, 
    { key: 'Asia/Ujung_Pandang'}, 
    { key: 'Asia/Ulan_Bator'}, 
    { key: 'Atlantic/Faeroe'}, 
    { key: 'Atlantic/Jan_Mayen'}, 
    { key: 'Australia/ACT'}, 
    { key: 'Australia/Canberra'}, 
    { key: 'Australia/Currie'}, 
    { key: 'Australia/LHI'}, 
    { key: 'Australia/North'}, 
    { key: 'Australia/NSW'}, 
    { key: 'Australia/Queensland'}, 
    { key: 'Australia/South'}, 
    { key: 'Australia/Tasmania'}, 
    { key: 'Australia/Victoria'}, 
    { key: 'Australia/West'}, 
    { key: 'Australia/Yancowinna'}, 
    { key: 'Brazil/Acre'}, 
    { key: 'Brazil/DeNoronha'}, 
    { key: 'Brazil/East'}, 
    { key: 'Brazil/West'}, 
    { key: 'Canada/Atlantic'}, 
    { key: 'Canada/Central'}, 
    { key: 'Canada/Eastern'}, 
    { key: 'Canada/Mountain'}, 
    { key: 'Canada/Newfoundland'}, 
    { key: 'Canada/Pacific'}, 
    { key: 'Canada/Saskatchewan'}, 
    { key: 'Canada/Yukon'}, 
    { key: 'CET'}, 
    { key: 'Chile/Continental'}, 
    { key: 'Chile/EasterIsland'}, 
    { key: 'CST6CDT'}, 
    { key: 'Cuba'}, 
    { key: 'EET'}, 
    { key: 'Egypt'}, 
    { key: 'Eire'}, 
    { key: 'EST'}, 
    { key: 'EST5EDT'}, 
    { key: 'Etc/GMT'}, 
    { key: 'Etc/GMT+0'}, 
    { key: 'Etc/GMT+1'}, 
    { key: 'Etc/GMT+10'}, 
    { key: 'Etc/GMT+11'}, 
    { key: 'Etc/GMT+12'}, 
    { key: 'Etc/GMT+2'}, 
    { key: 'Etc/GMT+3'}, 
    { key: 'Etc/GMT+4'}, 
    { key: 'Etc/GMT+5'}, 
    { key: 'Etc/GMT+6'}, 
    { key: 'Etc/GMT+7'}, 
    { key: 'Etc/GMT+8'}, 
    { key: 'Etc/GMT+9'}, 
    { key: 'Etc/GMT-0'}, 
    { key: 'Etc/GMT-1'}, 
    { key: 'Etc/GMT-10'}, 
    { key: 'Etc/GMT-11'}, 
    { key: 'Etc/GMT-12'}, 
    { key: 'Etc/GMT-13'}, 
    { key: 'Etc/GMT-14'}, 
    { key: 'Etc/GMT-2'}, 
    { key: 'Etc/GMT-3'}, 
    { key: 'Etc/GMT-4'}, 
    { key: 'Etc/GMT-5'}, 
    { key: 'Etc/GMT-6'}, 
    { key: 'Etc/GMT-7'}, 
    { key: 'Etc/GMT-8'}, 
    { key: 'Etc/GMT-9'}, 
    { key: 'Etc/GMT0'}, 
    { key: 'Etc/Greenwich'}, 
    { key: 'Etc/UCT'}, 
    { key: 'Etc/Universal'}, 
    { key: 'Etc/UTC'}, 
    { key: 'Etc/Zulu'}, 
    { key: 'Europe/Belfast'}, 
    { key: 'Europe/Nicosia'}, 
    { key: 'Europe/Tiraspol'}, 
    { key: 'Factory'}, 
    { key: 'GB'}, 
    { key: 'GB-Eire'}, 
    { key: 'GMT'}, 
    { key: 'GMT+0'}, 
    { key: 'GMT-0'}, 
    { key: 'GMT0'}, 
    { key: 'Greenwich'}, 
    { key: 'Hongkong'}, 
    { key: 'HST'}, 
    { key: 'Iceland'}, 
    { key: 'Iran'}, 
    { key: 'Israel'}, 
    { key: 'Jamaica'}, 
    { key: 'Japan'}, 
    { key: 'Kwajalein'}, 
    { key: 'Libya'}, 
    { key: 'MET'}, 
    { key: 'Mexico/BajaNorte'}, 
    { key: 'Mexico/BajaSur'}, 
    { key: 'Mexico/General'}, 
    { key: 'MST'}, 
    { key: 'MST7MDT'}, 
    { key: 'Navajo'}, 
    { key: 'NZ'}, 
    { key: 'NZ-CHAT'}, 
    { key: 'Pacific/Enderbury'}, 
    { key: 'Pacific/Johnston'}, 
    { key: 'Pacific/Ponape'}, 
    { key: 'Pacific/Samoa'}, 
    { key: 'Pacific/Truk'}, 
    { key: 'Pacific/Yap'}, 
    { key: 'Poland'}, 
    { key: 'Portugal'}, 
    { key: 'PRC'}, 
    { key: 'PST8PDT'}, 
    { key: 'ROC'}, 
    { key: 'ROK'}, 
    { key: 'Singapore'}, 
    { key: 'Turkey'}, 
    { key: 'UCT'}, 
    { key: 'Universal'}, 
    { key: 'US/Alaska'}, 
    { key: 'US/Aleutian'}, 
    { key: 'US/Arizona'}, 
    { key: 'US/Central'}, 
    { key: 'US/East-Indiana'}, 
    { key: 'US/Eastern'}, 
    { key: 'US/Hawaii'}, 
    { key: 'US/Indiana-Starke'}, 
    { key: 'US/Michigan'}, 
    { key: 'US/Mountain'}, 
    { key: 'US/Pacific'}, 
    { key: 'US/Samoa'}, 
    { key: 'UTC'}, 
    { key: 'W-SU'}, 
    { key: 'WET'}, 
    { key: 'Zulu'}
];

const tzNames = moment.tz.names();
const getFriendlyName = function(tzName) {

    const tzObj = moment().tz(tzName);
    const prefix = '(' + tzObj.format('Z') + ') ';
   
    const found = filter(oldTimeZones, { key: tzName });
    if (found !== undefined && found[0] && found[0].name) {
        return {
            key: tzName,
            depericated: false,
            name: found[0].name,
            value: (found[0].value !== undefined) ? found[0].value : tzName,
        }
    }

    const foundDepericated = filter(depericated, { key: tzName });
    if (foundDepericated.length > 0 && foundDepericated[0] && foundDepericated[0].key) {
        return {
            key: tzName,
            value: tzName,
            depericated: true,
            name: prefix + tzName,
        }
    }

    return {
        key: tzName,
        value: tzName,
        depericated: false,
        name: prefix + tzName
    }
}

const newList = map(tzNames, (tzName) => getFriendlyName(tzName))
                .filter((record) => !record.depericated);

const timezones = orderBy(newList, ['key'], ['asc']);

const guess = () => moment.tz.guess() || 'UTC';
const getZone = (newTz) => moment.tz.zone(newTz);
const knownTimezone = (customerTimezone) => filter(timezones, { key: customerTimezone }).length > 0;
const getTimeZoneName = (customerTimezone) => '(' + moment().tz(customerTimezone).format('Z') + ') ' + customerTimezone;

module.exports = {
    guess,
    getZone,
    knownTimezone,
    getTimeZoneName,
    list: timezones
};
