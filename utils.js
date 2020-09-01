
const recorgnizeCountriesFromPlateNumber = (originalPlateNumber) => {
    let plateNumber = originalPlateNumber.replace(/[a-zA-Z]/g, 'L');
    plateNumber = plateNumber.replace(/[0-9]/g, 'D');
  
    const patterns = [
        {'country' : 'SO', 'pattern' : 'DDDD'},
        {'country' : 'SO', 'pattern' : 'DDDDD'},
        {'country' : 'TN', 'pattern' : 'DDDDDD'},
        {'country' : 'LY', 'pattern' : 'DDDDDDD'},
        {'country' : 'LY', 'pattern' : 'DDDDDDDD'},
        {'country' : 'DZ', 'pattern' : 'DDDDDDDDDD'},
        {'country' : 'ZW', 'pattern' : 'DDDDDDL'},
        {'country' : 'MA', 'pattern' : 'DDDDDLDD'},
        {'country' : 'KM', 'pattern' : 'DDDDL'},
        {'country' : 'RW', 'pattern' : 'DDDDL'},
        {'country' : 'KM', 'pattern' : 'DDDLLDD'},
        {'country' : 'GA', 'pattern' : 'DDDDLDL'},
        {'country' : 'RM', 'pattern' : 'DDDDLL'},
        {'country' : 'TG', 'pattern' : 'DDDDLL'},
        {'country' : 'EG', 'pattern' : 'DDDDLL'},
        {'country' : 'SD', 'pattern' : 'DDDDLL'},
        {'country' : 'GW', 'pattern' : 'DDDDLL'},
        {'country' : 'CI', 'pattern' : 'DDDDLLDD'},
        // {'country' : 'MR', 'pattern' : 'DDDDLLDD'},
        {'country' : 'MU', 'pattern' : 'DDDDLLDD'},
        {'country' : 'EG', 'pattern' : 'DDDDLLL'},
        {'country' : 'RM', 'pattern' : 'DDDDLL(L)'},
        {'country' : 'DJ', 'pattern' : 'DDDLD'},
        {'country' : 'DJ', 'pattern' : 'DDDLDD'},
        {'country' : 'CG', 'pattern' : 'DDDLLDD'},
        {'country' : 'CG', 'pattern' : 'DDDLLD'},
        {'country' : 'EG', 'pattern' : 'DDDLLL'},
        {'country' : 'DJ', 'pattern' : 'DDLDD'},
        {'country' : 'BF', 'pattern' : 'DDLLDDDD'},
        {'country' : 'TD', 'pattern' : 'DDLDDDDL'},
        {'country' : 'BI', 'pattern' : 'LDDDDL'},
        {'country' : 'NE', 'pattern' : 'DLDDDD'},
        {'country' : 'SD', 'pattern' : 'DLDDDDD'},
        {'country' : 'ET', 'pattern' : 'DLLDDDDD'},
        {'country' : 'ET', 'pattern' : 'DDDDDDLL'},
        {'country' : 'ML', 'pattern' : 'DLLLDDDD'},
        {'country' : 'SC', 'pattern' : 'LDDD'},
        // {'country' : 'MR', 'pattern' : 'LDDD'},
        {'country' : 'BJ', 'pattern' : 'LDDDD'},
        {'country' : 'KE', 'pattern' : 'LDDDD'},
        {'country' : 'LS', 'pattern' : 'LDDDD'},
        {'country' : 'LR', 'pattern' : 'LDDDD'},
        {'country' : 'SC', 'pattern' : 'LDDDD '},
        {'country' : 'SL', 'pattern' : 'LDDDD '},
        {'country' : 'SC', 'pattern' : 'LDDDDD'},
        {'country' : 'MA', 'pattern' : 'LDDDDDDD'},
        {'country' : 'NA', 'pattern' : 'LDDDDDLL'},
        {'country' : 'ML', 'pattern' : 'LDDDDLL'},
        // {'country' : 'CI', 'pattern' : 'LDDDDLLD'},
        {'country' : 'NE', 'pattern' : 'LDDDDLLD'},
        {'country' : 'TZ', 'pattern' : 'LDDDLL'},
        {'country' : 'BW', 'pattern' : 'LDDDLLL'},
        {'country' : 'GM', 'pattern' : 'LDLDDDD'},
        {'country' : 'MU', 'pattern' : 'LLDD'},
        {'country' : 'BJ', 'pattern' : 'LLDDDD'},
        {'country' : 'LS', 'pattern' : 'LLDDDD'},
        {'country' : 'LR', 'pattern' : 'LLDDDD'},
        {'country' : 'MW', 'pattern' : 'LLDDDD'},
        {'country' : 'GH', 'pattern' : 'LLDDDD'},
        {'country' : 'NA', 'pattern' : 'LLDDDD'},
        {'country' : 'RW', 'pattern' : 'LLDDDD'},
        {'country' : 'SL', 'pattern' : 'LLDDDD'},
        {'country' : 'ET', 'pattern' : 'LLDDDDD'},
        {'country' : 'ER', 'pattern' : 'LLDDDDDD'},
        {'country' : 'GH', 'pattern' : 'LLDDDDDD'},
        {'country' : 'TD', 'pattern' : 'LLDDDDL'},
        {'country' : 'GN', 'pattern' : 'LLDDDDL'},
        {'country' : 'SN', 'pattern' : 'LLDDDDLL'},
        // {'country' : 'CM', 'pattern' : 'LLDDDDL'},
        {'country' : 'GH', 'pattern' : 'LLDDDDL'},
        {'country' : 'TG', 'pattern' : 'LLDDDDL'},
        {'country' : 'CGO', 'pattern' : 'LLDDDDLL'},
        {'country' : 'GQ', 'pattern' : 'LLDDDL'},
        {'country' : 'CM', 'pattern' : 'LLDDDLL'},
        // {'country' : 'GA', 'pattern' : 'LLDDDLL'},
        {'country' : 'CF', 'pattern' : 'LLDDDLL'},
        {'country' : 'NG', 'pattern' : 'LLDDDLLL'},
        {'country' : 'CV', 'pattern' : 'LLDDLL'},
        {'country' : 'KE', 'pattern' : 'LLLDDD'},
        {'country' : 'UG', 'pattern' : 'LLLDDD'},
        {'country' : 'ZM', 'pattern' : 'LLLDDD'},
        {'country' : 'SL', 'pattern' : 'LLLDDD LL/LL'},
        {'country' : 'CV', 'pattern' : 'LLLDDDD'},
        {'country' : 'ST', 'pattern' : 'LLLDDDD'},
        {'country' : 'TZ', 'pattern' : 'LLLDDDD'},
        {'country' : 'ZM', 'pattern' : 'LLLDDDD'},
        {'country' : 'MZ', 'pattern' : 'LLLDDDD'},
        {'country' : 'ZW', 'pattern' : 'LLLDDDD'},
        {'country' : 'CF', 'pattern' : 'LLLDDDDL'},
        {'country' : 'GM', 'pattern' : 'LLLDDDDL'},
        {'country' : 'ST', 'pattern' : 'LLLDDDDL'},
        {'country' : 'KE', 'pattern' : 'LLLDDDL'},
        {'country' : 'UG', 'pattern' : 'LLLDDDL'},
        {'country' : 'RW', 'pattern' : 'LLLDDDL'},
        {'country' : 'SZ', 'pattern' : 'LLLDDDLL'},
        {'country' : 'MZ', 'pattern' : 'LLLDDDLL'},
        {'country' : 'NG', 'pattern' : 'LLLDDDLL'},
        {'country' : 'ZA', 'pattern' : 'LLLDDDLL'},
        {'country' : 'AO', 'pattern' : 'LLDDDDLL'},
    ];
    let result = [];
    let extra_info = [];
    patterns.map((pattern, index) => {
      if (pattern.pattern == plateNumber) {
        if (pattern.country == 'MU') {
            if (checkForMauritius(originalPlateNumber)) {
                result.push(pattern.country);
            }
        }
        else if (pattern.country == 'CM') {
            const extra = checkForCameroon(originalPlateNumber);
            if (extra) {
                result.push(pattern.country);
                extra_info.push(extra);
            }   
        }
        else if (pattern.country == 'GA') {
            const extra = checkForGabon(originalPlateNumber);
            if (extra) {
                result.push(pattern.country);
                extra_info.push(extra);
            }   
        }
        else if (pattern.country == 'CI') {
            const extra = checkForCotede(originalPlateNumber);
            if (extra) {
                result.push(pattern.country);
                extra_info.push(extra);
            }   
        }
        else if (pattern.country == 'AO') {
            if (checkForAngola(originalPlateNumber)) {
                result.push(pattern.country);
            }
        }
        else if (pattern.country == 'MR') {
            const extra = checkForMauritania(originalPlateNumber);
            if (extra) {
                extra_info.push(extra);
                result.push(pattern.country);
            }
        }
        else if (pattern.country == 'CGO') {
            if (checkForDRCongo(originalPlateNumber)) {
                result.push(pattern.country);
            }
        }
        else if (pattern.country == 'SN') {
            const extra = checkForSenegal(originalPlateNumber);
            if (extra) {
                result.push(pattern.country);
                extra_info.push(extra);
            }
        }
        else {
            result.push(pattern.country);
        }
      }
    });
    return {result: result, extra: extra_info};
  }
  
  
  const checkForCameroon = (plateNumber) => {
    const array = ['AD', 'CE', 'EN', 'ES', 'LT', 'NO', 'NW', 'OU', 'SU', 'SW'];
    const regions = {
        'AD': 'Adamawa',
        'CE': 'Center',
        'EN': 'Far North',
        'ES': 'East',
        'LT': 'Litoral',
        'NO': 'North',
        'NW': 'North West',
        'OU': 'West',
        'SU': 'South',
        'SW': 'South West'
    };
    const first2letters = plateNumber.substr(0, 2).toUpperCase();
    if (array.includes($first2letters)) {
        return 'The car is registered in ' + regions[first2letters] + "(Cameroon)";
    }
    return false;
  }
  
  const checkForGabon = (plateNumber) => {
    const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const regions = {
        'G1': 'Estuaire',
        'G2': 'Upper Ogooue',
        'G3': 'Average Ogooue',
        'G4': 'Gouna',
        'G5': 'Nyanha',
        'G6': 'Ogooue-Ivindo',
        'G7': 'Ogooue-Lolo',
        'G8': 'Seaside Ogove',
        'G9': 'Will-Ntem'
    };
    const first_letter = plateNumber.substr(4, 1).toUpperCase();
    const fift_digital = plateNumber.substr(5, 1).toUpperCase();
    if (first_letter == 'G' && array.includes(fift_digital)) {
        const index = first_letter + fift_digital;
        return 'The car is registered in ' + regions[index] + " (Gabon)";
    }
    return false;
  }
  
  const checkForCotede = (plateNumber) => {
    const array = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    const regions = {
        '01':  'Sud - Lagunes, Sud-Comoé, Agnéby',
        '02':  'Centre Ouest - Haut-Sassandra, Fromager, Marahoué',
        '03':  'Nord Savanes',
        '04':  'Centre Nord - Vallée du Bandama',
        '05':  'Est - Moyen-Comoé',
        '06':  'Ouest - Dix-Huit Montagnes',
        '07':  'Centre - Lacs, N’zi-Comoé',
        '08':  'Nord Est - Zanzan',
        '09':  'Sud Ouest - Bas-Sassandra',
        '10':  'Nord Ouest - Denguélé, Worodougou'
    };
    const last2numbers = plateNumber.substr(-2).toUpperCase();
    if (array.includes(last2numbers)) {
        return 'The car is registered in ' + regions[last2numbers] + "(Cote D'Ivoire)";
    }
    return false;
  }
  
  const checkForAngola = (plateNumber) => {
    const first2letters = plateNumber.substr(0, 2).toUpperCase();
    if (first2letters == 'LD')
        return true;
    return false;
  }
  
  const checkForSenegal = (plateNumber) => {
    const array = ['DK', 'DL', 'FK', 'KL', 'KD', 'LG', 'SL', 'TC', 'TH', 'ZG', 'MT'];
    const region = {
        'DK': 'Région de Dakar',
        'DL': 'Région de Diourbel',
        'FK': 'Région de Fatick',
        'KL': 'Région de Kaolack',
        'KD': 'Région de Kolda',
        'LG': 'Région de Louga',
        'SL': 'Région de Saint -Louis',
        'TC': 'Région de Tambacounda',
        'TH': 'Région de Thiès',
        'ZG': 'Région de Ziguinchor',
        'MT': 'Région de Matam',
    };
    const number = plateNumber.substr(0, 2).toUpperCase();
    if (array.includes(number)) return 'The car is registered in ' + region[number] + '(Senegal)';
    else return false;
  }
  
  const checkForDRCongo = (plateNumber) => {
    const array = ['BN', 'BC', 'BZ', 'EQ', 'KW', 'KE', 'KT', 'SH', 'KN', 'MN', 'NK', 'OR', 'HZ', 'SK', 'KV'];
    const number = plateNumber.toUpperCase().substr(0, 2);
    if (array.includes(number)) return true;
    else return false;
  }
  
  const checkForMauritius = (plateNumber) => {
    const months = ['JN', 'FB', 'MR', 'AP', 'MY', 'JU', 'JL', 'AG', 'SE', 'OC', 'NV', 'DE'];
    const array = {
        'JN': 'January',
        'FB': 'February',
        'MR': 'March',
        'AP': 'April',
        'MY': 'May',
        'JU': 'June',
        'JL': 'July',
        'AG': 'August',
        'SE': 'September',
        'OC': 'October',
        'NV': 'November',
        'DE': 'December'};
    let number = plateNumber.substr(-4);
    let month = number.substr(0, 2).toUpperCase();
    if (months.includes(month)) {
        let year = '19';
        if (parseInt(number) > 20)
            year = '20';
        let extra_info ='The car is registered in ' + array[month] + year + number;
        return extra_info;
    }
    else return false;
  }
  
  const checkForMauritania = (plateNumber) => {
    const array = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const region = {
        '00': 'Nouakchott',
        '01': 'Al-Sharq Al Hudd',
        '02': 'Al Hudd Al Gharbi',
        '03': 'Al Aasaba',
        '04': 'Kulak',
        '05': 'Al Brakna',
        '06': 'Al Trarza',
        '07': 'Adrar',
        '08': 'Dakhla Nuazibu',
        '09': 'Takant',
        '10': 'Hidimaha',
        '11': 'Tiris Zimur',
        '12': 'Inshyri'
    };
    const number = plateNumber.substr(-2);
    if (array.includes(number)) {
        return 'The car is registered in ' + region[number] + '(Mauritania)';
    }
    else return false;
  }
  
  
  module.exports = recorgnizeCountriesFromPlateNumber