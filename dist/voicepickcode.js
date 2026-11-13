/*
 * Voice Pick Code generator (PTI).
 * CRC-16 (polynomial 0xA001, initial value 0) over GTIN + Lot + optional pack date (YYMMDD),
 * reduced to 4 digits.
 */
(function (root) {
    'use strict';

    var TABLE = (function () {
        var polynomial = 0xA001;
        var table = new Array(256);
        for (var i = 0; i < 256; ++i) {
            var value = 0;
            var temp = i;
            for (var j = 0; j < 8; ++j) {
                if (((value ^ temp) & 1) !== 0) {
                    value = (value >> 1) ^ polynomial;
                } else {
                    value >>= 1;
                }
                temp >>= 1;
            }
            table[i] = value;
        }
        return table;
    })();

    function voicePickCode(gtin, lot, date) {
        var plainText = String(gtin) + String(lot) + (date ? String(date) : '');
        var crc = 0;
        for (var i = 0; i < plainText.length; ++i) {
            var index = (crc ^ plainText.charCodeAt(i)) % 256;
            crc = (crc >> 8) ^ TABLE[index];
        }
        var code = String(crc % 10000);
        while (code.length < 4) {
            code = '0' + code;
        }
        return {
            plainText: plainText,
            code: code,
            smallDigits: code.substr(0, 2),
            largeDigits: code.substr(2, 2)
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = voicePickCode;
        if (require.main === module) {
            var r = voicePickCode('10850510002011', '46587443HG234', '180616');
            console.log('Plain Text = ' + r.plainText);
            console.log('Voice = ' + r.code);
            console.log('Small Digits = ' + r.smallDigits);
            console.log('Large Digits = ' + r.largeDigits);
        }
    } else {
        root.voicePickCode = voicePickCode;
    }
})(this);
