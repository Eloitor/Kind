module.exports = (function() {
    function word_to_u16(w) {
        var u = 0;
        for (var i = 0; i < 16; ++i) {
            u = u | (w._ === 'Word.i' ? 1 << i : 0);
            w = w.pred;
        };
        return u;
    };

    function u16_to_word(u) {
        var w = {
            _: 'Word.e'
        };
        for (var i = 0; i < 16; ++i) {
            w = {
                _: (u >>> (16 - i - 1)) & 1 ? 'Word.i' : 'Word.o',
                pred: w
            };
        };
        return w;
    };

    function u16_to_bits(x) {
        var s = '';
        for (var i = 0; i < 16; ++i) {
            s = (x & 1 ? '1' : '0') + s;
            x = x >>> 1;
        }
        return s;
    };
    var list_for = list => nil => cons => {
        while (list._ !== 'List.nil') {
            nil = cons(list.head)(nil);
            list = list.tail;
        }
        return nil;
    };
    var nat_to_bits = n => {
        return n === 0n ? '' : n.toString(2);
    };
    var fm_name_to_bits = name => {
        const TABLE = {
            'A': '000000',
            'B': '100000',
            'C': '010000',
            'D': '110000',
            'E': '001000',
            'F': '101000',
            'G': '011000',
            'H': '111000',
            'I': '000100',
            'J': '100100',
            'K': '010100',
            'L': '110100',
            'M': '001100',
            'N': '101100',
            'O': '011100',
            'P': '111100',
            'Q': '000010',
            'R': '100010',
            'S': '010010',
            'T': '110010',
            'U': '001010',
            'V': '101010',
            'W': '011010',
            'X': '111010',
            'Y': '000110',
            'Z': '100110',
            'a': '010110',
            'b': '110110',
            'c': '001110',
            'd': '101110',
            'e': '011110',
            'f': '111110',
            'g': '000001',
            'h': '100001',
            'i': '010001',
            'j': '110001',
            'k': '001001',
            'l': '101001',
            'm': '011001',
            'n': '111001',
            'o': '000101',
            'p': '100101',
            'q': '010101',
            'r': '110101',
            's': '001101',
            't': '101101',
            'u': '011101',
            'v': '111101',
            'w': '000011',
            'x': '100011',
            'y': '010011',
            'z': '110011',
            '0': '001011',
            '1': '101011',
            '2': '011011',
            '3': '111011',
            '4': '000111',
            '5': '100111',
            '6': '010111',
            '7': '110111',
            '8': '001111',
            '9': '101111',
            '.': '011111',
            '_': '111111',
        }
        var a = '';
        for (var i = name.length - 1; i >= 0; --i) {
            a += TABLE[name[i]];
        }
        return a;
    };
    const inst_unit = x => x(1);
    const elim_unit = (x => {
        var $1 = (() => c0 => {
            var self = x;
            switch ("unit") {
                case 'unit':
                    var $0 = c0;
                    return $0;
            };
        })();
        return $1;
    });
    const inst_bool = x => x(true)(false);
    const elim_bool = (x => {
        var $4 = (() => c0 => c1 => {
            var self = x;
            if (self) {
                var $2 = c2;
                return $2;
            } else {
                var $3 = c2;
                return $3;
            };
        })();
        return $4;
    });
    const inst_nat = x => x(0n)(x0 => 1n + x0);
    const elim_nat = (x => {
        var $8 = (() => c0 => c1 => {
            var self = x;
            if (self === 0n) {
                var $5 = c2;
                return $5;
            } else {
                var $6 = (self - 1n);
                var $7 = c2($6);
                return $7;
            };
        })();
        return $8;
    });
    const inst_bits = x => x('')(x0 => x0 + '0')(x0 => x0 + '1');
    const elim_bits = (x => {
        var $14 = (() => c0 => c1 => c2 => {
            var self = x;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $9 = c0;
                    return $9;
                case 'o':
                    var $10 = self.slice(0, -1);
                    var $11 = c1($10);
                    return $11;
                case 'i':
                    var $12 = self.slice(0, -1);
                    var $13 = c2($12);
                    return $13;
            };
        })();
        return $14;
    });
    const inst_u16 = x => x(x0 => word_to_u16(x0));
    const elim_u16 = (x => {
        var $17 = (() => c0 => {
            var self = x;
            switch ('u16') {
                case 'u16':
                    var $15 = u16_to_word(self);
                    var $16 = c0($15);
                    return $16;
            };
        })();
        return $17;
    });
    const inst_string = x => x('')(x0 => x1 => (String.fromCharCode(x0) + x1));
    const elim_string = (x => {
        var $22 = (() => c0 => c1 => {
            var self = x;
            if (self.length === 0) {
                var $18 = c2;
                return $18;
            } else {
                var $19 = self.charCodeAt(0);
                var $20 = self.slice(1);
                var $21 = c2($19)($20);
                return $21;
            };
        })();
        return $22;
    });
    var run = (p) => {
        var rdl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        return run_io(rdl, p).then((x) => {
            rdl.close();
            return x;
        });
    };
    var run_io = (rdl, p) => {
        switch (p._) {
            case 'IO.end':
                return Promise.resolve(p.value);
            case 'IO.ask':
                return new Promise((res, _) => {
                    switch (p.query) {
                        case 'print':
                            console.log(p.param);
                            run_io(rdl, p.then(1)).then(res);
                            break;
                        case 'get_line':
                            rdl.question('', (line) => run_io(rdl, p.then(line)).then(res));
                            break;
                        case 'get_file':
                            try {
                                run_io(rdl, p.then(require('fs').readFileSync(p.param, 'utf8'))).then(res);
                            } catch (e) {
                                console.log('Internal error on the Formality JavaScript runtime.');
                                process.exit();
                            };
                            break;
                        case 'get_args':
                            run_io(rdl, p.then(process.argv[2] || '')).then(res);
                            break;
                    }
                });
        }
    };

    function Monad$bind$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $24 = self.bind;
                var $25 = self.pure;
                var $26 = $24;
                var $23 = $26;
                break;
        };
        return $23;
    };
    const Monad$bind = x0 => Monad$bind$(x0);

    function IO$(_A$1) {
        var $27 = null;
        return $27;
    };
    const IO = x0 => IO$(x0);

    function Monad$new$(_bind$2, _pure$3) {
        var $28 = ({
            _: 'Monad.new',
            'bind': _bind$2,
            'pure': _pure$3
        });
        return $28;
    };
    const Monad$new = x0 => x1 => Monad$new$(x0, x1);

    function IO$ask$(_query$2, _param$3, _then$4) {
        var $29 = ({
            _: 'IO.ask',
            'query': _query$2,
            'param': _param$3,
            'then': _then$4
        });
        return $29;
    };
    const IO$ask = x0 => x1 => x2 => IO$ask$(x0, x1, x2);

    function IO$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'IO.end':
                var $31 = self.value;
                var $32 = _f$4($31);
                var $30 = $32;
                break;
            case 'IO.ask':
                var $33 = self.query;
                var $34 = self.param;
                var $35 = self.then;
                var $36 = IO$ask$($33, $34, (_x$8 => {
                    var $37 = IO$bind$($35(_x$8), _f$4);
                    return $37;
                }));
                var $30 = $36;
                break;
        };
        return $30;
    };
    const IO$bind = x0 => x1 => IO$bind$(x0, x1);

    function IO$end$(_value$2) {
        var $38 = ({
            _: 'IO.end',
            'value': _value$2
        });
        return $38;
    };
    const IO$end = x0 => IO$end$(x0);
    const IO$monad = Monad$new$(IO$bind, IO$end);

    function Map$(_A$1) {
        var $39 = null;
        return $39;
    };
    const Map = x0 => Map$(x0);

    function Maybe$(_A$1) {
        var $40 = null;
        return $40;
    };
    const Maybe = x0 => Maybe$(x0);
    const Maybe$none = ({
        _: 'Maybe.none'
    });

    function Map$get$(_bits$2, _map$3) {
        var Map$get$ = (_bits$2, _map$3) => ({
            ctr: 'TCO',
            arg: [_bits$2, _map$3]
        });
        var Map$get = _bits$2 => _map$3 => Map$get$(_bits$2, _map$3);
        var arg = [_bits$2, _map$3];
        while (true) {
            let [_bits$2, _map$3] = arg;
            var R = (() => {
                var self = _bits$2;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $42 = Maybe$none;
                                var $41 = $42;
                                break;
                            case 'Map.tie':
                                var $43 = self.val;
                                var $44 = self.lft;
                                var $45 = self.rgt;
                                var $46 = $43;
                                var $41 = $46;
                                break;
                        };
                        return $41;
                    case 'o':
                        var $47 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $49 = Maybe$none;
                                var $48 = $49;
                                break;
                            case 'Map.tie':
                                var $50 = self.val;
                                var $51 = self.lft;
                                var $52 = self.rgt;
                                var $53 = Map$get$($47, $51);
                                var $48 = $53;
                                break;
                        };
                        return $48;
                    case 'i':
                        var $54 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $56 = Maybe$none;
                                var $55 = $56;
                                break;
                            case 'Map.tie':
                                var $57 = self.val;
                                var $58 = self.lft;
                                var $59 = self.rgt;
                                var $60 = Map$get$($54, $59);
                                var $55 = $60;
                                break;
                        };
                        return $55;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Map$get = x0 => x1 => Map$get$(x0, x1);
    const Bits$e = '';
    const Bool$false = false;
    const Bool$and = a0 => a1 => (a0 && a1);
    const Bool$true = true;

    function Cmp$as_lte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $62 = Bool$true;
                var $61 = $62;
                break;
            case 'Cmp.eql':
                var $63 = Bool$true;
                var $61 = $63;
                break;
            case 'Cmp.gtn':
                var $64 = Bool$false;
                var $61 = $64;
                break;
        };
        return $61;
    };
    const Cmp$as_lte = x0 => Cmp$as_lte$(x0);
    const Cmp$ltn = ({
        _: 'Cmp.ltn'
    });
    const Cmp$gtn = ({
        _: 'Cmp.gtn'
    });

    function Word$cmp$go$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $66 = (_b$5 => {
                    var $67 = _c$4;
                    return $67;
                });
                var $65 = $66;
                break;
            case 'Word.o':
                var $68 = self.pred;
                var $69 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $71 = (_a$pred$8 => {
                                var $72 = _c$4;
                                return $72;
                            });
                            var $70 = $71;
                            break;
                        case 'Word.o':
                            var $73 = self.pred;
                            var $74 = (_a$pred$10 => {
                                var $75 = Word$cmp$go$(_a$pred$10, $73, _c$4);
                                return $75;
                            });
                            var $70 = $74;
                            break;
                        case 'Word.i':
                            var $76 = self.pred;
                            var $77 = (_a$pred$10 => {
                                var $78 = Word$cmp$go$(_a$pred$10, $76, Cmp$ltn);
                                return $78;
                            });
                            var $70 = $77;
                            break;
                    };
                    var $70 = $70($68);
                    return $70;
                });
                var $65 = $69;
                break;
            case 'Word.i':
                var $79 = self.pred;
                var $80 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $82 = (_a$pred$8 => {
                                var $83 = _c$4;
                                return $83;
                            });
                            var $81 = $82;
                            break;
                        case 'Word.o':
                            var $84 = self.pred;
                            var $85 = (_a$pred$10 => {
                                var $86 = Word$cmp$go$(_a$pred$10, $84, Cmp$gtn);
                                return $86;
                            });
                            var $81 = $85;
                            break;
                        case 'Word.i':
                            var $87 = self.pred;
                            var $88 = (_a$pred$10 => {
                                var $89 = Word$cmp$go$(_a$pred$10, $87, _c$4);
                                return $89;
                            });
                            var $81 = $88;
                            break;
                    };
                    var $81 = $81($79);
                    return $81;
                });
                var $65 = $80;
                break;
        };
        var $65 = $65(_b$3);
        return $65;
    };
    const Word$cmp$go = x0 => x1 => x2 => Word$cmp$go$(x0, x1, x2);
    const Cmp$eql = ({
        _: 'Cmp.eql'
    });

    function Word$cmp$(_a$2, _b$3) {
        var $90 = Word$cmp$go$(_a$2, _b$3, Cmp$eql);
        return $90;
    };
    const Word$cmp = x0 => x1 => Word$cmp$(x0, x1);

    function Word$lte$(_a$2, _b$3) {
        var $91 = Cmp$as_lte$(Word$cmp$(_a$2, _b$3));
        return $91;
    };
    const Word$lte = x0 => x1 => Word$lte$(x0, x1);

    function Nat$succ$(_pred$1) {
        var $92 = 1n + _pred$1;
        return $92;
    };
    const Nat$succ = x0 => Nat$succ$(x0);
    const Nat$zero = 0n;
    const U16$lte = a0 => a1 => (a0 <= a1);

    function U16$btw$(_a$1, _b$2, _c$3) {
        var $93 = ((_a$1 <= _b$2) && (_b$2 <= _c$3));
        return $93;
    };
    const U16$btw = x0 => x1 => x2 => U16$btw$(x0, x1, x2);

    function U16$new$(_value$1) {
        var $94 = word_to_u16(_value$1);
        return $94;
    };
    const U16$new = x0 => U16$new$(x0);
    const Word$e = ({
        _: 'Word.e'
    });

    function Word$(_size$1) {
        var $95 = null;
        return $95;
    };
    const Word = x0 => Word$(x0);

    function Word$i$(_pred$2) {
        var $96 = ({
            _: 'Word.i',
            'pred': _pred$2
        });
        return $96;
    };
    const Word$i = x0 => Word$i$(x0);

    function Word$o$(_pred$2) {
        var $97 = ({
            _: 'Word.o',
            'pred': _pred$2
        });
        return $97;
    };
    const Word$o = x0 => Word$o$(x0);

    function Word$subber$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $99 = (_b$5 => {
                    var $100 = Word$e;
                    return $100;
                });
                var $98 = $99;
                break;
            case 'Word.o':
                var $101 = self.pred;
                var $102 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $104 = (_a$pred$8 => {
                                var $105 = Word$e;
                                return $105;
                            });
                            var $103 = $104;
                            break;
                        case 'Word.o':
                            var $106 = self.pred;
                            var $107 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $109 = Word$i$(Word$subber$(_a$pred$10, $106, Bool$true));
                                    var $108 = $109;
                                } else {
                                    var $110 = Word$o$(Word$subber$(_a$pred$10, $106, Bool$false));
                                    var $108 = $110;
                                };
                                return $108;
                            });
                            var $103 = $107;
                            break;
                        case 'Word.i':
                            var $111 = self.pred;
                            var $112 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $114 = Word$o$(Word$subber$(_a$pred$10, $111, Bool$true));
                                    var $113 = $114;
                                } else {
                                    var $115 = Word$i$(Word$subber$(_a$pred$10, $111, Bool$true));
                                    var $113 = $115;
                                };
                                return $113;
                            });
                            var $103 = $112;
                            break;
                    };
                    var $103 = $103($101);
                    return $103;
                });
                var $98 = $102;
                break;
            case 'Word.i':
                var $116 = self.pred;
                var $117 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $119 = (_a$pred$8 => {
                                var $120 = Word$e;
                                return $120;
                            });
                            var $118 = $119;
                            break;
                        case 'Word.o':
                            var $121 = self.pred;
                            var $122 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $124 = Word$o$(Word$subber$(_a$pred$10, $121, Bool$false));
                                    var $123 = $124;
                                } else {
                                    var $125 = Word$i$(Word$subber$(_a$pred$10, $121, Bool$false));
                                    var $123 = $125;
                                };
                                return $123;
                            });
                            var $118 = $122;
                            break;
                        case 'Word.i':
                            var $126 = self.pred;
                            var $127 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $129 = Word$i$(Word$subber$(_a$pred$10, $126, Bool$true));
                                    var $128 = $129;
                                } else {
                                    var $130 = Word$o$(Word$subber$(_a$pred$10, $126, Bool$false));
                                    var $128 = $130;
                                };
                                return $128;
                            });
                            var $118 = $127;
                            break;
                    };
                    var $118 = $118($116);
                    return $118;
                });
                var $98 = $117;
                break;
        };
        var $98 = $98(_b$3);
        return $98;
    };
    const Word$subber = x0 => x1 => x2 => Word$subber$(x0, x1, x2);

    function Word$sub$(_a$2, _b$3) {
        var $131 = Word$subber$(_a$2, _b$3, Bool$false);
        return $131;
    };
    const Word$sub = x0 => x1 => Word$sub$(x0, x1);
    const U16$sub = a0 => a1 => (Math.max(a0 - a1, 0));

    function Nat$apply$(_n$2, _f$3, _x$4) {
        var Nat$apply$ = (_n$2, _f$3, _x$4) => ({
            ctr: 'TCO',
            arg: [_n$2, _f$3, _x$4]
        });
        var Nat$apply = _n$2 => _f$3 => _x$4 => Nat$apply$(_n$2, _f$3, _x$4);
        var arg = [_n$2, _f$3, _x$4];
        while (true) {
            let [_n$2, _f$3, _x$4] = arg;
            var R = (() => {
                var self = _n$2;
                if (self === 0n) {
                    var $132 = _x$4;
                    return $132;
                } else {
                    var $133 = (self - 1n);
                    var $134 = Nat$apply$($133, _f$3, _f$3(_x$4));
                    return $134;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$apply = x0 => x1 => x2 => Nat$apply$(x0, x1, x2);

    function Word$inc$(_word$2) {
        var self = _word$2;
        switch (self._) {
            case 'Word.e':
                var $136 = Word$e;
                var $135 = $136;
                break;
            case 'Word.o':
                var $137 = self.pred;
                var $138 = Word$i$($137);
                var $135 = $138;
                break;
            case 'Word.i':
                var $139 = self.pred;
                var $140 = Word$o$(Word$inc$($139));
                var $135 = $140;
                break;
        };
        return $135;
    };
    const Word$inc = x0 => Word$inc$(x0);

    function U16$inc$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $142 = u16_to_word(self);
                var $143 = U16$new$(Word$inc$($142));
                var $141 = $143;
                break;
        };
        return $141;
    };
    const U16$inc = x0 => U16$inc$(x0);

    function Word$zero$(_size$1) {
        var self = _size$1;
        if (self === 0n) {
            var $145 = Word$e;
            var $144 = $145;
        } else {
            var $146 = (self - 1n);
            var $147 = Word$o$(Word$zero$($146));
            var $144 = $147;
        };
        return $144;
    };
    const Word$zero = x0 => Word$zero$(x0);
    const U16$zero = U16$new$(Word$zero$(16n));
    const Nat$to_u16 = a0 => (Number(a0));

    function Word$adder$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $149 = (_b$5 => {
                    var $150 = Word$e;
                    return $150;
                });
                var $148 = $149;
                break;
            case 'Word.o':
                var $151 = self.pred;
                var $152 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $154 = (_a$pred$8 => {
                                var $155 = Word$e;
                                return $155;
                            });
                            var $153 = $154;
                            break;
                        case 'Word.o':
                            var $156 = self.pred;
                            var $157 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $159 = Word$i$(Word$adder$(_a$pred$10, $156, Bool$false));
                                    var $158 = $159;
                                } else {
                                    var $160 = Word$o$(Word$adder$(_a$pred$10, $156, Bool$false));
                                    var $158 = $160;
                                };
                                return $158;
                            });
                            var $153 = $157;
                            break;
                        case 'Word.i':
                            var $161 = self.pred;
                            var $162 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $164 = Word$o$(Word$adder$(_a$pred$10, $161, Bool$true));
                                    var $163 = $164;
                                } else {
                                    var $165 = Word$i$(Word$adder$(_a$pred$10, $161, Bool$false));
                                    var $163 = $165;
                                };
                                return $163;
                            });
                            var $153 = $162;
                            break;
                    };
                    var $153 = $153($151);
                    return $153;
                });
                var $148 = $152;
                break;
            case 'Word.i':
                var $166 = self.pred;
                var $167 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $169 = (_a$pred$8 => {
                                var $170 = Word$e;
                                return $170;
                            });
                            var $168 = $169;
                            break;
                        case 'Word.o':
                            var $171 = self.pred;
                            var $172 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $174 = Word$o$(Word$adder$(_a$pred$10, $171, Bool$true));
                                    var $173 = $174;
                                } else {
                                    var $175 = Word$i$(Word$adder$(_a$pred$10, $171, Bool$false));
                                    var $173 = $175;
                                };
                                return $173;
                            });
                            var $168 = $172;
                            break;
                        case 'Word.i':
                            var $176 = self.pred;
                            var $177 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $179 = Word$i$(Word$adder$(_a$pred$10, $176, Bool$true));
                                    var $178 = $179;
                                } else {
                                    var $180 = Word$o$(Word$adder$(_a$pred$10, $176, Bool$true));
                                    var $178 = $180;
                                };
                                return $178;
                            });
                            var $168 = $177;
                            break;
                    };
                    var $168 = $168($166);
                    return $168;
                });
                var $148 = $167;
                break;
        };
        var $148 = $148(_b$3);
        return $148;
    };
    const Word$adder = x0 => x1 => x2 => Word$adder$(x0, x1, x2);

    function Word$add$(_a$2, _b$3) {
        var $181 = Word$adder$(_a$2, _b$3, Bool$false);
        return $181;
    };
    const Word$add = x0 => x1 => Word$add$(x0, x1);
    const U16$add = a0 => a1 => ((a0 + a1) & 0xFFFF);

    function Cmp$as_eql$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $183 = Bool$false;
                var $182 = $183;
                break;
            case 'Cmp.eql':
                var $184 = Bool$true;
                var $182 = $184;
                break;
            case 'Cmp.gtn':
                var $185 = Bool$false;
                var $182 = $185;
                break;
        };
        return $182;
    };
    const Cmp$as_eql = x0 => Cmp$as_eql$(x0);

    function Word$eql$(_a$2, _b$3) {
        var $186 = Cmp$as_eql$(Word$cmp$(_a$2, _b$3));
        return $186;
    };
    const Word$eql = x0 => x1 => Word$eql$(x0, x1);
    const U16$eql = a0 => a1 => (a0 === a1);
    const Bits$o = a0 => (a0 + '0');
    const Bits$i = a0 => (a0 + '1');

    function Word$to_bits$(_a$2) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $188 = Bits$e;
                var $187 = $188;
                break;
            case 'Word.o':
                var $189 = self.pred;
                var $190 = (Word$to_bits$($189) + '0');
                var $187 = $190;
                break;
            case 'Word.i':
                var $191 = self.pred;
                var $192 = (Word$to_bits$($191) + '1');
                var $187 = $192;
                break;
        };
        return $187;
    };
    const Word$to_bits = x0 => Word$to_bits$(x0);

    function Word$trim$(_new_size$2, _word$3) {
        var self = _new_size$2;
        if (self === 0n) {
            var $194 = Word$e;
            var $193 = $194;
        } else {
            var $195 = (self - 1n);
            var self = _word$3;
            switch (self._) {
                case 'Word.e':
                    var $197 = Word$o$(Word$trim$($195, Word$e));
                    var $196 = $197;
                    break;
                case 'Word.o':
                    var $198 = self.pred;
                    var $199 = Word$o$(Word$trim$($195, $198));
                    var $196 = $199;
                    break;
                case 'Word.i':
                    var $200 = self.pred;
                    var $201 = Word$i$(Word$trim$($195, $200));
                    var $196 = $201;
                    break;
            };
            var $193 = $196;
        };
        return $193;
    };
    const Word$trim = x0 => x1 => Word$trim$(x0, x1);
    const Bits$concat = a0 => a1 => (a1 + a0);

    function Bits$reverse$tco$(_a$1, _r$2) {
        var Bits$reverse$tco$ = (_a$1, _r$2) => ({
            ctr: 'TCO',
            arg: [_a$1, _r$2]
        });
        var Bits$reverse$tco = _a$1 => _r$2 => Bits$reverse$tco$(_a$1, _r$2);
        var arg = [_a$1, _r$2];
        while (true) {
            let [_a$1, _r$2] = arg;
            var R = (() => {
                var self = _a$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $202 = _r$2;
                        return $202;
                    case 'o':
                        var $203 = self.slice(0, -1);
                        var $204 = Bits$reverse$tco$($203, (_r$2 + '0'));
                        return $204;
                    case 'i':
                        var $205 = self.slice(0, -1);
                        var $206 = Bits$reverse$tco$($205, (_r$2 + '1'));
                        return $206;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Bits$reverse$tco = x0 => x1 => Bits$reverse$tco$(x0, x1);

    function Bits$reverse$(_a$1) {
        var $207 = Bits$reverse$tco$(_a$1, Bits$e);
        return $207;
    };
    const Bits$reverse = x0 => Bits$reverse$(x0);
    const Fm$Name$to_bits = a0 => (fm_name_to_bits(a0));

    function Fm$get$(_name$2, _map$3) {
        var $208 = Map$get$((fm_name_to_bits(_name$2)), _map$3);
        return $208;
    };
    const Fm$get = x0 => x1 => Fm$get$(x0, x1);

    function String$cons$(_head$1, _tail$2) {
        var $209 = (String.fromCharCode(_head$1) + _tail$2);
        return $209;
    };
    const String$cons = x0 => x1 => String$cons$(x0, x1);

    function Fm$Synth$file_of$(_name$1) {
        var self = _name$1;
        if (self.length === 0) {
            var $211 = ".fm";
            var $210 = $211;
        } else {
            var $212 = self.charCodeAt(0);
            var $213 = self.slice(1);
            var self = ($212 === 46);
            if (self) {
                var $215 = ".fm";
                var $214 = $215;
            } else {
                var $216 = String$cons$($212, Fm$Synth$file_of$($213));
                var $214 = $216;
            };
            var $210 = $214;
        };
        return $210;
    };
    const Fm$Synth$file_of = x0 => Fm$Synth$file_of$(x0);

    function IO$get_file$(_name$1) {
        var $217 = IO$ask$("get_file", _name$1, (_file$2 => {
            var $218 = IO$end$(_file$2);
            return $218;
        }));
        return $217;
    };
    const IO$get_file = x0 => IO$get_file$(x0);

    function Parser$(_V$1) {
        var $219 = null;
        return $219;
    };
    const Parser = x0 => Parser$(x0);

    function Parser$Reply$(_V$1) {
        var $220 = null;
        return $220;
    };
    const Parser$Reply = x0 => Parser$Reply$(x0);

    function Parser$Reply$error$(_idx$2, _code$3, _err$4) {
        var $221 = ({
            _: 'Parser.Reply.error',
            'idx': _idx$2,
            'code': _code$3,
            'err': _err$4
        });
        return $221;
    };
    const Parser$Reply$error = x0 => x1 => x2 => Parser$Reply$error$(x0, x1, x2);

    function Parser$bind$(_parse$3, _next$4, _idx$5, _code$6) {
        var self = _parse$3(_idx$5)(_code$6);
        switch (self._) {
            case 'Parser.Reply.error':
                var $223 = self.idx;
                var $224 = self.code;
                var $225 = self.err;
                var $226 = Parser$Reply$error$($223, $224, $225);
                var $222 = $226;
                break;
            case 'Parser.Reply.value':
                var $227 = self.idx;
                var $228 = self.code;
                var $229 = self.val;
                var $230 = _next$4($229)($227)($228);
                var $222 = $230;
                break;
        };
        return $222;
    };
    const Parser$bind = x0 => x1 => x2 => x3 => Parser$bind$(x0, x1, x2, x3);

    function Parser$Reply$value$(_idx$2, _code$3, _val$4) {
        var $231 = ({
            _: 'Parser.Reply.value',
            'idx': _idx$2,
            'code': _code$3,
            'val': _val$4
        });
        return $231;
    };
    const Parser$Reply$value = x0 => x1 => x2 => Parser$Reply$value$(x0, x1, x2);

    function Parser$pure$(_value$2, _idx$3, _code$4) {
        var $232 = Parser$Reply$value$(_idx$3, _code$4, _value$2);
        return $232;
    };
    const Parser$pure = x0 => x1 => x2 => Parser$pure$(x0, x1, x2);
    const Parser$monad = Monad$new$(Parser$bind, Parser$pure);

    function Parser$is_eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $234 = Parser$Reply$value$(_idx$1, _code$2, Bool$true);
            var $233 = $234;
        } else {
            var $235 = self.charCodeAt(0);
            var $236 = self.slice(1);
            var $237 = Parser$Reply$value$(_idx$1, _code$2, Bool$false);
            var $233 = $237;
        };
        return $233;
    };
    const Parser$is_eof = x0 => x1 => Parser$is_eof$(x0, x1);

    function Monad$pure$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $239 = self.bind;
                var $240 = self.pure;
                var $241 = $240;
                var $238 = $241;
                break;
        };
        return $238;
    };
    const Monad$pure = x0 => Monad$pure$(x0);

    function Maybe$some$(_value$2) {
        var $242 = ({
            _: 'Maybe.some',
            'value': _value$2
        });
        return $242;
    };
    const Maybe$some = x0 => Maybe$some$(x0);

    function Parser$ErrorAt$new$(_idx$1, _code$2, _err$3) {
        var $243 = ({
            _: 'Parser.ErrorAt.new',
            'idx': _idx$1,
            'code': _code$2,
            'err': _err$3
        });
        return $243;
    };
    const Parser$ErrorAt$new = x0 => x1 => x2 => Parser$ErrorAt$new$(x0, x1, x2);
    const Nat$gtn = a0 => a1 => (a0 > a1);

    function Parser$ErrorAt$combine$(_a$1, _b$2) {
        var self = _a$1;
        switch (self._) {
            case 'Maybe.none':
                var $245 = _b$2;
                var $244 = $245;
                break;
            case 'Maybe.some':
                var $246 = self.value;
                var self = _b$2;
                switch (self._) {
                    case 'Maybe.none':
                        var $248 = _a$1;
                        var $247 = $248;
                        break;
                    case 'Maybe.some':
                        var $249 = self.value;
                        var self = $246;
                        switch (self._) {
                            case 'Parser.ErrorAt.new':
                                var $251 = self.idx;
                                var $252 = self.code;
                                var $253 = self.err;
                                var self = $249;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $255 = self.idx;
                                        var $256 = self.code;
                                        var $257 = self.err;
                                        var self = ($251 > $255);
                                        if (self) {
                                            var $259 = _a$1;
                                            var $258 = $259;
                                        } else {
                                            var $260 = _b$2;
                                            var $258 = $260;
                                        };
                                        var $254 = $258;
                                        break;
                                };
                                var $250 = $254;
                                break;
                        };
                        var $247 = $250;
                        break;
                };
                var $244 = $247;
                break;
        };
        return $244;
    };
    const Parser$ErrorAt$combine = x0 => x1 => Parser$ErrorAt$combine$(x0, x1);

    function Parser$first_of$go$(_pars$2, _err$3, _idx$4, _code$5) {
        var Parser$first_of$go$ = (_pars$2, _err$3, _idx$4, _code$5) => ({
            ctr: 'TCO',
            arg: [_pars$2, _err$3, _idx$4, _code$5]
        });
        var Parser$first_of$go = _pars$2 => _err$3 => _idx$4 => _code$5 => Parser$first_of$go$(_pars$2, _err$3, _idx$4, _code$5);
        var arg = [_pars$2, _err$3, _idx$4, _code$5];
        while (true) {
            let [_pars$2, _err$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _pars$2;
                switch (self._) {
                    case 'List.nil':
                        var self = _err$3;
                        switch (self._) {
                            case 'Maybe.none':
                                var $262 = Parser$Reply$error$(_idx$4, _code$5, "No parse.");
                                var $261 = $262;
                                break;
                            case 'Maybe.some':
                                var $263 = self.value;
                                var self = $263;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $265 = self.idx;
                                        var $266 = self.code;
                                        var $267 = self.err;
                                        var $268 = Parser$Reply$error$($265, $266, $267);
                                        var $264 = $268;
                                        break;
                                };
                                var $261 = $264;
                                break;
                        };
                        return $261;
                    case 'List.cons':
                        var $269 = self.head;
                        var $270 = self.tail;
                        var _parsed$8 = $269(_idx$4)(_code$5);
                        var self = _parsed$8;
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $272 = self.idx;
                                var $273 = self.code;
                                var $274 = self.err;
                                var _neo$12 = Maybe$some$(Parser$ErrorAt$new$($272, $273, $274));
                                var _err$13 = Parser$ErrorAt$combine$(_neo$12, _err$3);
                                var $275 = Parser$first_of$go$($270, _err$13, _idx$4, _code$5);
                                var $271 = $275;
                                break;
                            case 'Parser.Reply.value':
                                var $276 = self.idx;
                                var $277 = self.code;
                                var $278 = self.val;
                                var $279 = Parser$Reply$value$($276, $277, $278);
                                var $271 = $279;
                                break;
                        };
                        return $271;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$first_of$go = x0 => x1 => x2 => x3 => Parser$first_of$go$(x0, x1, x2, x3);

    function Parser$first_of$(_pars$2) {
        var $280 = Parser$first_of$go(_pars$2)(Maybe$none);
        return $280;
    };
    const Parser$first_of = x0 => Parser$first_of$(x0);

    function List$cons$(_head$2, _tail$3) {
        var $281 = ({
            _: 'List.cons',
            'head': _head$2,
            'tail': _tail$3
        });
        return $281;
    };
    const List$cons = x0 => x1 => List$cons$(x0, x1);

    function List$(_A$1) {
        var $282 = null;
        return $282;
    };
    const List = x0 => List$(x0);
    const List$nil = ({
        _: 'List.nil'
    });

    function Parser$many$go$(_parse$2, _values$3, _idx$4, _code$5) {
        var Parser$many$go$ = (_parse$2, _values$3, _idx$4, _code$5) => ({
            ctr: 'TCO',
            arg: [_parse$2, _values$3, _idx$4, _code$5]
        });
        var Parser$many$go = _parse$2 => _values$3 => _idx$4 => _code$5 => Parser$many$go$(_parse$2, _values$3, _idx$4, _code$5);
        var arg = [_parse$2, _values$3, _idx$4, _code$5];
        while (true) {
            let [_parse$2, _values$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _parse$2(_idx$4)(_code$5);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $283 = self.idx;
                        var $284 = self.code;
                        var $285 = self.err;
                        var $286 = Parser$Reply$value$(_idx$4, _code$5, _values$3(List$nil));
                        return $286;
                    case 'Parser.Reply.value':
                        var $287 = self.idx;
                        var $288 = self.code;
                        var $289 = self.val;
                        var $290 = Parser$many$go$(_parse$2, (_xs$9 => {
                            var $291 = _values$3(List$cons$($289, _xs$9));
                            return $291;
                        }), $287, $288);
                        return $290;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$many$go = x0 => x1 => x2 => x3 => Parser$many$go$(x0, x1, x2, x3);

    function Parser$many$(_parser$2) {
        var $292 = Parser$many$go(_parser$2)((_x$3 => {
            var $293 = _x$3;
            return $293;
        }));
        return $292;
    };
    const Parser$many = x0 => Parser$many$(x0);
    const Unit$new = 1;
    const String$concat = a0 => a1 => (a0 + a1);

    function String$flatten$go$(_xs$1, _res$2) {
        var String$flatten$go$ = (_xs$1, _res$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var String$flatten$go = _xs$1 => _res$2 => String$flatten$go$(_xs$1, _res$2);
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                switch (self._) {
                    case 'List.nil':
                        var $294 = _res$2;
                        return $294;
                    case 'List.cons':
                        var $295 = self.head;
                        var $296 = self.tail;
                        var $297 = String$flatten$go$($296, (_res$2 + $295));
                        return $297;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$flatten$go = x0 => x1 => String$flatten$go$(x0, x1);

    function String$flatten$(_xs$1) {
        var $298 = String$flatten$go$(_xs$1, "");
        return $298;
    };
    const String$flatten = x0 => String$flatten$(x0);
    const String$nil = '';

    function Parser$text$go$(_text$1, _idx$2, _code$3) {
        var self = _text$1;
        if (self.length === 0) {
            var $300 = Parser$Reply$value$(_idx$2, _code$3, Unit$new);
            var $299 = $300;
        } else {
            var $301 = self.charCodeAt(0);
            var $302 = self.slice(1);
            var self = _code$3;
            if (self.length === 0) {
                var _error$6 = String$flatten$(List$cons$("Expected \'", List$cons$(_text$1, List$cons$("\', found end of file.", List$nil))));
                var $304 = Parser$Reply$error$(_idx$2, _code$3, _error$6);
                var $303 = $304;
            } else {
                var $305 = self.charCodeAt(0);
                var $306 = self.slice(1);
                var self = ($301 === $305);
                if (self) {
                    var $308 = Parser$text$($302, Nat$succ$(_idx$2), $306);
                    var $307 = $308;
                } else {
                    var _error$8 = String$flatten$(List$cons$("Expected \'", List$cons$(_text$1, List$cons$("\', found \'", List$cons$(String$cons$($305, String$nil), List$cons$("\'.", List$nil))))));
                    var $309 = Parser$Reply$error$(_idx$2, _code$3, _error$8);
                    var $307 = $309;
                };
                var $303 = $307;
            };
            var $299 = $303;
        };
        return $299;
    };
    const Parser$text$go = x0 => x1 => x2 => Parser$text$go$(x0, x1, x2);

    function Parser$text$(_text$1, _idx$2, _code$3) {
        var self = Parser$text$go$(_text$1, _idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $311 = self.idx;
                var $312 = self.code;
                var $313 = self.err;
                var $314 = Parser$Reply$error$(_idx$2, _code$3, $313);
                var $310 = $314;
                break;
            case 'Parser.Reply.value':
                var $315 = self.idx;
                var $316 = self.code;
                var $317 = self.val;
                var $318 = Parser$Reply$value$($315, $316, $317);
                var $310 = $318;
                break;
        };
        return $310;
    };
    const Parser$text = x0 => x1 => x2 => Parser$text$(x0, x1, x2);

    function Parser$until$go$(_until$2, _parse$3, _values$4, _idx$5, _code$6) {
        var Parser$until$go$ = (_until$2, _parse$3, _values$4, _idx$5, _code$6) => ({
            ctr: 'TCO',
            arg: [_until$2, _parse$3, _values$4, _idx$5, _code$6]
        });
        var Parser$until$go = _until$2 => _parse$3 => _values$4 => _idx$5 => _code$6 => Parser$until$go$(_until$2, _parse$3, _values$4, _idx$5, _code$6);
        var arg = [_until$2, _parse$3, _values$4, _idx$5, _code$6];
        while (true) {
            let [_until$2, _parse$3, _values$4, _idx$5, _code$6] = arg;
            var R = (() => {
                var _until_reply$7 = _until$2(_idx$5)(_code$6);
                var self = _until_reply$7;
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $320 = self.idx;
                        var $321 = self.code;
                        var $322 = self.err;
                        var _reply$11 = _parse$3(_idx$5)(_code$6);
                        var self = _reply$11;
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $324 = self.idx;
                                var $325 = self.code;
                                var $326 = self.err;
                                var $327 = Parser$Reply$error$($324, $325, $326);
                                var $323 = $327;
                                break;
                            case 'Parser.Reply.value':
                                var $328 = self.idx;
                                var $329 = self.code;
                                var $330 = self.val;
                                var $331 = Parser$until$go$(_until$2, _parse$3, (_xs$15 => {
                                    var $332 = _values$4(List$cons$($330, _xs$15));
                                    return $332;
                                }), $328, $329);
                                var $323 = $331;
                                break;
                        };
                        var $319 = $323;
                        break;
                    case 'Parser.Reply.value':
                        var $333 = self.idx;
                        var $334 = self.code;
                        var $335 = self.val;
                        var $336 = Parser$Reply$value$($333, $334, _values$4(List$nil));
                        var $319 = $336;
                        break;
                };
                return $319;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$until$go = x0 => x1 => x2 => x3 => x4 => Parser$until$go$(x0, x1, x2, x3, x4);

    function Parser$until$(_until$2, _parse$3) {
        var $337 = Parser$until$go(_until$2)(_parse$3)((_x$4 => {
            var $338 = _x$4;
            return $338;
        }));
        return $337;
    };
    const Parser$until = x0 => x1 => Parser$until$(x0, x1);

    function Parser$one$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $340 = Parser$Reply$error$(_idx$1, _code$2, "Unexpected end of file.");
            var $339 = $340;
        } else {
            var $341 = self.charCodeAt(0);
            var $342 = self.slice(1);
            var $343 = Parser$Reply$value$(Nat$succ$(_idx$1), $342, $341);
            var $339 = $343;
        };
        return $339;
    };
    const Parser$one = x0 => x1 => Parser$one$(x0, x1);
    const Fm$Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$cons$(Monad$bind$(Parser$monad)(Parser$text("//"))((_$1 => {
        var $344 = Monad$bind$(Parser$monad)(Parser$until$(Parser$text("\u{a}"), Parser$one))((_$2 => {
            var $345 = Monad$pure$(Parser$monad)(Unit$new);
            return $345;
        }));
        return $344;
    })), List$nil)))));

    function Fm$Parser$text$(_text$1) {
        var $346 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $347 = Parser$text(_text$1);
            return $347;
        }));
        return $346;
    };
    const Fm$Parser$text = x0 => Fm$Parser$text$(x0);

    function Parser$many1$(_parser$2) {
        var $348 = Monad$bind$(Parser$monad)(_parser$2)((_head$3 => {
            var $349 = Monad$bind$(Parser$monad)(Parser$many$(_parser$2))((_tail$4 => {
                var $350 = Monad$pure$(Parser$monad)(List$cons$(_head$3, _tail$4));
                return $350;
            }));
            return $349;
        }));
        return $348;
    };
    const Parser$many1 = x0 => Parser$many1$(x0);

    function Fm$Name$is_letter$(_chr$1) {
        var self = U16$btw$(65, _chr$1, 90);
        if (self) {
            var $352 = Bool$true;
            var $351 = $352;
        } else {
            var self = U16$btw$(97, _chr$1, 122);
            if (self) {
                var $354 = Bool$true;
                var $353 = $354;
            } else {
                var self = U16$btw$(48, _chr$1, 57);
                if (self) {
                    var $356 = Bool$true;
                    var $355 = $356;
                } else {
                    var self = (46 === _chr$1);
                    if (self) {
                        var $358 = Bool$true;
                        var $357 = $358;
                    } else {
                        var self = (95 === _chr$1);
                        if (self) {
                            var $360 = Bool$true;
                            var $359 = $360;
                        } else {
                            var $361 = Bool$false;
                            var $359 = $361;
                        };
                        var $357 = $359;
                    };
                    var $355 = $357;
                };
                var $353 = $355;
            };
            var $351 = $353;
        };
        return $351;
    };
    const Fm$Name$is_letter = x0 => Fm$Name$is_letter$(x0);

    function Fm$Parser$letter$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $363 = Parser$Reply$error$(_idx$1, _code$2, "Unexpected eof.");
            var $362 = $363;
        } else {
            var $364 = self.charCodeAt(0);
            var $365 = self.slice(1);
            var self = Fm$Name$is_letter$($364);
            if (self) {
                var $367 = Parser$Reply$value$(Nat$succ$(_idx$1), $365, $364);
                var $366 = $367;
            } else {
                var $368 = Parser$Reply$error$(_idx$1, _code$2, "Expected letter.");
                var $366 = $368;
            };
            var $362 = $366;
        };
        return $362;
    };
    const Fm$Parser$letter = x0 => x1 => Fm$Parser$letter$(x0, x1);

    function List$fold$(_list$2, _nil$4, _cons$5) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $370 = _nil$4;
                var $369 = $370;
                break;
            case 'List.cons':
                var $371 = self.head;
                var $372 = self.tail;
                var $373 = _cons$5($371)(List$fold$($372, _nil$4, _cons$5));
                var $369 = $373;
                break;
        };
        return $369;
    };
    const List$fold = x0 => x1 => x2 => List$fold$(x0, x1, x2);
    const Fm$Parser$name1 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $374 = Monad$bind$(Parser$monad)(Parser$many1$(Fm$Parser$letter))((_chrs$2 => {
            var $375 = Monad$pure$(Parser$monad)(List$fold$(_chrs$2, String$nil, String$cons));
            return $375;
        }));
        return $374;
    }));

    function Pair$(_A$1, _B$2) {
        var $376 = null;
        return $376;
    };
    const Pair = x0 => x1 => Pair$(x0, x1);

    function Parser$until1$(_cond$2, _parser$3) {
        var $377 = Monad$bind$(Parser$monad)(_parser$3)((_head$4 => {
            var $378 = Monad$bind$(Parser$monad)(Parser$until$(_cond$2, _parser$3))((_tail$5 => {
                var $379 = Monad$pure$(Parser$monad)(List$cons$(_head$4, _tail$5));
                return $379;
            }));
            return $378;
        }));
        return $377;
    };
    const Parser$until1 = x0 => x1 => Parser$until1$(x0, x1);

    function Parser$maybe$(_parse$2, _idx$3, _code$4) {
        var self = _parse$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $381 = self.idx;
                var $382 = self.code;
                var $383 = self.err;
                var $384 = Parser$Reply$value$(_idx$3, _code$4, Maybe$none);
                var $380 = $384;
                break;
            case 'Parser.Reply.value':
                var $385 = self.idx;
                var $386 = self.code;
                var $387 = self.val;
                var $388 = Parser$Reply$value$($385, $386, Maybe$some$($387));
                var $380 = $388;
                break;
        };
        return $380;
    };
    const Parser$maybe = x0 => x1 => x2 => Parser$maybe$(x0, x1, x2);

    function Fm$Parser$item$(_parser$2) {
        var $389 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
            var $390 = Monad$bind$(Parser$monad)(_parser$2)((_value$4 => {
                var $391 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$5 => {
                    var $392 = Monad$pure$(Parser$monad)(_value$4);
                    return $392;
                }));
                return $391;
            }));
            return $390;
        }));
        return $389;
    };
    const Fm$Parser$item = x0 => Fm$Parser$item$(x0);
    const Fm$Parser$name = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $393 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$letter))((_chrs$2 => {
            var $394 = Monad$pure$(Parser$monad)(List$fold$(_chrs$2, String$nil, String$cons));
            return $394;
        }));
        return $393;
    }));

    function Parser$get_code$(_idx$1, _code$2) {
        var $395 = Parser$Reply$value$(_idx$1, _code$2, _code$2);
        return $395;
    };
    const Parser$get_code = x0 => x1 => Parser$get_code$(x0, x1);

    function Parser$get_index$(_idx$1, _code$2) {
        var $396 = Parser$Reply$value$(_idx$1, _code$2, _idx$1);
        return $396;
    };
    const Parser$get_index = x0 => x1 => Parser$get_index$(x0, x1);
    const Fm$Parser$init = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $397 = Monad$bind$(Parser$monad)(Parser$get_index)((_from$2 => {
            var $398 = Monad$pure$(Parser$monad)(_from$2);
            return $398;
        }));
        return $397;
    }));

    function Fm$Origin$new$(_file$1, _from$2, _upto$3) {
        var $399 = ({
            _: 'Fm.Origin.new',
            'file': _file$1,
            'from': _from$2,
            'upto': _upto$3
        });
        return $399;
    };
    const Fm$Origin$new = x0 => x1 => x2 => Fm$Origin$new$(x0, x1, x2);

    function Fm$Parser$stop$(_from$1) {
        var $400 = Monad$bind$(Parser$monad)(Parser$get_index)((_upto$2 => {
            var _orig$3 = Fm$Origin$new$("", _from$1, _upto$2);
            var $401 = Monad$pure$(Parser$monad)(_orig$3);
            return $401;
        }));
        return $400;
    };
    const Fm$Parser$stop = x0 => Fm$Parser$stop$(x0);

    function Fm$Term$ori$(_orig$1, _expr$2) {
        var $402 = ({
            _: 'Fm.Term.ori',
            'orig': _orig$1,
            'expr': _expr$2
        });
        return $402;
    };
    const Fm$Term$ori = x0 => x1 => Fm$Term$ori$(x0, x1);
    const Fm$Term$typ = ({
        _: 'Fm.Term.typ'
    });
    const Fm$Parser$type = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $403 = Monad$bind$(Parser$monad)(Fm$Parser$text$("Type"))((_$2 => {
            var $404 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $405 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$typ));
                return $405;
            }));
            return $404;
        }));
        return $403;
    }));

    function Fm$Term$all$(_eras$1, _self$2, _name$3, _xtyp$4, _body$5) {
        var $406 = ({
            _: 'Fm.Term.all',
            'eras': _eras$1,
            'self': _self$2,
            'name': _name$3,
            'xtyp': _xtyp$4,
            'body': _body$5
        });
        return $406;
    };
    const Fm$Term$all = x0 => x1 => x2 => x3 => x4 => Fm$Term$all$(x0, x1, x2, x3, x4);
    const Fm$Parser$forall = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $407 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_self$2 => {
            var $408 = Monad$bind$(Parser$monad)(Fm$Parser$binder)((_bind$3 => {
                var $409 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$("->")))((_$4 => {
                    var $410 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$5 => {
                        var _term$6 = List$fold$(_bind$3, _body$5, (_x$6 => _t$7 => {
                            var self = _x$6;
                            switch (self._) {
                                case 'Fm.Binder.new':
                                    var $413 = self.eras;
                                    var $414 = self.name;
                                    var $415 = self.term;
                                    var $416 = Fm$Term$all$($413, "", $414, $415, (_s$11 => _x$12 => {
                                        var $417 = _t$7;
                                        return $417;
                                    }));
                                    var $412 = $416;
                                    break;
                            };
                            return $412;
                        }));
                        var $411 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                            var $418 = Monad$pure$(Parser$monad)((() => {
                                var self = _term$6;
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $419 = self.name;
                                        var $420 = self.indx;
                                        var $421 = _term$6;
                                        return $421;
                                    case 'Fm.Term.ref':
                                        var $422 = self.name;
                                        var $423 = _term$6;
                                        return $423;
                                    case 'Fm.Term.typ':
                                        var $424 = _term$6;
                                        return $424;
                                    case 'Fm.Term.all':
                                        var $425 = self.eras;
                                        var $426 = self.self;
                                        var $427 = self.name;
                                        var $428 = self.xtyp;
                                        var $429 = self.body;
                                        var $430 = Fm$Term$ori$(_orig$7, Fm$Term$all$($425, _self$2, $427, $428, $429));
                                        return $430;
                                    case 'Fm.Term.lam':
                                        var $431 = self.name;
                                        var $432 = self.body;
                                        var $433 = _term$6;
                                        return $433;
                                    case 'Fm.Term.app':
                                        var $434 = self.func;
                                        var $435 = self.argm;
                                        var $436 = _term$6;
                                        return $436;
                                    case 'Fm.Term.let':
                                        var $437 = self.name;
                                        var $438 = self.expr;
                                        var $439 = self.body;
                                        var $440 = _term$6;
                                        return $440;
                                    case 'Fm.Term.def':
                                        var $441 = self.name;
                                        var $442 = self.expr;
                                        var $443 = self.body;
                                        var $444 = _term$6;
                                        return $444;
                                    case 'Fm.Term.ann':
                                        var $445 = self.done;
                                        var $446 = self.term;
                                        var $447 = self.type;
                                        var $448 = _term$6;
                                        return $448;
                                    case 'Fm.Term.gol':
                                        var $449 = self.name;
                                        var $450 = self.dref;
                                        var $451 = self.verb;
                                        var $452 = _term$6;
                                        return $452;
                                    case 'Fm.Term.hol':
                                        var $453 = self.path;
                                        var $454 = _term$6;
                                        return $454;
                                    case 'Fm.Term.nat':
                                        var $455 = self.natx;
                                        var $456 = _term$6;
                                        return $456;
                                    case 'Fm.Term.chr':
                                        var $457 = self.chrx;
                                        var $458 = _term$6;
                                        return $458;
                                    case 'Fm.Term.str':
                                        var $459 = self.strx;
                                        var $460 = _term$6;
                                        return $460;
                                    case 'Fm.Term.cse':
                                        var $461 = self.path;
                                        var $462 = self.expr;
                                        var $463 = self.name;
                                        var $464 = self.with;
                                        var $465 = self.cses;
                                        var $466 = self.moti;
                                        var $467 = _term$6;
                                        return $467;
                                    case 'Fm.Term.ori':
                                        var $468 = self.orig;
                                        var $469 = self.expr;
                                        var $470 = _term$6;
                                        return $470;
                                };
                            })());
                            return $418;
                        }));
                        return $411;
                    }));
                    return $410;
                }));
                return $409;
            }));
            return $408;
        }));
        return $407;
    }));

    function Fm$Term$lam$(_name$1, _body$2) {
        var $471 = ({
            _: 'Fm.Term.lam',
            'name': _name$1,
            'body': _body$2
        });
        return $471;
    };
    const Fm$Term$lam = x0 => x1 => Fm$Term$lam$(x0, x1);

    function Fm$Parser$make_lambda$(_names$1, _body$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $473 = _body$2;
                var $472 = $473;
                break;
            case 'List.cons':
                var $474 = self.head;
                var $475 = self.tail;
                var $476 = Fm$Term$lam$($474, (_x$5 => {
                    var $477 = Fm$Parser$make_lambda$($475, _body$2);
                    return $477;
                }));
                var $472 = $476;
                break;
        };
        return $472;
    };
    const Fm$Parser$make_lambda = x0 => x1 => Fm$Parser$make_lambda$(x0, x1);
    const Fm$Parser$lambda = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $478 = Monad$bind$(Parser$monad)(Fm$Parser$text$("("))((_$2 => {
            var $479 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$name1)))((_name$3 => {
                var $480 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                    var $481 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _expr$6 = Fm$Parser$make_lambda$(_name$3, _body$4);
                        var $482 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                        return $482;
                    }));
                    return $481;
                }));
                return $480;
            }));
            return $479;
        }));
        return $478;
    }));
    const Fm$Parser$lambda$erased = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $483 = Monad$bind$(Parser$monad)(Fm$Parser$text$("<"))((_$2 => {
            var $484 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(">"), Fm$Parser$item$(Fm$Parser$name1)))((_name$3 => {
                var $485 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                    var $486 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _expr$6 = Fm$Parser$make_lambda$(_name$3, _body$4);
                        var $487 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                        return $487;
                    }));
                    return $486;
                }));
                return $485;
            }));
            return $484;
        }));
        return $483;
    }));
    const Fm$Parser$lambda$nameless = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $488 = Monad$bind$(Parser$monad)(Fm$Parser$text$("()"))((_$2 => {
            var $489 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$3 => {
                var $490 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var _expr$5 = Fm$Term$lam$("", (_x$5 => {
                        var $492 = _body$3;
                        return $492;
                    }));
                    var $491 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, _expr$5));
                    return $491;
                }));
                return $490;
            }));
            return $489;
        }));
        return $488;
    }));
    const Fm$Parser$parenthesis = Monad$bind$(Parser$monad)(Fm$Parser$text$("("))((_$1 => {
        var $493 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$2 => {
            var $494 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$3 => {
                var $495 = Monad$pure$(Parser$monad)(_term$2);
                return $495;
            }));
            return $494;
        }));
        return $493;
    }));

    function Fm$Term$ref$(_name$1) {
        var $496 = ({
            _: 'Fm.Term.ref',
            'name': _name$1
        });
        return $496;
    };
    const Fm$Term$ref = x0 => Fm$Term$ref$(x0);

    function Fm$Term$app$(_func$1, _argm$2) {
        var $497 = ({
            _: 'Fm.Term.app',
            'func': _func$1,
            'argm': _argm$2
        });
        return $497;
    };
    const Fm$Term$app = x0 => x1 => Fm$Term$app$(x0, x1);

    function Fm$Term$hol$(_path$1) {
        var $498 = ({
            _: 'Fm.Term.hol',
            'path': _path$1
        });
        return $498;
    };
    const Fm$Term$hol = x0 => Fm$Term$hol$(x0);

    function Fm$Term$let$(_name$1, _expr$2, _body$3) {
        var $499 = ({
            _: 'Fm.Term.let',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $499;
    };
    const Fm$Term$let = x0 => x1 => x2 => Fm$Term$let$(x0, x1, x2);
    const Fm$Parser$letforrange$u32 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $500 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $501 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$3 => {
                var $502 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $503 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$5 => {
                        var $504 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$6 => {
                            var $505 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$7 => {
                                var $506 = Monad$bind$(Parser$monad)(Fm$Parser$text$("U32"))((_$8 => {
                                    var $507 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$9 => {
                                        var $508 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_idx0$10 => {
                                            var $509 = Monad$bind$(Parser$monad)(Fm$Parser$text$(".."))((_$11 => {
                                                var $510 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_idx1$12 => {
                                                    var $511 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$13 => {
                                                        var $512 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$14 => {
                                                            var $513 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$15 => {
                                                                var $514 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$16 => {
                                                                    var $515 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$17 => {
                                                                        var _term$18 = Fm$Term$ref$("U32.for");
                                                                        var _term$19 = Fm$Term$app$(_term$18, Fm$Term$hol$(Bits$e));
                                                                        var _term$20 = Fm$Term$app$(_term$19, Fm$Term$ref$(_name$3));
                                                                        var _term$21 = Fm$Term$app$(_term$20, _idx0$10);
                                                                        var _term$22 = Fm$Term$app$(_term$21, _idx1$12);
                                                                        var _lamb$23 = Fm$Term$lam$(_elem$6, (_e$23 => {
                                                                            var $517 = Fm$Term$lam$(_name$3, (_s$24 => {
                                                                                var $518 = _loop$14;
                                                                                return $518;
                                                                            }));
                                                                            return $517;
                                                                        }));
                                                                        var _term$24 = Fm$Term$app$(_term$22, _lamb$23);
                                                                        var _term$25 = Fm$Term$let$(_name$3, _term$24, (_x$25 => {
                                                                            var $519 = _body$16;
                                                                            return $519;
                                                                        }));
                                                                        var $516 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$17, _term$25));
                                                                        return $516;
                                                                    }));
                                                                    return $515;
                                                                }));
                                                                return $514;
                                                            }));
                                                            return $513;
                                                        }));
                                                        return $512;
                                                    }));
                                                    return $511;
                                                }));
                                                return $510;
                                            }));
                                            return $509;
                                        }));
                                        return $508;
                                    }));
                                    return $507;
                                }));
                                return $506;
                            }));
                            return $505;
                        }));
                        return $504;
                    }));
                    return $503;
                }));
                return $502;
            }));
            return $501;
        }));
        return $500;
    }));
    const Fm$Parser$letforin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $520 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $521 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$3 => {
                var $522 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $523 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$5 => {
                        var $524 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$6 => {
                            var $525 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$7 => {
                                var $526 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$8 => {
                                    var $527 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$9 => {
                                        var $528 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$10 => {
                                            var $529 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$11 => {
                                                var $530 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$12 => {
                                                    var $531 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$13 => {
                                                        var _term$14 = Fm$Term$ref$("List.for");
                                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$hol$(Bits$e));
                                                        var _term$16 = Fm$Term$app$(_term$15, _list$8);
                                                        var _term$17 = Fm$Term$app$(_term$16, Fm$Term$hol$(Bits$e));
                                                        var _term$18 = Fm$Term$app$(_term$17, Fm$Term$ref$(_name$3));
                                                        var _lamb$19 = Fm$Term$lam$(_elem$6, (_i$19 => {
                                                            var $533 = Fm$Term$lam$(_name$3, (_x$20 => {
                                                                var $534 = _loop$10;
                                                                return $534;
                                                            }));
                                                            return $533;
                                                        }));
                                                        var _term$20 = Fm$Term$app$(_term$18, _lamb$19);
                                                        var _term$21 = Fm$Term$let$(_name$3, _term$20, (_x$21 => {
                                                            var $535 = _body$12;
                                                            return $535;
                                                        }));
                                                        var $532 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$13, _term$21));
                                                        return $532;
                                                    }));
                                                    return $531;
                                                }));
                                                return $530;
                                            }));
                                            return $529;
                                        }));
                                        return $528;
                                    }));
                                    return $527;
                                }));
                                return $526;
                            }));
                            return $525;
                        }));
                        return $524;
                    }));
                    return $523;
                }));
                return $522;
            }));
            return $521;
        }));
        return $520;
    }));
    const Fm$Parser$let = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $536 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $537 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $538 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $539 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $540 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $541 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $542 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $543 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$let$(_name$3, _expr$5, (_x$9 => {
                                        var $544 = _body$7;
                                        return $544;
                                    }))));
                                    return $543;
                                }));
                                return $542;
                            }));
                            return $541;
                        }));
                        return $540;
                    }));
                    return $539;
                }));
                return $538;
            }));
            return $537;
        }));
        return $536;
    }));
    const Fm$Parser$get = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $545 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $546 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$3 => {
                var $547 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_nam0$4 => {
                    var $548 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$5 => {
                        var $549 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_nam1$6 => {
                            var $550 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$7 => {
                                var $551 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$8 => {
                                    var $552 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$9 => {
                                        var $553 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$10 => {
                                            var $554 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$11 => {
                                                var $555 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                                    var _term$13 = _expr$9;
                                                    var _term$14 = Fm$Term$app$(_term$13, Fm$Term$lam$("x", (_x$14 => {
                                                        var $557 = Fm$Term$hol$(Bits$e);
                                                        return $557;
                                                    })));
                                                    var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_nam0$4, (_x$15 => {
                                                        var $558 = Fm$Term$lam$(_nam1$6, (_y$16 => {
                                                            var $559 = _body$11;
                                                            return $559;
                                                        }));
                                                        return $558;
                                                    })));
                                                    var $556 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, _term$15));
                                                    return $556;
                                                }));
                                                return $555;
                                            }));
                                            return $554;
                                        }));
                                        return $553;
                                    }));
                                    return $552;
                                }));
                                return $551;
                            }));
                            return $550;
                        }));
                        return $549;
                    }));
                    return $548;
                }));
                return $547;
            }));
            return $546;
        }));
        return $545;
    }));

    function Fm$Term$def$(_name$1, _expr$2, _body$3) {
        var $560 = ({
            _: 'Fm.Term.def',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $560;
    };
    const Fm$Term$def = x0 => x1 => x2 => Fm$Term$def$(x0, x1, x2);
    const Fm$Parser$def = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $561 = Monad$bind$(Parser$monad)(Fm$Parser$text$("def "))((_$2 => {
            var $562 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $563 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $564 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $565 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $566 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $567 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $568 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$def$(_name$3, _expr$5, (_x$9 => {
                                        var $569 = _body$7;
                                        return $569;
                                    }))));
                                    return $568;
                                }));
                                return $567;
                            }));
                            return $566;
                        }));
                        return $565;
                    }));
                    return $564;
                }));
                return $563;
            }));
            return $562;
        }));
        return $561;
    }));
    const Fm$Parser$if = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $570 = Monad$bind$(Parser$monad)(Fm$Parser$text$("if "))((_$2 => {
            var $571 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_cond$3 => {
                var $572 = Monad$bind$(Parser$monad)(Fm$Parser$text$("then"))((_$4 => {
                    var $573 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_tcse$5 => {
                        var $574 = Monad$bind$(Parser$monad)(Fm$Parser$text$("else"))((_$6 => {
                            var $575 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_fcse$7 => {
                                var $576 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var _term$9 = _cond$3;
                                    var _term$10 = Fm$Term$app$(_term$9, Fm$Term$lam$("", (_x$10 => {
                                        var $578 = Fm$Term$hol$(Bits$e);
                                        return $578;
                                    })));
                                    var _term$11 = Fm$Term$app$(_term$10, _tcse$5);
                                    var _term$12 = Fm$Term$app$(_term$11, _fcse$7);
                                    var $577 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, _term$12));
                                    return $577;
                                }));
                                return $576;
                            }));
                            return $575;
                        }));
                        return $574;
                    }));
                    return $573;
                }));
                return $572;
            }));
            return $571;
        }));
        return $570;
    }));

    function List$mapped$(_as$2, _f$4) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $580 = List$nil;
                var $579 = $580;
                break;
            case 'List.cons':
                var $581 = self.head;
                var $582 = self.tail;
                var $583 = List$cons$(_f$4($581), List$mapped$($582, _f$4));
                var $579 = $583;
                break;
        };
        return $579;
    };
    const List$mapped = x0 => x1 => List$mapped$(x0, x1);

    function Pair$new$(_fst$3, _snd$4) {
        var $584 = ({
            _: 'Pair.new',
            'fst': _fst$3,
            'snd': _snd$4
        });
        return $584;
    };
    const Pair$new = x0 => x1 => Pair$new$(x0, x1);
    const Fm$backslash = 92;
    const Fm$escapes = List$cons$(Pair$new$("\\b", 8), List$cons$(Pair$new$("\\f", 12), List$cons$(Pair$new$("\\n", 10), List$cons$(Pair$new$("\\r", 13), List$cons$(Pair$new$("\\t", 9), List$cons$(Pair$new$("\\v", 11), List$cons$(Pair$new$(String$cons$(Fm$backslash, String$cons$(Fm$backslash, String$nil)), Fm$backslash), List$cons$(Pair$new$("\\\"", 34), List$cons$(Pair$new$("\\0", 0), List$cons$(Pair$new$("\\\'", 39), List$nil))))))))));
    const Fm$Parser$char$single = Parser$first_of$(List$cons$(Parser$first_of$(List$mapped$(Fm$escapes, (_esc$1 => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $586 = self.fst;
                var $587 = self.snd;
                var $588 = Monad$bind$(Parser$monad)(Parser$text($586))((_$4 => {
                    var $589 = Monad$pure$(Parser$monad)($587);
                    return $589;
                }));
                var $585 = $588;
                break;
        };
        return $585;
    }))), List$cons$(Parser$one, List$nil)));

    function Fm$Term$chr$(_chrx$1) {
        var $590 = ({
            _: 'Fm.Term.chr',
            'chrx': _chrx$1
        });
        return $590;
    };
    const Fm$Term$chr = x0 => Fm$Term$chr$(x0);
    const Fm$Parser$char = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $591 = Monad$bind$(Parser$monad)(Fm$Parser$text$("\'"))((_$2 => {
            var $592 = Monad$bind$(Parser$monad)(Fm$Parser$char$single)((_chrx$3 => {
                var $593 = Monad$bind$(Parser$monad)(Parser$text("\'"))((_$4 => {
                    var $594 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var $595 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$chr$(_chrx$3)));
                        return $595;
                    }));
                    return $594;
                }));
                return $593;
            }));
            return $592;
        }));
        return $591;
    }));

    function Fm$Term$str$(_strx$1) {
        var $596 = ({
            _: 'Fm.Term.str',
            'strx': _strx$1
        });
        return $596;
    };
    const Fm$Term$str = x0 => Fm$Term$str$(x0);
    const Fm$Parser$string = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var _quot$2 = String$cons$(34, String$nil);
        var $597 = Monad$bind$(Parser$monad)(Fm$Parser$text$(_quot$2))((_$3 => {
            var $598 = Monad$bind$(Parser$monad)(Parser$until$(Parser$text(_quot$2), Fm$Parser$char$single))((_chrs$4 => {
                var _strx$5 = List$fold$(_chrs$4, String$nil, String$cons);
                var $599 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                    var $600 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$str$(_strx$5)));
                    return $600;
                }));
                return $599;
            }));
            return $598;
        }));
        return $597;
    }));
    const Fm$Parser$pair = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $601 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$2 => {
            var $602 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val0$3 => {
                var $603 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$4 => {
                    var $604 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$5 => {
                        var $605 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$6 => {
                            var $606 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                                var _term$8 = Fm$Term$ref$("Pair.new");
                                var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                                var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                                var _term$11 = Fm$Term$app$(_term$10, _val0$3);
                                var _term$12 = Fm$Term$app$(_term$11, _val1$5);
                                var $607 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$12));
                                return $607;
                            }));
                            return $606;
                        }));
                        return $605;
                    }));
                    return $604;
                }));
                return $603;
            }));
            return $602;
        }));
        return $601;
    }));
    const Fm$Parser$sigma$type = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $608 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$2 => {
            var $609 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$3 => {
                var $610 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$4 => {
                    var $611 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_typ0$5 => {
                        var $612 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$6 => {
                            var $613 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_typ1$7 => {
                                var $614 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var _term$9 = Fm$Term$ref$("Sigma");
                                    var _term$10 = Fm$Term$app$(_term$9, _typ0$5);
                                    var _term$11 = Fm$Term$app$(_term$10, Fm$Term$lam$("x", (_x$11 => {
                                        var $616 = _typ1$7;
                                        return $616;
                                    })));
                                    var $615 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, _term$11));
                                    return $615;
                                }));
                                return $614;
                            }));
                            return $613;
                        }));
                        return $612;
                    }));
                    return $611;
                }));
                return $610;
            }));
            return $609;
        }));
        return $608;
    }));
    const Fm$Parser$some = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $617 = Monad$bind$(Parser$monad)(Fm$Parser$text$("some("))((_$2 => {
            var $618 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$3 => {
                var $619 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$4 => {
                    var $620 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _term$6 = Fm$Term$ref$("Maybe.some");
                        var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                        var _term$8 = Fm$Term$app$(_term$7, _expr$3);
                        var $621 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$8));
                        return $621;
                    }));
                    return $620;
                }));
                return $619;
            }));
            return $618;
        }));
        return $617;
    }));
    const Fm$Parser$apply = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $622 = Monad$bind$(Parser$monad)(Fm$Parser$text$("apply("))((_$2 => {
            var $623 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_func$3 => {
                var $624 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$4 => {
                    var $625 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_equa$5 => {
                        var $626 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$6 => {
                            var $627 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                                var _term$8 = Fm$Term$ref$("Equal.apply");
                                var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                                var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                                var _term$11 = Fm$Term$app$(_term$10, Fm$Term$hol$(Bits$e));
                                var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                var _term$13 = Fm$Term$app$(_term$12, _func$3);
                                var _term$14 = Fm$Term$app$(_term$13, _equa$5);
                                var $628 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$14));
                                return $628;
                            }));
                            return $627;
                        }));
                        return $626;
                    }));
                    return $625;
                }));
                return $624;
            }));
            return $623;
        }));
        return $622;
    }));

    function Fm$Name$read$(_str$1) {
        var $629 = _str$1;
        return $629;
    };
    const Fm$Name$read = x0 => Fm$Name$read$(x0);
    const Fm$Parser$list = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $630 = Monad$bind$(Parser$monad)(Fm$Parser$text$("["))((_$2 => {
            var $631 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("]"), Fm$Parser$item$(Fm$Parser$term)))((_vals$3 => {
                var $632 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $633 = Monad$pure$(Parser$monad)(List$fold$(_vals$3, Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("List.nil")), Fm$Term$hol$(Bits$e)), (_x$5 => _xs$6 => {
                        var _term$7 = Fm$Term$ref$(Fm$Name$read$("List.cons"));
                        var _term$8 = Fm$Term$app$(_term$7, Fm$Term$hol$(Bits$e));
                        var _term$9 = Fm$Term$app$(_term$8, _x$5);
                        var _term$10 = Fm$Term$app$(_term$9, _xs$6);
                        var $634 = Fm$Term$ori$(_orig$4, _term$10);
                        return $634;
                    })));
                    return $633;
                }));
                return $632;
            }));
            return $631;
        }));
        return $630;
    }));
    const Fm$Parser$log = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $635 = Monad$bind$(Parser$monad)(Fm$Parser$text$("log("))((_$2 => {
            var $636 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$term)))((_strs$3 => {
                var $637 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_cont$4 => {
                    var _term$5 = Fm$Term$ref$("Debug.log");
                    var _term$6 = Fm$Term$app$(_term$5, Fm$Term$hol$(Bits$e));
                    var _args$7 = List$fold$(_strs$3, Fm$Term$ref$("String.nil"), (_x$7 => _xs$8 => {
                        var _arg$9 = Fm$Term$ref$("String.concat");
                        var _arg$10 = Fm$Term$app$(_arg$9, _x$7);
                        var _arg$11 = Fm$Term$app$(_arg$10, _xs$8);
                        var $639 = _arg$11;
                        return $639;
                    }));
                    var _term$8 = Fm$Term$app$(_term$6, _args$7);
                    var _term$9 = Fm$Term$app$(_term$8, Fm$Term$lam$("x", (_x$9 => {
                        var $640 = _cont$4;
                        return $640;
                    })));
                    var $638 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                        var $641 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$9));
                        return $641;
                    }));
                    return $638;
                }));
                return $637;
            }));
            return $636;
        }));
        return $635;
    }));
    const Fm$Parser$forrange$u32 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $642 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $643 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $644 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$4 => {
                    var $645 = Monad$bind$(Parser$monad)(Fm$Parser$text$("U32"))((_$5 => {
                        var $646 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$6 => {
                            var $647 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_idx0$7 => {
                                var $648 = Monad$bind$(Parser$monad)(Fm$Parser$text$(".."))((_$8 => {
                                    var $649 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_idx1$9 => {
                                        var $650 = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$10 => {
                                            var $651 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$11 => {
                                                var $652 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$12 => {
                                                    var $653 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$13 => {
                                                        var $654 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$14 => {
                                                            var _term$15 = Fm$Term$ref$("U32.for");
                                                            var _term$16 = Fm$Term$app$(_term$15, Fm$Term$hol$(Bits$e));
                                                            var _term$17 = Fm$Term$app$(_term$16, Fm$Term$ref$(_name$11));
                                                            var _term$18 = Fm$Term$app$(_term$17, _idx0$7);
                                                            var _term$19 = Fm$Term$app$(_term$18, _idx1$9);
                                                            var _lamb$20 = Fm$Term$lam$(_elem$3, (_e$20 => {
                                                                var $656 = Fm$Term$lam$(_name$11, (_s$21 => {
                                                                    var $657 = _loop$13;
                                                                    return $657;
                                                                }));
                                                                return $656;
                                                            }));
                                                            var _term$21 = Fm$Term$app$(_term$19, _lamb$20);
                                                            var _term$22 = Fm$Term$let$(_name$11, _term$21, (_x$22 => {
                                                                var $658 = Fm$Term$ref$(_name$11);
                                                                return $658;
                                                            }));
                                                            var $655 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$14, _term$22));
                                                            return $655;
                                                        }));
                                                        return $654;
                                                    }));
                                                    return $653;
                                                }));
                                                return $652;
                                            }));
                                            return $651;
                                        }));
                                        return $650;
                                    }));
                                    return $649;
                                }));
                                return $648;
                            }));
                            return $647;
                        }));
                        return $646;
                    }));
                    return $645;
                }));
                return $644;
            }));
            return $643;
        }));
        return $642;
    }));
    const Fm$Parser$forrange$u32$2 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $659 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $660 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $661 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$4 => {
                    var $662 = Monad$bind$(Parser$monad)(Fm$Parser$text$("U32"))((_$5 => {
                        var $663 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$6 => {
                            var $664 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_idx0$7 => {
                                var $665 = Monad$bind$(Parser$monad)(Fm$Parser$text$(".."))((_$8 => {
                                    var $666 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_idx1$9 => {
                                        var $667 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$10 => {
                                            var $668 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$11 => {
                                                var $669 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$12 => {
                                                    var $670 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$13 => {
                                                        var $671 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$14 => {
                                                            var $672 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$15 => {
                                                                var $673 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$16 => {
                                                                    var _term$17 = Fm$Term$ref$("U32.for");
                                                                    var _term$18 = Fm$Term$app$(_term$17, Fm$Term$hol$(Bits$e));
                                                                    var _term$19 = Fm$Term$app$(_term$18, Fm$Term$ref$(_name$11));
                                                                    var _term$20 = Fm$Term$app$(_term$19, _idx0$7);
                                                                    var _term$21 = Fm$Term$app$(_term$20, _idx1$9);
                                                                    var _lamb$22 = Fm$Term$lam$(_elem$3, (_e$22 => {
                                                                        var $675 = Fm$Term$lam$(_name$11, (_s$23 => {
                                                                            var $676 = _loop$13;
                                                                            return $676;
                                                                        }));
                                                                        return $675;
                                                                    }));
                                                                    var _term$23 = Fm$Term$app$(_term$21, _lamb$22);
                                                                    var _term$24 = Fm$Term$let$(_name$11, _term$23, (_x$24 => {
                                                                        var $677 = _body$15;
                                                                        return $677;
                                                                    }));
                                                                    var $674 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$16, _term$24));
                                                                    return $674;
                                                                }));
                                                                return $673;
                                                            }));
                                                            return $672;
                                                        }));
                                                        return $671;
                                                    }));
                                                    return $670;
                                                }));
                                                return $669;
                                            }));
                                            return $668;
                                        }));
                                        return $667;
                                    }));
                                    return $666;
                                }));
                                return $665;
                            }));
                            return $664;
                        }));
                        return $663;
                    }));
                    return $662;
                }));
                return $661;
            }));
            return $660;
        }));
        return $659;
    }));
    const Fm$Parser$forin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $678 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $679 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $680 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$4 => {
                    var $681 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$5 => {
                        var $682 = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$6 => {
                            var $683 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$7 => {
                                var $684 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$8 => {
                                    var $685 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$9 => {
                                        var $686 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                                            var _term$11 = Fm$Term$ref$("List.for");
                                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                            var _term$13 = Fm$Term$app$(_term$12, _list$5);
                                            var _term$14 = Fm$Term$app$(_term$13, Fm$Term$hol$(Bits$e));
                                            var _term$15 = Fm$Term$app$(_term$14, Fm$Term$ref$(_name$7));
                                            var _lamb$16 = Fm$Term$lam$(_elem$3, (_i$16 => {
                                                var $688 = Fm$Term$lam$(_name$7, (_x$17 => {
                                                    var $689 = _loop$9;
                                                    return $689;
                                                }));
                                                return $688;
                                            }));
                                            var _term$17 = Fm$Term$app$(_term$15, _lamb$16);
                                            var _term$18 = Fm$Term$let$(_name$7, _term$17, (_x$18 => {
                                                var $690 = Fm$Term$ref$(_name$7);
                                                return $690;
                                            }));
                                            var $687 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$18));
                                            return $687;
                                        }));
                                        return $686;
                                    }));
                                    return $685;
                                }));
                                return $684;
                            }));
                            return $683;
                        }));
                        return $682;
                    }));
                    return $681;
                }));
                return $680;
            }));
            return $679;
        }));
        return $678;
    }));
    const Fm$Parser$forin$2 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $691 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $692 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $693 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$4 => {
                    var $694 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$5 => {
                        var $695 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$6 => {
                            var $696 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$7 => {
                                var $697 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$8 => {
                                    var $698 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$9 => {
                                        var $699 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$10 => {
                                            var $700 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$11 => {
                                                var $701 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                                    var _term$13 = Fm$Term$ref$("List.for");
                                                    var _term$14 = Fm$Term$app$(_term$13, Fm$Term$hol$(Bits$e));
                                                    var _term$15 = Fm$Term$app$(_term$14, _list$5);
                                                    var _term$16 = Fm$Term$app$(_term$15, Fm$Term$hol$(Bits$e));
                                                    var _term$17 = Fm$Term$app$(_term$16, Fm$Term$ref$(_name$7));
                                                    var _lamb$18 = Fm$Term$lam$(_elem$3, (_i$18 => {
                                                        var $703 = Fm$Term$lam$(_name$7, (_x$19 => {
                                                            var $704 = _loop$9;
                                                            return $704;
                                                        }));
                                                        return $703;
                                                    }));
                                                    var _term$19 = Fm$Term$app$(_term$17, _lamb$18);
                                                    var _term$20 = Fm$Term$let$(_name$7, _term$19, (_x$20 => {
                                                        var $705 = _body$11;
                                                        return $705;
                                                    }));
                                                    var $702 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, _term$20));
                                                    return $702;
                                                }));
                                                return $701;
                                            }));
                                            return $700;
                                        }));
                                        return $699;
                                    }));
                                    return $698;
                                }));
                                return $697;
                            }));
                            return $696;
                        }));
                        return $695;
                    }));
                    return $694;
                }));
                return $693;
            }));
            return $692;
        }));
        return $691;
    }));

    function Fm$Parser$do$statements$(_monad_name$1) {
        var $706 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $707 = Monad$bind$(Parser$monad)(Fm$Parser$text$("var "))((_$3 => {
                var $708 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $709 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $710 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $711 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$7 => {
                                var $712 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $713 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var _term$10 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                                        var _term$11 = Fm$Term$app$(_term$10, Fm$Term$ref$((_monad_name$1 + ".monad")));
                                        var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                        var _term$13 = Fm$Term$app$(_term$12, Fm$Term$hol$(Bits$e));
                                        var _term$14 = Fm$Term$app$(_term$13, _expr$6);
                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_name$4, (_x$15 => {
                                            var $715 = _body$8;
                                            return $715;
                                        })));
                                        var $714 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, _term$15));
                                        return $714;
                                    }));
                                    return $713;
                                }));
                                return $712;
                            }));
                            return $711;
                        }));
                        return $710;
                    }));
                    return $709;
                }));
                return $708;
            }));
            return $707;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $716 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$3 => {
                var $717 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $718 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $719 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $720 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$7 => {
                                var $721 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $722 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var $723 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, Fm$Term$let$(_name$4, _expr$6, (_x$10 => {
                                            var $724 = _body$8;
                                            return $724;
                                        }))));
                                        return $723;
                                    }));
                                    return $722;
                                }));
                                return $721;
                            }));
                            return $720;
                        }));
                        return $719;
                    }));
                    return $718;
                }));
                return $717;
            }));
            return $716;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $725 = Monad$bind$(Parser$monad)(Fm$Parser$text$("return "))((_$3 => {
                var $726 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $727 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$5 => {
                        var $728 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.pure"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, _expr$4);
                            var $729 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$10));
                            return $729;
                        }));
                        return $728;
                    }));
                    return $727;
                }));
                return $726;
            }));
            return $725;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $730 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$3 => {
                var $731 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$4 => {
                    var $732 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$5 => {
                        var $733 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                            var _term$11 = Fm$Term$app$(_term$10, _expr$3);
                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$lam$("", (_x$12 => {
                                var $735 = _body$5;
                                return $735;
                            })));
                            var $734 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$12));
                            return $734;
                        }));
                        return $733;
                    }));
                    return $732;
                }));
                return $731;
            }));
            return $730;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$2 => {
            var $736 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$3 => {
                var $737 = Monad$pure$(Parser$monad)(_expr$2);
                return $737;
            }));
            return $736;
        })), List$nil))))));
        return $706;
    };
    const Fm$Parser$do$statements = x0 => Fm$Parser$do$statements$(x0);
    const Fm$Parser$do = Monad$bind$(Parser$monad)(Fm$Parser$text$("do "))((_$1 => {
        var $738 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $739 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$3 => {
                var $740 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_name$2))((_term$4 => {
                    var $741 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$5 => {
                        var $742 = Monad$pure$(Parser$monad)(_term$4);
                        return $742;
                    }));
                    return $741;
                }));
                return $740;
            }));
            return $739;
        }));
        return $738;
    }));

    function Fm$Term$nat$(_natx$1) {
        var $743 = ({
            _: 'Fm.Term.nat',
            'natx': _natx$1
        });
        return $743;
    };
    const Fm$Term$nat = x0 => Fm$Term$nat$(x0);

    function Fm$Term$unroll_nat$(_natx$1) {
        var self = _natx$1;
        if (self === 0n) {
            var $745 = Fm$Term$ref$(Fm$Name$read$("Nat.zero"));
            var $744 = $745;
        } else {
            var $746 = (self - 1n);
            var _func$3 = Fm$Term$ref$(Fm$Name$read$("Nat.succ"));
            var _argm$4 = Fm$Term$nat$($746);
            var $747 = Fm$Term$app$(_func$3, _argm$4);
            var $744 = $747;
        };
        return $744;
    };
    const Fm$Term$unroll_nat = x0 => Fm$Term$unroll_nat$(x0);
    const U16$to_bits = a0 => (u16_to_bits(a0));

    function Fm$Term$unroll_chr$bits$(_bits$1) {
        var self = _bits$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $749 = Fm$Term$ref$(Fm$Name$read$("Bits.e"));
                var $748 = $749;
                break;
            case 'o':
                var $750 = self.slice(0, -1);
                var $751 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.o")), Fm$Term$unroll_chr$bits$($750));
                var $748 = $751;
                break;
            case 'i':
                var $752 = self.slice(0, -1);
                var $753 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.i")), Fm$Term$unroll_chr$bits$($752));
                var $748 = $753;
                break;
        };
        return $748;
    };
    const Fm$Term$unroll_chr$bits = x0 => Fm$Term$unroll_chr$bits$(x0);

    function Fm$Term$unroll_chr$(_chrx$1) {
        var _bits$2 = (u16_to_bits(_chrx$1));
        var _term$3 = Fm$Term$ref$(Fm$Name$read$("Word.from_bits"));
        var _term$4 = Fm$Term$app$(_term$3, Fm$Term$nat$(16n));
        var _term$5 = Fm$Term$app$(_term$4, Fm$Term$unroll_chr$bits$(_bits$2));
        var _term$6 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("U16.new")), _term$5);
        var $754 = _term$6;
        return $754;
    };
    const Fm$Term$unroll_chr = x0 => Fm$Term$unroll_chr$(x0);

    function Fm$Term$unroll_str$(_strx$1) {
        var self = _strx$1;
        if (self.length === 0) {
            var $756 = Fm$Term$ref$(Fm$Name$read$("String.nil"));
            var $755 = $756;
        } else {
            var $757 = self.charCodeAt(0);
            var $758 = self.slice(1);
            var _char$4 = Fm$Term$chr$($757);
            var _term$5 = Fm$Term$ref$(Fm$Name$read$("String.cons"));
            var _term$6 = Fm$Term$app$(_term$5, _char$4);
            var _term$7 = Fm$Term$app$(_term$6, Fm$Term$str$($758));
            var $759 = _term$7;
            var $755 = $759;
        };
        return $755;
    };
    const Fm$Term$unroll_str = x0 => Fm$Term$unroll_str$(x0);

    function Fm$Term$reduce$(_term$1, _defs$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $761 = self.name;
                var $762 = self.indx;
                var $763 = _term$1;
                var $760 = $763;
                break;
            case 'Fm.Term.ref':
                var $764 = self.name;
                var self = Fm$get$($764, _defs$2);
                switch (self._) {
                    case 'Maybe.none':
                        var $766 = Fm$Term$ref$($764);
                        var $765 = $766;
                        break;
                    case 'Maybe.some':
                        var $767 = self.value;
                        var self = $767;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $769 = self.file;
                                var $770 = self.code;
                                var $771 = self.name;
                                var $772 = self.term;
                                var $773 = self.type;
                                var $774 = self.stat;
                                var $775 = Fm$Term$reduce$($772, _defs$2);
                                var $768 = $775;
                                break;
                        };
                        var $765 = $768;
                        break;
                };
                var $760 = $765;
                break;
            case 'Fm.Term.typ':
                var $776 = _term$1;
                var $760 = $776;
                break;
            case 'Fm.Term.all':
                var $777 = self.eras;
                var $778 = self.self;
                var $779 = self.name;
                var $780 = self.xtyp;
                var $781 = self.body;
                var $782 = _term$1;
                var $760 = $782;
                break;
            case 'Fm.Term.lam':
                var $783 = self.name;
                var $784 = self.body;
                var $785 = _term$1;
                var $760 = $785;
                break;
            case 'Fm.Term.app':
                var $786 = self.func;
                var $787 = self.argm;
                var _func$5 = Fm$Term$reduce$($786, _defs$2);
                var self = _func$5;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $789 = self.name;
                        var $790 = self.indx;
                        var $791 = _term$1;
                        var $788 = $791;
                        break;
                    case 'Fm.Term.ref':
                        var $792 = self.name;
                        var $793 = _term$1;
                        var $788 = $793;
                        break;
                    case 'Fm.Term.typ':
                        var $794 = _term$1;
                        var $788 = $794;
                        break;
                    case 'Fm.Term.all':
                        var $795 = self.eras;
                        var $796 = self.self;
                        var $797 = self.name;
                        var $798 = self.xtyp;
                        var $799 = self.body;
                        var $800 = _term$1;
                        var $788 = $800;
                        break;
                    case 'Fm.Term.lam':
                        var $801 = self.name;
                        var $802 = self.body;
                        var $803 = Fm$Term$reduce$($802($787), _defs$2);
                        var $788 = $803;
                        break;
                    case 'Fm.Term.app':
                        var $804 = self.func;
                        var $805 = self.argm;
                        var $806 = _term$1;
                        var $788 = $806;
                        break;
                    case 'Fm.Term.let':
                        var $807 = self.name;
                        var $808 = self.expr;
                        var $809 = self.body;
                        var $810 = _term$1;
                        var $788 = $810;
                        break;
                    case 'Fm.Term.def':
                        var $811 = self.name;
                        var $812 = self.expr;
                        var $813 = self.body;
                        var $814 = _term$1;
                        var $788 = $814;
                        break;
                    case 'Fm.Term.ann':
                        var $815 = self.done;
                        var $816 = self.term;
                        var $817 = self.type;
                        var $818 = _term$1;
                        var $788 = $818;
                        break;
                    case 'Fm.Term.gol':
                        var $819 = self.name;
                        var $820 = self.dref;
                        var $821 = self.verb;
                        var $822 = _term$1;
                        var $788 = $822;
                        break;
                    case 'Fm.Term.hol':
                        var $823 = self.path;
                        var $824 = _term$1;
                        var $788 = $824;
                        break;
                    case 'Fm.Term.nat':
                        var $825 = self.natx;
                        var $826 = _term$1;
                        var $788 = $826;
                        break;
                    case 'Fm.Term.chr':
                        var $827 = self.chrx;
                        var $828 = _term$1;
                        var $788 = $828;
                        break;
                    case 'Fm.Term.str':
                        var $829 = self.strx;
                        var $830 = _term$1;
                        var $788 = $830;
                        break;
                    case 'Fm.Term.cse':
                        var $831 = self.path;
                        var $832 = self.expr;
                        var $833 = self.name;
                        var $834 = self.with;
                        var $835 = self.cses;
                        var $836 = self.moti;
                        var $837 = _term$1;
                        var $788 = $837;
                        break;
                    case 'Fm.Term.ori':
                        var $838 = self.orig;
                        var $839 = self.expr;
                        var $840 = _term$1;
                        var $788 = $840;
                        break;
                };
                var $760 = $788;
                break;
            case 'Fm.Term.let':
                var $841 = self.name;
                var $842 = self.expr;
                var $843 = self.body;
                var $844 = Fm$Term$reduce$($843($842), _defs$2);
                var $760 = $844;
                break;
            case 'Fm.Term.def':
                var $845 = self.name;
                var $846 = self.expr;
                var $847 = self.body;
                var $848 = Fm$Term$reduce$($847($846), _defs$2);
                var $760 = $848;
                break;
            case 'Fm.Term.ann':
                var $849 = self.done;
                var $850 = self.term;
                var $851 = self.type;
                var $852 = Fm$Term$reduce$($850, _defs$2);
                var $760 = $852;
                break;
            case 'Fm.Term.gol':
                var $853 = self.name;
                var $854 = self.dref;
                var $855 = self.verb;
                var $856 = _term$1;
                var $760 = $856;
                break;
            case 'Fm.Term.hol':
                var $857 = self.path;
                var $858 = _term$1;
                var $760 = $858;
                break;
            case 'Fm.Term.nat':
                var $859 = self.natx;
                var $860 = Fm$Term$reduce$(Fm$Term$unroll_nat$($859), _defs$2);
                var $760 = $860;
                break;
            case 'Fm.Term.chr':
                var $861 = self.chrx;
                var $862 = Fm$Term$reduce$(Fm$Term$unroll_chr$($861), _defs$2);
                var $760 = $862;
                break;
            case 'Fm.Term.str':
                var $863 = self.strx;
                var $864 = Fm$Term$reduce$(Fm$Term$unroll_str$($863), _defs$2);
                var $760 = $864;
                break;
            case 'Fm.Term.cse':
                var $865 = self.path;
                var $866 = self.expr;
                var $867 = self.name;
                var $868 = self.with;
                var $869 = self.cses;
                var $870 = self.moti;
                var $871 = _term$1;
                var $760 = $871;
                break;
            case 'Fm.Term.ori':
                var $872 = self.orig;
                var $873 = self.expr;
                var $874 = Fm$Term$reduce$($873, _defs$2);
                var $760 = $874;
                break;
        };
        return $760;
    };
    const Fm$Term$reduce = x0 => x1 => Fm$Term$reduce$(x0, x1);
    const Map$new = ({
        _: 'Map.new'
    });

    function Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$6) {
        var $875 = ({
            _: 'Fm.Def.new',
            'file': _file$1,
            'code': _code$2,
            'name': _name$3,
            'term': _term$4,
            'type': _type$5,
            'stat': _stat$6
        });
        return $875;
    };
    const Fm$Def$new = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Def$new$(x0, x1, x2, x3, x4, x5);
    const Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    const Fm$Parser$case$with = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$1 => {
        var $876 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $877 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$3 => {
                var $878 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                    var $879 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $880 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$6 => {
                            var $881 = Monad$pure$(Parser$monad)(Fm$Def$new$("", "", _name$2, _term$6, _type$4, Fm$Status$init));
                            return $881;
                        }));
                        return $880;
                    }));
                    return $879;
                }));
                return $878;
            }));
            return $877;
        }));
        return $876;
    }));
    const Fm$Parser$case$case = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$1 => {
        var $882 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $883 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$3 => {
                var $884 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$4 => {
                    var $885 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _term$3));
                    return $885;
                }));
                return $884;
            }));
            return $883;
        }));
        return $882;
    }));

    function Map$tie$(_val$2, _lft$3, _rgt$4) {
        var $886 = ({
            _: 'Map.tie',
            'val': _val$2,
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $886;
    };
    const Map$tie = x0 => x1 => x2 => Map$tie$(x0, x1, x2);

    function Map$set$(_bits$2, _val$3, _map$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $889 = Map$tie$(Maybe$some$(_val$3), Map$new, Map$new);
                        var $888 = $889;
                        break;
                    case 'Map.tie':
                        var $890 = self.val;
                        var $891 = self.lft;
                        var $892 = self.rgt;
                        var $893 = Map$tie$(Maybe$some$(_val$3), $891, $892);
                        var $888 = $893;
                        break;
                };
                var $887 = $888;
                break;
            case 'o':
                var $894 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $896 = Map$tie$(Maybe$none, Map$set$($894, _val$3, Map$new), Map$new);
                        var $895 = $896;
                        break;
                    case 'Map.tie':
                        var $897 = self.val;
                        var $898 = self.lft;
                        var $899 = self.rgt;
                        var $900 = Map$tie$($897, Map$set$($894, _val$3, $898), $899);
                        var $895 = $900;
                        break;
                };
                var $887 = $895;
                break;
            case 'i':
                var $901 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $903 = Map$tie$(Maybe$none, Map$new, Map$set$($901, _val$3, Map$new));
                        var $902 = $903;
                        break;
                    case 'Map.tie':
                        var $904 = self.val;
                        var $905 = self.lft;
                        var $906 = self.rgt;
                        var $907 = Map$tie$($904, $905, Map$set$($901, _val$3, $906));
                        var $902 = $907;
                        break;
                };
                var $887 = $902;
                break;
        };
        return $887;
    };
    const Map$set = x0 => x1 => x2 => Map$set$(x0, x1, x2);

    function Map$from_list$(_f$3, _xs$4) {
        var self = _xs$4;
        switch (self._) {
            case 'List.nil':
                var $909 = Map$new;
                var $908 = $909;
                break;
            case 'List.cons':
                var $910 = self.head;
                var $911 = self.tail;
                var self = $910;
                switch (self._) {
                    case 'Pair.new':
                        var $913 = self.fst;
                        var $914 = self.snd;
                        var $915 = Map$set$(_f$3($913), $914, Map$from_list$(_f$3, $911));
                        var $912 = $915;
                        break;
                };
                var $908 = $912;
                break;
        };
        return $908;
    };
    const Map$from_list = x0 => x1 => Map$from_list$(x0, x1);

    function Fm$Term$cse$(_path$1, _expr$2, _name$3, _with$4, _cses$5, _moti$6) {
        var $916 = ({
            _: 'Fm.Term.cse',
            'path': _path$1,
            'expr': _expr$2,
            'name': _name$3,
            'with': _with$4,
            'cses': _cses$5,
            'moti': _moti$6
        });
        return $916;
    };
    const Fm$Term$cse = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$cse$(x0, x1, x2, x3, x4, x5);
    const Fm$Parser$case = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $917 = Monad$bind$(Parser$monad)(Fm$Parser$text$("case "))((_$2 => {
            var $918 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
                var $919 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $920 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("as"))((_$5 => {
                        var $921 = Fm$Parser$name1;
                        return $921;
                    }))))((_name$5 => {
                        var self = _name$5;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = Fm$Term$reduce$(_expr$4, Map$new);
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $924 = self.name;
                                        var $925 = self.indx;
                                        var $926 = $924;
                                        var $923 = $926;
                                        break;
                                    case 'Fm.Term.ref':
                                        var $927 = self.name;
                                        var $928 = $927;
                                        var $923 = $928;
                                        break;
                                    case 'Fm.Term.typ':
                                        var $929 = Fm$Name$read$("self");
                                        var $923 = $929;
                                        break;
                                    case 'Fm.Term.all':
                                        var $930 = self.eras;
                                        var $931 = self.self;
                                        var $932 = self.name;
                                        var $933 = self.xtyp;
                                        var $934 = self.body;
                                        var $935 = Fm$Name$read$("self");
                                        var $923 = $935;
                                        break;
                                    case 'Fm.Term.lam':
                                        var $936 = self.name;
                                        var $937 = self.body;
                                        var $938 = Fm$Name$read$("self");
                                        var $923 = $938;
                                        break;
                                    case 'Fm.Term.app':
                                        var $939 = self.func;
                                        var $940 = self.argm;
                                        var $941 = Fm$Name$read$("self");
                                        var $923 = $941;
                                        break;
                                    case 'Fm.Term.let':
                                        var $942 = self.name;
                                        var $943 = self.expr;
                                        var $944 = self.body;
                                        var $945 = Fm$Name$read$("self");
                                        var $923 = $945;
                                        break;
                                    case 'Fm.Term.def':
                                        var $946 = self.name;
                                        var $947 = self.expr;
                                        var $948 = self.body;
                                        var $949 = Fm$Name$read$("self");
                                        var $923 = $949;
                                        break;
                                    case 'Fm.Term.ann':
                                        var $950 = self.done;
                                        var $951 = self.term;
                                        var $952 = self.type;
                                        var $953 = Fm$Name$read$("self");
                                        var $923 = $953;
                                        break;
                                    case 'Fm.Term.gol':
                                        var $954 = self.name;
                                        var $955 = self.dref;
                                        var $956 = self.verb;
                                        var $957 = Fm$Name$read$("self");
                                        var $923 = $957;
                                        break;
                                    case 'Fm.Term.hol':
                                        var $958 = self.path;
                                        var $959 = Fm$Name$read$("self");
                                        var $923 = $959;
                                        break;
                                    case 'Fm.Term.nat':
                                        var $960 = self.natx;
                                        var $961 = Fm$Name$read$("self");
                                        var $923 = $961;
                                        break;
                                    case 'Fm.Term.chr':
                                        var $962 = self.chrx;
                                        var $963 = Fm$Name$read$("self");
                                        var $923 = $963;
                                        break;
                                    case 'Fm.Term.str':
                                        var $964 = self.strx;
                                        var $965 = Fm$Name$read$("self");
                                        var $923 = $965;
                                        break;
                                    case 'Fm.Term.cse':
                                        var $966 = self.path;
                                        var $967 = self.expr;
                                        var $968 = self.name;
                                        var $969 = self.with;
                                        var $970 = self.cses;
                                        var $971 = self.moti;
                                        var $972 = Fm$Name$read$("self");
                                        var $923 = $972;
                                        break;
                                    case 'Fm.Term.ori':
                                        var $973 = self.orig;
                                        var $974 = self.expr;
                                        var $975 = Fm$Name$read$("self");
                                        var $923 = $975;
                                        break;
                                };
                                var _name$6 = $923;
                                break;
                            case 'Maybe.some':
                                var $976 = self.value;
                                var $977 = $976;
                                var _name$6 = $977;
                                break;
                        };
                        var $922 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$case$with))((_wyth$7 => {
                            var $978 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$8 => {
                                var $979 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$case$case))((_cses$9 => {
                                    var _cses$10 = Map$from_list$(Fm$Name$to_bits, _cses$9);
                                    var $980 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$11 => {
                                        var $981 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$12 => {
                                            var $982 = Monad$pure$(Parser$monad)(Maybe$some$(_term$12));
                                            return $982;
                                        }));
                                        return $981;
                                    })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("!"))((_$11 => {
                                        var $983 = Monad$pure$(Parser$monad)(Maybe$none);
                                        return $983;
                                    })), List$cons$(Monad$pure$(Parser$monad)(Maybe$some$(Fm$Term$hol$(Bits$e))), List$nil)))))((_moti$11 => {
                                        var $984 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                            var $985 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, Fm$Term$cse$(Bits$e, _expr$4, _name$6, _wyth$7, _cses$10, _moti$11)));
                                            return $985;
                                        }));
                                        return $984;
                                    }));
                                    return $980;
                                }));
                                return $979;
                            }));
                            return $978;
                        }));
                        return $922;
                    }));
                    return $920;
                }));
                return $919;
            }));
            return $918;
        }));
        return $917;
    }));
    const Fm$Parser$open = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $986 = Monad$bind$(Parser$monad)(Fm$Parser$text$("open "))((_$2 => {
            var $987 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
                var $988 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $989 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("as"))((_$5 => {
                        var $990 = Fm$Parser$name1;
                        return $990;
                    }))))((_name$5 => {
                        var $991 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var self = _name$5;
                            switch (self._) {
                                case 'Maybe.none':
                                    var self = Fm$Term$reduce$(_expr$4, Map$new);
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $994 = self.name;
                                            var $995 = self.indx;
                                            var $996 = $994;
                                            var $993 = $996;
                                            break;
                                        case 'Fm.Term.ref':
                                            var $997 = self.name;
                                            var $998 = $997;
                                            var $993 = $998;
                                            break;
                                        case 'Fm.Term.typ':
                                            var $999 = Fm$Name$read$("self");
                                            var $993 = $999;
                                            break;
                                        case 'Fm.Term.all':
                                            var $1000 = self.eras;
                                            var $1001 = self.self;
                                            var $1002 = self.name;
                                            var $1003 = self.xtyp;
                                            var $1004 = self.body;
                                            var $1005 = Fm$Name$read$("self");
                                            var $993 = $1005;
                                            break;
                                        case 'Fm.Term.lam':
                                            var $1006 = self.name;
                                            var $1007 = self.body;
                                            var $1008 = Fm$Name$read$("self");
                                            var $993 = $1008;
                                            break;
                                        case 'Fm.Term.app':
                                            var $1009 = self.func;
                                            var $1010 = self.argm;
                                            var $1011 = Fm$Name$read$("self");
                                            var $993 = $1011;
                                            break;
                                        case 'Fm.Term.let':
                                            var $1012 = self.name;
                                            var $1013 = self.expr;
                                            var $1014 = self.body;
                                            var $1015 = Fm$Name$read$("self");
                                            var $993 = $1015;
                                            break;
                                        case 'Fm.Term.def':
                                            var $1016 = self.name;
                                            var $1017 = self.expr;
                                            var $1018 = self.body;
                                            var $1019 = Fm$Name$read$("self");
                                            var $993 = $1019;
                                            break;
                                        case 'Fm.Term.ann':
                                            var $1020 = self.done;
                                            var $1021 = self.term;
                                            var $1022 = self.type;
                                            var $1023 = Fm$Name$read$("self");
                                            var $993 = $1023;
                                            break;
                                        case 'Fm.Term.gol':
                                            var $1024 = self.name;
                                            var $1025 = self.dref;
                                            var $1026 = self.verb;
                                            var $1027 = Fm$Name$read$("self");
                                            var $993 = $1027;
                                            break;
                                        case 'Fm.Term.hol':
                                            var $1028 = self.path;
                                            var $1029 = Fm$Name$read$("self");
                                            var $993 = $1029;
                                            break;
                                        case 'Fm.Term.nat':
                                            var $1030 = self.natx;
                                            var $1031 = Fm$Name$read$("self");
                                            var $993 = $1031;
                                            break;
                                        case 'Fm.Term.chr':
                                            var $1032 = self.chrx;
                                            var $1033 = Fm$Name$read$("self");
                                            var $993 = $1033;
                                            break;
                                        case 'Fm.Term.str':
                                            var $1034 = self.strx;
                                            var $1035 = Fm$Name$read$("self");
                                            var $993 = $1035;
                                            break;
                                        case 'Fm.Term.cse':
                                            var $1036 = self.path;
                                            var $1037 = self.expr;
                                            var $1038 = self.name;
                                            var $1039 = self.with;
                                            var $1040 = self.cses;
                                            var $1041 = self.moti;
                                            var $1042 = Fm$Name$read$("self");
                                            var $993 = $1042;
                                            break;
                                        case 'Fm.Term.ori':
                                            var $1043 = self.orig;
                                            var $1044 = self.expr;
                                            var $1045 = Fm$Name$read$("self");
                                            var $993 = $1045;
                                            break;
                                    };
                                    var _name$7 = $993;
                                    break;
                                case 'Maybe.some':
                                    var $1046 = self.value;
                                    var $1047 = $1046;
                                    var _name$7 = $1047;
                                    break;
                            };
                            var _wyth$8 = List$nil;
                            var $992 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_rest$9 => {
                                var _cses$10 = Map$from_list$(Fm$Name$to_bits, List$cons$(Pair$new$("_", _rest$9), List$nil));
                                var _moti$11 = Maybe$some$(Fm$Term$hol$(Bits$e));
                                var $1048 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                    var $1049 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, Fm$Term$cse$(Bits$e, _expr$4, _name$7, _wyth$8, _cses$10, _moti$11)));
                                    return $1049;
                                }));
                                return $1048;
                            }));
                            return $992;
                        }));
                        return $991;
                    }));
                    return $989;
                }));
                return $988;
            }));
            return $987;
        }));
        return $986;
    }));

    function Parser$digit$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $1051 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
            var $1050 = $1051;
        } else {
            var $1052 = self.charCodeAt(0);
            var $1053 = self.slice(1);
            var _sidx$5 = Nat$succ$(_idx$1);
            var self = ($1052 === 48);
            if (self) {
                var $1055 = Parser$Reply$value$(_sidx$5, $1053, 0n);
                var $1054 = $1055;
            } else {
                var self = ($1052 === 49);
                if (self) {
                    var $1057 = Parser$Reply$value$(_sidx$5, $1053, 1n);
                    var $1056 = $1057;
                } else {
                    var self = ($1052 === 50);
                    if (self) {
                        var $1059 = Parser$Reply$value$(_sidx$5, $1053, 2n);
                        var $1058 = $1059;
                    } else {
                        var self = ($1052 === 51);
                        if (self) {
                            var $1061 = Parser$Reply$value$(_sidx$5, $1053, 3n);
                            var $1060 = $1061;
                        } else {
                            var self = ($1052 === 52);
                            if (self) {
                                var $1063 = Parser$Reply$value$(_sidx$5, $1053, 4n);
                                var $1062 = $1063;
                            } else {
                                var self = ($1052 === 53);
                                if (self) {
                                    var $1065 = Parser$Reply$value$(_sidx$5, $1053, 5n);
                                    var $1064 = $1065;
                                } else {
                                    var self = ($1052 === 54);
                                    if (self) {
                                        var $1067 = Parser$Reply$value$(_sidx$5, $1053, 6n);
                                        var $1066 = $1067;
                                    } else {
                                        var self = ($1052 === 55);
                                        if (self) {
                                            var $1069 = Parser$Reply$value$(_sidx$5, $1053, 7n);
                                            var $1068 = $1069;
                                        } else {
                                            var self = ($1052 === 56);
                                            if (self) {
                                                var $1071 = Parser$Reply$value$(_sidx$5, $1053, 8n);
                                                var $1070 = $1071;
                                            } else {
                                                var self = ($1052 === 57);
                                                if (self) {
                                                    var $1073 = Parser$Reply$value$(_sidx$5, $1053, 9n);
                                                    var $1072 = $1073;
                                                } else {
                                                    var $1074 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
                                                    var $1072 = $1074;
                                                };
                                                var $1070 = $1072;
                                            };
                                            var $1068 = $1070;
                                        };
                                        var $1066 = $1068;
                                    };
                                    var $1064 = $1066;
                                };
                                var $1062 = $1064;
                            };
                            var $1060 = $1062;
                        };
                        var $1058 = $1060;
                    };
                    var $1056 = $1058;
                };
                var $1054 = $1056;
            };
            var $1050 = $1054;
        };
        return $1050;
    };
    const Parser$digit = x0 => x1 => Parser$digit$(x0, x1);
    const Nat$add = a0 => a1 => (a0 + a1);
    const Nat$mul = a0 => a1 => (a0 * a1);

    function Nat$from_base$go$(_b$1, _ds$2, _p$3, _res$4) {
        var Nat$from_base$go$ = (_b$1, _ds$2, _p$3, _res$4) => ({
            ctr: 'TCO',
            arg: [_b$1, _ds$2, _p$3, _res$4]
        });
        var Nat$from_base$go = _b$1 => _ds$2 => _p$3 => _res$4 => Nat$from_base$go$(_b$1, _ds$2, _p$3, _res$4);
        var arg = [_b$1, _ds$2, _p$3, _res$4];
        while (true) {
            let [_b$1, _ds$2, _p$3, _res$4] = arg;
            var R = (() => {
                var self = _ds$2;
                switch (self._) {
                    case 'List.nil':
                        var $1075 = _res$4;
                        return $1075;
                    case 'List.cons':
                        var $1076 = self.head;
                        var $1077 = self.tail;
                        var $1078 = Nat$from_base$go$(_b$1, $1077, (_b$1 * _p$3), (($1076 * _p$3) + _res$4));
                        return $1078;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$from_base$go = x0 => x1 => x2 => x3 => Nat$from_base$go$(x0, x1, x2, x3);

    function List$reverse$go$(_xs$2, _res$3) {
        var List$reverse$go$ = (_xs$2, _res$3) => ({
            ctr: 'TCO',
            arg: [_xs$2, _res$3]
        });
        var List$reverse$go = _xs$2 => _res$3 => List$reverse$go$(_xs$2, _res$3);
        var arg = [_xs$2, _res$3];
        while (true) {
            let [_xs$2, _res$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        var $1079 = _res$3;
                        return $1079;
                    case 'List.cons':
                        var $1080 = self.head;
                        var $1081 = self.tail;
                        var $1082 = List$reverse$go$($1081, List$cons$($1080, _res$3));
                        return $1082;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$reverse$go = x0 => x1 => List$reverse$go$(x0, x1);

    function List$reverse$(_xs$2) {
        var $1083 = List$reverse$go$(_xs$2, List$nil);
        return $1083;
    };
    const List$reverse = x0 => List$reverse$(x0);

    function Nat$from_base$(_base$1, _ds$2) {
        var $1084 = Nat$from_base$go$(_base$1, List$reverse$(_ds$2), 1n, 0n);
        return $1084;
    };
    const Nat$from_base = x0 => x1 => Nat$from_base$(x0, x1);
    const Parser$nat = Monad$bind$(Parser$monad)(Parser$many1$(Parser$digit))((_digits$1 => {
        var $1085 = Monad$pure$(Parser$monad)(Nat$from_base$(10n, _digits$1));
        return $1085;
    }));

    function Bits$tail$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $1087 = Bits$e;
                var $1086 = $1087;
                break;
            case 'o':
                var $1088 = self.slice(0, -1);
                var $1089 = $1088;
                var $1086 = $1089;
                break;
            case 'i':
                var $1090 = self.slice(0, -1);
                var $1091 = $1090;
                var $1086 = $1091;
                break;
        };
        return $1086;
    };
    const Bits$tail = x0 => Bits$tail$(x0);

    function Bits$inc$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $1093 = (Bits$e + '1');
                var $1092 = $1093;
                break;
            case 'o':
                var $1094 = self.slice(0, -1);
                var $1095 = ($1094 + '1');
                var $1092 = $1095;
                break;
            case 'i':
                var $1096 = self.slice(0, -1);
                var $1097 = (Bits$inc$($1096) + '0');
                var $1092 = $1097;
                break;
        };
        return $1092;
    };
    const Bits$inc = x0 => Bits$inc$(x0);
    const Nat$to_bits = a0 => (nat_to_bits(a0));

    function Maybe$to_bool$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1099 = Bool$false;
                var $1098 = $1099;
                break;
            case 'Maybe.some':
                var $1100 = self.value;
                var $1101 = Bool$true;
                var $1098 = $1101;
                break;
        };
        return $1098;
    };
    const Maybe$to_bool = x0 => Maybe$to_bool$(x0);

    function Fm$Term$gol$(_name$1, _dref$2, _verb$3) {
        var $1102 = ({
            _: 'Fm.Term.gol',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3
        });
        return $1102;
    };
    const Fm$Term$gol = x0 => x1 => x2 => Fm$Term$gol$(x0, x1, x2);
    const Fm$Parser$goal = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1103 = Monad$bind$(Parser$monad)(Fm$Parser$text$("?"))((_$2 => {
            var $1104 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $1105 = Monad$bind$(Parser$monad)(Parser$many$(Monad$bind$(Parser$monad)(Fm$Parser$text$("-"))((_$4 => {
                    var $1106 = Monad$bind$(Parser$monad)(Parser$nat)((_nat$5 => {
                        var _bits$6 = Bits$reverse$(Bits$tail$(Bits$reverse$((nat_to_bits(_nat$5)))));
                        var $1107 = Monad$pure$(Parser$monad)(_bits$6);
                        return $1107;
                    }));
                    return $1106;
                }))))((_dref$4 => {
                    var $1108 = Monad$bind$(Parser$monad)(Monad$bind$(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$5 => {
                        var $1109 = Monad$pure$(Parser$monad)(Maybe$to_bool$(_verb$5));
                        return $1109;
                    })))((_verb$5 => {
                        var $1110 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                            var $1111 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$gol$(_name$3, _dref$4, _verb$5)));
                            return $1111;
                        }));
                        return $1110;
                    }));
                    return $1108;
                }));
                return $1105;
            }));
            return $1104;
        }));
        return $1103;
    }));
    const Fm$Parser$hole = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1112 = Monad$bind$(Parser$monad)(Fm$Parser$text$("_"))((_$2 => {
            var $1113 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $1114 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$hol$(Bits$e)));
                return $1114;
            }));
            return $1113;
        }));
        return $1112;
    }));
    const Fm$Parser$u8 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1115 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $1116 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $1117 = Monad$bind$(Parser$monad)(Fm$Parser$text$("b"))((_$4 => {
                    var _term$5 = Fm$Term$ref$("Nat.to_u8");
                    var _term$6 = Fm$Term$app$(_term$5, Fm$Term$nat$(_natx$3));
                    var $1118 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                        var $1119 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$6));
                        return $1119;
                    }));
                    return $1118;
                }));
                return $1117;
            }));
            return $1116;
        }));
        return $1115;
    }));
    const Fm$Parser$u16 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1120 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $1121 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $1122 = Monad$bind$(Parser$monad)(Fm$Parser$text$("s"))((_$4 => {
                    var _term$5 = Fm$Term$ref$("Nat.to_u16");
                    var _term$6 = Fm$Term$app$(_term$5, Fm$Term$nat$(_natx$3));
                    var $1123 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                        var $1124 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$6));
                        return $1124;
                    }));
                    return $1123;
                }));
                return $1122;
            }));
            return $1121;
        }));
        return $1120;
    }));
    const Fm$Parser$u32 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1125 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $1126 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $1127 = Monad$bind$(Parser$monad)(Fm$Parser$text$("u"))((_$4 => {
                    var _term$5 = Fm$Term$ref$("Nat.to_u32");
                    var _term$6 = Fm$Term$app$(_term$5, Fm$Term$nat$(_natx$3));
                    var $1128 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                        var $1129 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$6));
                        return $1129;
                    }));
                    return $1128;
                }));
                return $1127;
            }));
            return $1126;
        }));
        return $1125;
    }));
    const Fm$Parser$u64 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1130 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $1131 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $1132 = Monad$bind$(Parser$monad)(Fm$Parser$text$("l"))((_$4 => {
                    var _term$5 = Fm$Term$ref$("Nat.to_u64");
                    var _term$6 = Fm$Term$app$(_term$5, Fm$Term$nat$(_natx$3));
                    var $1133 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                        var $1134 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$6));
                        return $1134;
                    }));
                    return $1133;
                }));
                return $1132;
            }));
            return $1131;
        }));
        return $1130;
    }));
    const Fm$Parser$nat = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1135 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $1136 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $1137 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $1138 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, Fm$Term$nat$(_natx$3)));
                    return $1138;
                }));
                return $1137;
            }));
            return $1136;
        }));
        return $1135;
    }));
    const String$eql = a0 => a1 => (a0 === a1);

    function Parser$fail$(_error$2, _idx$3, _code$4) {
        var $1139 = Parser$Reply$error$(_idx$3, _code$4, _error$2);
        return $1139;
    };
    const Parser$fail = x0 => x1 => x2 => Parser$fail$(x0, x1, x2);
    const Fm$Parser$reference = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1140 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var self = (_name$2 === "case");
            if (self) {
                var $1142 = Parser$fail("Reserved keyword.");
                var $1141 = $1142;
            } else {
                var self = (_name$2 === "do");
                if (self) {
                    var $1144 = Parser$fail("Reserved keyword.");
                    var $1143 = $1144;
                } else {
                    var self = (_name$2 === "if");
                    if (self) {
                        var $1146 = Parser$fail("Reserved keyword.");
                        var $1145 = $1146;
                    } else {
                        var self = (_name$2 === "let");
                        if (self) {
                            var $1148 = Parser$fail("Reserved keyword.");
                            var $1147 = $1148;
                        } else {
                            var self = (_name$2 === "def");
                            if (self) {
                                var $1150 = Parser$fail("Reserved keyword.");
                                var $1149 = $1150;
                            } else {
                                var self = (_name$2 === "true");
                                if (self) {
                                    var $1152 = Monad$pure$(Parser$monad)(Fm$Term$ref$("Bool.true"));
                                    var $1151 = $1152;
                                } else {
                                    var self = (_name$2 === "false");
                                    if (self) {
                                        var $1154 = Monad$pure$(Parser$monad)(Fm$Term$ref$("Bool.false"));
                                        var $1153 = $1154;
                                    } else {
                                        var self = (_name$2 === "unit");
                                        if (self) {
                                            var $1156 = Monad$pure$(Parser$monad)(Fm$Term$ref$("Unit.new"));
                                            var $1155 = $1156;
                                        } else {
                                            var self = (_name$2 === "none");
                                            if (self) {
                                                var _term$3 = Fm$Term$ref$("Maybe.none");
                                                var _term$4 = Fm$Term$app$(_term$3, Fm$Term$hol$(Bits$e));
                                                var $1158 = Monad$pure$(Parser$monad)(_term$4);
                                                var $1157 = $1158;
                                            } else {
                                                var self = (_name$2 === "refl");
                                                if (self) {
                                                    var _term$3 = Fm$Term$ref$("Equal.refl");
                                                    var _term$4 = Fm$Term$app$(_term$3, Fm$Term$hol$(Bits$e));
                                                    var _term$5 = Fm$Term$app$(_term$4, Fm$Term$hol$(Bits$e));
                                                    var $1160 = Monad$pure$(Parser$monad)(_term$5);
                                                    var $1159 = $1160;
                                                } else {
                                                    var $1161 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                                                        var $1162 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$ref$(_name$2)));
                                                        return $1162;
                                                    }));
                                                    var $1159 = $1161;
                                                };
                                                var $1157 = $1159;
                                            };
                                            var $1155 = $1157;
                                        };
                                        var $1153 = $1155;
                                    };
                                    var $1151 = $1153;
                                };
                                var $1149 = $1151;
                            };
                            var $1147 = $1149;
                        };
                        var $1145 = $1147;
                    };
                    var $1143 = $1145;
                };
                var $1141 = $1143;
            };
            return $1141;
        }));
        return $1140;
    }));
    const List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));

    function Fm$Parser$application$(_init$1, _func$2) {
        var $1163 = Monad$bind$(Parser$monad)(Parser$text("("))((_$3 => {
            var $1164 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$term)))((_args$4 => {
                var $1165 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _expr$6 = (() => {
                        var $1168 = _func$2;
                        var $1169 = _args$4;
                        let _f$7 = $1168;
                        let _x$6;
                        while ($1169._ === 'List.cons') {
                            _x$6 = $1169.head;
                            var $1168 = Fm$Term$app$(_f$7, _x$6);
                            _f$7 = $1168;
                            $1169 = $1169.tail;
                        }
                        return _f$7;
                    })();
                    var $1166 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                    return $1166;
                }));
                return $1165;
            }));
            return $1164;
        }));
        return $1163;
    };
    const Fm$Parser$application = x0 => x1 => Fm$Parser$application$(x0, x1);
    const Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$nil))));

    function Parser$spaces_text$(_text$1) {
        var $1170 = Monad$bind$(Parser$monad)(Parser$spaces)((_$2 => {
            var $1171 = Parser$text(_text$1);
            return $1171;
        }));
        return $1170;
    };
    const Parser$spaces_text = x0 => Parser$spaces_text$(x0);

    function Fm$Parser$application$erased$(_init$1, _func$2) {
        var $1172 = Monad$bind$(Parser$monad)(Parser$get_index)((_init$3 => {
            var $1173 = Monad$bind$(Parser$monad)(Parser$text("<"))((_$4 => {
                var $1174 = Monad$bind$(Parser$monad)(Parser$until1$(Parser$spaces_text$(">"), Fm$Parser$item$(Fm$Parser$term)))((_args$5 => {
                    var $1175 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$3))((_orig$6 => {
                        var _expr$7 = (() => {
                            var $1178 = _func$2;
                            var $1179 = _args$5;
                            let _f$8 = $1178;
                            let _x$7;
                            while ($1179._ === 'List.cons') {
                                _x$7 = $1179.head;
                                var $1178 = Fm$Term$app$(_f$8, _x$7);
                                _f$8 = $1178;
                                $1179 = $1179.tail;
                            }
                            return _f$8;
                        })();
                        var $1176 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _expr$7));
                        return $1176;
                    }));
                    return $1175;
                }));
                return $1174;
            }));
            return $1173;
        }));
        return $1172;
    };
    const Fm$Parser$application$erased = x0 => x1 => Fm$Parser$application$erased$(x0, x1);

    function Fm$Parser$arrow$(_init$1, _xtyp$2) {
        var $1180 = Monad$bind$(Parser$monad)(Fm$Parser$text$("->"))((_$3 => {
            var $1181 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                var $1182 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $1183 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$all$(Bool$false, "", "", _xtyp$2, (_s$6 => _x$7 => {
                        var $1184 = _body$4;
                        return $1184;
                    }))));
                    return $1183;
                }));
                return $1182;
            }));
            return $1181;
        }));
        return $1180;
    };
    const Fm$Parser$arrow = x0 => x1 => Fm$Parser$arrow$(x0, x1);

    function Fm$Parser$op$(_sym$1, _ref$2, _init$3, _val0$4) {
        var $1185 = Monad$bind$(Parser$monad)(Fm$Parser$text$(_sym$1))((_$5 => {
            var $1186 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$6 => {
                var $1187 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$3))((_orig$7 => {
                    var _term$8 = Fm$Term$ref$(_ref$2);
                    var _term$9 = Fm$Term$app$(_term$8, _val0$4);
                    var _term$10 = Fm$Term$app$(_term$9, _val1$6);
                    var $1188 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$10));
                    return $1188;
                }));
                return $1187;
            }));
            return $1186;
        }));
        return $1185;
    };
    const Fm$Parser$op = x0 => x1 => x2 => x3 => Fm$Parser$op$(x0, x1, x2, x3);
    const Fm$Parser$add = Fm$Parser$op("+")("Nat.add");
    const Fm$Parser$sub = Fm$Parser$op("+")("Nat.add");
    const Fm$Parser$mul = Fm$Parser$op("*")("Nat.mul");
    const Fm$Parser$div = Fm$Parser$op("/")("Nat.div");
    const Fm$Parser$mod = Fm$Parser$op("%")("Nat.mod");

    function Fm$Parser$cons$(_init$1, _head$2) {
        var $1189 = Monad$bind$(Parser$monad)(Fm$Parser$text$("&"))((_$3 => {
            var $1190 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_tail$4 => {
                var $1191 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("List.cons");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _head$2);
                    var _term$9 = Fm$Term$app$(_term$8, _tail$4);
                    var $1192 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                        var $1193 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$9));
                        return $1193;
                    }));
                    return $1192;
                }));
                return $1191;
            }));
            return $1190;
        }));
        return $1189;
    };
    const Fm$Parser$cons = x0 => x1 => Fm$Parser$cons$(x0, x1);

    function Fm$Parser$concat$(_init$1, _lst0$2) {
        var $1194 = Monad$bind$(Parser$monad)(Fm$Parser$text$("++"))((_$3 => {
            var $1195 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_lst1$4 => {
                var $1196 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("List.concat");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _lst0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _lst1$4);
                    var $1197 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                        var $1198 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$9));
                        return $1198;
                    }));
                    return $1197;
                }));
                return $1196;
            }));
            return $1195;
        }));
        return $1194;
    };
    const Fm$Parser$concat = x0 => x1 => Fm$Parser$concat$(x0, x1);

    function Fm$Parser$string_concat$(_init$1, _str0$2) {
        var $1199 = Monad$bind$(Parser$monad)(Fm$Parser$text$("|"))((_$3 => {
            var $1200 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_str1$4 => {
                var $1201 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("String.concat");
                    var _term$7 = Fm$Term$app$(_term$6, _str0$2);
                    var _term$8 = Fm$Term$app$(_term$7, _str1$4);
                    var $1202 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$9 => {
                        var $1203 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, _term$8));
                        return $1203;
                    }));
                    return $1202;
                }));
                return $1201;
            }));
            return $1200;
        }));
        return $1199;
    };
    const Fm$Parser$string_concat = x0 => x1 => Fm$Parser$string_concat$(x0, x1);

    function Fm$Parser$sigma$(_init$1, _val0$2) {
        var $1204 = Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$3 => {
            var $1205 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $1206 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Sigma.new");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, Fm$Term$hol$(Bits$e));
                    var _term$9 = Fm$Term$app$(_term$8, _val0$2);
                    var _term$10 = Fm$Term$app$(_term$9, _val1$4);
                    var $1207 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$10));
                    return $1207;
                }));
                return $1206;
            }));
            return $1205;
        }));
        return $1204;
    };
    const Fm$Parser$sigma = x0 => x1 => Fm$Parser$sigma$(x0, x1);

    function Fm$Parser$equality$(_init$1, _val0$2) {
        var $1208 = Monad$bind$(Parser$monad)(Fm$Parser$text$("=="))((_$3 => {
            var $1209 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $1210 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Equal");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _val0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _val1$4);
                    var $1211 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$9));
                    return $1211;
                }));
                return $1210;
            }));
            return $1209;
        }));
        return $1208;
    };
    const Fm$Parser$equality = x0 => x1 => Fm$Parser$equality$(x0, x1);

    function Fm$Parser$inequality$(_init$1, _val0$2) {
        var $1212 = Monad$bind$(Parser$monad)(Fm$Parser$text$("!="))((_$3 => {
            var $1213 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $1214 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Equal");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _val0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _val1$4);
                    var _term$10 = Fm$Term$app$(Fm$Term$ref$("Not"), _term$9);
                    var $1215 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$10));
                    return $1215;
                }));
                return $1214;
            }));
            return $1213;
        }));
        return $1212;
    };
    const Fm$Parser$inequality = x0 => x1 => Fm$Parser$inequality$(x0, x1);

    function Fm$Parser$rewrite$(_init$1, _subt$2) {
        var $1216 = Monad$bind$(Parser$monad)(Fm$Parser$text$("::"))((_$3 => {
            var $1217 = Monad$bind$(Parser$monad)(Fm$Parser$text$("rewrite"))((_$4 => {
                var $1218 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$5 => {
                    var $1219 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$6 => {
                        var $1220 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$7 => {
                            var $1221 = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$8 => {
                                var $1222 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_iseq$9 => {
                                    var $1223 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                                        var _term$11 = Fm$Term$ref$("Equal.rewrite");
                                        var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                        var _term$13 = Fm$Term$app$(_term$12, Fm$Term$hol$(Bits$e));
                                        var _term$14 = Fm$Term$app$(_term$13, Fm$Term$hol$(Bits$e));
                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_name$5, (_x$15 => {
                                            var $1225 = _type$7;
                                            return $1225;
                                        })));
                                        var _term$16 = Fm$Term$app$(_term$15, _iseq$9);
                                        var _term$17 = Fm$Term$app$(_term$16, _subt$2);
                                        var $1224 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$17));
                                        return $1224;
                                    }));
                                    return $1223;
                                }));
                                return $1222;
                            }));
                            return $1221;
                        }));
                        return $1220;
                    }));
                    return $1219;
                }));
                return $1218;
            }));
            return $1217;
        }));
        return $1216;
    };
    const Fm$Parser$rewrite = x0 => x1 => Fm$Parser$rewrite$(x0, x1);

    function Fm$Term$ann$(_done$1, _term$2, _type$3) {
        var $1226 = ({
            _: 'Fm.Term.ann',
            'done': _done$1,
            'term': _term$2,
            'type': _type$3
        });
        return $1226;
    };
    const Fm$Term$ann = x0 => x1 => x2 => Fm$Term$ann$(x0, x1, x2);

    function Fm$Parser$annotation$(_init$1, _term$2) {
        var $1227 = Monad$bind$(Parser$monad)(Fm$Parser$text$("::"))((_$3 => {
            var $1228 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                var $1229 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $1230 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$ann$(Bool$false, _term$2, _type$4)));
                    return $1230;
                }));
                return $1229;
            }));
            return $1228;
        }));
        return $1227;
    };
    const Fm$Parser$annotation = x0 => x1 => Fm$Parser$annotation$(x0, x1);

    function Fm$Parser$suffix$(_init$1, _term$2, _idx$3, _code$4) {
        var Fm$Parser$suffix$ = (_init$1, _term$2, _idx$3, _code$4) => ({
            ctr: 'TCO',
            arg: [_init$1, _term$2, _idx$3, _code$4]
        });
        var Fm$Parser$suffix = _init$1 => _term$2 => _idx$3 => _code$4 => Fm$Parser$suffix$(_init$1, _term$2, _idx$3, _code$4);
        var arg = [_init$1, _term$2, _idx$3, _code$4];
        while (true) {
            let [_init$1, _term$2, _idx$3, _code$4] = arg;
            var R = (() => {
                var _suffix_parser$5 = Parser$first_of$(List$cons$(Fm$Parser$application$(_init$1, _term$2), List$cons$(Fm$Parser$application$erased$(_init$1, _term$2), List$cons$(Fm$Parser$arrow$(_init$1, _term$2), List$cons$(Fm$Parser$add(_init$1)(_term$2), List$cons$(Fm$Parser$sub(_init$1)(_term$2), List$cons$(Fm$Parser$mul(_init$1)(_term$2), List$cons$(Fm$Parser$div(_init$1)(_term$2), List$cons$(Fm$Parser$mod(_init$1)(_term$2), List$cons$(Fm$Parser$cons$(_init$1, _term$2), List$cons$(Fm$Parser$concat$(_init$1, _term$2), List$cons$(Fm$Parser$string_concat$(_init$1, _term$2), List$cons$(Fm$Parser$sigma$(_init$1, _term$2), List$cons$(Fm$Parser$equality$(_init$1, _term$2), List$cons$(Fm$Parser$inequality$(_init$1, _term$2), List$cons$(Fm$Parser$rewrite$(_init$1, _term$2), List$cons$(Fm$Parser$annotation$(_init$1, _term$2), List$nil)))))))))))))))));
                var self = _suffix_parser$5(_idx$3)(_code$4);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1232 = self.idx;
                        var $1233 = self.code;
                        var $1234 = self.err;
                        var $1235 = Parser$Reply$value$(_idx$3, _code$4, _term$2);
                        var $1231 = $1235;
                        break;
                    case 'Parser.Reply.value':
                        var $1236 = self.idx;
                        var $1237 = self.code;
                        var $1238 = self.val;
                        var $1239 = Fm$Parser$suffix$(_init$1, $1238, $1236, $1237);
                        var $1231 = $1239;
                        break;
                };
                return $1231;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Parser$suffix = x0 => x1 => x2 => x3 => Fm$Parser$suffix$(x0, x1, x2, x3);
    const Fm$Parser$term = Monad$bind$(Parser$monad)(Parser$get_code)((_code$1 => {
        var $1240 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $1241 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$type, List$cons$(Fm$Parser$forall, List$cons$(Fm$Parser$lambda, List$cons$(Fm$Parser$lambda$erased, List$cons$(Fm$Parser$lambda$nameless, List$cons$(Fm$Parser$parenthesis, List$cons$(Fm$Parser$letforrange$u32, List$cons$(Fm$Parser$letforin, List$cons$(Fm$Parser$let, List$cons$(Fm$Parser$get, List$cons$(Fm$Parser$def, List$cons$(Fm$Parser$if, List$cons$(Fm$Parser$char, List$cons$(Fm$Parser$string, List$cons$(Fm$Parser$pair, List$cons$(Fm$Parser$sigma$type, List$cons$(Fm$Parser$some, List$cons$(Fm$Parser$apply, List$cons$(Fm$Parser$list, List$cons$(Fm$Parser$log, List$cons$(Fm$Parser$forrange$u32, List$cons$(Fm$Parser$forrange$u32$2, List$cons$(Fm$Parser$forin, List$cons$(Fm$Parser$forin$2, List$cons$(Fm$Parser$do, List$cons$(Fm$Parser$case, List$cons$(Fm$Parser$open, List$cons$(Fm$Parser$goal, List$cons$(Fm$Parser$hole, List$cons$(Fm$Parser$u8, List$cons$(Fm$Parser$u16, List$cons$(Fm$Parser$u32, List$cons$(Fm$Parser$u64, List$cons$(Fm$Parser$nat, List$cons$(Fm$Parser$reference, List$nil)))))))))))))))))))))))))))))))))))))((_term$3 => {
                var $1242 = Fm$Parser$suffix(_init$2)(_term$3);
                return $1242;
            }));
            return $1241;
        }));
        return $1240;
    }));
    const Fm$Parser$name_term = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$1 => {
        var $1243 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $1244 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$3 => {
                var $1245 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _type$3));
                return $1245;
            }));
            return $1244;
        }));
        return $1243;
    }));

    function Fm$Binder$new$(_eras$1, _name$2, _term$3) {
        var $1246 = ({
            _: 'Fm.Binder.new',
            'eras': _eras$1,
            'name': _name$2,
            'term': _term$3
        });
        return $1246;
    };
    const Fm$Binder$new = x0 => x1 => x2 => Fm$Binder$new$(x0, x1, x2);

    function Fm$Parser$binder$homo$(_eras$1) {
        var $1247 = Monad$bind$(Parser$monad)(Fm$Parser$text$((() => {
            var self = _eras$1;
            if (self) {
                var $1248 = "<";
                return $1248;
            } else {
                var $1249 = "(";
                return $1249;
            };
        })()))((_$2 => {
            var $1250 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$((() => {
                var self = _eras$1;
                if (self) {
                    var $1251 = ">";
                    return $1251;
                } else {
                    var $1252 = ")";
                    return $1252;
                };
            })()), Fm$Parser$item$(Fm$Parser$name_term)))((_bind$3 => {
                var $1253 = Monad$pure$(Parser$monad)(List$mapped$(_bind$3, (_pair$4 => {
                    var self = _pair$4;
                    switch (self._) {
                        case 'Pair.new':
                            var $1255 = self.fst;
                            var $1256 = self.snd;
                            var $1257 = Fm$Binder$new$(_eras$1, $1255, $1256);
                            var $1254 = $1257;
                            break;
                    };
                    return $1254;
                })));
                return $1253;
            }));
            return $1250;
        }));
        return $1247;
    };
    const Fm$Parser$binder$homo = x0 => Fm$Parser$binder$homo$(x0);

    function List$concat$(_as$2, _bs$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $1259 = _bs$3;
                var $1258 = $1259;
                break;
            case 'List.cons':
                var $1260 = self.head;
                var $1261 = self.tail;
                var $1262 = List$cons$($1260, List$concat$($1261, _bs$3));
                var $1258 = $1262;
                break;
        };
        return $1258;
    };
    const List$concat = x0 => x1 => List$concat$(x0, x1);

    function List$flatten$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1264 = List$nil;
                var $1263 = $1264;
                break;
            case 'List.cons':
                var $1265 = self.head;
                var $1266 = self.tail;
                var $1267 = List$concat$($1265, List$flatten$($1266));
                var $1263 = $1267;
                break;
        };
        return $1263;
    };
    const List$flatten = x0 => List$flatten$(x0);
    const Fm$Parser$binder = Monad$bind$(Parser$monad)(Parser$many1$(Parser$first_of$(List$cons$(Fm$Parser$binder$homo$(Bool$true), List$cons$(Fm$Parser$binder$homo$(Bool$false), List$nil)))))((_lists$1 => {
        var $1268 = Monad$pure$(Parser$monad)(List$flatten$(_lists$1));
        return $1268;
    }));

    function Fm$Parser$make_forall$(_binds$1, _body$2) {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                var $1270 = _body$2;
                var $1269 = $1270;
                break;
            case 'List.cons':
                var $1271 = self.head;
                var $1272 = self.tail;
                var self = $1271;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1274 = self.eras;
                        var $1275 = self.name;
                        var $1276 = self.term;
                        var $1277 = Fm$Term$all$($1274, "", $1275, $1276, (_s$8 => _x$9 => {
                            var $1278 = Fm$Parser$make_forall$($1272, _body$2);
                            return $1278;
                        }));
                        var $1273 = $1277;
                        break;
                };
                var $1269 = $1273;
                break;
        };
        return $1269;
    };
    const Fm$Parser$make_forall = x0 => x1 => Fm$Parser$make_forall$(x0, x1);

    function List$at$(_index$2, _list$3) {
        var List$at$ = (_index$2, _list$3) => ({
            ctr: 'TCO',
            arg: [_index$2, _list$3]
        });
        var List$at = _index$2 => _list$3 => List$at$(_index$2, _list$3);
        var arg = [_index$2, _list$3];
        while (true) {
            let [_index$2, _list$3] = arg;
            var R = (() => {
                var self = _list$3;
                switch (self._) {
                    case 'List.nil':
                        var $1279 = Maybe$none;
                        return $1279;
                    case 'List.cons':
                        var $1280 = self.head;
                        var $1281 = self.tail;
                        var self = _index$2;
                        if (self === 0n) {
                            var $1283 = Maybe$some$($1280);
                            var $1282 = $1283;
                        } else {
                            var $1284 = (self - 1n);
                            var $1285 = List$at$($1284, $1281);
                            var $1282 = $1285;
                        };
                        return $1282;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$at = x0 => x1 => List$at$(x0, x1);

    function List$at_last$(_index$2, _list$3) {
        var $1286 = List$at$(_index$2, List$reverse$(_list$3));
        return $1286;
    };
    const List$at_last = x0 => x1 => List$at_last$(x0, x1);

    function Fm$Term$var$(_name$1, _indx$2) {
        var $1287 = ({
            _: 'Fm.Term.var',
            'name': _name$1,
            'indx': _indx$2
        });
        return $1287;
    };
    const Fm$Term$var = x0 => x1 => Fm$Term$var$(x0, x1);

    function Pair$snd$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $1289 = self.fst;
                var $1290 = self.snd;
                var $1291 = $1290;
                var $1288 = $1291;
                break;
        };
        return $1288;
    };
    const Pair$snd = x0 => Pair$snd$(x0);

    function Fm$Name$eql$(_a$1, _b$2) {
        var $1292 = (_a$1 === _b$2);
        return $1292;
    };
    const Fm$Name$eql = x0 => x1 => Fm$Name$eql$(x0, x1);

    function Fm$Context$find$(_name$1, _ctx$2) {
        var Fm$Context$find$ = (_name$1, _ctx$2) => ({
            ctr: 'TCO',
            arg: [_name$1, _ctx$2]
        });
        var Fm$Context$find = _name$1 => _ctx$2 => Fm$Context$find$(_name$1, _ctx$2);
        var arg = [_name$1, _ctx$2];
        while (true) {
            let [_name$1, _ctx$2] = arg;
            var R = (() => {
                var self = _ctx$2;
                switch (self._) {
                    case 'List.nil':
                        var $1293 = Maybe$none;
                        return $1293;
                    case 'List.cons':
                        var $1294 = self.head;
                        var $1295 = self.tail;
                        var self = $1294;
                        switch (self._) {
                            case 'Pair.new':
                                var $1297 = self.fst;
                                var $1298 = self.snd;
                                var self = Fm$Name$eql$(_name$1, $1297);
                                if (self) {
                                    var $1300 = Maybe$some$($1298);
                                    var $1299 = $1300;
                                } else {
                                    var $1301 = Fm$Context$find$(_name$1, $1295);
                                    var $1299 = $1301;
                                };
                                var $1296 = $1299;
                                break;
                        };
                        return $1296;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Context$find = x0 => x1 => Fm$Context$find$(x0, x1);

    function List$length$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1303 = 0n;
                var $1302 = $1303;
                break;
            case 'List.cons':
                var $1304 = self.head;
                var $1305 = self.tail;
                var $1306 = Nat$succ$(List$length$($1305));
                var $1302 = $1306;
                break;
        };
        return $1302;
    };
    const List$length = x0 => List$length$(x0);

    function Fm$Path$o$(_path$1, _x$2) {
        var $1307 = _path$1((_x$2 + '0'));
        return $1307;
    };
    const Fm$Path$o = x0 => x1 => Fm$Path$o$(x0, x1);

    function Fm$Path$i$(_path$1, _x$2) {
        var $1308 = _path$1((_x$2 + '1'));
        return $1308;
    };
    const Fm$Path$i = x0 => x1 => Fm$Path$i$(x0, x1);

    function Fm$Path$to_bits$(_path$1) {
        var $1309 = _path$1(Bits$e);
        return $1309;
    };
    const Fm$Path$to_bits = x0 => Fm$Path$to_bits$(x0);

    function Fm$Term$bind$(_vars$1, _path$2, _term$3) {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $1311 = self.name;
                var $1312 = self.indx;
                var self = List$at_last$($1312, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1314 = Fm$Term$var$($1311, $1312);
                        var $1313 = $1314;
                        break;
                    case 'Maybe.some':
                        var $1315 = self.value;
                        var $1316 = Pair$snd$($1315);
                        var $1313 = $1316;
                        break;
                };
                var $1310 = $1313;
                break;
            case 'Fm.Term.ref':
                var $1317 = self.name;
                var self = Fm$Context$find$($1317, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1319 = Fm$Term$ref$($1317);
                        var $1318 = $1319;
                        break;
                    case 'Maybe.some':
                        var $1320 = self.value;
                        var $1321 = $1320;
                        var $1318 = $1321;
                        break;
                };
                var $1310 = $1318;
                break;
            case 'Fm.Term.typ':
                var $1322 = Fm$Term$typ;
                var $1310 = $1322;
                break;
            case 'Fm.Term.all':
                var $1323 = self.eras;
                var $1324 = self.self;
                var $1325 = self.name;
                var $1326 = self.xtyp;
                var $1327 = self.body;
                var _vlen$9 = List$length$(_vars$1);
                var $1328 = Fm$Term$all$($1323, $1324, $1325, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1326), (_s$10 => _x$11 => {
                    var $1329 = Fm$Term$bind$(List$cons$(Pair$new$($1325, _x$11), List$cons$(Pair$new$($1324, _s$10), _vars$1)), Fm$Path$i(_path$2), $1327(Fm$Term$var$($1324, _vlen$9))(Fm$Term$var$($1325, Nat$succ$(_vlen$9))));
                    return $1329;
                }));
                var $1310 = $1328;
                break;
            case 'Fm.Term.lam':
                var $1330 = self.name;
                var $1331 = self.body;
                var _vlen$6 = List$length$(_vars$1);
                var $1332 = Fm$Term$lam$($1330, (_x$7 => {
                    var $1333 = Fm$Term$bind$(List$cons$(Pair$new$($1330, _x$7), _vars$1), Fm$Path$o(_path$2), $1331(Fm$Term$var$($1330, _vlen$6)));
                    return $1333;
                }));
                var $1310 = $1332;
                break;
            case 'Fm.Term.app':
                var $1334 = self.func;
                var $1335 = self.argm;
                var $1336 = Fm$Term$app$(Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1334), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1335));
                var $1310 = $1336;
                break;
            case 'Fm.Term.let':
                var $1337 = self.name;
                var $1338 = self.expr;
                var $1339 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1340 = Fm$Term$let$($1337, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1338), (_x$8 => {
                    var $1341 = Fm$Term$bind$(List$cons$(Pair$new$($1337, _x$8), _vars$1), Fm$Path$i(_path$2), $1339(Fm$Term$var$($1337, _vlen$7)));
                    return $1341;
                }));
                var $1310 = $1340;
                break;
            case 'Fm.Term.def':
                var $1342 = self.name;
                var $1343 = self.expr;
                var $1344 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1345 = Fm$Term$def$($1342, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1343), (_x$8 => {
                    var $1346 = Fm$Term$bind$(List$cons$(Pair$new$($1342, _x$8), _vars$1), Fm$Path$i(_path$2), $1344(Fm$Term$var$($1342, _vlen$7)));
                    return $1346;
                }));
                var $1310 = $1345;
                break;
            case 'Fm.Term.ann':
                var $1347 = self.done;
                var $1348 = self.term;
                var $1349 = self.type;
                var $1350 = Fm$Term$ann$($1347, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1348), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1349));
                var $1310 = $1350;
                break;
            case 'Fm.Term.gol':
                var $1351 = self.name;
                var $1352 = self.dref;
                var $1353 = self.verb;
                var $1354 = Fm$Term$gol$($1351, $1352, $1353);
                var $1310 = $1354;
                break;
            case 'Fm.Term.hol':
                var $1355 = self.path;
                var $1356 = Fm$Term$hol$(Fm$Path$to_bits$(_path$2));
                var $1310 = $1356;
                break;
            case 'Fm.Term.nat':
                var $1357 = self.natx;
                var $1358 = Fm$Term$nat$($1357);
                var $1310 = $1358;
                break;
            case 'Fm.Term.chr':
                var $1359 = self.chrx;
                var $1360 = Fm$Term$chr$($1359);
                var $1310 = $1360;
                break;
            case 'Fm.Term.str':
                var $1361 = self.strx;
                var $1362 = Fm$Term$str$($1361);
                var $1310 = $1362;
                break;
            case 'Fm.Term.cse':
                var $1363 = self.path;
                var $1364 = self.expr;
                var $1365 = self.name;
                var $1366 = self.with;
                var $1367 = self.cses;
                var $1368 = self.moti;
                var _expr$10 = Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1364);
                var _name$11 = $1365;
                var _wyth$12 = $1366;
                var _cses$13 = $1367;
                var _moti$14 = $1368;
                var $1369 = Fm$Term$cse$(Fm$Path$to_bits$(_path$2), _expr$10, _name$11, _wyth$12, _cses$13, _moti$14);
                var $1310 = $1369;
                break;
            case 'Fm.Term.ori':
                var $1370 = self.orig;
                var $1371 = self.expr;
                var $1372 = Fm$Term$ori$($1370, Fm$Term$bind$(_vars$1, _path$2, $1371));
                var $1310 = $1372;
                break;
        };
        return $1310;
    };
    const Fm$Term$bind = x0 => x1 => x2 => Fm$Term$bind$(x0, x1, x2);
    const Fm$Status$done = ({
        _: 'Fm.Status.done'
    });

    function Fm$set$(_name$2, _val$3, _map$4) {
        var $1373 = Map$set$((fm_name_to_bits(_name$2)), _val$3, _map$4);
        return $1373;
    };
    const Fm$set = x0 => x1 => x2 => Fm$set$(x0, x1, x2);

    function Fm$define$(_file$1, _code$2, _name$3, _term$4, _type$5, _done$6, _defs$7) {
        var self = _done$6;
        if (self) {
            var $1375 = Fm$Status$done;
            var _stat$8 = $1375;
        } else {
            var $1376 = Fm$Status$init;
            var _stat$8 = $1376;
        };
        var $1374 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$8), _defs$7);
        return $1374;
    };
    const Fm$define = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Fm$define$(x0, x1, x2, x3, x4, x5, x6);

    function Fm$Parser$file$def$(_file$1, _code$2, _defs$3) {
        var $1377 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
            var $1378 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$binder))((_args$5 => {
                var _args$6 = List$flatten$(_args$5);
                var $1379 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$7 => {
                    var $1380 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$8 => {
                        var $1381 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$9 => {
                            var _type$10 = Fm$Parser$make_forall$(_args$6, _type$8);
                            var _term$11 = Fm$Parser$make_lambda$(List$mapped$(_args$6, (_x$11 => {
                                var self = _x$11;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $1384 = self.eras;
                                        var $1385 = self.name;
                                        var $1386 = self.term;
                                        var $1387 = $1385;
                                        var $1383 = $1387;
                                        break;
                                };
                                return $1383;
                            })), _term$9);
                            var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                                var $1388 = (_x$12 + '1');
                                return $1388;
                            }), _type$10);
                            var _term$13 = Fm$Term$bind$(List$nil, (_x$13 => {
                                var $1389 = (_x$13 + '0');
                                return $1389;
                            }), _term$11);
                            var _defs$14 = Fm$define$(_file$1, _code$2, _name$4, _term$13, _type$12, Bool$false, _defs$3);
                            var $1382 = Monad$pure$(Parser$monad)(_defs$14);
                            return $1382;
                        }));
                        return $1381;
                    }));
                    return $1380;
                }));
                return $1379;
            }));
            return $1378;
        }));
        return $1377;
    };
    const Fm$Parser$file$def = x0 => x1 => x2 => Fm$Parser$file$def$(x0, x1, x2);

    function Maybe$default$(_a$2, _m$3) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $1391 = _a$2;
                var $1390 = $1391;
                break;
            case 'Maybe.some':
                var $1392 = self.value;
                var $1393 = $1392;
                var $1390 = $1393;
                break;
        };
        return $1390;
    };
    const Maybe$default = x0 => x1 => Maybe$default$(x0, x1);

    function Fm$Constructor$new$(_name$1, _args$2, _inds$3) {
        var $1394 = ({
            _: 'Fm.Constructor.new',
            'name': _name$1,
            'args': _args$2,
            'inds': _inds$3
        });
        return $1394;
    };
    const Fm$Constructor$new = x0 => x1 => x2 => Fm$Constructor$new$(x0, x1, x2);

    function Fm$Parser$constructor$(_namespace$1) {
        var $1395 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1396 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_args$3 => {
                var $1397 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1398 = Fm$Parser$binder;
                    return $1398;
                }))))((_inds$4 => {
                    var _args$5 = Maybe$default$(List$nil, _args$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1399 = Monad$pure$(Parser$monad)(Fm$Constructor$new$(_name$2, _args$5, _inds$6));
                    return $1399;
                }));
                return $1397;
            }));
            return $1396;
        }));
        return $1395;
    };
    const Fm$Parser$constructor = x0 => Fm$Parser$constructor$(x0);

    function Fm$Datatype$new$(_name$1, _pars$2, _inds$3, _ctrs$4) {
        var $1400 = ({
            _: 'Fm.Datatype.new',
            'name': _name$1,
            'pars': _pars$2,
            'inds': _inds$3,
            'ctrs': _ctrs$4
        });
        return $1400;
    };
    const Fm$Datatype$new = x0 => x1 => x2 => x3 => Fm$Datatype$new$(x0, x1, x2, x3);
    const Fm$Parser$datatype = Monad$bind$(Parser$monad)(Fm$Parser$text$("type "))((_$1 => {
        var $1401 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1402 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_pars$3 => {
                var $1403 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1404 = Fm$Parser$binder;
                    return $1404;
                }))))((_inds$4 => {
                    var _pars$5 = Maybe$default$(List$nil, _pars$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1405 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$7 => {
                        var $1406 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$item$(Fm$Parser$constructor$(_name$2))))((_ctrs$8 => {
                            var $1407 = Monad$pure$(Parser$monad)(Fm$Datatype$new$(_name$2, _pars$5, _inds$6, _ctrs$8));
                            return $1407;
                        }));
                        return $1406;
                    }));
                    return $1405;
                }));
                return $1403;
            }));
            return $1402;
        }));
        return $1401;
    }));

    function Fm$Datatype$build_term$motive$go$(_type$1, _name$2, _inds$3) {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1410 = self.name;
                        var $1411 = self.pars;
                        var $1412 = self.inds;
                        var $1413 = self.ctrs;
                        var _slf$8 = Fm$Term$ref$(_name$2);
                        var _slf$9 = (() => {
                            var $1416 = _slf$8;
                            var $1417 = $1411;
                            let _slf$10 = $1416;
                            let _var$9;
                            while ($1417._ === 'List.cons') {
                                _var$9 = $1417.head;
                                var $1416 = Fm$Term$app$(_slf$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1418 = self.eras;
                                            var $1419 = self.name;
                                            var $1420 = self.term;
                                            var $1421 = $1419;
                                            return $1421;
                                    };
                                })()));
                                _slf$10 = $1416;
                                $1417 = $1417.tail;
                            }
                            return _slf$10;
                        })();
                        var _slf$10 = (() => {
                            var $1423 = _slf$9;
                            var $1424 = $1412;
                            let _slf$11 = $1423;
                            let _var$10;
                            while ($1424._ === 'List.cons') {
                                _var$10 = $1424.head;
                                var $1423 = Fm$Term$app$(_slf$11, Fm$Term$ref$((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1425 = self.eras;
                                            var $1426 = self.name;
                                            var $1427 = self.term;
                                            var $1428 = $1426;
                                            return $1428;
                                    };
                                })()));
                                _slf$11 = $1423;
                                $1424 = $1424.tail;
                            }
                            return _slf$11;
                        })();
                        var $1414 = Fm$Term$all$(Bool$false, "", "", _slf$10, (_s$11 => _x$12 => {
                            var $1429 = Fm$Term$typ;
                            return $1429;
                        }));
                        var $1409 = $1414;
                        break;
                };
                var $1408 = $1409;
                break;
            case 'List.cons':
                var $1430 = self.head;
                var $1431 = self.tail;
                var self = $1430;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1433 = self.eras;
                        var $1434 = self.name;
                        var $1435 = self.term;
                        var $1436 = Fm$Term$all$($1433, "", $1434, $1435, (_s$9 => _x$10 => {
                            var $1437 = Fm$Datatype$build_term$motive$go$(_type$1, _name$2, $1431);
                            return $1437;
                        }));
                        var $1432 = $1436;
                        break;
                };
                var $1408 = $1432;
                break;
        };
        return $1408;
    };
    const Fm$Datatype$build_term$motive$go = x0 => x1 => x2 => Fm$Datatype$build_term$motive$go$(x0, x1, x2);

    function Fm$Datatype$build_term$motive$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1439 = self.name;
                var $1440 = self.pars;
                var $1441 = self.inds;
                var $1442 = self.ctrs;
                var $1443 = Fm$Datatype$build_term$motive$go$(_type$1, $1439, $1441);
                var $1438 = $1443;
                break;
        };
        return $1438;
    };
    const Fm$Datatype$build_term$motive = x0 => Fm$Datatype$build_term$motive$(x0);

    function Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, _args$3) {
        var self = _args$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1446 = self.name;
                        var $1447 = self.pars;
                        var $1448 = self.inds;
                        var $1449 = self.ctrs;
                        var self = _ctor$2;
                        switch (self._) {
                            case 'Fm.Constructor.new':
                                var $1451 = self.name;
                                var $1452 = self.args;
                                var $1453 = self.inds;
                                var _ret$11 = Fm$Term$ref$(Fm$Name$read$("P"));
                                var _ret$12 = (() => {
                                    var $1456 = _ret$11;
                                    var $1457 = $1453;
                                    let _ret$13 = $1456;
                                    let _var$12;
                                    while ($1457._ === 'List.cons') {
                                        _var$12 = $1457.head;
                                        var $1456 = Fm$Term$app$(_ret$13, (() => {
                                            var self = _var$12;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1458 = self.eras;
                                                    var $1459 = self.name;
                                                    var $1460 = self.term;
                                                    var $1461 = $1460;
                                                    return $1461;
                                            };
                                        })());
                                        _ret$13 = $1456;
                                        $1457 = $1457.tail;
                                    }
                                    return _ret$13;
                                })();
                                var _ctr$13 = String$flatten$(List$cons$($1446, List$cons$(Fm$Name$read$("."), List$cons$($1451, List$nil))));
                                var _slf$14 = Fm$Term$ref$(_ctr$13);
                                var _slf$15 = (() => {
                                    var $1463 = _slf$14;
                                    var $1464 = $1447;
                                    let _slf$16 = $1463;
                                    let _var$15;
                                    while ($1464._ === 'List.cons') {
                                        _var$15 = $1464.head;
                                        var $1463 = Fm$Term$app$(_slf$16, Fm$Term$ref$((() => {
                                            var self = _var$15;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1465 = self.eras;
                                                    var $1466 = self.name;
                                                    var $1467 = self.term;
                                                    var $1468 = $1466;
                                                    return $1468;
                                            };
                                        })()));
                                        _slf$16 = $1463;
                                        $1464 = $1464.tail;
                                    }
                                    return _slf$16;
                                })();
                                var _slf$16 = (() => {
                                    var $1470 = _slf$15;
                                    var $1471 = $1452;
                                    let _slf$17 = $1470;
                                    let _var$16;
                                    while ($1471._ === 'List.cons') {
                                        _var$16 = $1471.head;
                                        var $1470 = Fm$Term$app$(_slf$17, Fm$Term$ref$((() => {
                                            var self = _var$16;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1472 = self.eras;
                                                    var $1473 = self.name;
                                                    var $1474 = self.term;
                                                    var $1475 = $1473;
                                                    return $1475;
                                            };
                                        })()));
                                        _slf$17 = $1470;
                                        $1471 = $1471.tail;
                                    }
                                    return _slf$17;
                                })();
                                var $1454 = Fm$Term$app$(_ret$12, _slf$16);
                                var $1450 = $1454;
                                break;
                        };
                        var $1445 = $1450;
                        break;
                };
                var $1444 = $1445;
                break;
            case 'List.cons':
                var $1476 = self.head;
                var $1477 = self.tail;
                var self = $1476;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1479 = self.eras;
                        var $1480 = self.name;
                        var $1481 = self.term;
                        var _eras$9 = $1479;
                        var _name$10 = $1480;
                        var _xtyp$11 = $1481;
                        var _body$12 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1477);
                        var $1482 = Fm$Term$all$(_eras$9, "", _name$10, _xtyp$11, (_s$13 => _x$14 => {
                            var $1483 = _body$12;
                            return $1483;
                        }));
                        var $1478 = $1482;
                        break;
                };
                var $1444 = $1478;
                break;
        };
        return $1444;
    };
    const Fm$Datatype$build_term$constructor$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructor$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructor$(_type$1, _ctor$2) {
        var self = _ctor$2;
        switch (self._) {
            case 'Fm.Constructor.new':
                var $1485 = self.name;
                var $1486 = self.args;
                var $1487 = self.inds;
                var $1488 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1486);
                var $1484 = $1488;
                break;
        };
        return $1484;
    };
    const Fm$Datatype$build_term$constructor = x0 => x1 => Fm$Datatype$build_term$constructor$(x0, x1);

    function Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1491 = self.name;
                        var $1492 = self.pars;
                        var $1493 = self.inds;
                        var $1494 = self.ctrs;
                        var _ret$8 = Fm$Term$ref$(Fm$Name$read$("P"));
                        var _ret$9 = (() => {
                            var $1497 = _ret$8;
                            var $1498 = $1493;
                            let _ret$10 = $1497;
                            let _var$9;
                            while ($1498._ === 'List.cons') {
                                _var$9 = $1498.head;
                                var $1497 = Fm$Term$app$(_ret$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1499 = self.eras;
                                            var $1500 = self.name;
                                            var $1501 = self.term;
                                            var $1502 = $1500;
                                            return $1502;
                                    };
                                })()));
                                _ret$10 = $1497;
                                $1498 = $1498.tail;
                            }
                            return _ret$10;
                        })();
                        var $1495 = Fm$Term$app$(_ret$9, Fm$Term$ref$((_name$2 + ".Self")));
                        var $1490 = $1495;
                        break;
                };
                var $1489 = $1490;
                break;
            case 'List.cons':
                var $1503 = self.head;
                var $1504 = self.tail;
                var self = $1503;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1506 = self.name;
                        var $1507 = self.args;
                        var $1508 = self.inds;
                        var $1509 = Fm$Term$all$(Bool$false, "", $1506, Fm$Datatype$build_term$constructor$(_type$1, $1503), (_s$9 => _x$10 => {
                            var $1510 = Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, $1504);
                            return $1510;
                        }));
                        var $1505 = $1509;
                        break;
                };
                var $1489 = $1505;
                break;
        };
        return $1489;
    };
    const Fm$Datatype$build_term$constructors$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructors$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructors$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1512 = self.name;
                var $1513 = self.pars;
                var $1514 = self.inds;
                var $1515 = self.ctrs;
                var $1516 = Fm$Datatype$build_term$constructors$go$(_type$1, $1512, $1515);
                var $1511 = $1516;
                break;
        };
        return $1511;
    };
    const Fm$Datatype$build_term$constructors = x0 => Fm$Datatype$build_term$constructors$(x0);

    function Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1519 = Fm$Term$all$(Bool$true, (_name$2 + ".Self"), Fm$Name$read$("P"), Fm$Datatype$build_term$motive$(_type$1), (_s$5 => _x$6 => {
                            var $1520 = Fm$Datatype$build_term$constructors$(_type$1);
                            return $1520;
                        }));
                        var $1518 = $1519;
                        break;
                    case 'List.cons':
                        var $1521 = self.head;
                        var $1522 = self.tail;
                        var self = $1521;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1524 = self.eras;
                                var $1525 = self.name;
                                var $1526 = self.term;
                                var $1527 = Fm$Term$lam$($1525, (_x$10 => {
                                    var $1528 = Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, $1522);
                                    return $1528;
                                }));
                                var $1523 = $1527;
                                break;
                        };
                        var $1518 = $1523;
                        break;
                };
                var $1517 = $1518;
                break;
            case 'List.cons':
                var $1529 = self.head;
                var $1530 = self.tail;
                var self = $1529;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1532 = self.eras;
                        var $1533 = self.name;
                        var $1534 = self.term;
                        var $1535 = Fm$Term$lam$($1533, (_x$10 => {
                            var $1536 = Fm$Datatype$build_term$go$(_type$1, _name$2, $1530, _inds$4);
                            return $1536;
                        }));
                        var $1531 = $1535;
                        break;
                };
                var $1517 = $1531;
                break;
        };
        return $1517;
    };
    const Fm$Datatype$build_term$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_term$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_term$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1538 = self.name;
                var $1539 = self.pars;
                var $1540 = self.inds;
                var $1541 = self.ctrs;
                var $1542 = Fm$Datatype$build_term$go$(_type$1, $1538, $1539, $1540);
                var $1537 = $1542;
                break;
        };
        return $1537;
    };
    const Fm$Datatype$build_term = x0 => Fm$Datatype$build_term$(x0);

    function Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1545 = Fm$Term$typ;
                        var $1544 = $1545;
                        break;
                    case 'List.cons':
                        var $1546 = self.head;
                        var $1547 = self.tail;
                        var self = $1546;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1549 = self.eras;
                                var $1550 = self.name;
                                var $1551 = self.term;
                                var $1552 = Fm$Term$all$(Bool$false, "", $1550, $1551, (_s$10 => _x$11 => {
                                    var $1553 = Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, $1547);
                                    return $1553;
                                }));
                                var $1548 = $1552;
                                break;
                        };
                        var $1544 = $1548;
                        break;
                };
                var $1543 = $1544;
                break;
            case 'List.cons':
                var $1554 = self.head;
                var $1555 = self.tail;
                var self = $1554;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1557 = self.eras;
                        var $1558 = self.name;
                        var $1559 = self.term;
                        var $1560 = Fm$Term$all$(Bool$false, "", $1558, $1559, (_s$10 => _x$11 => {
                            var $1561 = Fm$Datatype$build_type$go$(_type$1, _name$2, $1555, _inds$4);
                            return $1561;
                        }));
                        var $1556 = $1560;
                        break;
                };
                var $1543 = $1556;
                break;
        };
        return $1543;
    };
    const Fm$Datatype$build_type$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_type$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_type$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1563 = self.name;
                var $1564 = self.pars;
                var $1565 = self.inds;
                var $1566 = self.ctrs;
                var $1567 = Fm$Datatype$build_type$go$(_type$1, $1563, $1564, $1565);
                var $1562 = $1567;
                break;
        };
        return $1562;
    };
    const Fm$Datatype$build_type = x0 => Fm$Datatype$build_type$(x0);

    function Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1570 = self.name;
                        var $1571 = self.args;
                        var $1572 = self.inds;
                        var _ret$7 = Fm$Term$ref$($1570);
                        var _ret$8 = (() => {
                            var $1575 = _ret$7;
                            var $1576 = $1571;
                            let _ret$9 = $1575;
                            let _arg$8;
                            while ($1576._ === 'List.cons') {
                                _arg$8 = $1576.head;
                                var $1575 = Fm$Term$app$(_ret$9, Fm$Term$ref$((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1577 = self.eras;
                                            var $1578 = self.name;
                                            var $1579 = self.term;
                                            var $1580 = $1578;
                                            return $1580;
                                    };
                                })()));
                                _ret$9 = $1575;
                                $1576 = $1576.tail;
                            }
                            return _ret$9;
                        })();
                        var $1573 = _ret$8;
                        var $1569 = $1573;
                        break;
                };
                var $1568 = $1569;
                break;
            case 'List.cons':
                var $1581 = self.head;
                var $1582 = self.tail;
                var self = $1581;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1584 = self.name;
                        var $1585 = self.args;
                        var $1586 = self.inds;
                        var $1587 = Fm$Term$lam$($1584, (_x$9 => {
                            var $1588 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1582);
                            return $1588;
                        }));
                        var $1583 = $1587;
                        break;
                };
                var $1568 = $1583;
                break;
        };
        return $1568;
    };
    const Fm$Constructor$build_term$opt$go = x0 => x1 => x2 => Fm$Constructor$build_term$opt$go$(x0, x1, x2);

    function Fm$Constructor$build_term$opt$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1590 = self.name;
                var $1591 = self.pars;
                var $1592 = self.inds;
                var $1593 = self.ctrs;
                var $1594 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1593);
                var $1589 = $1594;
                break;
        };
        return $1589;
    };
    const Fm$Constructor$build_term$opt = x0 => x1 => Fm$Constructor$build_term$opt$(x0, x1);

    function Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.nil':
                        var $1597 = Fm$Term$lam$(Fm$Name$read$("P"), (_x$6 => {
                            var $1598 = Fm$Constructor$build_term$opt$(_type$1, _ctor$2);
                            return $1598;
                        }));
                        var $1596 = $1597;
                        break;
                    case 'List.cons':
                        var $1599 = self.head;
                        var $1600 = self.tail;
                        var self = $1599;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1602 = self.eras;
                                var $1603 = self.name;
                                var $1604 = self.term;
                                var $1605 = Fm$Term$lam$($1603, (_x$11 => {
                                    var $1606 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, $1600);
                                    return $1606;
                                }));
                                var $1601 = $1605;
                                break;
                        };
                        var $1596 = $1601;
                        break;
                };
                var $1595 = $1596;
                break;
            case 'List.cons':
                var $1607 = self.head;
                var $1608 = self.tail;
                var self = $1607;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1610 = self.eras;
                        var $1611 = self.name;
                        var $1612 = self.term;
                        var $1613 = Fm$Term$lam$($1611, (_x$11 => {
                            var $1614 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, $1608, _args$5);
                            return $1614;
                        }));
                        var $1609 = $1613;
                        break;
                };
                var $1595 = $1609;
                break;
        };
        return $1595;
    };
    const Fm$Constructor$build_term$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_term$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_term$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1616 = self.name;
                var $1617 = self.pars;
                var $1618 = self.inds;
                var $1619 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1621 = self.name;
                        var $1622 = self.args;
                        var $1623 = self.inds;
                        var $1624 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, $1616, $1617, $1622);
                        var $1620 = $1624;
                        break;
                };
                var $1615 = $1620;
                break;
        };
        return $1615;
    };
    const Fm$Constructor$build_term = x0 => x1 => Fm$Constructor$build_term$(x0, x1);

    function Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.nil':
                        var self = _type$1;
                        switch (self._) {
                            case 'Fm.Datatype.new':
                                var $1628 = self.name;
                                var $1629 = self.pars;
                                var $1630 = self.inds;
                                var $1631 = self.ctrs;
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $1633 = self.name;
                                        var $1634 = self.args;
                                        var $1635 = self.inds;
                                        var _type$13 = Fm$Term$ref$(_name$3);
                                        var _type$14 = (() => {
                                            var $1638 = _type$13;
                                            var $1639 = $1629;
                                            let _type$15 = $1638;
                                            let _var$14;
                                            while ($1639._ === 'List.cons') {
                                                _var$14 = $1639.head;
                                                var $1638 = Fm$Term$app$(_type$15, Fm$Term$ref$((() => {
                                                    var self = _var$14;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1640 = self.eras;
                                                            var $1641 = self.name;
                                                            var $1642 = self.term;
                                                            var $1643 = $1641;
                                                            return $1643;
                                                    };
                                                })()));
                                                _type$15 = $1638;
                                                $1639 = $1639.tail;
                                            }
                                            return _type$15;
                                        })();
                                        var _type$15 = (() => {
                                            var $1645 = _type$14;
                                            var $1646 = $1635;
                                            let _type$16 = $1645;
                                            let _var$15;
                                            while ($1646._ === 'List.cons') {
                                                _var$15 = $1646.head;
                                                var $1645 = Fm$Term$app$(_type$16, (() => {
                                                    var self = _var$15;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1647 = self.eras;
                                                            var $1648 = self.name;
                                                            var $1649 = self.term;
                                                            var $1650 = $1649;
                                                            return $1650;
                                                    };
                                                })());
                                                _type$16 = $1645;
                                                $1646 = $1646.tail;
                                            }
                                            return _type$16;
                                        })();
                                        var $1636 = _type$15;
                                        var $1632 = $1636;
                                        break;
                                };
                                var $1627 = $1632;
                                break;
                        };
                        var $1626 = $1627;
                        break;
                    case 'List.cons':
                        var $1651 = self.head;
                        var $1652 = self.tail;
                        var self = $1651;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1654 = self.eras;
                                var $1655 = self.name;
                                var $1656 = self.term;
                                var $1657 = Fm$Term$all$($1654, "", $1655, $1656, (_s$11 => _x$12 => {
                                    var $1658 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, $1652);
                                    return $1658;
                                }));
                                var $1653 = $1657;
                                break;
                        };
                        var $1626 = $1653;
                        break;
                };
                var $1625 = $1626;
                break;
            case 'List.cons':
                var $1659 = self.head;
                var $1660 = self.tail;
                var self = $1659;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1662 = self.eras;
                        var $1663 = self.name;
                        var $1664 = self.term;
                        var $1665 = Fm$Term$all$($1662, "", $1663, $1664, (_s$11 => _x$12 => {
                            var $1666 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, $1660, _args$5);
                            return $1666;
                        }));
                        var $1661 = $1665;
                        break;
                };
                var $1625 = $1661;
                break;
        };
        return $1625;
    };
    const Fm$Constructor$build_type$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_type$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_type$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1668 = self.name;
                var $1669 = self.pars;
                var $1670 = self.inds;
                var $1671 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1673 = self.name;
                        var $1674 = self.args;
                        var $1675 = self.inds;
                        var $1676 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, $1668, $1669, $1674);
                        var $1672 = $1676;
                        break;
                };
                var $1667 = $1672;
                break;
        };
        return $1667;
    };
    const Fm$Constructor$build_type = x0 => x1 => Fm$Constructor$build_type$(x0, x1);

    function Fm$Parser$file$adt$(_file$1, _code$2, _defs$3) {
        var $1677 = Monad$bind$(Parser$monad)(Fm$Parser$datatype)((_adt$4 => {
            var self = _adt$4;
            switch (self._) {
                case 'Fm.Datatype.new':
                    var $1679 = self.name;
                    var $1680 = self.pars;
                    var $1681 = self.inds;
                    var $1682 = self.ctrs;
                    var _term$9 = Fm$Datatype$build_term$(_adt$4);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $1684 = (_x$10 + '1');
                        return $1684;
                    }), _term$9);
                    var _type$11 = Fm$Datatype$build_type$(_adt$4);
                    var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                        var $1685 = (_x$12 + '0');
                        return $1685;
                    }), _type$11);
                    var _defs$13 = Fm$define$(_file$1, _code$2, $1679, _term$10, _type$12, Bool$false, _defs$3);
                    var _defs$14 = List$fold$($1682, _defs$13, (_ctr$14 => _defs$15 => {
                        var _typ_name$16 = $1679;
                        var _ctr_name$17 = String$flatten$(List$cons$(_typ_name$16, List$cons$(Fm$Name$read$("."), List$cons$((() => {
                            var self = _ctr$14;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $1687 = self.name;
                                    var $1688 = self.args;
                                    var $1689 = self.inds;
                                    var $1690 = $1687;
                                    return $1690;
                            };
                        })(), List$nil))));
                        var _ctr_term$18 = Fm$Constructor$build_term$(_adt$4, _ctr$14);
                        var _ctr_term$19 = Fm$Term$bind$(List$nil, (_x$19 => {
                            var $1691 = (_x$19 + '1');
                            return $1691;
                        }), _ctr_term$18);
                        var _ctr_type$20 = Fm$Constructor$build_type$(_adt$4, _ctr$14);
                        var _ctr_type$21 = Fm$Term$bind$(List$nil, (_x$21 => {
                            var $1692 = (_x$21 + '0');
                            return $1692;
                        }), _ctr_type$20);
                        var $1686 = Fm$define$(_file$1, _code$2, _ctr_name$17, _ctr_term$19, _ctr_type$21, Bool$false, _defs$15);
                        return $1686;
                    }));
                    var $1683 = Monad$pure$(Parser$monad)(_defs$14);
                    var $1678 = $1683;
                    break;
            };
            return $1678;
        }));
        return $1677;
    };
    const Fm$Parser$file$adt = x0 => x1 => x2 => Fm$Parser$file$adt$(x0, x1, x2);

    function Parser$eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $1694 = Parser$Reply$value$(_idx$1, _code$2, Unit$new);
            var $1693 = $1694;
        } else {
            var $1695 = self.charCodeAt(0);
            var $1696 = self.slice(1);
            var $1697 = Parser$Reply$error$(_idx$1, _code$2, "Expected end-of-file.");
            var $1693 = $1697;
        };
        return $1693;
    };
    const Parser$eof = x0 => x1 => Parser$eof$(x0, x1);

    function Fm$Parser$file$end$(_file$1, _code$2, _defs$3) {
        var $1698 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$4 => {
            var $1699 = Monad$bind$(Parser$monad)(Parser$eof)((_$5 => {
                var $1700 = Monad$pure$(Parser$monad)(_defs$3);
                return $1700;
            }));
            return $1699;
        }));
        return $1698;
    };
    const Fm$Parser$file$end = x0 => x1 => x2 => Fm$Parser$file$end$(x0, x1, x2);

    function Fm$Parser$file$(_file$1, _code$2, _defs$3) {
        var $1701 = Monad$bind$(Parser$monad)(Parser$is_eof)((_stop$4 => {
            var self = _stop$4;
            if (self) {
                var $1703 = Monad$pure$(Parser$monad)(_defs$3);
                var $1702 = $1703;
            } else {
                var $1704 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("#"))((_$5 => {
                    var $1705 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_file$6 => {
                        var $1706 = Fm$Parser$file$(_file$6, _code$2, _defs$3);
                        return $1706;
                    }));
                    return $1705;
                })), List$cons$(Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$file$def$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$adt$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$end$(_file$1, _code$2, _defs$3), List$nil)))))((_defs$5 => {
                    var $1707 = Fm$Parser$file$(_file$1, _code$2, _defs$5);
                    return $1707;
                })), List$nil)));
                var $1702 = $1704;
            };
            return $1702;
        }));
        return $1701;
    };
    const Fm$Parser$file = x0 => x1 => x2 => Fm$Parser$file$(x0, x1, x2);

    function Either$(_A$1, _B$2) {
        var $1708 = null;
        return $1708;
    };
    const Either = x0 => x1 => Either$(x0, x1);

    function String$join$go$(_sep$1, _list$2, _fst$3) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $1710 = "";
                var $1709 = $1710;
                break;
            case 'List.cons':
                var $1711 = self.head;
                var $1712 = self.tail;
                var $1713 = String$flatten$(List$cons$((() => {
                    var self = _fst$3;
                    if (self) {
                        var $1714 = "";
                        return $1714;
                    } else {
                        var $1715 = _sep$1;
                        return $1715;
                    };
                })(), List$cons$($1711, List$cons$(String$join$go$(_sep$1, $1712, Bool$false), List$nil))));
                var $1709 = $1713;
                break;
        };
        return $1709;
    };
    const String$join$go = x0 => x1 => x2 => String$join$go$(x0, x1, x2);

    function String$join$(_sep$1, _list$2) {
        var $1716 = String$join$go$(_sep$1, _list$2, Bool$true);
        return $1716;
    };
    const String$join = x0 => x1 => String$join$(x0, x1);

    function Fm$highlight$end$(_col$1, _row$2, _res$3) {
        var $1717 = String$join$("\u{a}", _res$3);
        return $1717;
    };
    const Fm$highlight$end = x0 => x1 => x2 => Fm$highlight$end$(x0, x1, x2);

    function Maybe$extract$(_m$2, _a$4, _f$5) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1719 = _a$4;
                var $1718 = $1719;
                break;
            case 'Maybe.some':
                var $1720 = self.value;
                var $1721 = _f$5($1720);
                var $1718 = $1721;
                break;
        };
        return $1718;
    };
    const Maybe$extract = x0 => x1 => x2 => Maybe$extract$(x0, x1, x2);

    function Nat$is_zero$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1723 = Bool$true;
            var $1722 = $1723;
        } else {
            var $1724 = (self - 1n);
            var $1725 = Bool$false;
            var $1722 = $1725;
        };
        return $1722;
    };
    const Nat$is_zero = x0 => Nat$is_zero$(x0);

    function Nat$double$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1727 = Nat$zero;
            var $1726 = $1727;
        } else {
            var $1728 = (self - 1n);
            var $1729 = Nat$succ$(Nat$succ$(Nat$double$($1728)));
            var $1726 = $1729;
        };
        return $1726;
    };
    const Nat$double = x0 => Nat$double$(x0);

    function Nat$pred$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1731 = Nat$zero;
            var $1730 = $1731;
        } else {
            var $1732 = (self - 1n);
            var $1733 = $1732;
            var $1730 = $1733;
        };
        return $1730;
    };
    const Nat$pred = x0 => Nat$pred$(x0);

    function List$take$(_n$2, _xs$3) {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                var $1735 = List$nil;
                var $1734 = $1735;
                break;
            case 'List.cons':
                var $1736 = self.head;
                var $1737 = self.tail;
                var self = _n$2;
                if (self === 0n) {
                    var $1739 = List$nil;
                    var $1738 = $1739;
                } else {
                    var $1740 = (self - 1n);
                    var $1741 = List$cons$($1736, List$take$($1740, $1737));
                    var $1738 = $1741;
                };
                var $1734 = $1738;
                break;
        };
        return $1734;
    };
    const List$take = x0 => x1 => List$take$(x0, x1);

    function String$reverse$go$(_xs$1, _res$2) {
        var String$reverse$go$ = (_xs$1, _res$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var String$reverse$go = _xs$1 => _res$2 => String$reverse$go$(_xs$1, _res$2);
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                if (self.length === 0) {
                    var $1742 = _res$2;
                    return $1742;
                } else {
                    var $1743 = self.charCodeAt(0);
                    var $1744 = self.slice(1);
                    var $1745 = String$reverse$go$($1744, String$cons$($1743, _res$2));
                    return $1745;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$reverse$go = x0 => x1 => String$reverse$go$(x0, x1);

    function String$reverse$(_xs$1) {
        var $1746 = String$reverse$go$(_xs$1, String$nil);
        return $1746;
    };
    const String$reverse = x0 => String$reverse$(x0);

    function String$pad_right$(_size$1, _chr$2, _str$3) {
        var self = _size$1;
        if (self === 0n) {
            var $1748 = _str$3;
            var $1747 = $1748;
        } else {
            var $1749 = (self - 1n);
            var self = _str$3;
            if (self.length === 0) {
                var $1751 = String$cons$(_chr$2, String$pad_right$($1749, _chr$2, ""));
                var $1750 = $1751;
            } else {
                var $1752 = self.charCodeAt(0);
                var $1753 = self.slice(1);
                var $1754 = String$cons$($1752, String$pad_right$($1749, _chr$2, $1753));
                var $1750 = $1754;
            };
            var $1747 = $1750;
        };
        return $1747;
    };
    const String$pad_right = x0 => x1 => x2 => String$pad_right$(x0, x1, x2);

    function String$pad_left$(_size$1, _chr$2, _str$3) {
        var $1755 = String$reverse$(String$pad_right$(_size$1, _chr$2, String$reverse$(_str$3)));
        return $1755;
    };
    const String$pad_left = x0 => x1 => x2 => String$pad_left$(x0, x1, x2);

    function Either$left$(_value$3) {
        var $1756 = ({
            _: 'Either.left',
            'value': _value$3
        });
        return $1756;
    };
    const Either$left = x0 => Either$left$(x0);

    function Either$right$(_value$3) {
        var $1757 = ({
            _: 'Either.right',
            'value': _value$3
        });
        return $1757;
    };
    const Either$right = x0 => Either$right$(x0);

    function Nat$sub_rem$(_n$1, _m$2) {
        var Nat$sub_rem$ = (_n$1, _m$2) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2]
        });
        var Nat$sub_rem = _n$1 => _m$2 => Nat$sub_rem$(_n$1, _m$2);
        var arg = [_n$1, _m$2];
        while (true) {
            let [_n$1, _m$2] = arg;
            var R = (() => {
                var self = _m$2;
                if (self === 0n) {
                    var $1758 = Either$left$(_n$1);
                    return $1758;
                } else {
                    var $1759 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $1761 = Either$right$(Nat$succ$($1759));
                        var $1760 = $1761;
                    } else {
                        var $1762 = (self - 1n);
                        var $1763 = Nat$sub_rem$($1762, $1759);
                        var $1760 = $1763;
                    };
                    return $1760;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$sub_rem = x0 => x1 => Nat$sub_rem$(x0, x1);

    function Nat$div_mod$go$(_n$1, _m$2, _d$3) {
        var Nat$div_mod$go$ = (_n$1, _m$2, _d$3) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2, _d$3]
        });
        var Nat$div_mod$go = _n$1 => _m$2 => _d$3 => Nat$div_mod$go$(_n$1, _m$2, _d$3);
        var arg = [_n$1, _m$2, _d$3];
        while (true) {
            let [_n$1, _m$2, _d$3] = arg;
            var R = (() => {
                var self = Nat$sub_rem$(_n$1, _m$2);
                switch (self._) {
                    case 'Either.left':
                        var $1764 = self.value;
                        var $1765 = Nat$div_mod$go$($1764, _m$2, Nat$succ$(_d$3));
                        return $1765;
                    case 'Either.right':
                        var $1766 = self.value;
                        var $1767 = Pair$new$(_d$3, _n$1);
                        return $1767;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$div_mod$go = x0 => x1 => x2 => Nat$div_mod$go$(x0, x1, x2);
    const Nat$div_mod = a0 => a1 => (({
        _: 'Pair.new',
        'fst': a0 / a1,
        'snd': a0 % a1
    }));

    function Nat$to_base$go$(_base$1, _nat$2, _res$3) {
        var Nat$to_base$go$ = (_base$1, _nat$2, _res$3) => ({
            ctr: 'TCO',
            arg: [_base$1, _nat$2, _res$3]
        });
        var Nat$to_base$go = _base$1 => _nat$2 => _res$3 => Nat$to_base$go$(_base$1, _nat$2, _res$3);
        var arg = [_base$1, _nat$2, _res$3];
        while (true) {
            let [_base$1, _nat$2, _res$3] = arg;
            var R = (() => {
                var self = (({
                    _: 'Pair.new',
                    'fst': _nat$2 / _base$1,
                    'snd': _nat$2 % _base$1
                }));
                switch (self._) {
                    case 'Pair.new':
                        var $1768 = self.fst;
                        var $1769 = self.snd;
                        var self = $1768;
                        if (self === 0n) {
                            var $1771 = List$cons$($1769, _res$3);
                            var $1770 = $1771;
                        } else {
                            var $1772 = (self - 1n);
                            var $1773 = Nat$to_base$go$(_base$1, $1768, List$cons$($1769, _res$3));
                            var $1770 = $1773;
                        };
                        return $1770;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$to_base$go = x0 => x1 => x2 => Nat$to_base$go$(x0, x1, x2);

    function Nat$to_base$(_base$1, _nat$2) {
        var $1774 = Nat$to_base$go$(_base$1, _nat$2, List$nil);
        return $1774;
    };
    const Nat$to_base = x0 => x1 => Nat$to_base$(x0, x1);

    function Nat$mod$go$(_n$1, _m$2, _r$3) {
        var Nat$mod$go$ = (_n$1, _m$2, _r$3) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2, _r$3]
        });
        var Nat$mod$go = _n$1 => _m$2 => _r$3 => Nat$mod$go$(_n$1, _m$2, _r$3);
        var arg = [_n$1, _m$2, _r$3];
        while (true) {
            let [_n$1, _m$2, _r$3] = arg;
            var R = (() => {
                var self = _m$2;
                if (self === 0n) {
                    var $1775 = Nat$mod$go$(_n$1, _r$3, _m$2);
                    return $1775;
                } else {
                    var $1776 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $1778 = _r$3;
                        var $1777 = $1778;
                    } else {
                        var $1779 = (self - 1n);
                        var $1780 = Nat$mod$go$($1779, $1776, Nat$succ$(_r$3));
                        var $1777 = $1780;
                    };
                    return $1777;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$mod$go = x0 => x1 => x2 => Nat$mod$go$(x0, x1, x2);

    function Nat$mod$(_n$1, _m$2) {
        var $1781 = Nat$mod$go$(_n$1, _m$2, 0n);
        return $1781;
    };
    const Nat$mod = x0 => x1 => Nat$mod$(x0, x1);
    const Nat$lte = a0 => a1 => (a0 <= a1);

    function Nat$show_digit$(_base$1, _n$2) {
        var _m$3 = Nat$mod$(_n$2, _base$1);
        var _base64$4 = List$cons$(48, List$cons$(49, List$cons$(50, List$cons$(51, List$cons$(52, List$cons$(53, List$cons$(54, List$cons$(55, List$cons$(56, List$cons$(57, List$cons$(65, List$cons$(66, List$cons$(67, List$cons$(68, List$cons$(69, List$cons$(70, List$cons$(71, List$cons$(72, List$cons$(73, List$cons$(74, List$cons$(75, List$cons$(76, List$cons$(77, List$cons$(78, List$cons$(79, List$cons$(80, List$cons$(81, List$cons$(82, List$cons$(83, List$cons$(84, List$cons$(85, List$cons$(86, List$cons$(87, List$cons$(88, List$cons$(89, List$cons$(90, List$cons$(97, List$cons$(98, List$cons$(99, List$cons$(100, List$cons$(101, List$cons$(102, List$cons$(103, List$cons$(104, List$cons$(105, List$cons$(106, List$cons$(107, List$cons$(108, List$cons$(109, List$cons$(110, List$cons$(111, List$cons$(112, List$cons$(113, List$cons$(114, List$cons$(115, List$cons$(116, List$cons$(117, List$cons$(118, List$cons$(119, List$cons$(120, List$cons$(121, List$cons$(122, List$cons$(43, List$cons$(47, List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
        var self = ((_base$1 > 0n) && (_base$1 <= 64n));
        if (self) {
            var self = List$at$(_m$3, _base64$4);
            switch (self._) {
                case 'Maybe.none':
                    var $1784 = 35;
                    var $1783 = $1784;
                    break;
                case 'Maybe.some':
                    var $1785 = self.value;
                    var $1786 = $1785;
                    var $1783 = $1786;
                    break;
            };
            var $1782 = $1783;
        } else {
            var $1787 = 35;
            var $1782 = $1787;
        };
        return $1782;
    };
    const Nat$show_digit = x0 => x1 => Nat$show_digit$(x0, x1);

    function Nat$to_string_base$(_base$1, _nat$2) {
        var $1788 = List$fold$(Nat$to_base$(_base$1, _nat$2), String$nil, (_n$3 => _str$4 => {
            var $1789 = String$cons$(Nat$show_digit$(_base$1, _n$3), _str$4);
            return $1789;
        }));
        return $1788;
    };
    const Nat$to_string_base = x0 => x1 => Nat$to_string_base$(x0, x1);

    function Nat$show$(_n$1) {
        var $1790 = Nat$to_string_base$(10n, _n$1);
        return $1790;
    };
    const Nat$show = x0 => Nat$show$(x0);
    const Bool$not = a0 => (!a0);

    function Fm$color$(_col$1, _str$2) {
        var $1791 = String$cons$(27, String$cons$(91, (_col$1 + String$cons$(109, (_str$2 + String$cons$(27, String$cons$(91, String$cons$(48, String$cons$(109, String$nil)))))))));
        return $1791;
    };
    const Fm$color = x0 => x1 => Fm$color$(x0, x1);

    function Fm$highlight$tc$(_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8) {
        var Fm$highlight$tc$ = (_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8) => ({
            ctr: 'TCO',
            arg: [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8]
        });
        var Fm$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => Fm$highlight$tc$(_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8);
        var arg = [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8];
        while (true) {
            let [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8] = arg;
            var R = (() => {
                var self = _code$1;
                if (self.length === 0) {
                    var $1792 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                    return $1792;
                } else {
                    var $1793 = self.charCodeAt(0);
                    var $1794 = self.slice(1);
                    var self = ($1793 === 10);
                    if (self) {
                        var _stp$11 = Maybe$extract$(_lft$6, Bool$false, Nat$is_zero);
                        var self = _stp$11;
                        if (self) {
                            var $1797 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                            var $1796 = $1797;
                        } else {
                            var _spa$12 = 3n;
                            var _siz$13 = Nat$succ$(Nat$double$(_spa$12));
                            var self = _ix1$3;
                            if (self === 0n) {
                                var self = _lft$6;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $1800 = Maybe$some$(_spa$12);
                                        var $1799 = $1800;
                                        break;
                                    case 'Maybe.some':
                                        var $1801 = self.value;
                                        var $1802 = Maybe$some$(Nat$pred$($1801));
                                        var $1799 = $1802;
                                        break;
                                };
                                var _lft$14 = $1799;
                            } else {
                                var $1803 = (self - 1n);
                                var $1804 = _lft$6;
                                var _lft$14 = $1804;
                            };
                            var _ix0$15 = Nat$pred$(_ix0$2);
                            var _ix1$16 = Nat$pred$(_ix1$3);
                            var _col$17 = 0n;
                            var _row$18 = Nat$succ$(_row$5);
                            var _res$19 = List$take$(_siz$13, List$cons$(String$reverse$(_lin$7), _res$8));
                            var _lin$20 = String$reverse$(String$flatten$(List$cons$(String$pad_left$(4n, 32, Nat$show$(_row$18)), List$cons$(" | ", List$nil))));
                            var $1798 = Fm$highlight$tc$($1794, _ix0$15, _ix1$16, _col$17, _row$18, _lft$14, _lin$20, _res$19);
                            var $1796 = $1798;
                        };
                        var $1795 = $1796;
                    } else {
                        var _chr$11 = String$cons$($1793, String$nil);
                        var self = (Nat$is_zero$(_ix0$2) && (!Nat$is_zero$(_ix1$3)));
                        if (self) {
                            var $1806 = String$reverse$(Fm$color$("31", Fm$color$("4", _chr$11)));
                            var _chr$12 = $1806;
                        } else {
                            var $1807 = _chr$11;
                            var _chr$12 = $1807;
                        };
                        var _ix0$13 = Nat$pred$(_ix0$2);
                        var _ix1$14 = Nat$pred$(_ix1$3);
                        var _col$15 = Nat$succ$(_col$4);
                        var _lin$16 = String$flatten$(List$cons$(_chr$12, List$cons$(_lin$7, List$nil)));
                        var $1805 = Fm$highlight$tc$($1794, _ix0$13, _ix1$14, _col$15, _row$5, _lft$6, _lin$16, _res$8);
                        var $1795 = $1805;
                    };
                    return $1795;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$highlight$tc = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$highlight$tc$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$highlight$(_code$1, _idx0$2, _idx1$3) {
        var $1808 = Fm$highlight$tc$(_code$1, _idx0$2, _idx1$3, 0n, 1n, Maybe$none, String$reverse$("   1 | "), List$nil);
        return $1808;
    };
    const Fm$highlight = x0 => x1 => x2 => Fm$highlight$(x0, x1, x2);

    function Fm$Defs$read$(_file$1, _code$2, _defs$3) {
        var self = Fm$Parser$file$(_file$1, _code$2, _defs$3)(0n)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1810 = self.idx;
                var $1811 = self.code;
                var $1812 = self.err;
                var _err$7 = $1812;
                var _hig$8 = Fm$highlight$(_code$2, $1810, Nat$succ$($1810));
                var _str$9 = String$flatten$(List$cons$(_err$7, List$cons$("\u{a}", List$cons$(_hig$8, List$nil))));
                var $1813 = Either$left$(_str$9);
                var $1809 = $1813;
                break;
            case 'Parser.Reply.value':
                var $1814 = self.idx;
                var $1815 = self.code;
                var $1816 = self.val;
                var $1817 = Either$right$($1816);
                var $1809 = $1817;
                break;
        };
        return $1809;
    };
    const Fm$Defs$read = x0 => x1 => x2 => Fm$Defs$read$(x0, x1, x2);

    function Fm$Synth$load$(_name$1, _defs$2) {
        var _file$3 = Fm$Synth$file_of$(_name$1);
        var $1818 = Monad$bind$(IO$monad)(IO$get_file$(_file$3))((_code$4 => {
            var _read$5 = Fm$Defs$read$(_file$3, _code$4, _defs$2);
            var self = _read$5;
            switch (self._) {
                case 'Either.left':
                    var $1820 = self.value;
                    var $1821 = Monad$pure$(IO$monad)(Maybe$none);
                    var $1819 = $1821;
                    break;
                case 'Either.right':
                    var $1822 = self.value;
                    var _defs$7 = $1822;
                    var self = Fm$get$(_name$1, _defs$7);
                    switch (self._) {
                        case 'Maybe.none':
                            var $1824 = Monad$pure$(IO$monad)(Maybe$none);
                            var $1823 = $1824;
                            break;
                        case 'Maybe.some':
                            var $1825 = self.value;
                            var $1826 = Monad$pure$(IO$monad)(Maybe$some$(_defs$7));
                            var $1823 = $1826;
                            break;
                    };
                    var $1819 = $1823;
                    break;
            };
            return $1819;
        }));
        return $1818;
    };
    const Fm$Synth$load = x0 => x1 => Fm$Synth$load$(x0, x1);

    function IO$print$(_text$1) {
        var $1827 = IO$ask$("print", _text$1, (_skip$2 => {
            var $1828 = IO$end$(Unit$new);
            return $1828;
        }));
        return $1827;
    };
    const IO$print = x0 => IO$print$(x0);
    const Fm$Status$wait = ({
        _: 'Fm.Status.wait'
    });

    function Fm$Check$(_V$1) {
        var $1829 = null;
        return $1829;
    };
    const Fm$Check = x0 => Fm$Check$(x0);

    function Fm$Check$result$(_value$2, _errors$3) {
        var $1830 = ({
            _: 'Fm.Check.result',
            'value': _value$2,
            'errors': _errors$3
        });
        return $1830;
    };
    const Fm$Check$result = x0 => x1 => Fm$Check$result$(x0, x1);

    function Fm$Check$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'Fm.Check.result':
                var $1832 = self.value;
                var $1833 = self.errors;
                var self = $1832;
                switch (self._) {
                    case 'Maybe.none':
                        var $1835 = Fm$Check$result$(Maybe$none, $1833);
                        var $1834 = $1835;
                        break;
                    case 'Maybe.some':
                        var $1836 = self.value;
                        var self = _f$4($1836);
                        switch (self._) {
                            case 'Fm.Check.result':
                                var $1838 = self.value;
                                var $1839 = self.errors;
                                var $1840 = Fm$Check$result$($1838, List$concat$($1833, $1839));
                                var $1837 = $1840;
                                break;
                        };
                        var $1834 = $1837;
                        break;
                };
                var $1831 = $1834;
                break;
        };
        return $1831;
    };
    const Fm$Check$bind = x0 => x1 => Fm$Check$bind$(x0, x1);

    function Fm$Check$pure$(_value$2) {
        var $1841 = Fm$Check$result$(Maybe$some$(_value$2), List$nil);
        return $1841;
    };
    const Fm$Check$pure = x0 => Fm$Check$pure$(x0);
    const Fm$Check$monad = Monad$new$(Fm$Check$bind, Fm$Check$pure);

    function Fm$Error$undefined_reference$(_origin$1, _name$2) {
        var $1842 = ({
            _: 'Fm.Error.undefined_reference',
            'origin': _origin$1,
            'name': _name$2
        });
        return $1842;
    };
    const Fm$Error$undefined_reference = x0 => x1 => Fm$Error$undefined_reference$(x0, x1);

    function Fm$Error$waiting$(_name$1) {
        var $1843 = ({
            _: 'Fm.Error.waiting',
            'name': _name$1
        });
        return $1843;
    };
    const Fm$Error$waiting = x0 => Fm$Error$waiting$(x0);

    function Fm$Error$indirect$(_name$1) {
        var $1844 = ({
            _: 'Fm.Error.indirect',
            'name': _name$1
        });
        return $1844;
    };
    const Fm$Error$indirect = x0 => Fm$Error$indirect$(x0);

    function Maybe$mapped$(_m$2, _f$4) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1846 = Maybe$none;
                var $1845 = $1846;
                break;
            case 'Maybe.some':
                var $1847 = self.value;
                var $1848 = Maybe$some$(_f$4($1847));
                var $1845 = $1848;
                break;
        };
        return $1845;
    };
    const Maybe$mapped = x0 => x1 => Maybe$mapped$(x0, x1);

    function Fm$MPath$o$(_path$1) {
        var $1849 = Maybe$mapped$(_path$1, Fm$Path$o);
        return $1849;
    };
    const Fm$MPath$o = x0 => Fm$MPath$o$(x0);

    function Fm$MPath$i$(_path$1) {
        var $1850 = Maybe$mapped$(_path$1, Fm$Path$i);
        return $1850;
    };
    const Fm$MPath$i = x0 => Fm$MPath$i$(x0);

    function Fm$Error$patch$(_path$1, _term$2) {
        var $1851 = ({
            _: 'Fm.Error.patch',
            'path': _path$1,
            'term': _term$2
        });
        return $1851;
    };
    const Fm$Error$patch = x0 => x1 => Fm$Error$patch$(x0, x1);

    function Fm$MPath$to_bits$(_path$1) {
        var self = _path$1;
        switch (self._) {
            case 'Maybe.none':
                var $1853 = Bits$e;
                var $1852 = $1853;
                break;
            case 'Maybe.some':
                var $1854 = self.value;
                var $1855 = $1854(Bits$e);
                var $1852 = $1855;
                break;
        };
        return $1852;
    };
    const Fm$MPath$to_bits = x0 => Fm$MPath$to_bits$(x0);

    function Fm$Error$type_mismatch$(_origin$1, _expected$2, _detected$3, _context$4) {
        var $1856 = ({
            _: 'Fm.Error.type_mismatch',
            'origin': _origin$1,
            'expected': _expected$2,
            'detected': _detected$3,
            'context': _context$4
        });
        return $1856;
    };
    const Fm$Error$type_mismatch = x0 => x1 => x2 => x3 => Fm$Error$type_mismatch$(x0, x1, x2, x3);

    function Fm$Error$show_goal$(_name$1, _dref$2, _verb$3, _goal$4, _context$5) {
        var $1857 = ({
            _: 'Fm.Error.show_goal',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3,
            'goal': _goal$4,
            'context': _context$5
        });
        return $1857;
    };
    const Fm$Error$show_goal = x0 => x1 => x2 => x3 => x4 => Fm$Error$show_goal$(x0, x1, x2, x3, x4);

    function Fm$Term$normalize$(_term$1, _defs$2) {
        var self = Fm$Term$reduce$(_term$1, _defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $1859 = self.name;
                var $1860 = self.indx;
                var $1861 = Fm$Term$var$($1859, $1860);
                var $1858 = $1861;
                break;
            case 'Fm.Term.ref':
                var $1862 = self.name;
                var $1863 = Fm$Term$ref$($1862);
                var $1858 = $1863;
                break;
            case 'Fm.Term.typ':
                var $1864 = Fm$Term$typ;
                var $1858 = $1864;
                break;
            case 'Fm.Term.all':
                var $1865 = self.eras;
                var $1866 = self.self;
                var $1867 = self.name;
                var $1868 = self.xtyp;
                var $1869 = self.body;
                var $1870 = Fm$Term$all$($1865, $1866, $1867, Fm$Term$normalize$($1868, _defs$2), (_s$8 => _x$9 => {
                    var $1871 = Fm$Term$normalize$($1869(_s$8)(_x$9), _defs$2);
                    return $1871;
                }));
                var $1858 = $1870;
                break;
            case 'Fm.Term.lam':
                var $1872 = self.name;
                var $1873 = self.body;
                var $1874 = Fm$Term$lam$($1872, (_x$5 => {
                    var $1875 = Fm$Term$normalize$($1873(_x$5), _defs$2);
                    return $1875;
                }));
                var $1858 = $1874;
                break;
            case 'Fm.Term.app':
                var $1876 = self.func;
                var $1877 = self.argm;
                var $1878 = Fm$Term$app$(Fm$Term$normalize$($1876, _defs$2), Fm$Term$normalize$($1877, _defs$2));
                var $1858 = $1878;
                break;
            case 'Fm.Term.let':
                var $1879 = self.name;
                var $1880 = self.expr;
                var $1881 = self.body;
                var $1882 = Fm$Term$let$($1879, Fm$Term$normalize$($1880, _defs$2), (_x$6 => {
                    var $1883 = Fm$Term$normalize$($1881(_x$6), _defs$2);
                    return $1883;
                }));
                var $1858 = $1882;
                break;
            case 'Fm.Term.def':
                var $1884 = self.name;
                var $1885 = self.expr;
                var $1886 = self.body;
                var $1887 = Fm$Term$def$($1884, Fm$Term$normalize$($1885, _defs$2), (_x$6 => {
                    var $1888 = Fm$Term$normalize$($1886(_x$6), _defs$2);
                    return $1888;
                }));
                var $1858 = $1887;
                break;
            case 'Fm.Term.ann':
                var $1889 = self.done;
                var $1890 = self.term;
                var $1891 = self.type;
                var $1892 = Fm$Term$ann$($1889, Fm$Term$normalize$($1890, _defs$2), Fm$Term$normalize$($1891, _defs$2));
                var $1858 = $1892;
                break;
            case 'Fm.Term.gol':
                var $1893 = self.name;
                var $1894 = self.dref;
                var $1895 = self.verb;
                var $1896 = Fm$Term$gol$($1893, $1894, $1895);
                var $1858 = $1896;
                break;
            case 'Fm.Term.hol':
                var $1897 = self.path;
                var $1898 = Fm$Term$hol$($1897);
                var $1858 = $1898;
                break;
            case 'Fm.Term.nat':
                var $1899 = self.natx;
                var $1900 = Fm$Term$nat$($1899);
                var $1858 = $1900;
                break;
            case 'Fm.Term.chr':
                var $1901 = self.chrx;
                var $1902 = Fm$Term$chr$($1901);
                var $1858 = $1902;
                break;
            case 'Fm.Term.str':
                var $1903 = self.strx;
                var $1904 = Fm$Term$str$($1903);
                var $1858 = $1904;
                break;
            case 'Fm.Term.cse':
                var $1905 = self.path;
                var $1906 = self.expr;
                var $1907 = self.name;
                var $1908 = self.with;
                var $1909 = self.cses;
                var $1910 = self.moti;
                var $1911 = _term$1;
                var $1858 = $1911;
                break;
            case 'Fm.Term.ori':
                var $1912 = self.orig;
                var $1913 = self.expr;
                var $1914 = Fm$Term$normalize$($1913, _defs$2);
                var $1858 = $1914;
                break;
        };
        return $1858;
    };
    const Fm$Term$normalize = x0 => x1 => Fm$Term$normalize$(x0, x1);

    function List$tail$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1916 = List$nil;
                var $1915 = $1916;
                break;
            case 'List.cons':
                var $1917 = self.head;
                var $1918 = self.tail;
                var $1919 = $1918;
                var $1915 = $1919;
                break;
        };
        return $1915;
    };
    const List$tail = x0 => List$tail$(x0);

    function Fm$SmartMotive$vals$cont$(_expr$1, _term$2, _args$3, _defs$4) {
        var Fm$SmartMotive$vals$cont$ = (_expr$1, _term$2, _args$3, _defs$4) => ({
            ctr: 'TCO',
            arg: [_expr$1, _term$2, _args$3, _defs$4]
        });
        var Fm$SmartMotive$vals$cont = _expr$1 => _term$2 => _args$3 => _defs$4 => Fm$SmartMotive$vals$cont$(_expr$1, _term$2, _args$3, _defs$4);
        var arg = [_expr$1, _term$2, _args$3, _defs$4];
        while (true) {
            let [_expr$1, _term$2, _args$3, _defs$4] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_term$2, _defs$4);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $1920 = self.name;
                        var $1921 = self.indx;
                        var $1922 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1922;
                    case 'Fm.Term.ref':
                        var $1923 = self.name;
                        var $1924 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1924;
                    case 'Fm.Term.typ':
                        var $1925 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1925;
                    case 'Fm.Term.all':
                        var $1926 = self.eras;
                        var $1927 = self.self;
                        var $1928 = self.name;
                        var $1929 = self.xtyp;
                        var $1930 = self.body;
                        var $1931 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1931;
                    case 'Fm.Term.lam':
                        var $1932 = self.name;
                        var $1933 = self.body;
                        var $1934 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1934;
                    case 'Fm.Term.app':
                        var $1935 = self.func;
                        var $1936 = self.argm;
                        var $1937 = Fm$SmartMotive$vals$cont$(_expr$1, $1935, List$cons$($1936, _args$3), _defs$4);
                        return $1937;
                    case 'Fm.Term.let':
                        var $1938 = self.name;
                        var $1939 = self.expr;
                        var $1940 = self.body;
                        var $1941 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1941;
                    case 'Fm.Term.def':
                        var $1942 = self.name;
                        var $1943 = self.expr;
                        var $1944 = self.body;
                        var $1945 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1945;
                    case 'Fm.Term.ann':
                        var $1946 = self.done;
                        var $1947 = self.term;
                        var $1948 = self.type;
                        var $1949 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1949;
                    case 'Fm.Term.gol':
                        var $1950 = self.name;
                        var $1951 = self.dref;
                        var $1952 = self.verb;
                        var $1953 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1953;
                    case 'Fm.Term.hol':
                        var $1954 = self.path;
                        var $1955 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1955;
                    case 'Fm.Term.nat':
                        var $1956 = self.natx;
                        var $1957 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1957;
                    case 'Fm.Term.chr':
                        var $1958 = self.chrx;
                        var $1959 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1959;
                    case 'Fm.Term.str':
                        var $1960 = self.strx;
                        var $1961 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1961;
                    case 'Fm.Term.cse':
                        var $1962 = self.path;
                        var $1963 = self.expr;
                        var $1964 = self.name;
                        var $1965 = self.with;
                        var $1966 = self.cses;
                        var $1967 = self.moti;
                        var $1968 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1968;
                    case 'Fm.Term.ori':
                        var $1969 = self.orig;
                        var $1970 = self.expr;
                        var $1971 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1971;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$SmartMotive$vals$cont = x0 => x1 => x2 => x3 => Fm$SmartMotive$vals$cont$(x0, x1, x2, x3);

    function Fm$SmartMotive$vals$(_expr$1, _type$2, _defs$3) {
        var Fm$SmartMotive$vals$ = (_expr$1, _type$2, _defs$3) => ({
            ctr: 'TCO',
            arg: [_expr$1, _type$2, _defs$3]
        });
        var Fm$SmartMotive$vals = _expr$1 => _type$2 => _defs$3 => Fm$SmartMotive$vals$(_expr$1, _type$2, _defs$3);
        var arg = [_expr$1, _type$2, _defs$3];
        while (true) {
            let [_expr$1, _type$2, _defs$3] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_type$2, _defs$3);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $1972 = self.name;
                        var $1973 = self.indx;
                        var $1974 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1974;
                    case 'Fm.Term.ref':
                        var $1975 = self.name;
                        var $1976 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1976;
                    case 'Fm.Term.typ':
                        var $1977 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1977;
                    case 'Fm.Term.all':
                        var $1978 = self.eras;
                        var $1979 = self.self;
                        var $1980 = self.name;
                        var $1981 = self.xtyp;
                        var $1982 = self.body;
                        var $1983 = Fm$SmartMotive$vals$(_expr$1, $1982(Fm$Term$typ)(Fm$Term$typ), _defs$3);
                        return $1983;
                    case 'Fm.Term.lam':
                        var $1984 = self.name;
                        var $1985 = self.body;
                        var $1986 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1986;
                    case 'Fm.Term.app':
                        var $1987 = self.func;
                        var $1988 = self.argm;
                        var $1989 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1989;
                    case 'Fm.Term.let':
                        var $1990 = self.name;
                        var $1991 = self.expr;
                        var $1992 = self.body;
                        var $1993 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1993;
                    case 'Fm.Term.def':
                        var $1994 = self.name;
                        var $1995 = self.expr;
                        var $1996 = self.body;
                        var $1997 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1997;
                    case 'Fm.Term.ann':
                        var $1998 = self.done;
                        var $1999 = self.term;
                        var $2000 = self.type;
                        var $2001 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2001;
                    case 'Fm.Term.gol':
                        var $2002 = self.name;
                        var $2003 = self.dref;
                        var $2004 = self.verb;
                        var $2005 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2005;
                    case 'Fm.Term.hol':
                        var $2006 = self.path;
                        var $2007 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2007;
                    case 'Fm.Term.nat':
                        var $2008 = self.natx;
                        var $2009 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2009;
                    case 'Fm.Term.chr':
                        var $2010 = self.chrx;
                        var $2011 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2011;
                    case 'Fm.Term.str':
                        var $2012 = self.strx;
                        var $2013 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2013;
                    case 'Fm.Term.cse':
                        var $2014 = self.path;
                        var $2015 = self.expr;
                        var $2016 = self.name;
                        var $2017 = self.with;
                        var $2018 = self.cses;
                        var $2019 = self.moti;
                        var $2020 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2020;
                    case 'Fm.Term.ori':
                        var $2021 = self.orig;
                        var $2022 = self.expr;
                        var $2023 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $2023;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$SmartMotive$vals = x0 => x1 => x2 => Fm$SmartMotive$vals$(x0, x1, x2);

    function Fm$SmartMotive$nams$cont$(_name$1, _term$2, _binds$3, _defs$4) {
        var Fm$SmartMotive$nams$cont$ = (_name$1, _term$2, _binds$3, _defs$4) => ({
            ctr: 'TCO',
            arg: [_name$1, _term$2, _binds$3, _defs$4]
        });
        var Fm$SmartMotive$nams$cont = _name$1 => _term$2 => _binds$3 => _defs$4 => Fm$SmartMotive$nams$cont$(_name$1, _term$2, _binds$3, _defs$4);
        var arg = [_name$1, _term$2, _binds$3, _defs$4];
        while (true) {
            let [_name$1, _term$2, _binds$3, _defs$4] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_term$2, _defs$4);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2024 = self.name;
                        var $2025 = self.indx;
                        var $2026 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2026;
                    case 'Fm.Term.ref':
                        var $2027 = self.name;
                        var $2028 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2028;
                    case 'Fm.Term.typ':
                        var $2029 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2029;
                    case 'Fm.Term.all':
                        var $2030 = self.eras;
                        var $2031 = self.self;
                        var $2032 = self.name;
                        var $2033 = self.xtyp;
                        var $2034 = self.body;
                        var $2035 = Fm$SmartMotive$nams$cont$(_name$1, $2034(Fm$Term$ref$($2031))(Fm$Term$ref$($2032)), List$cons$(String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($2032, List$nil)))), _binds$3), _defs$4);
                        return $2035;
                    case 'Fm.Term.lam':
                        var $2036 = self.name;
                        var $2037 = self.body;
                        var $2038 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2038;
                    case 'Fm.Term.app':
                        var $2039 = self.func;
                        var $2040 = self.argm;
                        var $2041 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2041;
                    case 'Fm.Term.let':
                        var $2042 = self.name;
                        var $2043 = self.expr;
                        var $2044 = self.body;
                        var $2045 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2045;
                    case 'Fm.Term.def':
                        var $2046 = self.name;
                        var $2047 = self.expr;
                        var $2048 = self.body;
                        var $2049 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2049;
                    case 'Fm.Term.ann':
                        var $2050 = self.done;
                        var $2051 = self.term;
                        var $2052 = self.type;
                        var $2053 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2053;
                    case 'Fm.Term.gol':
                        var $2054 = self.name;
                        var $2055 = self.dref;
                        var $2056 = self.verb;
                        var $2057 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2057;
                    case 'Fm.Term.hol':
                        var $2058 = self.path;
                        var $2059 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2059;
                    case 'Fm.Term.nat':
                        var $2060 = self.natx;
                        var $2061 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2061;
                    case 'Fm.Term.chr':
                        var $2062 = self.chrx;
                        var $2063 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2063;
                    case 'Fm.Term.str':
                        var $2064 = self.strx;
                        var $2065 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2065;
                    case 'Fm.Term.cse':
                        var $2066 = self.path;
                        var $2067 = self.expr;
                        var $2068 = self.name;
                        var $2069 = self.with;
                        var $2070 = self.cses;
                        var $2071 = self.moti;
                        var $2072 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2072;
                    case 'Fm.Term.ori':
                        var $2073 = self.orig;
                        var $2074 = self.expr;
                        var $2075 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $2075;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$SmartMotive$nams$cont = x0 => x1 => x2 => x3 => Fm$SmartMotive$nams$cont$(x0, x1, x2, x3);

    function Fm$SmartMotive$nams$(_name$1, _type$2, _defs$3) {
        var self = Fm$Term$reduce$(_type$2, _defs$3);
        switch (self._) {
            case 'Fm.Term.var':
                var $2077 = self.name;
                var $2078 = self.indx;
                var $2079 = List$nil;
                var $2076 = $2079;
                break;
            case 'Fm.Term.ref':
                var $2080 = self.name;
                var $2081 = List$nil;
                var $2076 = $2081;
                break;
            case 'Fm.Term.typ':
                var $2082 = List$nil;
                var $2076 = $2082;
                break;
            case 'Fm.Term.all':
                var $2083 = self.eras;
                var $2084 = self.self;
                var $2085 = self.name;
                var $2086 = self.xtyp;
                var $2087 = self.body;
                var $2088 = Fm$SmartMotive$nams$cont$(_name$1, $2086, List$nil, _defs$3);
                var $2076 = $2088;
                break;
            case 'Fm.Term.lam':
                var $2089 = self.name;
                var $2090 = self.body;
                var $2091 = List$nil;
                var $2076 = $2091;
                break;
            case 'Fm.Term.app':
                var $2092 = self.func;
                var $2093 = self.argm;
                var $2094 = List$nil;
                var $2076 = $2094;
                break;
            case 'Fm.Term.let':
                var $2095 = self.name;
                var $2096 = self.expr;
                var $2097 = self.body;
                var $2098 = List$nil;
                var $2076 = $2098;
                break;
            case 'Fm.Term.def':
                var $2099 = self.name;
                var $2100 = self.expr;
                var $2101 = self.body;
                var $2102 = List$nil;
                var $2076 = $2102;
                break;
            case 'Fm.Term.ann':
                var $2103 = self.done;
                var $2104 = self.term;
                var $2105 = self.type;
                var $2106 = List$nil;
                var $2076 = $2106;
                break;
            case 'Fm.Term.gol':
                var $2107 = self.name;
                var $2108 = self.dref;
                var $2109 = self.verb;
                var $2110 = List$nil;
                var $2076 = $2110;
                break;
            case 'Fm.Term.hol':
                var $2111 = self.path;
                var $2112 = List$nil;
                var $2076 = $2112;
                break;
            case 'Fm.Term.nat':
                var $2113 = self.natx;
                var $2114 = List$nil;
                var $2076 = $2114;
                break;
            case 'Fm.Term.chr':
                var $2115 = self.chrx;
                var $2116 = List$nil;
                var $2076 = $2116;
                break;
            case 'Fm.Term.str':
                var $2117 = self.strx;
                var $2118 = List$nil;
                var $2076 = $2118;
                break;
            case 'Fm.Term.cse':
                var $2119 = self.path;
                var $2120 = self.expr;
                var $2121 = self.name;
                var $2122 = self.with;
                var $2123 = self.cses;
                var $2124 = self.moti;
                var $2125 = List$nil;
                var $2076 = $2125;
                break;
            case 'Fm.Term.ori':
                var $2126 = self.orig;
                var $2127 = self.expr;
                var $2128 = List$nil;
                var $2076 = $2128;
                break;
        };
        return $2076;
    };
    const Fm$SmartMotive$nams = x0 => x1 => x2 => Fm$SmartMotive$nams$(x0, x1, x2);

    function List$zip$(_as$3, _bs$4) {
        var self = _as$3;
        switch (self._) {
            case 'List.nil':
                var $2130 = List$nil;
                var $2129 = $2130;
                break;
            case 'List.cons':
                var $2131 = self.head;
                var $2132 = self.tail;
                var self = _bs$4;
                switch (self._) {
                    case 'List.nil':
                        var $2134 = List$nil;
                        var $2133 = $2134;
                        break;
                    case 'List.cons':
                        var $2135 = self.head;
                        var $2136 = self.tail;
                        var $2137 = List$cons$(Pair$new$($2131, $2135), List$zip$($2132, $2136));
                        var $2133 = $2137;
                        break;
                };
                var $2129 = $2133;
                break;
        };
        return $2129;
    };
    const List$zip = x0 => x1 => List$zip$(x0, x1);
    const Nat$gte = a0 => a1 => (a0 >= a1);
    const Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);

    function Fm$Term$serialize$name$(_name$1) {
        var $2138 = (fm_name_to_bits(_name$1));
        return $2138;
    };
    const Fm$Term$serialize$name = x0 => Fm$Term$serialize$name$(x0);

    function Fm$Term$serialize$(_term$1, _depth$2, _init$3, _x$4) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2140 = self.name;
                var $2141 = self.indx;
                var self = ($2141 >= _init$3);
                if (self) {
                    var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred$((_depth$2 - $2141 <= 0n ? 0n : _depth$2 - $2141)))));
                    var $2143 = (((_name$7(_x$4) + '1') + '0') + '0');
                    var $2142 = $2143;
                } else {
                    var _name$7 = a1 => (a1 + (nat_to_bits($2141)));
                    var $2144 = (((_name$7(_x$4) + '0') + '1') + '0');
                    var $2142 = $2144;
                };
                var $2139 = $2142;
                break;
            case 'Fm.Term.ref':
                var $2145 = self.name;
                var _name$6 = a1 => (a1 + Fm$Term$serialize$name$($2145));
                var $2146 = (((_name$6(_x$4) + '0') + '0') + '0');
                var $2139 = $2146;
                break;
            case 'Fm.Term.typ':
                var $2147 = (((_x$4 + '1') + '1') + '0');
                var $2139 = $2147;
                break;
            case 'Fm.Term.all':
                var $2148 = self.eras;
                var $2149 = self.self;
                var $2150 = self.name;
                var $2151 = self.xtyp;
                var $2152 = self.body;
                var self = $2148;
                if (self) {
                    var $2154 = Bits$i;
                    var _eras$10 = $2154;
                } else {
                    var $2155 = Bits$o;
                    var _eras$10 = $2155;
                };
                var _self$11 = a1 => (a1 + (fm_name_to_bits($2149)));
                var _xtyp$12 = Fm$Term$serialize($2151)(_depth$2)(_init$3);
                var _body$13 = Fm$Term$serialize($2152(Fm$Term$var$($2149, _depth$2))(Fm$Term$var$($2150, Nat$succ$(_depth$2))))(Nat$succ$(Nat$succ$(_depth$2)))(_init$3);
                var $2153 = (((_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))) + '0') + '0') + '1');
                var $2139 = $2153;
                break;
            case 'Fm.Term.lam':
                var $2156 = self.name;
                var $2157 = self.body;
                var _body$7 = Fm$Term$serialize($2157(Fm$Term$var$($2156, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $2158 = (((_body$7(_x$4) + '1') + '0') + '1');
                var $2139 = $2158;
                break;
            case 'Fm.Term.app':
                var $2159 = self.func;
                var $2160 = self.argm;
                var _func$7 = Fm$Term$serialize($2159)(_depth$2)(_init$3);
                var _argm$8 = Fm$Term$serialize($2160)(_depth$2)(_init$3);
                var $2161 = (((_func$7(_argm$8(_x$4)) + '0') + '1') + '1');
                var $2139 = $2161;
                break;
            case 'Fm.Term.let':
                var $2162 = self.name;
                var $2163 = self.expr;
                var $2164 = self.body;
                var _expr$8 = Fm$Term$serialize($2163)(_depth$2)(_init$3);
                var _body$9 = Fm$Term$serialize($2164(Fm$Term$var$($2162, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $2165 = (((_expr$8(_body$9(_x$4)) + '1') + '1') + '1');
                var $2139 = $2165;
                break;
            case 'Fm.Term.def':
                var $2166 = self.name;
                var $2167 = self.expr;
                var $2168 = self.body;
                var $2169 = Fm$Term$serialize$($2168($2167), _depth$2, _init$3, _x$4);
                var $2139 = $2169;
                break;
            case 'Fm.Term.ann':
                var $2170 = self.done;
                var $2171 = self.term;
                var $2172 = self.type;
                var $2173 = Fm$Term$serialize$($2171, _depth$2, _init$3, _x$4);
                var $2139 = $2173;
                break;
            case 'Fm.Term.gol':
                var $2174 = self.name;
                var $2175 = self.dref;
                var $2176 = self.verb;
                var _name$8 = a1 => (a1 + (fm_name_to_bits($2174)));
                var $2177 = (((_name$8(_x$4) + '0') + '0') + '0');
                var $2139 = $2177;
                break;
            case 'Fm.Term.hol':
                var $2178 = self.path;
                var $2179 = _x$4;
                var $2139 = $2179;
                break;
            case 'Fm.Term.nat':
                var $2180 = self.natx;
                var $2181 = Fm$Term$serialize$(Fm$Term$unroll_nat$($2180), _depth$2, _init$3, _x$4);
                var $2139 = $2181;
                break;
            case 'Fm.Term.chr':
                var $2182 = self.chrx;
                var $2183 = Fm$Term$serialize$(Fm$Term$unroll_chr$($2182), _depth$2, _init$3, _x$4);
                var $2139 = $2183;
                break;
            case 'Fm.Term.str':
                var $2184 = self.strx;
                var $2185 = Fm$Term$serialize$(Fm$Term$unroll_str$($2184), _depth$2, _init$3, _x$4);
                var $2139 = $2185;
                break;
            case 'Fm.Term.cse':
                var $2186 = self.path;
                var $2187 = self.expr;
                var $2188 = self.name;
                var $2189 = self.with;
                var $2190 = self.cses;
                var $2191 = self.moti;
                var $2192 = _x$4;
                var $2139 = $2192;
                break;
            case 'Fm.Term.ori':
                var $2193 = self.orig;
                var $2194 = self.expr;
                var $2195 = Fm$Term$serialize$($2194, _depth$2, _init$3, _x$4);
                var $2139 = $2195;
                break;
        };
        return $2139;
    };
    const Fm$Term$serialize = x0 => x1 => x2 => x3 => Fm$Term$serialize$(x0, x1, x2, x3);
    const Bits$eql = a0 => a1 => (a1 === a0);

    function Fm$Term$identical$(_a$1, _b$2, _lv$3) {
        var _ah$4 = Fm$Term$serialize$(_a$1, _lv$3, _lv$3, Bits$e);
        var _bh$5 = Fm$Term$serialize$(_b$2, _lv$3, _lv$3, Bits$e);
        var $2196 = (_bh$5 === _ah$4);
        return $2196;
    };
    const Fm$Term$identical = x0 => x1 => x2 => Fm$Term$identical$(x0, x1, x2);

    function Fm$SmartMotive$replace$(_term$1, _from$2, _to$3, _lv$4) {
        var self = Fm$Term$identical$(_term$1, _from$2, _lv$4);
        if (self) {
            var $2198 = _to$3;
            var $2197 = $2198;
        } else {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $2200 = self.name;
                    var $2201 = self.indx;
                    var $2202 = Fm$Term$var$($2200, $2201);
                    var $2199 = $2202;
                    break;
                case 'Fm.Term.ref':
                    var $2203 = self.name;
                    var $2204 = Fm$Term$ref$($2203);
                    var $2199 = $2204;
                    break;
                case 'Fm.Term.typ':
                    var $2205 = Fm$Term$typ;
                    var $2199 = $2205;
                    break;
                case 'Fm.Term.all':
                    var $2206 = self.eras;
                    var $2207 = self.self;
                    var $2208 = self.name;
                    var $2209 = self.xtyp;
                    var $2210 = self.body;
                    var _xtyp$10 = Fm$SmartMotive$replace$($2209, _from$2, _to$3, _lv$4);
                    var _body$11 = $2210(Fm$Term$ref$($2207))(Fm$Term$ref$($2208));
                    var _body$12 = Fm$SmartMotive$replace$(_body$11, _from$2, _to$3, Nat$succ$(Nat$succ$(_lv$4)));
                    var $2211 = Fm$Term$all$($2206, $2207, $2208, _xtyp$10, (_s$13 => _x$14 => {
                        var $2212 = _body$12;
                        return $2212;
                    }));
                    var $2199 = $2211;
                    break;
                case 'Fm.Term.lam':
                    var $2213 = self.name;
                    var $2214 = self.body;
                    var _body$7 = $2214(Fm$Term$ref$($2213));
                    var _body$8 = Fm$SmartMotive$replace$(_body$7, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $2215 = Fm$Term$lam$($2213, (_x$9 => {
                        var $2216 = _body$8;
                        return $2216;
                    }));
                    var $2199 = $2215;
                    break;
                case 'Fm.Term.app':
                    var $2217 = self.func;
                    var $2218 = self.argm;
                    var _func$7 = Fm$SmartMotive$replace$($2217, _from$2, _to$3, _lv$4);
                    var _argm$8 = Fm$SmartMotive$replace$($2218, _from$2, _to$3, _lv$4);
                    var $2219 = Fm$Term$app$(_func$7, _argm$8);
                    var $2199 = $2219;
                    break;
                case 'Fm.Term.let':
                    var $2220 = self.name;
                    var $2221 = self.expr;
                    var $2222 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($2221, _from$2, _to$3, _lv$4);
                    var _body$9 = $2222(Fm$Term$ref$($2220));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $2223 = Fm$Term$let$($2220, _expr$8, (_x$11 => {
                        var $2224 = _body$10;
                        return $2224;
                    }));
                    var $2199 = $2223;
                    break;
                case 'Fm.Term.def':
                    var $2225 = self.name;
                    var $2226 = self.expr;
                    var $2227 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($2226, _from$2, _to$3, _lv$4);
                    var _body$9 = $2227(Fm$Term$ref$($2225));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $2228 = Fm$Term$def$($2225, _expr$8, (_x$11 => {
                        var $2229 = _body$10;
                        return $2229;
                    }));
                    var $2199 = $2228;
                    break;
                case 'Fm.Term.ann':
                    var $2230 = self.done;
                    var $2231 = self.term;
                    var $2232 = self.type;
                    var _term$8 = Fm$SmartMotive$replace$($2231, _from$2, _to$3, _lv$4);
                    var _type$9 = Fm$SmartMotive$replace$($2232, _from$2, _to$3, _lv$4);
                    var $2233 = Fm$Term$ann$($2230, _term$8, _type$9);
                    var $2199 = $2233;
                    break;
                case 'Fm.Term.gol':
                    var $2234 = self.name;
                    var $2235 = self.dref;
                    var $2236 = self.verb;
                    var $2237 = _term$1;
                    var $2199 = $2237;
                    break;
                case 'Fm.Term.hol':
                    var $2238 = self.path;
                    var $2239 = _term$1;
                    var $2199 = $2239;
                    break;
                case 'Fm.Term.nat':
                    var $2240 = self.natx;
                    var $2241 = _term$1;
                    var $2199 = $2241;
                    break;
                case 'Fm.Term.chr':
                    var $2242 = self.chrx;
                    var $2243 = _term$1;
                    var $2199 = $2243;
                    break;
                case 'Fm.Term.str':
                    var $2244 = self.strx;
                    var $2245 = _term$1;
                    var $2199 = $2245;
                    break;
                case 'Fm.Term.cse':
                    var $2246 = self.path;
                    var $2247 = self.expr;
                    var $2248 = self.name;
                    var $2249 = self.with;
                    var $2250 = self.cses;
                    var $2251 = self.moti;
                    var $2252 = _term$1;
                    var $2199 = $2252;
                    break;
                case 'Fm.Term.ori':
                    var $2253 = self.orig;
                    var $2254 = self.expr;
                    var $2255 = Fm$SmartMotive$replace$($2254, _from$2, _to$3, _lv$4);
                    var $2199 = $2255;
                    break;
            };
            var $2197 = $2199;
        };
        return $2197;
    };
    const Fm$SmartMotive$replace = x0 => x1 => x2 => x3 => Fm$SmartMotive$replace$(x0, x1, x2, x3);

    function Fm$SmartMotive$make$(_name$1, _expr$2, _type$3, _moti$4, _lv$5, _defs$6) {
        var _vals$7 = Fm$SmartMotive$vals$(_expr$2, _type$3, _defs$6);
        var _nams$8 = Fm$SmartMotive$nams$(_name$1, _type$3, _defs$6);
        var _subs$9 = List$zip$(_nams$8, _vals$7);
        var _moti$10 = List$fold$(_subs$9, _moti$4, (_sub$10 => _moti$11 => {
            var self = _sub$10;
            switch (self._) {
                case 'Pair.new':
                    var $2258 = self.fst;
                    var $2259 = self.snd;
                    var $2260 = Fm$SmartMotive$replace$(_moti$11, $2259, Fm$Term$ref$($2258), _lv$5);
                    var $2257 = $2260;
                    break;
            };
            return $2257;
        }));
        var $2256 = _moti$10;
        return $2256;
    };
    const Fm$SmartMotive$make = x0 => x1 => x2 => x3 => x4 => x5 => Fm$SmartMotive$make$(x0, x1, x2, x3, x4, x5);

    function Fm$Term$desugar_cse$motive$(_wyth$1, _moti$2) {
        var self = _wyth$1;
        switch (self._) {
            case 'List.nil':
                var $2262 = _moti$2;
                var $2261 = $2262;
                break;
            case 'List.cons':
                var $2263 = self.head;
                var $2264 = self.tail;
                var self = $2263;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $2266 = self.file;
                        var $2267 = self.code;
                        var $2268 = self.name;
                        var $2269 = self.term;
                        var $2270 = self.type;
                        var $2271 = self.stat;
                        var $2272 = Fm$Term$all$(Bool$false, "", $2268, $2270, (_s$11 => _x$12 => {
                            var $2273 = Fm$Term$desugar_cse$motive$($2264, _moti$2);
                            return $2273;
                        }));
                        var $2265 = $2272;
                        break;
                };
                var $2261 = $2265;
                break;
        };
        return $2261;
    };
    const Fm$Term$desugar_cse$motive = x0 => x1 => Fm$Term$desugar_cse$motive$(x0, x1);

    function String$is_empty$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $2275 = Bool$true;
            var $2274 = $2275;
        } else {
            var $2276 = self.charCodeAt(0);
            var $2277 = self.slice(1);
            var $2278 = Bool$false;
            var $2274 = $2278;
        };
        return $2274;
    };
    const String$is_empty = x0 => String$is_empty$(x0);

    function Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, _type$3, _body$4, _defs$5) {
        var self = Fm$Term$reduce$(_type$3, _defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $2280 = self.name;
                var $2281 = self.indx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2283 = _body$4;
                        var $2282 = $2283;
                        break;
                    case 'List.cons':
                        var $2284 = self.head;
                        var $2285 = self.tail;
                        var self = $2284;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2287 = self.file;
                                var $2288 = self.code;
                                var $2289 = self.name;
                                var $2290 = self.term;
                                var $2291 = self.type;
                                var $2292 = self.stat;
                                var $2293 = Fm$Term$lam$($2289, (_x$16 => {
                                    var $2294 = Fm$Term$desugar_cse$argument$(_name$1, $2285, _type$3, _body$4, _defs$5);
                                    return $2294;
                                }));
                                var $2286 = $2293;
                                break;
                        };
                        var $2282 = $2286;
                        break;
                };
                var $2279 = $2282;
                break;
            case 'Fm.Term.ref':
                var $2295 = self.name;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2297 = _body$4;
                        var $2296 = $2297;
                        break;
                    case 'List.cons':
                        var $2298 = self.head;
                        var $2299 = self.tail;
                        var self = $2298;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2301 = self.file;
                                var $2302 = self.code;
                                var $2303 = self.name;
                                var $2304 = self.term;
                                var $2305 = self.type;
                                var $2306 = self.stat;
                                var $2307 = Fm$Term$lam$($2303, (_x$15 => {
                                    var $2308 = Fm$Term$desugar_cse$argument$(_name$1, $2299, _type$3, _body$4, _defs$5);
                                    return $2308;
                                }));
                                var $2300 = $2307;
                                break;
                        };
                        var $2296 = $2300;
                        break;
                };
                var $2279 = $2296;
                break;
            case 'Fm.Term.typ':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2310 = _body$4;
                        var $2309 = $2310;
                        break;
                    case 'List.cons':
                        var $2311 = self.head;
                        var $2312 = self.tail;
                        var self = $2311;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2314 = self.file;
                                var $2315 = self.code;
                                var $2316 = self.name;
                                var $2317 = self.term;
                                var $2318 = self.type;
                                var $2319 = self.stat;
                                var $2320 = Fm$Term$lam$($2316, (_x$14 => {
                                    var $2321 = Fm$Term$desugar_cse$argument$(_name$1, $2312, _type$3, _body$4, _defs$5);
                                    return $2321;
                                }));
                                var $2313 = $2320;
                                break;
                        };
                        var $2309 = $2313;
                        break;
                };
                var $2279 = $2309;
                break;
            case 'Fm.Term.all':
                var $2322 = self.eras;
                var $2323 = self.self;
                var $2324 = self.name;
                var $2325 = self.xtyp;
                var $2326 = self.body;
                var $2327 = Fm$Term$lam$((() => {
                    var self = String$is_empty$($2324);
                    if (self) {
                        var $2328 = _name$1;
                        return $2328;
                    } else {
                        var $2329 = String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($2324, List$nil))));
                        return $2329;
                    };
                })(), (_x$11 => {
                    var $2330 = Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, $2326(Fm$Term$var$($2323, 0n))(Fm$Term$var$($2324, 0n)), _body$4, _defs$5);
                    return $2330;
                }));
                var $2279 = $2327;
                break;
            case 'Fm.Term.lam':
                var $2331 = self.name;
                var $2332 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2334 = _body$4;
                        var $2333 = $2334;
                        break;
                    case 'List.cons':
                        var $2335 = self.head;
                        var $2336 = self.tail;
                        var self = $2335;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2338 = self.file;
                                var $2339 = self.code;
                                var $2340 = self.name;
                                var $2341 = self.term;
                                var $2342 = self.type;
                                var $2343 = self.stat;
                                var $2344 = Fm$Term$lam$($2340, (_x$16 => {
                                    var $2345 = Fm$Term$desugar_cse$argument$(_name$1, $2336, _type$3, _body$4, _defs$5);
                                    return $2345;
                                }));
                                var $2337 = $2344;
                                break;
                        };
                        var $2333 = $2337;
                        break;
                };
                var $2279 = $2333;
                break;
            case 'Fm.Term.app':
                var $2346 = self.func;
                var $2347 = self.argm;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2349 = _body$4;
                        var $2348 = $2349;
                        break;
                    case 'List.cons':
                        var $2350 = self.head;
                        var $2351 = self.tail;
                        var self = $2350;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2353 = self.file;
                                var $2354 = self.code;
                                var $2355 = self.name;
                                var $2356 = self.term;
                                var $2357 = self.type;
                                var $2358 = self.stat;
                                var $2359 = Fm$Term$lam$($2355, (_x$16 => {
                                    var $2360 = Fm$Term$desugar_cse$argument$(_name$1, $2351, _type$3, _body$4, _defs$5);
                                    return $2360;
                                }));
                                var $2352 = $2359;
                                break;
                        };
                        var $2348 = $2352;
                        break;
                };
                var $2279 = $2348;
                break;
            case 'Fm.Term.let':
                var $2361 = self.name;
                var $2362 = self.expr;
                var $2363 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2365 = _body$4;
                        var $2364 = $2365;
                        break;
                    case 'List.cons':
                        var $2366 = self.head;
                        var $2367 = self.tail;
                        var self = $2366;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2369 = self.file;
                                var $2370 = self.code;
                                var $2371 = self.name;
                                var $2372 = self.term;
                                var $2373 = self.type;
                                var $2374 = self.stat;
                                var $2375 = Fm$Term$lam$($2371, (_x$17 => {
                                    var $2376 = Fm$Term$desugar_cse$argument$(_name$1, $2367, _type$3, _body$4, _defs$5);
                                    return $2376;
                                }));
                                var $2368 = $2375;
                                break;
                        };
                        var $2364 = $2368;
                        break;
                };
                var $2279 = $2364;
                break;
            case 'Fm.Term.def':
                var $2377 = self.name;
                var $2378 = self.expr;
                var $2379 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2381 = _body$4;
                        var $2380 = $2381;
                        break;
                    case 'List.cons':
                        var $2382 = self.head;
                        var $2383 = self.tail;
                        var self = $2382;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2385 = self.file;
                                var $2386 = self.code;
                                var $2387 = self.name;
                                var $2388 = self.term;
                                var $2389 = self.type;
                                var $2390 = self.stat;
                                var $2391 = Fm$Term$lam$($2387, (_x$17 => {
                                    var $2392 = Fm$Term$desugar_cse$argument$(_name$1, $2383, _type$3, _body$4, _defs$5);
                                    return $2392;
                                }));
                                var $2384 = $2391;
                                break;
                        };
                        var $2380 = $2384;
                        break;
                };
                var $2279 = $2380;
                break;
            case 'Fm.Term.ann':
                var $2393 = self.done;
                var $2394 = self.term;
                var $2395 = self.type;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2397 = _body$4;
                        var $2396 = $2397;
                        break;
                    case 'List.cons':
                        var $2398 = self.head;
                        var $2399 = self.tail;
                        var self = $2398;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2401 = self.file;
                                var $2402 = self.code;
                                var $2403 = self.name;
                                var $2404 = self.term;
                                var $2405 = self.type;
                                var $2406 = self.stat;
                                var $2407 = Fm$Term$lam$($2403, (_x$17 => {
                                    var $2408 = Fm$Term$desugar_cse$argument$(_name$1, $2399, _type$3, _body$4, _defs$5);
                                    return $2408;
                                }));
                                var $2400 = $2407;
                                break;
                        };
                        var $2396 = $2400;
                        break;
                };
                var $2279 = $2396;
                break;
            case 'Fm.Term.gol':
                var $2409 = self.name;
                var $2410 = self.dref;
                var $2411 = self.verb;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2413 = _body$4;
                        var $2412 = $2413;
                        break;
                    case 'List.cons':
                        var $2414 = self.head;
                        var $2415 = self.tail;
                        var self = $2414;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2417 = self.file;
                                var $2418 = self.code;
                                var $2419 = self.name;
                                var $2420 = self.term;
                                var $2421 = self.type;
                                var $2422 = self.stat;
                                var $2423 = Fm$Term$lam$($2419, (_x$17 => {
                                    var $2424 = Fm$Term$desugar_cse$argument$(_name$1, $2415, _type$3, _body$4, _defs$5);
                                    return $2424;
                                }));
                                var $2416 = $2423;
                                break;
                        };
                        var $2412 = $2416;
                        break;
                };
                var $2279 = $2412;
                break;
            case 'Fm.Term.hol':
                var $2425 = self.path;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2427 = _body$4;
                        var $2426 = $2427;
                        break;
                    case 'List.cons':
                        var $2428 = self.head;
                        var $2429 = self.tail;
                        var self = $2428;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2431 = self.file;
                                var $2432 = self.code;
                                var $2433 = self.name;
                                var $2434 = self.term;
                                var $2435 = self.type;
                                var $2436 = self.stat;
                                var $2437 = Fm$Term$lam$($2433, (_x$15 => {
                                    var $2438 = Fm$Term$desugar_cse$argument$(_name$1, $2429, _type$3, _body$4, _defs$5);
                                    return $2438;
                                }));
                                var $2430 = $2437;
                                break;
                        };
                        var $2426 = $2430;
                        break;
                };
                var $2279 = $2426;
                break;
            case 'Fm.Term.nat':
                var $2439 = self.natx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2441 = _body$4;
                        var $2440 = $2441;
                        break;
                    case 'List.cons':
                        var $2442 = self.head;
                        var $2443 = self.tail;
                        var self = $2442;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2445 = self.file;
                                var $2446 = self.code;
                                var $2447 = self.name;
                                var $2448 = self.term;
                                var $2449 = self.type;
                                var $2450 = self.stat;
                                var $2451 = Fm$Term$lam$($2447, (_x$15 => {
                                    var $2452 = Fm$Term$desugar_cse$argument$(_name$1, $2443, _type$3, _body$4, _defs$5);
                                    return $2452;
                                }));
                                var $2444 = $2451;
                                break;
                        };
                        var $2440 = $2444;
                        break;
                };
                var $2279 = $2440;
                break;
            case 'Fm.Term.chr':
                var $2453 = self.chrx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2455 = _body$4;
                        var $2454 = $2455;
                        break;
                    case 'List.cons':
                        var $2456 = self.head;
                        var $2457 = self.tail;
                        var self = $2456;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2459 = self.file;
                                var $2460 = self.code;
                                var $2461 = self.name;
                                var $2462 = self.term;
                                var $2463 = self.type;
                                var $2464 = self.stat;
                                var $2465 = Fm$Term$lam$($2461, (_x$15 => {
                                    var $2466 = Fm$Term$desugar_cse$argument$(_name$1, $2457, _type$3, _body$4, _defs$5);
                                    return $2466;
                                }));
                                var $2458 = $2465;
                                break;
                        };
                        var $2454 = $2458;
                        break;
                };
                var $2279 = $2454;
                break;
            case 'Fm.Term.str':
                var $2467 = self.strx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2469 = _body$4;
                        var $2468 = $2469;
                        break;
                    case 'List.cons':
                        var $2470 = self.head;
                        var $2471 = self.tail;
                        var self = $2470;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2473 = self.file;
                                var $2474 = self.code;
                                var $2475 = self.name;
                                var $2476 = self.term;
                                var $2477 = self.type;
                                var $2478 = self.stat;
                                var $2479 = Fm$Term$lam$($2475, (_x$15 => {
                                    var $2480 = Fm$Term$desugar_cse$argument$(_name$1, $2471, _type$3, _body$4, _defs$5);
                                    return $2480;
                                }));
                                var $2472 = $2479;
                                break;
                        };
                        var $2468 = $2472;
                        break;
                };
                var $2279 = $2468;
                break;
            case 'Fm.Term.cse':
                var $2481 = self.path;
                var $2482 = self.expr;
                var $2483 = self.name;
                var $2484 = self.with;
                var $2485 = self.cses;
                var $2486 = self.moti;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2488 = _body$4;
                        var $2487 = $2488;
                        break;
                    case 'List.cons':
                        var $2489 = self.head;
                        var $2490 = self.tail;
                        var self = $2489;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2492 = self.file;
                                var $2493 = self.code;
                                var $2494 = self.name;
                                var $2495 = self.term;
                                var $2496 = self.type;
                                var $2497 = self.stat;
                                var $2498 = Fm$Term$lam$($2494, (_x$20 => {
                                    var $2499 = Fm$Term$desugar_cse$argument$(_name$1, $2490, _type$3, _body$4, _defs$5);
                                    return $2499;
                                }));
                                var $2491 = $2498;
                                break;
                        };
                        var $2487 = $2491;
                        break;
                };
                var $2279 = $2487;
                break;
            case 'Fm.Term.ori':
                var $2500 = self.orig;
                var $2501 = self.expr;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2503 = _body$4;
                        var $2502 = $2503;
                        break;
                    case 'List.cons':
                        var $2504 = self.head;
                        var $2505 = self.tail;
                        var self = $2504;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2507 = self.file;
                                var $2508 = self.code;
                                var $2509 = self.name;
                                var $2510 = self.term;
                                var $2511 = self.type;
                                var $2512 = self.stat;
                                var $2513 = Fm$Term$lam$($2509, (_x$16 => {
                                    var $2514 = Fm$Term$desugar_cse$argument$(_name$1, $2505, _type$3, _body$4, _defs$5);
                                    return $2514;
                                }));
                                var $2506 = $2513;
                                break;
                        };
                        var $2502 = $2506;
                        break;
                };
                var $2279 = $2502;
                break;
        };
        return $2279;
    };
    const Fm$Term$desugar_cse$argument = x0 => x1 => x2 => x3 => x4 => Fm$Term$desugar_cse$argument$(x0, x1, x2, x3, x4);

    function Maybe$or$(_a$2, _b$3) {
        var self = _a$2;
        switch (self._) {
            case 'Maybe.none':
                var $2516 = _b$3;
                var $2515 = $2516;
                break;
            case 'Maybe.some':
                var $2517 = self.value;
                var $2518 = Maybe$some$($2517);
                var $2515 = $2518;
                break;
        };
        return $2515;
    };
    const Maybe$or = x0 => x1 => Maybe$or$(x0, x1);

    function Fm$Term$desugar_cse$cases$(_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7) {
        var Fm$Term$desugar_cse$cases$ = (_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7) => ({
            ctr: 'TCO',
            arg: [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7]
        });
        var Fm$Term$desugar_cse$cases = _expr$1 => _name$2 => _wyth$3 => _cses$4 => _type$5 => _defs$6 => _ctxt$7 => Fm$Term$desugar_cse$cases$(_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7);
        var arg = [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7];
        while (true) {
            let [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_type$5, _defs$6);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2519 = self.name;
                        var $2520 = self.indx;
                        var _expr$10 = (() => {
                            var $2523 = _expr$1;
                            var $2524 = _wyth$3;
                            let _expr$11 = $2523;
                            let _defn$10;
                            while ($2524._ === 'List.cons') {
                                _defn$10 = $2524.head;
                                var $2523 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2525 = self.file;
                                            var $2526 = self.code;
                                            var $2527 = self.name;
                                            var $2528 = self.term;
                                            var $2529 = self.type;
                                            var $2530 = self.stat;
                                            var $2531 = $2528;
                                            return $2531;
                                    };
                                })());
                                _expr$11 = $2523;
                                $2524 = $2524.tail;
                            }
                            return _expr$11;
                        })();
                        var $2521 = _expr$10;
                        return $2521;
                    case 'Fm.Term.ref':
                        var $2532 = self.name;
                        var _expr$9 = (() => {
                            var $2535 = _expr$1;
                            var $2536 = _wyth$3;
                            let _expr$10 = $2535;
                            let _defn$9;
                            while ($2536._ === 'List.cons') {
                                _defn$9 = $2536.head;
                                var $2535 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2537 = self.file;
                                            var $2538 = self.code;
                                            var $2539 = self.name;
                                            var $2540 = self.term;
                                            var $2541 = self.type;
                                            var $2542 = self.stat;
                                            var $2543 = $2540;
                                            return $2543;
                                    };
                                })());
                                _expr$10 = $2535;
                                $2536 = $2536.tail;
                            }
                            return _expr$10;
                        })();
                        var $2533 = _expr$9;
                        return $2533;
                    case 'Fm.Term.typ':
                        var _expr$8 = (() => {
                            var $2546 = _expr$1;
                            var $2547 = _wyth$3;
                            let _expr$9 = $2546;
                            let _defn$8;
                            while ($2547._ === 'List.cons') {
                                _defn$8 = $2547.head;
                                var $2546 = Fm$Term$app$(_expr$9, (() => {
                                    var self = _defn$8;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2548 = self.file;
                                            var $2549 = self.code;
                                            var $2550 = self.name;
                                            var $2551 = self.term;
                                            var $2552 = self.type;
                                            var $2553 = self.stat;
                                            var $2554 = $2551;
                                            return $2554;
                                    };
                                })());
                                _expr$9 = $2546;
                                $2547 = $2547.tail;
                            }
                            return _expr$9;
                        })();
                        var $2544 = _expr$8;
                        return $2544;
                    case 'Fm.Term.all':
                        var $2555 = self.eras;
                        var $2556 = self.self;
                        var $2557 = self.name;
                        var $2558 = self.xtyp;
                        var $2559 = self.body;
                        var _got$13 = Maybe$or$(Fm$get$($2557, _cses$4), Fm$get$("_", _cses$4));
                        var self = _got$13;
                        switch (self._) {
                            case 'Maybe.none':
                                var _expr$14 = (() => {
                                    var $2563 = _expr$1;
                                    var $2564 = _wyth$3;
                                    let _expr$15 = $2563;
                                    let _defn$14;
                                    while ($2564._ === 'List.cons') {
                                        _defn$14 = $2564.head;
                                        var self = _defn$14;
                                        switch (self._) {
                                            case 'Fm.Def.new':
                                                var $2565 = self.file;
                                                var $2566 = self.code;
                                                var $2567 = self.name;
                                                var $2568 = self.term;
                                                var $2569 = self.type;
                                                var $2570 = self.stat;
                                                var $2571 = Fm$Term$app$(_expr$15, $2568);
                                                var $2563 = $2571;
                                                break;
                                        };
                                        _expr$15 = $2563;
                                        $2564 = $2564.tail;
                                    }
                                    return _expr$15;
                                })();
                                var $2561 = _expr$14;
                                var $2560 = $2561;
                                break;
                            case 'Maybe.some':
                                var $2572 = self.value;
                                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, _wyth$3, $2558, $2572, _defs$6);
                                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                                var _type$17 = $2559(Fm$Term$var$($2556, 0n))(Fm$Term$var$($2557, 0n));
                                var $2573 = Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _wyth$3, _cses$4, _type$17, _defs$6, _ctxt$7);
                                var $2560 = $2573;
                                break;
                        };
                        return $2560;
                    case 'Fm.Term.lam':
                        var $2574 = self.name;
                        var $2575 = self.body;
                        var _expr$10 = (() => {
                            var $2578 = _expr$1;
                            var $2579 = _wyth$3;
                            let _expr$11 = $2578;
                            let _defn$10;
                            while ($2579._ === 'List.cons') {
                                _defn$10 = $2579.head;
                                var $2578 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2580 = self.file;
                                            var $2581 = self.code;
                                            var $2582 = self.name;
                                            var $2583 = self.term;
                                            var $2584 = self.type;
                                            var $2585 = self.stat;
                                            var $2586 = $2583;
                                            return $2586;
                                    };
                                })());
                                _expr$11 = $2578;
                                $2579 = $2579.tail;
                            }
                            return _expr$11;
                        })();
                        var $2576 = _expr$10;
                        return $2576;
                    case 'Fm.Term.app':
                        var $2587 = self.func;
                        var $2588 = self.argm;
                        var _expr$10 = (() => {
                            var $2591 = _expr$1;
                            var $2592 = _wyth$3;
                            let _expr$11 = $2591;
                            let _defn$10;
                            while ($2592._ === 'List.cons') {
                                _defn$10 = $2592.head;
                                var $2591 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2593 = self.file;
                                            var $2594 = self.code;
                                            var $2595 = self.name;
                                            var $2596 = self.term;
                                            var $2597 = self.type;
                                            var $2598 = self.stat;
                                            var $2599 = $2596;
                                            return $2599;
                                    };
                                })());
                                _expr$11 = $2591;
                                $2592 = $2592.tail;
                            }
                            return _expr$11;
                        })();
                        var $2589 = _expr$10;
                        return $2589;
                    case 'Fm.Term.let':
                        var $2600 = self.name;
                        var $2601 = self.expr;
                        var $2602 = self.body;
                        var _expr$11 = (() => {
                            var $2605 = _expr$1;
                            var $2606 = _wyth$3;
                            let _expr$12 = $2605;
                            let _defn$11;
                            while ($2606._ === 'List.cons') {
                                _defn$11 = $2606.head;
                                var $2605 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2607 = self.file;
                                            var $2608 = self.code;
                                            var $2609 = self.name;
                                            var $2610 = self.term;
                                            var $2611 = self.type;
                                            var $2612 = self.stat;
                                            var $2613 = $2610;
                                            return $2613;
                                    };
                                })());
                                _expr$12 = $2605;
                                $2606 = $2606.tail;
                            }
                            return _expr$12;
                        })();
                        var $2603 = _expr$11;
                        return $2603;
                    case 'Fm.Term.def':
                        var $2614 = self.name;
                        var $2615 = self.expr;
                        var $2616 = self.body;
                        var _expr$11 = (() => {
                            var $2619 = _expr$1;
                            var $2620 = _wyth$3;
                            let _expr$12 = $2619;
                            let _defn$11;
                            while ($2620._ === 'List.cons') {
                                _defn$11 = $2620.head;
                                var $2619 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2621 = self.file;
                                            var $2622 = self.code;
                                            var $2623 = self.name;
                                            var $2624 = self.term;
                                            var $2625 = self.type;
                                            var $2626 = self.stat;
                                            var $2627 = $2624;
                                            return $2627;
                                    };
                                })());
                                _expr$12 = $2619;
                                $2620 = $2620.tail;
                            }
                            return _expr$12;
                        })();
                        var $2617 = _expr$11;
                        return $2617;
                    case 'Fm.Term.ann':
                        var $2628 = self.done;
                        var $2629 = self.term;
                        var $2630 = self.type;
                        var _expr$11 = (() => {
                            var $2633 = _expr$1;
                            var $2634 = _wyth$3;
                            let _expr$12 = $2633;
                            let _defn$11;
                            while ($2634._ === 'List.cons') {
                                _defn$11 = $2634.head;
                                var $2633 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2635 = self.file;
                                            var $2636 = self.code;
                                            var $2637 = self.name;
                                            var $2638 = self.term;
                                            var $2639 = self.type;
                                            var $2640 = self.stat;
                                            var $2641 = $2638;
                                            return $2641;
                                    };
                                })());
                                _expr$12 = $2633;
                                $2634 = $2634.tail;
                            }
                            return _expr$12;
                        })();
                        var $2631 = _expr$11;
                        return $2631;
                    case 'Fm.Term.gol':
                        var $2642 = self.name;
                        var $2643 = self.dref;
                        var $2644 = self.verb;
                        var _expr$11 = (() => {
                            var $2647 = _expr$1;
                            var $2648 = _wyth$3;
                            let _expr$12 = $2647;
                            let _defn$11;
                            while ($2648._ === 'List.cons') {
                                _defn$11 = $2648.head;
                                var $2647 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2649 = self.file;
                                            var $2650 = self.code;
                                            var $2651 = self.name;
                                            var $2652 = self.term;
                                            var $2653 = self.type;
                                            var $2654 = self.stat;
                                            var $2655 = $2652;
                                            return $2655;
                                    };
                                })());
                                _expr$12 = $2647;
                                $2648 = $2648.tail;
                            }
                            return _expr$12;
                        })();
                        var $2645 = _expr$11;
                        return $2645;
                    case 'Fm.Term.hol':
                        var $2656 = self.path;
                        var _expr$9 = (() => {
                            var $2659 = _expr$1;
                            var $2660 = _wyth$3;
                            let _expr$10 = $2659;
                            let _defn$9;
                            while ($2660._ === 'List.cons') {
                                _defn$9 = $2660.head;
                                var $2659 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2661 = self.file;
                                            var $2662 = self.code;
                                            var $2663 = self.name;
                                            var $2664 = self.term;
                                            var $2665 = self.type;
                                            var $2666 = self.stat;
                                            var $2667 = $2664;
                                            return $2667;
                                    };
                                })());
                                _expr$10 = $2659;
                                $2660 = $2660.tail;
                            }
                            return _expr$10;
                        })();
                        var $2657 = _expr$9;
                        return $2657;
                    case 'Fm.Term.nat':
                        var $2668 = self.natx;
                        var _expr$9 = (() => {
                            var $2671 = _expr$1;
                            var $2672 = _wyth$3;
                            let _expr$10 = $2671;
                            let _defn$9;
                            while ($2672._ === 'List.cons') {
                                _defn$9 = $2672.head;
                                var $2671 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2673 = self.file;
                                            var $2674 = self.code;
                                            var $2675 = self.name;
                                            var $2676 = self.term;
                                            var $2677 = self.type;
                                            var $2678 = self.stat;
                                            var $2679 = $2676;
                                            return $2679;
                                    };
                                })());
                                _expr$10 = $2671;
                                $2672 = $2672.tail;
                            }
                            return _expr$10;
                        })();
                        var $2669 = _expr$9;
                        return $2669;
                    case 'Fm.Term.chr':
                        var $2680 = self.chrx;
                        var _expr$9 = (() => {
                            var $2683 = _expr$1;
                            var $2684 = _wyth$3;
                            let _expr$10 = $2683;
                            let _defn$9;
                            while ($2684._ === 'List.cons') {
                                _defn$9 = $2684.head;
                                var $2683 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2685 = self.file;
                                            var $2686 = self.code;
                                            var $2687 = self.name;
                                            var $2688 = self.term;
                                            var $2689 = self.type;
                                            var $2690 = self.stat;
                                            var $2691 = $2688;
                                            return $2691;
                                    };
                                })());
                                _expr$10 = $2683;
                                $2684 = $2684.tail;
                            }
                            return _expr$10;
                        })();
                        var $2681 = _expr$9;
                        return $2681;
                    case 'Fm.Term.str':
                        var $2692 = self.strx;
                        var _expr$9 = (() => {
                            var $2695 = _expr$1;
                            var $2696 = _wyth$3;
                            let _expr$10 = $2695;
                            let _defn$9;
                            while ($2696._ === 'List.cons') {
                                _defn$9 = $2696.head;
                                var $2695 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2697 = self.file;
                                            var $2698 = self.code;
                                            var $2699 = self.name;
                                            var $2700 = self.term;
                                            var $2701 = self.type;
                                            var $2702 = self.stat;
                                            var $2703 = $2700;
                                            return $2703;
                                    };
                                })());
                                _expr$10 = $2695;
                                $2696 = $2696.tail;
                            }
                            return _expr$10;
                        })();
                        var $2693 = _expr$9;
                        return $2693;
                    case 'Fm.Term.cse':
                        var $2704 = self.path;
                        var $2705 = self.expr;
                        var $2706 = self.name;
                        var $2707 = self.with;
                        var $2708 = self.cses;
                        var $2709 = self.moti;
                        var _expr$14 = (() => {
                            var $2712 = _expr$1;
                            var $2713 = _wyth$3;
                            let _expr$15 = $2712;
                            let _defn$14;
                            while ($2713._ === 'List.cons') {
                                _defn$14 = $2713.head;
                                var $2712 = Fm$Term$app$(_expr$15, (() => {
                                    var self = _defn$14;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2714 = self.file;
                                            var $2715 = self.code;
                                            var $2716 = self.name;
                                            var $2717 = self.term;
                                            var $2718 = self.type;
                                            var $2719 = self.stat;
                                            var $2720 = $2717;
                                            return $2720;
                                    };
                                })());
                                _expr$15 = $2712;
                                $2713 = $2713.tail;
                            }
                            return _expr$15;
                        })();
                        var $2710 = _expr$14;
                        return $2710;
                    case 'Fm.Term.ori':
                        var $2721 = self.orig;
                        var $2722 = self.expr;
                        var _expr$10 = (() => {
                            var $2725 = _expr$1;
                            var $2726 = _wyth$3;
                            let _expr$11 = $2725;
                            let _defn$10;
                            while ($2726._ === 'List.cons') {
                                _defn$10 = $2726.head;
                                var $2725 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2727 = self.file;
                                            var $2728 = self.code;
                                            var $2729 = self.name;
                                            var $2730 = self.term;
                                            var $2731 = self.type;
                                            var $2732 = self.stat;
                                            var $2733 = $2730;
                                            return $2733;
                                    };
                                })());
                                _expr$11 = $2725;
                                $2726 = $2726.tail;
                            }
                            return _expr$11;
                        })();
                        var $2723 = _expr$10;
                        return $2723;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Term$desugar_cse$cases = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Fm$Term$desugar_cse$cases$(x0, x1, x2, x3, x4, x5, x6);

    function Fm$Term$desugar_cse$(_expr$1, _name$2, _with$3, _cses$4, _moti$5, _type$6, _defs$7, _ctxt$8) {
        var self = Fm$Term$reduce$(_type$6, _defs$7);
        switch (self._) {
            case 'Fm.Term.var':
                var $2735 = self.name;
                var $2736 = self.indx;
                var $2737 = Maybe$none;
                var $2734 = $2737;
                break;
            case 'Fm.Term.ref':
                var $2738 = self.name;
                var $2739 = Maybe$none;
                var $2734 = $2739;
                break;
            case 'Fm.Term.typ':
                var $2740 = Maybe$none;
                var $2734 = $2740;
                break;
            case 'Fm.Term.all':
                var $2741 = self.eras;
                var $2742 = self.self;
                var $2743 = self.name;
                var $2744 = self.xtyp;
                var $2745 = self.body;
                var _moti$14 = Fm$Term$desugar_cse$motive$(_with$3, _moti$5);
                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, List$nil, $2744, _moti$14, _defs$7);
                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                var _type$17 = $2745(Fm$Term$var$($2742, 0n))(Fm$Term$var$($2743, 0n));
                var $2746 = Maybe$some$(Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _with$3, _cses$4, _type$17, _defs$7, _ctxt$8));
                var $2734 = $2746;
                break;
            case 'Fm.Term.lam':
                var $2747 = self.name;
                var $2748 = self.body;
                var $2749 = Maybe$none;
                var $2734 = $2749;
                break;
            case 'Fm.Term.app':
                var $2750 = self.func;
                var $2751 = self.argm;
                var $2752 = Maybe$none;
                var $2734 = $2752;
                break;
            case 'Fm.Term.let':
                var $2753 = self.name;
                var $2754 = self.expr;
                var $2755 = self.body;
                var $2756 = Maybe$none;
                var $2734 = $2756;
                break;
            case 'Fm.Term.def':
                var $2757 = self.name;
                var $2758 = self.expr;
                var $2759 = self.body;
                var $2760 = Maybe$none;
                var $2734 = $2760;
                break;
            case 'Fm.Term.ann':
                var $2761 = self.done;
                var $2762 = self.term;
                var $2763 = self.type;
                var $2764 = Maybe$none;
                var $2734 = $2764;
                break;
            case 'Fm.Term.gol':
                var $2765 = self.name;
                var $2766 = self.dref;
                var $2767 = self.verb;
                var $2768 = Maybe$none;
                var $2734 = $2768;
                break;
            case 'Fm.Term.hol':
                var $2769 = self.path;
                var $2770 = Maybe$none;
                var $2734 = $2770;
                break;
            case 'Fm.Term.nat':
                var $2771 = self.natx;
                var $2772 = Maybe$none;
                var $2734 = $2772;
                break;
            case 'Fm.Term.chr':
                var $2773 = self.chrx;
                var $2774 = Maybe$none;
                var $2734 = $2774;
                break;
            case 'Fm.Term.str':
                var $2775 = self.strx;
                var $2776 = Maybe$none;
                var $2734 = $2776;
                break;
            case 'Fm.Term.cse':
                var $2777 = self.path;
                var $2778 = self.expr;
                var $2779 = self.name;
                var $2780 = self.with;
                var $2781 = self.cses;
                var $2782 = self.moti;
                var $2783 = Maybe$none;
                var $2734 = $2783;
                break;
            case 'Fm.Term.ori':
                var $2784 = self.orig;
                var $2785 = self.expr;
                var $2786 = Maybe$none;
                var $2734 = $2786;
                break;
        };
        return $2734;
    };
    const Fm$Term$desugar_cse = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Term$desugar_cse$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Error$cant_infer$(_origin$1, _term$2, _context$3) {
        var $2787 = ({
            _: 'Fm.Error.cant_infer',
            'origin': _origin$1,
            'term': _term$2,
            'context': _context$3
        });
        return $2787;
    };
    const Fm$Error$cant_infer = x0 => x1 => x2 => Fm$Error$cant_infer$(x0, x1, x2);

    function Set$has$(_bits$1, _set$2) {
        var self = Map$get$(_bits$1, _set$2);
        switch (self._) {
            case 'Maybe.none':
                var $2789 = Bool$false;
                var $2788 = $2789;
                break;
            case 'Maybe.some':
                var $2790 = self.value;
                var $2791 = Bool$true;
                var $2788 = $2791;
                break;
        };
        return $2788;
    };
    const Set$has = x0 => x1 => Set$has$(x0, x1);

    function Fm$Term$equal$patch$(_path$2, _term$3, _ret$4) {
        var $2792 = Fm$Check$result$(Maybe$some$(_ret$4), List$cons$(Fm$Error$patch$(_path$2, Fm$Term$normalize$(_term$3, Map$new)), List$nil));
        return $2792;
    };
    const Fm$Term$equal$patch = x0 => x1 => x2 => Fm$Term$equal$patch$(x0, x1, x2);

    function Fm$Term$equal$extra_holes$(_a$1, _b$2) {
        var self = _a$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2794 = self.name;
                var $2795 = self.indx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2797 = self.name;
                        var $2798 = self.indx;
                        var $2799 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2799;
                        break;
                    case 'Fm.Term.ref':
                        var $2800 = self.name;
                        var $2801 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2801;
                        break;
                    case 'Fm.Term.typ':
                        var $2802 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2802;
                        break;
                    case 'Fm.Term.all':
                        var $2803 = self.eras;
                        var $2804 = self.self;
                        var $2805 = self.name;
                        var $2806 = self.xtyp;
                        var $2807 = self.body;
                        var $2808 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2808;
                        break;
                    case 'Fm.Term.lam':
                        var $2809 = self.name;
                        var $2810 = self.body;
                        var $2811 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2811;
                        break;
                    case 'Fm.Term.app':
                        var $2812 = self.func;
                        var $2813 = self.argm;
                        var $2814 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2814;
                        break;
                    case 'Fm.Term.let':
                        var $2815 = self.name;
                        var $2816 = self.expr;
                        var $2817 = self.body;
                        var $2818 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2818;
                        break;
                    case 'Fm.Term.def':
                        var $2819 = self.name;
                        var $2820 = self.expr;
                        var $2821 = self.body;
                        var $2822 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2822;
                        break;
                    case 'Fm.Term.ann':
                        var $2823 = self.done;
                        var $2824 = self.term;
                        var $2825 = self.type;
                        var $2826 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2826;
                        break;
                    case 'Fm.Term.gol':
                        var $2827 = self.name;
                        var $2828 = self.dref;
                        var $2829 = self.verb;
                        var $2830 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2830;
                        break;
                    case 'Fm.Term.hol':
                        var $2831 = self.path;
                        var $2832 = Fm$Term$equal$patch$($2831, _a$1, Unit$new);
                        var $2796 = $2832;
                        break;
                    case 'Fm.Term.nat':
                        var $2833 = self.natx;
                        var $2834 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2834;
                        break;
                    case 'Fm.Term.chr':
                        var $2835 = self.chrx;
                        var $2836 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2836;
                        break;
                    case 'Fm.Term.str':
                        var $2837 = self.strx;
                        var $2838 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2838;
                        break;
                    case 'Fm.Term.cse':
                        var $2839 = self.path;
                        var $2840 = self.expr;
                        var $2841 = self.name;
                        var $2842 = self.with;
                        var $2843 = self.cses;
                        var $2844 = self.moti;
                        var $2845 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2796 = $2845;
                        break;
                    case 'Fm.Term.ori':
                        var $2846 = self.orig;
                        var $2847 = self.expr;
                        var $2848 = Fm$Term$equal$extra_holes$(_a$1, $2847);
                        var $2796 = $2848;
                        break;
                };
                var $2793 = $2796;
                break;
            case 'Fm.Term.ref':
                var $2849 = self.name;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2851 = self.name;
                        var $2852 = self.indx;
                        var $2853 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2853;
                        break;
                    case 'Fm.Term.ref':
                        var $2854 = self.name;
                        var $2855 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2855;
                        break;
                    case 'Fm.Term.typ':
                        var $2856 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2856;
                        break;
                    case 'Fm.Term.all':
                        var $2857 = self.eras;
                        var $2858 = self.self;
                        var $2859 = self.name;
                        var $2860 = self.xtyp;
                        var $2861 = self.body;
                        var $2862 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2862;
                        break;
                    case 'Fm.Term.lam':
                        var $2863 = self.name;
                        var $2864 = self.body;
                        var $2865 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2865;
                        break;
                    case 'Fm.Term.app':
                        var $2866 = self.func;
                        var $2867 = self.argm;
                        var $2868 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2868;
                        break;
                    case 'Fm.Term.let':
                        var $2869 = self.name;
                        var $2870 = self.expr;
                        var $2871 = self.body;
                        var $2872 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2872;
                        break;
                    case 'Fm.Term.def':
                        var $2873 = self.name;
                        var $2874 = self.expr;
                        var $2875 = self.body;
                        var $2876 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2876;
                        break;
                    case 'Fm.Term.ann':
                        var $2877 = self.done;
                        var $2878 = self.term;
                        var $2879 = self.type;
                        var $2880 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2880;
                        break;
                    case 'Fm.Term.gol':
                        var $2881 = self.name;
                        var $2882 = self.dref;
                        var $2883 = self.verb;
                        var $2884 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2884;
                        break;
                    case 'Fm.Term.hol':
                        var $2885 = self.path;
                        var $2886 = Fm$Term$equal$patch$($2885, _a$1, Unit$new);
                        var $2850 = $2886;
                        break;
                    case 'Fm.Term.nat':
                        var $2887 = self.natx;
                        var $2888 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2888;
                        break;
                    case 'Fm.Term.chr':
                        var $2889 = self.chrx;
                        var $2890 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2890;
                        break;
                    case 'Fm.Term.str':
                        var $2891 = self.strx;
                        var $2892 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2892;
                        break;
                    case 'Fm.Term.cse':
                        var $2893 = self.path;
                        var $2894 = self.expr;
                        var $2895 = self.name;
                        var $2896 = self.with;
                        var $2897 = self.cses;
                        var $2898 = self.moti;
                        var $2899 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2850 = $2899;
                        break;
                    case 'Fm.Term.ori':
                        var $2900 = self.orig;
                        var $2901 = self.expr;
                        var $2902 = Fm$Term$equal$extra_holes$(_a$1, $2901);
                        var $2850 = $2902;
                        break;
                };
                var $2793 = $2850;
                break;
            case 'Fm.Term.typ':
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2904 = self.name;
                        var $2905 = self.indx;
                        var $2906 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2906;
                        break;
                    case 'Fm.Term.ref':
                        var $2907 = self.name;
                        var $2908 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2908;
                        break;
                    case 'Fm.Term.typ':
                        var $2909 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2909;
                        break;
                    case 'Fm.Term.all':
                        var $2910 = self.eras;
                        var $2911 = self.self;
                        var $2912 = self.name;
                        var $2913 = self.xtyp;
                        var $2914 = self.body;
                        var $2915 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2915;
                        break;
                    case 'Fm.Term.lam':
                        var $2916 = self.name;
                        var $2917 = self.body;
                        var $2918 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2918;
                        break;
                    case 'Fm.Term.app':
                        var $2919 = self.func;
                        var $2920 = self.argm;
                        var $2921 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2921;
                        break;
                    case 'Fm.Term.let':
                        var $2922 = self.name;
                        var $2923 = self.expr;
                        var $2924 = self.body;
                        var $2925 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2925;
                        break;
                    case 'Fm.Term.def':
                        var $2926 = self.name;
                        var $2927 = self.expr;
                        var $2928 = self.body;
                        var $2929 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2929;
                        break;
                    case 'Fm.Term.ann':
                        var $2930 = self.done;
                        var $2931 = self.term;
                        var $2932 = self.type;
                        var $2933 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2933;
                        break;
                    case 'Fm.Term.gol':
                        var $2934 = self.name;
                        var $2935 = self.dref;
                        var $2936 = self.verb;
                        var $2937 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2937;
                        break;
                    case 'Fm.Term.hol':
                        var $2938 = self.path;
                        var $2939 = Fm$Term$equal$patch$($2938, _a$1, Unit$new);
                        var $2903 = $2939;
                        break;
                    case 'Fm.Term.nat':
                        var $2940 = self.natx;
                        var $2941 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2941;
                        break;
                    case 'Fm.Term.chr':
                        var $2942 = self.chrx;
                        var $2943 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2943;
                        break;
                    case 'Fm.Term.str':
                        var $2944 = self.strx;
                        var $2945 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2945;
                        break;
                    case 'Fm.Term.cse':
                        var $2946 = self.path;
                        var $2947 = self.expr;
                        var $2948 = self.name;
                        var $2949 = self.with;
                        var $2950 = self.cses;
                        var $2951 = self.moti;
                        var $2952 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2903 = $2952;
                        break;
                    case 'Fm.Term.ori':
                        var $2953 = self.orig;
                        var $2954 = self.expr;
                        var $2955 = Fm$Term$equal$extra_holes$(_a$1, $2954);
                        var $2903 = $2955;
                        break;
                };
                var $2793 = $2903;
                break;
            case 'Fm.Term.all':
                var $2956 = self.eras;
                var $2957 = self.self;
                var $2958 = self.name;
                var $2959 = self.xtyp;
                var $2960 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2962 = self.name;
                        var $2963 = self.indx;
                        var $2964 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2964;
                        break;
                    case 'Fm.Term.ref':
                        var $2965 = self.name;
                        var $2966 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2966;
                        break;
                    case 'Fm.Term.typ':
                        var $2967 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2967;
                        break;
                    case 'Fm.Term.all':
                        var $2968 = self.eras;
                        var $2969 = self.self;
                        var $2970 = self.name;
                        var $2971 = self.xtyp;
                        var $2972 = self.body;
                        var $2973 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2973;
                        break;
                    case 'Fm.Term.lam':
                        var $2974 = self.name;
                        var $2975 = self.body;
                        var $2976 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2976;
                        break;
                    case 'Fm.Term.app':
                        var $2977 = self.func;
                        var $2978 = self.argm;
                        var $2979 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2979;
                        break;
                    case 'Fm.Term.let':
                        var $2980 = self.name;
                        var $2981 = self.expr;
                        var $2982 = self.body;
                        var $2983 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2983;
                        break;
                    case 'Fm.Term.def':
                        var $2984 = self.name;
                        var $2985 = self.expr;
                        var $2986 = self.body;
                        var $2987 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2987;
                        break;
                    case 'Fm.Term.ann':
                        var $2988 = self.done;
                        var $2989 = self.term;
                        var $2990 = self.type;
                        var $2991 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2991;
                        break;
                    case 'Fm.Term.gol':
                        var $2992 = self.name;
                        var $2993 = self.dref;
                        var $2994 = self.verb;
                        var $2995 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2995;
                        break;
                    case 'Fm.Term.hol':
                        var $2996 = self.path;
                        var $2997 = Fm$Term$equal$patch$($2996, _a$1, Unit$new);
                        var $2961 = $2997;
                        break;
                    case 'Fm.Term.nat':
                        var $2998 = self.natx;
                        var $2999 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $2999;
                        break;
                    case 'Fm.Term.chr':
                        var $3000 = self.chrx;
                        var $3001 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $3001;
                        break;
                    case 'Fm.Term.str':
                        var $3002 = self.strx;
                        var $3003 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $3003;
                        break;
                    case 'Fm.Term.cse':
                        var $3004 = self.path;
                        var $3005 = self.expr;
                        var $3006 = self.name;
                        var $3007 = self.with;
                        var $3008 = self.cses;
                        var $3009 = self.moti;
                        var $3010 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2961 = $3010;
                        break;
                    case 'Fm.Term.ori':
                        var $3011 = self.orig;
                        var $3012 = self.expr;
                        var $3013 = Fm$Term$equal$extra_holes$(_a$1, $3012);
                        var $2961 = $3013;
                        break;
                };
                var $2793 = $2961;
                break;
            case 'Fm.Term.lam':
                var $3014 = self.name;
                var $3015 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3017 = self.name;
                        var $3018 = self.indx;
                        var $3019 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3019;
                        break;
                    case 'Fm.Term.ref':
                        var $3020 = self.name;
                        var $3021 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3021;
                        break;
                    case 'Fm.Term.typ':
                        var $3022 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3022;
                        break;
                    case 'Fm.Term.all':
                        var $3023 = self.eras;
                        var $3024 = self.self;
                        var $3025 = self.name;
                        var $3026 = self.xtyp;
                        var $3027 = self.body;
                        var $3028 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3028;
                        break;
                    case 'Fm.Term.lam':
                        var $3029 = self.name;
                        var $3030 = self.body;
                        var $3031 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3031;
                        break;
                    case 'Fm.Term.app':
                        var $3032 = self.func;
                        var $3033 = self.argm;
                        var $3034 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3034;
                        break;
                    case 'Fm.Term.let':
                        var $3035 = self.name;
                        var $3036 = self.expr;
                        var $3037 = self.body;
                        var $3038 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3038;
                        break;
                    case 'Fm.Term.def':
                        var $3039 = self.name;
                        var $3040 = self.expr;
                        var $3041 = self.body;
                        var $3042 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3042;
                        break;
                    case 'Fm.Term.ann':
                        var $3043 = self.done;
                        var $3044 = self.term;
                        var $3045 = self.type;
                        var $3046 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3046;
                        break;
                    case 'Fm.Term.gol':
                        var $3047 = self.name;
                        var $3048 = self.dref;
                        var $3049 = self.verb;
                        var $3050 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3050;
                        break;
                    case 'Fm.Term.hol':
                        var $3051 = self.path;
                        var $3052 = Fm$Term$equal$patch$($3051, _a$1, Unit$new);
                        var $3016 = $3052;
                        break;
                    case 'Fm.Term.nat':
                        var $3053 = self.natx;
                        var $3054 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3054;
                        break;
                    case 'Fm.Term.chr':
                        var $3055 = self.chrx;
                        var $3056 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3056;
                        break;
                    case 'Fm.Term.str':
                        var $3057 = self.strx;
                        var $3058 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3058;
                        break;
                    case 'Fm.Term.cse':
                        var $3059 = self.path;
                        var $3060 = self.expr;
                        var $3061 = self.name;
                        var $3062 = self.with;
                        var $3063 = self.cses;
                        var $3064 = self.moti;
                        var $3065 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3016 = $3065;
                        break;
                    case 'Fm.Term.ori':
                        var $3066 = self.orig;
                        var $3067 = self.expr;
                        var $3068 = Fm$Term$equal$extra_holes$(_a$1, $3067);
                        var $3016 = $3068;
                        break;
                };
                var $2793 = $3016;
                break;
            case 'Fm.Term.app':
                var $3069 = self.func;
                var $3070 = self.argm;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3072 = self.name;
                        var $3073 = self.indx;
                        var $3074 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3074;
                        break;
                    case 'Fm.Term.ref':
                        var $3075 = self.name;
                        var $3076 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3076;
                        break;
                    case 'Fm.Term.typ':
                        var $3077 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3077;
                        break;
                    case 'Fm.Term.all':
                        var $3078 = self.eras;
                        var $3079 = self.self;
                        var $3080 = self.name;
                        var $3081 = self.xtyp;
                        var $3082 = self.body;
                        var $3083 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3083;
                        break;
                    case 'Fm.Term.lam':
                        var $3084 = self.name;
                        var $3085 = self.body;
                        var $3086 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3086;
                        break;
                    case 'Fm.Term.app':
                        var $3087 = self.func;
                        var $3088 = self.argm;
                        var $3089 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$extra_holes$($3069, $3087))((_$7 => {
                            var $3090 = Fm$Term$equal$extra_holes$($3070, $3088);
                            return $3090;
                        }));
                        var $3071 = $3089;
                        break;
                    case 'Fm.Term.let':
                        var $3091 = self.name;
                        var $3092 = self.expr;
                        var $3093 = self.body;
                        var $3094 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3094;
                        break;
                    case 'Fm.Term.def':
                        var $3095 = self.name;
                        var $3096 = self.expr;
                        var $3097 = self.body;
                        var $3098 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3098;
                        break;
                    case 'Fm.Term.ann':
                        var $3099 = self.done;
                        var $3100 = self.term;
                        var $3101 = self.type;
                        var $3102 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3102;
                        break;
                    case 'Fm.Term.gol':
                        var $3103 = self.name;
                        var $3104 = self.dref;
                        var $3105 = self.verb;
                        var $3106 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3106;
                        break;
                    case 'Fm.Term.hol':
                        var $3107 = self.path;
                        var $3108 = Fm$Term$equal$patch$($3107, _a$1, Unit$new);
                        var $3071 = $3108;
                        break;
                    case 'Fm.Term.nat':
                        var $3109 = self.natx;
                        var $3110 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3110;
                        break;
                    case 'Fm.Term.chr':
                        var $3111 = self.chrx;
                        var $3112 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3112;
                        break;
                    case 'Fm.Term.str':
                        var $3113 = self.strx;
                        var $3114 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3114;
                        break;
                    case 'Fm.Term.cse':
                        var $3115 = self.path;
                        var $3116 = self.expr;
                        var $3117 = self.name;
                        var $3118 = self.with;
                        var $3119 = self.cses;
                        var $3120 = self.moti;
                        var $3121 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3071 = $3121;
                        break;
                    case 'Fm.Term.ori':
                        var $3122 = self.orig;
                        var $3123 = self.expr;
                        var $3124 = Fm$Term$equal$extra_holes$(_a$1, $3123);
                        var $3071 = $3124;
                        break;
                };
                var $2793 = $3071;
                break;
            case 'Fm.Term.let':
                var $3125 = self.name;
                var $3126 = self.expr;
                var $3127 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3129 = self.name;
                        var $3130 = self.indx;
                        var $3131 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3131;
                        break;
                    case 'Fm.Term.ref':
                        var $3132 = self.name;
                        var $3133 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3133;
                        break;
                    case 'Fm.Term.typ':
                        var $3134 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3134;
                        break;
                    case 'Fm.Term.all':
                        var $3135 = self.eras;
                        var $3136 = self.self;
                        var $3137 = self.name;
                        var $3138 = self.xtyp;
                        var $3139 = self.body;
                        var $3140 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3140;
                        break;
                    case 'Fm.Term.lam':
                        var $3141 = self.name;
                        var $3142 = self.body;
                        var $3143 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3143;
                        break;
                    case 'Fm.Term.app':
                        var $3144 = self.func;
                        var $3145 = self.argm;
                        var $3146 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3146;
                        break;
                    case 'Fm.Term.let':
                        var $3147 = self.name;
                        var $3148 = self.expr;
                        var $3149 = self.body;
                        var $3150 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3150;
                        break;
                    case 'Fm.Term.def':
                        var $3151 = self.name;
                        var $3152 = self.expr;
                        var $3153 = self.body;
                        var $3154 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3154;
                        break;
                    case 'Fm.Term.ann':
                        var $3155 = self.done;
                        var $3156 = self.term;
                        var $3157 = self.type;
                        var $3158 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3158;
                        break;
                    case 'Fm.Term.gol':
                        var $3159 = self.name;
                        var $3160 = self.dref;
                        var $3161 = self.verb;
                        var $3162 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3162;
                        break;
                    case 'Fm.Term.hol':
                        var $3163 = self.path;
                        var $3164 = Fm$Term$equal$patch$($3163, _a$1, Unit$new);
                        var $3128 = $3164;
                        break;
                    case 'Fm.Term.nat':
                        var $3165 = self.natx;
                        var $3166 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3166;
                        break;
                    case 'Fm.Term.chr':
                        var $3167 = self.chrx;
                        var $3168 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3168;
                        break;
                    case 'Fm.Term.str':
                        var $3169 = self.strx;
                        var $3170 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3170;
                        break;
                    case 'Fm.Term.cse':
                        var $3171 = self.path;
                        var $3172 = self.expr;
                        var $3173 = self.name;
                        var $3174 = self.with;
                        var $3175 = self.cses;
                        var $3176 = self.moti;
                        var $3177 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3128 = $3177;
                        break;
                    case 'Fm.Term.ori':
                        var $3178 = self.orig;
                        var $3179 = self.expr;
                        var $3180 = Fm$Term$equal$extra_holes$(_a$1, $3179);
                        var $3128 = $3180;
                        break;
                };
                var $2793 = $3128;
                break;
            case 'Fm.Term.def':
                var $3181 = self.name;
                var $3182 = self.expr;
                var $3183 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3185 = self.name;
                        var $3186 = self.indx;
                        var $3187 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3187;
                        break;
                    case 'Fm.Term.ref':
                        var $3188 = self.name;
                        var $3189 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3189;
                        break;
                    case 'Fm.Term.typ':
                        var $3190 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3190;
                        break;
                    case 'Fm.Term.all':
                        var $3191 = self.eras;
                        var $3192 = self.self;
                        var $3193 = self.name;
                        var $3194 = self.xtyp;
                        var $3195 = self.body;
                        var $3196 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3196;
                        break;
                    case 'Fm.Term.lam':
                        var $3197 = self.name;
                        var $3198 = self.body;
                        var $3199 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3199;
                        break;
                    case 'Fm.Term.app':
                        var $3200 = self.func;
                        var $3201 = self.argm;
                        var $3202 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3202;
                        break;
                    case 'Fm.Term.let':
                        var $3203 = self.name;
                        var $3204 = self.expr;
                        var $3205 = self.body;
                        var $3206 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3206;
                        break;
                    case 'Fm.Term.def':
                        var $3207 = self.name;
                        var $3208 = self.expr;
                        var $3209 = self.body;
                        var $3210 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3210;
                        break;
                    case 'Fm.Term.ann':
                        var $3211 = self.done;
                        var $3212 = self.term;
                        var $3213 = self.type;
                        var $3214 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3214;
                        break;
                    case 'Fm.Term.gol':
                        var $3215 = self.name;
                        var $3216 = self.dref;
                        var $3217 = self.verb;
                        var $3218 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3218;
                        break;
                    case 'Fm.Term.hol':
                        var $3219 = self.path;
                        var $3220 = Fm$Term$equal$patch$($3219, _a$1, Unit$new);
                        var $3184 = $3220;
                        break;
                    case 'Fm.Term.nat':
                        var $3221 = self.natx;
                        var $3222 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3222;
                        break;
                    case 'Fm.Term.chr':
                        var $3223 = self.chrx;
                        var $3224 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3224;
                        break;
                    case 'Fm.Term.str':
                        var $3225 = self.strx;
                        var $3226 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3226;
                        break;
                    case 'Fm.Term.cse':
                        var $3227 = self.path;
                        var $3228 = self.expr;
                        var $3229 = self.name;
                        var $3230 = self.with;
                        var $3231 = self.cses;
                        var $3232 = self.moti;
                        var $3233 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3184 = $3233;
                        break;
                    case 'Fm.Term.ori':
                        var $3234 = self.orig;
                        var $3235 = self.expr;
                        var $3236 = Fm$Term$equal$extra_holes$(_a$1, $3235);
                        var $3184 = $3236;
                        break;
                };
                var $2793 = $3184;
                break;
            case 'Fm.Term.ann':
                var $3237 = self.done;
                var $3238 = self.term;
                var $3239 = self.type;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3241 = self.name;
                        var $3242 = self.indx;
                        var $3243 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3243;
                        break;
                    case 'Fm.Term.ref':
                        var $3244 = self.name;
                        var $3245 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3245;
                        break;
                    case 'Fm.Term.typ':
                        var $3246 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3246;
                        break;
                    case 'Fm.Term.all':
                        var $3247 = self.eras;
                        var $3248 = self.self;
                        var $3249 = self.name;
                        var $3250 = self.xtyp;
                        var $3251 = self.body;
                        var $3252 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3252;
                        break;
                    case 'Fm.Term.lam':
                        var $3253 = self.name;
                        var $3254 = self.body;
                        var $3255 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3255;
                        break;
                    case 'Fm.Term.app':
                        var $3256 = self.func;
                        var $3257 = self.argm;
                        var $3258 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3258;
                        break;
                    case 'Fm.Term.let':
                        var $3259 = self.name;
                        var $3260 = self.expr;
                        var $3261 = self.body;
                        var $3262 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3262;
                        break;
                    case 'Fm.Term.def':
                        var $3263 = self.name;
                        var $3264 = self.expr;
                        var $3265 = self.body;
                        var $3266 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3266;
                        break;
                    case 'Fm.Term.ann':
                        var $3267 = self.done;
                        var $3268 = self.term;
                        var $3269 = self.type;
                        var $3270 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3270;
                        break;
                    case 'Fm.Term.gol':
                        var $3271 = self.name;
                        var $3272 = self.dref;
                        var $3273 = self.verb;
                        var $3274 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3274;
                        break;
                    case 'Fm.Term.hol':
                        var $3275 = self.path;
                        var $3276 = Fm$Term$equal$patch$($3275, _a$1, Unit$new);
                        var $3240 = $3276;
                        break;
                    case 'Fm.Term.nat':
                        var $3277 = self.natx;
                        var $3278 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3278;
                        break;
                    case 'Fm.Term.chr':
                        var $3279 = self.chrx;
                        var $3280 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3280;
                        break;
                    case 'Fm.Term.str':
                        var $3281 = self.strx;
                        var $3282 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3282;
                        break;
                    case 'Fm.Term.cse':
                        var $3283 = self.path;
                        var $3284 = self.expr;
                        var $3285 = self.name;
                        var $3286 = self.with;
                        var $3287 = self.cses;
                        var $3288 = self.moti;
                        var $3289 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3240 = $3289;
                        break;
                    case 'Fm.Term.ori':
                        var $3290 = self.orig;
                        var $3291 = self.expr;
                        var $3292 = Fm$Term$equal$extra_holes$(_a$1, $3291);
                        var $3240 = $3292;
                        break;
                };
                var $2793 = $3240;
                break;
            case 'Fm.Term.gol':
                var $3293 = self.name;
                var $3294 = self.dref;
                var $3295 = self.verb;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3297 = self.name;
                        var $3298 = self.indx;
                        var $3299 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3299;
                        break;
                    case 'Fm.Term.ref':
                        var $3300 = self.name;
                        var $3301 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3301;
                        break;
                    case 'Fm.Term.typ':
                        var $3302 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3302;
                        break;
                    case 'Fm.Term.all':
                        var $3303 = self.eras;
                        var $3304 = self.self;
                        var $3305 = self.name;
                        var $3306 = self.xtyp;
                        var $3307 = self.body;
                        var $3308 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3308;
                        break;
                    case 'Fm.Term.lam':
                        var $3309 = self.name;
                        var $3310 = self.body;
                        var $3311 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3311;
                        break;
                    case 'Fm.Term.app':
                        var $3312 = self.func;
                        var $3313 = self.argm;
                        var $3314 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3314;
                        break;
                    case 'Fm.Term.let':
                        var $3315 = self.name;
                        var $3316 = self.expr;
                        var $3317 = self.body;
                        var $3318 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3318;
                        break;
                    case 'Fm.Term.def':
                        var $3319 = self.name;
                        var $3320 = self.expr;
                        var $3321 = self.body;
                        var $3322 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3322;
                        break;
                    case 'Fm.Term.ann':
                        var $3323 = self.done;
                        var $3324 = self.term;
                        var $3325 = self.type;
                        var $3326 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3326;
                        break;
                    case 'Fm.Term.gol':
                        var $3327 = self.name;
                        var $3328 = self.dref;
                        var $3329 = self.verb;
                        var $3330 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3330;
                        break;
                    case 'Fm.Term.hol':
                        var $3331 = self.path;
                        var $3332 = Fm$Term$equal$patch$($3331, _a$1, Unit$new);
                        var $3296 = $3332;
                        break;
                    case 'Fm.Term.nat':
                        var $3333 = self.natx;
                        var $3334 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3334;
                        break;
                    case 'Fm.Term.chr':
                        var $3335 = self.chrx;
                        var $3336 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3336;
                        break;
                    case 'Fm.Term.str':
                        var $3337 = self.strx;
                        var $3338 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3338;
                        break;
                    case 'Fm.Term.cse':
                        var $3339 = self.path;
                        var $3340 = self.expr;
                        var $3341 = self.name;
                        var $3342 = self.with;
                        var $3343 = self.cses;
                        var $3344 = self.moti;
                        var $3345 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3296 = $3345;
                        break;
                    case 'Fm.Term.ori':
                        var $3346 = self.orig;
                        var $3347 = self.expr;
                        var $3348 = Fm$Term$equal$extra_holes$(_a$1, $3347);
                        var $3296 = $3348;
                        break;
                };
                var $2793 = $3296;
                break;
            case 'Fm.Term.hol':
                var $3349 = self.path;
                var $3350 = Fm$Term$equal$patch$($3349, _b$2, Unit$new);
                var $2793 = $3350;
                break;
            case 'Fm.Term.nat':
                var $3351 = self.natx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3353 = self.name;
                        var $3354 = self.indx;
                        var $3355 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3355;
                        break;
                    case 'Fm.Term.ref':
                        var $3356 = self.name;
                        var $3357 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3357;
                        break;
                    case 'Fm.Term.typ':
                        var $3358 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3358;
                        break;
                    case 'Fm.Term.all':
                        var $3359 = self.eras;
                        var $3360 = self.self;
                        var $3361 = self.name;
                        var $3362 = self.xtyp;
                        var $3363 = self.body;
                        var $3364 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3364;
                        break;
                    case 'Fm.Term.lam':
                        var $3365 = self.name;
                        var $3366 = self.body;
                        var $3367 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3367;
                        break;
                    case 'Fm.Term.app':
                        var $3368 = self.func;
                        var $3369 = self.argm;
                        var $3370 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3370;
                        break;
                    case 'Fm.Term.let':
                        var $3371 = self.name;
                        var $3372 = self.expr;
                        var $3373 = self.body;
                        var $3374 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3374;
                        break;
                    case 'Fm.Term.def':
                        var $3375 = self.name;
                        var $3376 = self.expr;
                        var $3377 = self.body;
                        var $3378 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3378;
                        break;
                    case 'Fm.Term.ann':
                        var $3379 = self.done;
                        var $3380 = self.term;
                        var $3381 = self.type;
                        var $3382 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3382;
                        break;
                    case 'Fm.Term.gol':
                        var $3383 = self.name;
                        var $3384 = self.dref;
                        var $3385 = self.verb;
                        var $3386 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3386;
                        break;
                    case 'Fm.Term.hol':
                        var $3387 = self.path;
                        var $3388 = Fm$Term$equal$patch$($3387, _a$1, Unit$new);
                        var $3352 = $3388;
                        break;
                    case 'Fm.Term.nat':
                        var $3389 = self.natx;
                        var $3390 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3390;
                        break;
                    case 'Fm.Term.chr':
                        var $3391 = self.chrx;
                        var $3392 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3392;
                        break;
                    case 'Fm.Term.str':
                        var $3393 = self.strx;
                        var $3394 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3394;
                        break;
                    case 'Fm.Term.cse':
                        var $3395 = self.path;
                        var $3396 = self.expr;
                        var $3397 = self.name;
                        var $3398 = self.with;
                        var $3399 = self.cses;
                        var $3400 = self.moti;
                        var $3401 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3352 = $3401;
                        break;
                    case 'Fm.Term.ori':
                        var $3402 = self.orig;
                        var $3403 = self.expr;
                        var $3404 = Fm$Term$equal$extra_holes$(_a$1, $3403);
                        var $3352 = $3404;
                        break;
                };
                var $2793 = $3352;
                break;
            case 'Fm.Term.chr':
                var $3405 = self.chrx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3407 = self.name;
                        var $3408 = self.indx;
                        var $3409 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3409;
                        break;
                    case 'Fm.Term.ref':
                        var $3410 = self.name;
                        var $3411 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3411;
                        break;
                    case 'Fm.Term.typ':
                        var $3412 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3412;
                        break;
                    case 'Fm.Term.all':
                        var $3413 = self.eras;
                        var $3414 = self.self;
                        var $3415 = self.name;
                        var $3416 = self.xtyp;
                        var $3417 = self.body;
                        var $3418 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3418;
                        break;
                    case 'Fm.Term.lam':
                        var $3419 = self.name;
                        var $3420 = self.body;
                        var $3421 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3421;
                        break;
                    case 'Fm.Term.app':
                        var $3422 = self.func;
                        var $3423 = self.argm;
                        var $3424 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3424;
                        break;
                    case 'Fm.Term.let':
                        var $3425 = self.name;
                        var $3426 = self.expr;
                        var $3427 = self.body;
                        var $3428 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3428;
                        break;
                    case 'Fm.Term.def':
                        var $3429 = self.name;
                        var $3430 = self.expr;
                        var $3431 = self.body;
                        var $3432 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3432;
                        break;
                    case 'Fm.Term.ann':
                        var $3433 = self.done;
                        var $3434 = self.term;
                        var $3435 = self.type;
                        var $3436 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3436;
                        break;
                    case 'Fm.Term.gol':
                        var $3437 = self.name;
                        var $3438 = self.dref;
                        var $3439 = self.verb;
                        var $3440 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3440;
                        break;
                    case 'Fm.Term.hol':
                        var $3441 = self.path;
                        var $3442 = Fm$Term$equal$patch$($3441, _a$1, Unit$new);
                        var $3406 = $3442;
                        break;
                    case 'Fm.Term.nat':
                        var $3443 = self.natx;
                        var $3444 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3444;
                        break;
                    case 'Fm.Term.chr':
                        var $3445 = self.chrx;
                        var $3446 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3446;
                        break;
                    case 'Fm.Term.str':
                        var $3447 = self.strx;
                        var $3448 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3448;
                        break;
                    case 'Fm.Term.cse':
                        var $3449 = self.path;
                        var $3450 = self.expr;
                        var $3451 = self.name;
                        var $3452 = self.with;
                        var $3453 = self.cses;
                        var $3454 = self.moti;
                        var $3455 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3406 = $3455;
                        break;
                    case 'Fm.Term.ori':
                        var $3456 = self.orig;
                        var $3457 = self.expr;
                        var $3458 = Fm$Term$equal$extra_holes$(_a$1, $3457);
                        var $3406 = $3458;
                        break;
                };
                var $2793 = $3406;
                break;
            case 'Fm.Term.str':
                var $3459 = self.strx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3461 = self.name;
                        var $3462 = self.indx;
                        var $3463 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3463;
                        break;
                    case 'Fm.Term.ref':
                        var $3464 = self.name;
                        var $3465 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3465;
                        break;
                    case 'Fm.Term.typ':
                        var $3466 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3466;
                        break;
                    case 'Fm.Term.all':
                        var $3467 = self.eras;
                        var $3468 = self.self;
                        var $3469 = self.name;
                        var $3470 = self.xtyp;
                        var $3471 = self.body;
                        var $3472 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3472;
                        break;
                    case 'Fm.Term.lam':
                        var $3473 = self.name;
                        var $3474 = self.body;
                        var $3475 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3475;
                        break;
                    case 'Fm.Term.app':
                        var $3476 = self.func;
                        var $3477 = self.argm;
                        var $3478 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3478;
                        break;
                    case 'Fm.Term.let':
                        var $3479 = self.name;
                        var $3480 = self.expr;
                        var $3481 = self.body;
                        var $3482 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3482;
                        break;
                    case 'Fm.Term.def':
                        var $3483 = self.name;
                        var $3484 = self.expr;
                        var $3485 = self.body;
                        var $3486 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3486;
                        break;
                    case 'Fm.Term.ann':
                        var $3487 = self.done;
                        var $3488 = self.term;
                        var $3489 = self.type;
                        var $3490 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3490;
                        break;
                    case 'Fm.Term.gol':
                        var $3491 = self.name;
                        var $3492 = self.dref;
                        var $3493 = self.verb;
                        var $3494 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3494;
                        break;
                    case 'Fm.Term.hol':
                        var $3495 = self.path;
                        var $3496 = Fm$Term$equal$patch$($3495, _a$1, Unit$new);
                        var $3460 = $3496;
                        break;
                    case 'Fm.Term.nat':
                        var $3497 = self.natx;
                        var $3498 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3498;
                        break;
                    case 'Fm.Term.chr':
                        var $3499 = self.chrx;
                        var $3500 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3500;
                        break;
                    case 'Fm.Term.str':
                        var $3501 = self.strx;
                        var $3502 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3502;
                        break;
                    case 'Fm.Term.cse':
                        var $3503 = self.path;
                        var $3504 = self.expr;
                        var $3505 = self.name;
                        var $3506 = self.with;
                        var $3507 = self.cses;
                        var $3508 = self.moti;
                        var $3509 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3460 = $3509;
                        break;
                    case 'Fm.Term.ori':
                        var $3510 = self.orig;
                        var $3511 = self.expr;
                        var $3512 = Fm$Term$equal$extra_holes$(_a$1, $3511);
                        var $3460 = $3512;
                        break;
                };
                var $2793 = $3460;
                break;
            case 'Fm.Term.cse':
                var $3513 = self.path;
                var $3514 = self.expr;
                var $3515 = self.name;
                var $3516 = self.with;
                var $3517 = self.cses;
                var $3518 = self.moti;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3520 = self.name;
                        var $3521 = self.indx;
                        var $3522 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3522;
                        break;
                    case 'Fm.Term.ref':
                        var $3523 = self.name;
                        var $3524 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3524;
                        break;
                    case 'Fm.Term.typ':
                        var $3525 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3525;
                        break;
                    case 'Fm.Term.all':
                        var $3526 = self.eras;
                        var $3527 = self.self;
                        var $3528 = self.name;
                        var $3529 = self.xtyp;
                        var $3530 = self.body;
                        var $3531 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3531;
                        break;
                    case 'Fm.Term.lam':
                        var $3532 = self.name;
                        var $3533 = self.body;
                        var $3534 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3534;
                        break;
                    case 'Fm.Term.app':
                        var $3535 = self.func;
                        var $3536 = self.argm;
                        var $3537 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3537;
                        break;
                    case 'Fm.Term.let':
                        var $3538 = self.name;
                        var $3539 = self.expr;
                        var $3540 = self.body;
                        var $3541 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3541;
                        break;
                    case 'Fm.Term.def':
                        var $3542 = self.name;
                        var $3543 = self.expr;
                        var $3544 = self.body;
                        var $3545 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3545;
                        break;
                    case 'Fm.Term.ann':
                        var $3546 = self.done;
                        var $3547 = self.term;
                        var $3548 = self.type;
                        var $3549 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3549;
                        break;
                    case 'Fm.Term.gol':
                        var $3550 = self.name;
                        var $3551 = self.dref;
                        var $3552 = self.verb;
                        var $3553 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3553;
                        break;
                    case 'Fm.Term.hol':
                        var $3554 = self.path;
                        var $3555 = Fm$Term$equal$patch$($3554, _a$1, Unit$new);
                        var $3519 = $3555;
                        break;
                    case 'Fm.Term.nat':
                        var $3556 = self.natx;
                        var $3557 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3557;
                        break;
                    case 'Fm.Term.chr':
                        var $3558 = self.chrx;
                        var $3559 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3559;
                        break;
                    case 'Fm.Term.str':
                        var $3560 = self.strx;
                        var $3561 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3561;
                        break;
                    case 'Fm.Term.cse':
                        var $3562 = self.path;
                        var $3563 = self.expr;
                        var $3564 = self.name;
                        var $3565 = self.with;
                        var $3566 = self.cses;
                        var $3567 = self.moti;
                        var $3568 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3519 = $3568;
                        break;
                    case 'Fm.Term.ori':
                        var $3569 = self.orig;
                        var $3570 = self.expr;
                        var $3571 = Fm$Term$equal$extra_holes$(_a$1, $3570);
                        var $3519 = $3571;
                        break;
                };
                var $2793 = $3519;
                break;
            case 'Fm.Term.ori':
                var $3572 = self.orig;
                var $3573 = self.expr;
                var $3574 = Fm$Term$equal$extra_holes$($3573, _b$2);
                var $2793 = $3574;
                break;
        };
        return $2793;
    };
    const Fm$Term$equal$extra_holes = x0 => x1 => Fm$Term$equal$extra_holes$(x0, x1);

    function Set$set$(_bits$1, _set$2) {
        var $3575 = Map$set$(_bits$1, Unit$new, _set$2);
        return $3575;
    };
    const Set$set = x0 => x1 => Set$set$(x0, x1);

    function Bool$eql$(_a$1, _b$2) {
        var self = _a$1;
        if (self) {
            var $3577 = _b$2;
            var $3576 = $3577;
        } else {
            var $3578 = (!_b$2);
            var $3576 = $3578;
        };
        return $3576;
    };
    const Bool$eql = x0 => x1 => Bool$eql$(x0, x1);

    function Fm$Term$equal$(_a$1, _b$2, _defs$3, _lv$4, _seen$5) {
        var _ah$6 = Fm$Term$serialize$(Fm$Term$reduce$(_a$1, Map$new), _lv$4, _lv$4, Bits$e);
        var _bh$7 = Fm$Term$serialize$(Fm$Term$reduce$(_b$2, Map$new), _lv$4, _lv$4, Bits$e);
        var self = (_bh$7 === _ah$6);
        if (self) {
            var $3580 = Monad$pure$(Fm$Check$monad)(Bool$true);
            var $3579 = $3580;
        } else {
            var _a1$8 = Fm$Term$reduce$(_a$1, _defs$3);
            var _b1$9 = Fm$Term$reduce$(_b$2, _defs$3);
            var _ah$10 = Fm$Term$serialize$(_a1$8, _lv$4, _lv$4, Bits$e);
            var _bh$11 = Fm$Term$serialize$(_b1$9, _lv$4, _lv$4, Bits$e);
            var self = (_bh$11 === _ah$10);
            if (self) {
                var $3582 = Monad$pure$(Fm$Check$monad)(Bool$true);
                var $3581 = $3582;
            } else {
                var _id$12 = (_bh$11 + _ah$10);
                var self = Set$has$(_id$12, _seen$5);
                if (self) {
                    var $3584 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$extra_holes$(_a$1, _b$2))((_$13 => {
                        var $3585 = Monad$pure$(Fm$Check$monad)(Bool$true);
                        return $3585;
                    }));
                    var $3583 = $3584;
                } else {
                    var self = _a1$8;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $3587 = self.name;
                            var $3588 = self.indx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3590 = self.name;
                                    var $3591 = self.indx;
                                    var $3592 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3592;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3593 = self.name;
                                    var $3594 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3594;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3595 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3595;
                                    break;
                                case 'Fm.Term.all':
                                    var $3596 = self.eras;
                                    var $3597 = self.self;
                                    var $3598 = self.name;
                                    var $3599 = self.xtyp;
                                    var $3600 = self.body;
                                    var $3601 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3601;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3602 = self.name;
                                    var $3603 = self.body;
                                    var $3604 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3604;
                                    break;
                                case 'Fm.Term.app':
                                    var $3605 = self.func;
                                    var $3606 = self.argm;
                                    var $3607 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3607;
                                    break;
                                case 'Fm.Term.let':
                                    var $3608 = self.name;
                                    var $3609 = self.expr;
                                    var $3610 = self.body;
                                    var $3611 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3611;
                                    break;
                                case 'Fm.Term.def':
                                    var $3612 = self.name;
                                    var $3613 = self.expr;
                                    var $3614 = self.body;
                                    var $3615 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3615;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3616 = self.done;
                                    var $3617 = self.term;
                                    var $3618 = self.type;
                                    var $3619 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3619;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3620 = self.name;
                                    var $3621 = self.dref;
                                    var $3622 = self.verb;
                                    var $3623 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3623;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3624 = self.path;
                                    var $3625 = Fm$Term$equal$patch$($3624, _a$1, Bool$true);
                                    var $3589 = $3625;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3626 = self.natx;
                                    var $3627 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3627;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3628 = self.chrx;
                                    var $3629 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3629;
                                    break;
                                case 'Fm.Term.str':
                                    var $3630 = self.strx;
                                    var $3631 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3631;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3632 = self.path;
                                    var $3633 = self.expr;
                                    var $3634 = self.name;
                                    var $3635 = self.with;
                                    var $3636 = self.cses;
                                    var $3637 = self.moti;
                                    var $3638 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3638;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3639 = self.orig;
                                    var $3640 = self.expr;
                                    var $3641 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3589 = $3641;
                                    break;
                            };
                            var $3586 = $3589;
                            break;
                        case 'Fm.Term.ref':
                            var $3642 = self.name;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3644 = self.name;
                                    var $3645 = self.indx;
                                    var $3646 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3646;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3647 = self.name;
                                    var $3648 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3648;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3649 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3649;
                                    break;
                                case 'Fm.Term.all':
                                    var $3650 = self.eras;
                                    var $3651 = self.self;
                                    var $3652 = self.name;
                                    var $3653 = self.xtyp;
                                    var $3654 = self.body;
                                    var $3655 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3655;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3656 = self.name;
                                    var $3657 = self.body;
                                    var $3658 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3658;
                                    break;
                                case 'Fm.Term.app':
                                    var $3659 = self.func;
                                    var $3660 = self.argm;
                                    var $3661 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3661;
                                    break;
                                case 'Fm.Term.let':
                                    var $3662 = self.name;
                                    var $3663 = self.expr;
                                    var $3664 = self.body;
                                    var $3665 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3665;
                                    break;
                                case 'Fm.Term.def':
                                    var $3666 = self.name;
                                    var $3667 = self.expr;
                                    var $3668 = self.body;
                                    var $3669 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3669;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3670 = self.done;
                                    var $3671 = self.term;
                                    var $3672 = self.type;
                                    var $3673 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3673;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3674 = self.name;
                                    var $3675 = self.dref;
                                    var $3676 = self.verb;
                                    var $3677 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3677;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3678 = self.path;
                                    var $3679 = Fm$Term$equal$patch$($3678, _a$1, Bool$true);
                                    var $3643 = $3679;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3680 = self.natx;
                                    var $3681 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3681;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3682 = self.chrx;
                                    var $3683 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3683;
                                    break;
                                case 'Fm.Term.str':
                                    var $3684 = self.strx;
                                    var $3685 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3685;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3686 = self.path;
                                    var $3687 = self.expr;
                                    var $3688 = self.name;
                                    var $3689 = self.with;
                                    var $3690 = self.cses;
                                    var $3691 = self.moti;
                                    var $3692 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3692;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3693 = self.orig;
                                    var $3694 = self.expr;
                                    var $3695 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3643 = $3695;
                                    break;
                            };
                            var $3586 = $3643;
                            break;
                        case 'Fm.Term.typ':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3697 = self.name;
                                    var $3698 = self.indx;
                                    var $3699 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3699;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3700 = self.name;
                                    var $3701 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3701;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3702 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3702;
                                    break;
                                case 'Fm.Term.all':
                                    var $3703 = self.eras;
                                    var $3704 = self.self;
                                    var $3705 = self.name;
                                    var $3706 = self.xtyp;
                                    var $3707 = self.body;
                                    var $3708 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3708;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3709 = self.name;
                                    var $3710 = self.body;
                                    var $3711 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3711;
                                    break;
                                case 'Fm.Term.app':
                                    var $3712 = self.func;
                                    var $3713 = self.argm;
                                    var $3714 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3714;
                                    break;
                                case 'Fm.Term.let':
                                    var $3715 = self.name;
                                    var $3716 = self.expr;
                                    var $3717 = self.body;
                                    var $3718 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3718;
                                    break;
                                case 'Fm.Term.def':
                                    var $3719 = self.name;
                                    var $3720 = self.expr;
                                    var $3721 = self.body;
                                    var $3722 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3722;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3723 = self.done;
                                    var $3724 = self.term;
                                    var $3725 = self.type;
                                    var $3726 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3726;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3727 = self.name;
                                    var $3728 = self.dref;
                                    var $3729 = self.verb;
                                    var $3730 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3730;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3731 = self.path;
                                    var $3732 = Fm$Term$equal$patch$($3731, _a$1, Bool$true);
                                    var $3696 = $3732;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3733 = self.natx;
                                    var $3734 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3734;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3735 = self.chrx;
                                    var $3736 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3736;
                                    break;
                                case 'Fm.Term.str':
                                    var $3737 = self.strx;
                                    var $3738 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3738;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3739 = self.path;
                                    var $3740 = self.expr;
                                    var $3741 = self.name;
                                    var $3742 = self.with;
                                    var $3743 = self.cses;
                                    var $3744 = self.moti;
                                    var $3745 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3745;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3746 = self.orig;
                                    var $3747 = self.expr;
                                    var $3748 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3696 = $3748;
                                    break;
                            };
                            var $3586 = $3696;
                            break;
                        case 'Fm.Term.all':
                            var $3749 = self.eras;
                            var $3750 = self.self;
                            var $3751 = self.name;
                            var $3752 = self.xtyp;
                            var $3753 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3755 = self.name;
                                    var $3756 = self.indx;
                                    var $3757 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3757;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3758 = self.name;
                                    var $3759 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3759;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3760 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3760;
                                    break;
                                case 'Fm.Term.all':
                                    var $3761 = self.eras;
                                    var $3762 = self.self;
                                    var $3763 = self.name;
                                    var $3764 = self.xtyp;
                                    var $3765 = self.body;
                                    var _seen$23 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$24 = $3753(Fm$Term$var$($3750, _lv$4))(Fm$Term$var$($3751, Nat$succ$(_lv$4)));
                                    var _b1_body$25 = $3765(Fm$Term$var$($3762, _lv$4))(Fm$Term$var$($3763, Nat$succ$(_lv$4)));
                                    var _eq_self$26 = ($3750 === $3762);
                                    var _eq_eras$27 = Bool$eql$($3749, $3761);
                                    var self = (_eq_self$26 && _eq_eras$27);
                                    if (self) {
                                        var $3767 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3752, $3764, _defs$3, _lv$4, _seen$23))((_eq_type$28 => {
                                            var $3768 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$24, _b1_body$25, _defs$3, Nat$succ$(Nat$succ$(_lv$4)), _seen$23))((_eq_body$29 => {
                                                var $3769 = Monad$pure$(Fm$Check$monad)((_eq_type$28 && _eq_body$29));
                                                return $3769;
                                            }));
                                            return $3768;
                                        }));
                                        var $3766 = $3767;
                                    } else {
                                        var $3770 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                        var $3766 = $3770;
                                    };
                                    var $3754 = $3766;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3771 = self.name;
                                    var $3772 = self.body;
                                    var $3773 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3773;
                                    break;
                                case 'Fm.Term.app':
                                    var $3774 = self.func;
                                    var $3775 = self.argm;
                                    var $3776 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3776;
                                    break;
                                case 'Fm.Term.let':
                                    var $3777 = self.name;
                                    var $3778 = self.expr;
                                    var $3779 = self.body;
                                    var $3780 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3780;
                                    break;
                                case 'Fm.Term.def':
                                    var $3781 = self.name;
                                    var $3782 = self.expr;
                                    var $3783 = self.body;
                                    var $3784 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3784;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3785 = self.done;
                                    var $3786 = self.term;
                                    var $3787 = self.type;
                                    var $3788 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3788;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3789 = self.name;
                                    var $3790 = self.dref;
                                    var $3791 = self.verb;
                                    var $3792 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3792;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3793 = self.path;
                                    var $3794 = Fm$Term$equal$patch$($3793, _a$1, Bool$true);
                                    var $3754 = $3794;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3795 = self.natx;
                                    var $3796 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3796;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3797 = self.chrx;
                                    var $3798 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3798;
                                    break;
                                case 'Fm.Term.str':
                                    var $3799 = self.strx;
                                    var $3800 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3800;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3801 = self.path;
                                    var $3802 = self.expr;
                                    var $3803 = self.name;
                                    var $3804 = self.with;
                                    var $3805 = self.cses;
                                    var $3806 = self.moti;
                                    var $3807 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3807;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3808 = self.orig;
                                    var $3809 = self.expr;
                                    var $3810 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3754 = $3810;
                                    break;
                            };
                            var $3586 = $3754;
                            break;
                        case 'Fm.Term.lam':
                            var $3811 = self.name;
                            var $3812 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3814 = self.name;
                                    var $3815 = self.indx;
                                    var $3816 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3816;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3817 = self.name;
                                    var $3818 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3818;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3819 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3819;
                                    break;
                                case 'Fm.Term.all':
                                    var $3820 = self.eras;
                                    var $3821 = self.self;
                                    var $3822 = self.name;
                                    var $3823 = self.xtyp;
                                    var $3824 = self.body;
                                    var $3825 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3825;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3826 = self.name;
                                    var $3827 = self.body;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$18 = $3812(Fm$Term$var$($3811, _lv$4));
                                    var _b1_body$19 = $3827(Fm$Term$var$($3826, _lv$4));
                                    var $3828 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$18, _b1_body$19, _defs$3, Nat$succ$(_lv$4), _seen$17))((_eq_body$20 => {
                                        var $3829 = Monad$pure$(Fm$Check$monad)(_eq_body$20);
                                        return $3829;
                                    }));
                                    var $3813 = $3828;
                                    break;
                                case 'Fm.Term.app':
                                    var $3830 = self.func;
                                    var $3831 = self.argm;
                                    var $3832 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3832;
                                    break;
                                case 'Fm.Term.let':
                                    var $3833 = self.name;
                                    var $3834 = self.expr;
                                    var $3835 = self.body;
                                    var $3836 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3836;
                                    break;
                                case 'Fm.Term.def':
                                    var $3837 = self.name;
                                    var $3838 = self.expr;
                                    var $3839 = self.body;
                                    var $3840 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3840;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3841 = self.done;
                                    var $3842 = self.term;
                                    var $3843 = self.type;
                                    var $3844 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3844;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3845 = self.name;
                                    var $3846 = self.dref;
                                    var $3847 = self.verb;
                                    var $3848 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3848;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3849 = self.path;
                                    var $3850 = Fm$Term$equal$patch$($3849, _a$1, Bool$true);
                                    var $3813 = $3850;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3851 = self.natx;
                                    var $3852 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3852;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3853 = self.chrx;
                                    var $3854 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3854;
                                    break;
                                case 'Fm.Term.str':
                                    var $3855 = self.strx;
                                    var $3856 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3856;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3857 = self.path;
                                    var $3858 = self.expr;
                                    var $3859 = self.name;
                                    var $3860 = self.with;
                                    var $3861 = self.cses;
                                    var $3862 = self.moti;
                                    var $3863 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3863;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3864 = self.orig;
                                    var $3865 = self.expr;
                                    var $3866 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3813 = $3866;
                                    break;
                            };
                            var $3586 = $3813;
                            break;
                        case 'Fm.Term.app':
                            var $3867 = self.func;
                            var $3868 = self.argm;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3870 = self.name;
                                    var $3871 = self.indx;
                                    var $3872 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3872;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3873 = self.name;
                                    var $3874 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3874;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3875 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3875;
                                    break;
                                case 'Fm.Term.all':
                                    var $3876 = self.eras;
                                    var $3877 = self.self;
                                    var $3878 = self.name;
                                    var $3879 = self.xtyp;
                                    var $3880 = self.body;
                                    var $3881 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3881;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3882 = self.name;
                                    var $3883 = self.body;
                                    var $3884 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3884;
                                    break;
                                case 'Fm.Term.app':
                                    var $3885 = self.func;
                                    var $3886 = self.argm;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var $3887 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3867, $3885, _defs$3, _lv$4, _seen$17))((_eq_func$18 => {
                                        var $3888 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3868, $3886, _defs$3, _lv$4, _seen$17))((_eq_argm$19 => {
                                            var $3889 = Monad$pure$(Fm$Check$monad)((_eq_func$18 && _eq_argm$19));
                                            return $3889;
                                        }));
                                        return $3888;
                                    }));
                                    var $3869 = $3887;
                                    break;
                                case 'Fm.Term.let':
                                    var $3890 = self.name;
                                    var $3891 = self.expr;
                                    var $3892 = self.body;
                                    var $3893 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3893;
                                    break;
                                case 'Fm.Term.def':
                                    var $3894 = self.name;
                                    var $3895 = self.expr;
                                    var $3896 = self.body;
                                    var $3897 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3897;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3898 = self.done;
                                    var $3899 = self.term;
                                    var $3900 = self.type;
                                    var $3901 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3901;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3902 = self.name;
                                    var $3903 = self.dref;
                                    var $3904 = self.verb;
                                    var $3905 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3905;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3906 = self.path;
                                    var $3907 = Fm$Term$equal$patch$($3906, _a$1, Bool$true);
                                    var $3869 = $3907;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3908 = self.natx;
                                    var $3909 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3909;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3910 = self.chrx;
                                    var $3911 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3911;
                                    break;
                                case 'Fm.Term.str':
                                    var $3912 = self.strx;
                                    var $3913 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3913;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3914 = self.path;
                                    var $3915 = self.expr;
                                    var $3916 = self.name;
                                    var $3917 = self.with;
                                    var $3918 = self.cses;
                                    var $3919 = self.moti;
                                    var $3920 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3920;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3921 = self.orig;
                                    var $3922 = self.expr;
                                    var $3923 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3869 = $3923;
                                    break;
                            };
                            var $3586 = $3869;
                            break;
                        case 'Fm.Term.let':
                            var $3924 = self.name;
                            var $3925 = self.expr;
                            var $3926 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3928 = self.name;
                                    var $3929 = self.indx;
                                    var $3930 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3930;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3931 = self.name;
                                    var $3932 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3932;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3933 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3933;
                                    break;
                                case 'Fm.Term.all':
                                    var $3934 = self.eras;
                                    var $3935 = self.self;
                                    var $3936 = self.name;
                                    var $3937 = self.xtyp;
                                    var $3938 = self.body;
                                    var $3939 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3939;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3940 = self.name;
                                    var $3941 = self.body;
                                    var $3942 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3942;
                                    break;
                                case 'Fm.Term.app':
                                    var $3943 = self.func;
                                    var $3944 = self.argm;
                                    var $3945 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3945;
                                    break;
                                case 'Fm.Term.let':
                                    var $3946 = self.name;
                                    var $3947 = self.expr;
                                    var $3948 = self.body;
                                    var _seen$19 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$20 = $3926(Fm$Term$var$($3924, _lv$4));
                                    var _b1_body$21 = $3948(Fm$Term$var$($3946, _lv$4));
                                    var $3949 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3925, $3947, _defs$3, _lv$4, _seen$19))((_eq_expr$22 => {
                                        var $3950 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$20, _b1_body$21, _defs$3, Nat$succ$(_lv$4), _seen$19))((_eq_body$23 => {
                                            var $3951 = Monad$pure$(Fm$Check$monad)((_eq_expr$22 && _eq_body$23));
                                            return $3951;
                                        }));
                                        return $3950;
                                    }));
                                    var $3927 = $3949;
                                    break;
                                case 'Fm.Term.def':
                                    var $3952 = self.name;
                                    var $3953 = self.expr;
                                    var $3954 = self.body;
                                    var $3955 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3955;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3956 = self.done;
                                    var $3957 = self.term;
                                    var $3958 = self.type;
                                    var $3959 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3959;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3960 = self.name;
                                    var $3961 = self.dref;
                                    var $3962 = self.verb;
                                    var $3963 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3963;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3964 = self.path;
                                    var $3965 = Fm$Term$equal$patch$($3964, _a$1, Bool$true);
                                    var $3927 = $3965;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3966 = self.natx;
                                    var $3967 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3967;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3968 = self.chrx;
                                    var $3969 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3969;
                                    break;
                                case 'Fm.Term.str':
                                    var $3970 = self.strx;
                                    var $3971 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3971;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3972 = self.path;
                                    var $3973 = self.expr;
                                    var $3974 = self.name;
                                    var $3975 = self.with;
                                    var $3976 = self.cses;
                                    var $3977 = self.moti;
                                    var $3978 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3978;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3979 = self.orig;
                                    var $3980 = self.expr;
                                    var $3981 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3927 = $3981;
                                    break;
                            };
                            var $3586 = $3927;
                            break;
                        case 'Fm.Term.def':
                            var $3982 = self.name;
                            var $3983 = self.expr;
                            var $3984 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3986 = self.name;
                                    var $3987 = self.indx;
                                    var $3988 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $3988;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3989 = self.name;
                                    var $3990 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $3990;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3991 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $3991;
                                    break;
                                case 'Fm.Term.all':
                                    var $3992 = self.eras;
                                    var $3993 = self.self;
                                    var $3994 = self.name;
                                    var $3995 = self.xtyp;
                                    var $3996 = self.body;
                                    var $3997 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $3997;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3998 = self.name;
                                    var $3999 = self.body;
                                    var $4000 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4000;
                                    break;
                                case 'Fm.Term.app':
                                    var $4001 = self.func;
                                    var $4002 = self.argm;
                                    var $4003 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4003;
                                    break;
                                case 'Fm.Term.let':
                                    var $4004 = self.name;
                                    var $4005 = self.expr;
                                    var $4006 = self.body;
                                    var $4007 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4007;
                                    break;
                                case 'Fm.Term.def':
                                    var $4008 = self.name;
                                    var $4009 = self.expr;
                                    var $4010 = self.body;
                                    var $4011 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4011;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4012 = self.done;
                                    var $4013 = self.term;
                                    var $4014 = self.type;
                                    var $4015 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4015;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4016 = self.name;
                                    var $4017 = self.dref;
                                    var $4018 = self.verb;
                                    var $4019 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4019;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4020 = self.path;
                                    var $4021 = Fm$Term$equal$patch$($4020, _a$1, Bool$true);
                                    var $3985 = $4021;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4022 = self.natx;
                                    var $4023 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4023;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4024 = self.chrx;
                                    var $4025 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4025;
                                    break;
                                case 'Fm.Term.str':
                                    var $4026 = self.strx;
                                    var $4027 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4027;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4028 = self.path;
                                    var $4029 = self.expr;
                                    var $4030 = self.name;
                                    var $4031 = self.with;
                                    var $4032 = self.cses;
                                    var $4033 = self.moti;
                                    var $4034 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4034;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4035 = self.orig;
                                    var $4036 = self.expr;
                                    var $4037 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3985 = $4037;
                                    break;
                            };
                            var $3586 = $3985;
                            break;
                        case 'Fm.Term.ann':
                            var $4038 = self.done;
                            var $4039 = self.term;
                            var $4040 = self.type;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4042 = self.name;
                                    var $4043 = self.indx;
                                    var $4044 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4044;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4045 = self.name;
                                    var $4046 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4046;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4047 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4047;
                                    break;
                                case 'Fm.Term.all':
                                    var $4048 = self.eras;
                                    var $4049 = self.self;
                                    var $4050 = self.name;
                                    var $4051 = self.xtyp;
                                    var $4052 = self.body;
                                    var $4053 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4053;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4054 = self.name;
                                    var $4055 = self.body;
                                    var $4056 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4056;
                                    break;
                                case 'Fm.Term.app':
                                    var $4057 = self.func;
                                    var $4058 = self.argm;
                                    var $4059 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4059;
                                    break;
                                case 'Fm.Term.let':
                                    var $4060 = self.name;
                                    var $4061 = self.expr;
                                    var $4062 = self.body;
                                    var $4063 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4063;
                                    break;
                                case 'Fm.Term.def':
                                    var $4064 = self.name;
                                    var $4065 = self.expr;
                                    var $4066 = self.body;
                                    var $4067 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4067;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4068 = self.done;
                                    var $4069 = self.term;
                                    var $4070 = self.type;
                                    var $4071 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4071;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4072 = self.name;
                                    var $4073 = self.dref;
                                    var $4074 = self.verb;
                                    var $4075 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4075;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4076 = self.path;
                                    var $4077 = Fm$Term$equal$patch$($4076, _a$1, Bool$true);
                                    var $4041 = $4077;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4078 = self.natx;
                                    var $4079 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4079;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4080 = self.chrx;
                                    var $4081 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4081;
                                    break;
                                case 'Fm.Term.str':
                                    var $4082 = self.strx;
                                    var $4083 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4083;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4084 = self.path;
                                    var $4085 = self.expr;
                                    var $4086 = self.name;
                                    var $4087 = self.with;
                                    var $4088 = self.cses;
                                    var $4089 = self.moti;
                                    var $4090 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4090;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4091 = self.orig;
                                    var $4092 = self.expr;
                                    var $4093 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4041 = $4093;
                                    break;
                            };
                            var $3586 = $4041;
                            break;
                        case 'Fm.Term.gol':
                            var $4094 = self.name;
                            var $4095 = self.dref;
                            var $4096 = self.verb;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4098 = self.name;
                                    var $4099 = self.indx;
                                    var $4100 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4100;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4101 = self.name;
                                    var $4102 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4102;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4103 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4103;
                                    break;
                                case 'Fm.Term.all':
                                    var $4104 = self.eras;
                                    var $4105 = self.self;
                                    var $4106 = self.name;
                                    var $4107 = self.xtyp;
                                    var $4108 = self.body;
                                    var $4109 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4109;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4110 = self.name;
                                    var $4111 = self.body;
                                    var $4112 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4112;
                                    break;
                                case 'Fm.Term.app':
                                    var $4113 = self.func;
                                    var $4114 = self.argm;
                                    var $4115 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4115;
                                    break;
                                case 'Fm.Term.let':
                                    var $4116 = self.name;
                                    var $4117 = self.expr;
                                    var $4118 = self.body;
                                    var $4119 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4119;
                                    break;
                                case 'Fm.Term.def':
                                    var $4120 = self.name;
                                    var $4121 = self.expr;
                                    var $4122 = self.body;
                                    var $4123 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4123;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4124 = self.done;
                                    var $4125 = self.term;
                                    var $4126 = self.type;
                                    var $4127 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4127;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4128 = self.name;
                                    var $4129 = self.dref;
                                    var $4130 = self.verb;
                                    var $4131 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4131;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4132 = self.path;
                                    var $4133 = Fm$Term$equal$patch$($4132, _a$1, Bool$true);
                                    var $4097 = $4133;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4134 = self.natx;
                                    var $4135 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4135;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4136 = self.chrx;
                                    var $4137 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4137;
                                    break;
                                case 'Fm.Term.str':
                                    var $4138 = self.strx;
                                    var $4139 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4139;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4140 = self.path;
                                    var $4141 = self.expr;
                                    var $4142 = self.name;
                                    var $4143 = self.with;
                                    var $4144 = self.cses;
                                    var $4145 = self.moti;
                                    var $4146 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4146;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4147 = self.orig;
                                    var $4148 = self.expr;
                                    var $4149 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4097 = $4149;
                                    break;
                            };
                            var $3586 = $4097;
                            break;
                        case 'Fm.Term.hol':
                            var $4150 = self.path;
                            var $4151 = Fm$Term$equal$patch$($4150, _b$2, Bool$true);
                            var $3586 = $4151;
                            break;
                        case 'Fm.Term.nat':
                            var $4152 = self.natx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4154 = self.name;
                                    var $4155 = self.indx;
                                    var $4156 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4156;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4157 = self.name;
                                    var $4158 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4158;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4159 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4159;
                                    break;
                                case 'Fm.Term.all':
                                    var $4160 = self.eras;
                                    var $4161 = self.self;
                                    var $4162 = self.name;
                                    var $4163 = self.xtyp;
                                    var $4164 = self.body;
                                    var $4165 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4165;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4166 = self.name;
                                    var $4167 = self.body;
                                    var $4168 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4168;
                                    break;
                                case 'Fm.Term.app':
                                    var $4169 = self.func;
                                    var $4170 = self.argm;
                                    var $4171 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4171;
                                    break;
                                case 'Fm.Term.let':
                                    var $4172 = self.name;
                                    var $4173 = self.expr;
                                    var $4174 = self.body;
                                    var $4175 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4175;
                                    break;
                                case 'Fm.Term.def':
                                    var $4176 = self.name;
                                    var $4177 = self.expr;
                                    var $4178 = self.body;
                                    var $4179 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4179;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4180 = self.done;
                                    var $4181 = self.term;
                                    var $4182 = self.type;
                                    var $4183 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4183;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4184 = self.name;
                                    var $4185 = self.dref;
                                    var $4186 = self.verb;
                                    var $4187 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4187;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4188 = self.path;
                                    var $4189 = Fm$Term$equal$patch$($4188, _a$1, Bool$true);
                                    var $4153 = $4189;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4190 = self.natx;
                                    var $4191 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4191;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4192 = self.chrx;
                                    var $4193 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4193;
                                    break;
                                case 'Fm.Term.str':
                                    var $4194 = self.strx;
                                    var $4195 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4195;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4196 = self.path;
                                    var $4197 = self.expr;
                                    var $4198 = self.name;
                                    var $4199 = self.with;
                                    var $4200 = self.cses;
                                    var $4201 = self.moti;
                                    var $4202 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4202;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4203 = self.orig;
                                    var $4204 = self.expr;
                                    var $4205 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4153 = $4205;
                                    break;
                            };
                            var $3586 = $4153;
                            break;
                        case 'Fm.Term.chr':
                            var $4206 = self.chrx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4208 = self.name;
                                    var $4209 = self.indx;
                                    var $4210 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4210;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4211 = self.name;
                                    var $4212 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4212;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4213 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4213;
                                    break;
                                case 'Fm.Term.all':
                                    var $4214 = self.eras;
                                    var $4215 = self.self;
                                    var $4216 = self.name;
                                    var $4217 = self.xtyp;
                                    var $4218 = self.body;
                                    var $4219 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4219;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4220 = self.name;
                                    var $4221 = self.body;
                                    var $4222 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4222;
                                    break;
                                case 'Fm.Term.app':
                                    var $4223 = self.func;
                                    var $4224 = self.argm;
                                    var $4225 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4225;
                                    break;
                                case 'Fm.Term.let':
                                    var $4226 = self.name;
                                    var $4227 = self.expr;
                                    var $4228 = self.body;
                                    var $4229 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4229;
                                    break;
                                case 'Fm.Term.def':
                                    var $4230 = self.name;
                                    var $4231 = self.expr;
                                    var $4232 = self.body;
                                    var $4233 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4233;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4234 = self.done;
                                    var $4235 = self.term;
                                    var $4236 = self.type;
                                    var $4237 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4237;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4238 = self.name;
                                    var $4239 = self.dref;
                                    var $4240 = self.verb;
                                    var $4241 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4241;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4242 = self.path;
                                    var $4243 = Fm$Term$equal$patch$($4242, _a$1, Bool$true);
                                    var $4207 = $4243;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4244 = self.natx;
                                    var $4245 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4245;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4246 = self.chrx;
                                    var $4247 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4247;
                                    break;
                                case 'Fm.Term.str':
                                    var $4248 = self.strx;
                                    var $4249 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4249;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4250 = self.path;
                                    var $4251 = self.expr;
                                    var $4252 = self.name;
                                    var $4253 = self.with;
                                    var $4254 = self.cses;
                                    var $4255 = self.moti;
                                    var $4256 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4256;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4257 = self.orig;
                                    var $4258 = self.expr;
                                    var $4259 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4207 = $4259;
                                    break;
                            };
                            var $3586 = $4207;
                            break;
                        case 'Fm.Term.str':
                            var $4260 = self.strx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4262 = self.name;
                                    var $4263 = self.indx;
                                    var $4264 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4264;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4265 = self.name;
                                    var $4266 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4266;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4267 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4267;
                                    break;
                                case 'Fm.Term.all':
                                    var $4268 = self.eras;
                                    var $4269 = self.self;
                                    var $4270 = self.name;
                                    var $4271 = self.xtyp;
                                    var $4272 = self.body;
                                    var $4273 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4273;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4274 = self.name;
                                    var $4275 = self.body;
                                    var $4276 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4276;
                                    break;
                                case 'Fm.Term.app':
                                    var $4277 = self.func;
                                    var $4278 = self.argm;
                                    var $4279 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4279;
                                    break;
                                case 'Fm.Term.let':
                                    var $4280 = self.name;
                                    var $4281 = self.expr;
                                    var $4282 = self.body;
                                    var $4283 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4283;
                                    break;
                                case 'Fm.Term.def':
                                    var $4284 = self.name;
                                    var $4285 = self.expr;
                                    var $4286 = self.body;
                                    var $4287 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4287;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4288 = self.done;
                                    var $4289 = self.term;
                                    var $4290 = self.type;
                                    var $4291 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4291;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4292 = self.name;
                                    var $4293 = self.dref;
                                    var $4294 = self.verb;
                                    var $4295 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4295;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4296 = self.path;
                                    var $4297 = Fm$Term$equal$patch$($4296, _a$1, Bool$true);
                                    var $4261 = $4297;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4298 = self.natx;
                                    var $4299 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4299;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4300 = self.chrx;
                                    var $4301 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4301;
                                    break;
                                case 'Fm.Term.str':
                                    var $4302 = self.strx;
                                    var $4303 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4303;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4304 = self.path;
                                    var $4305 = self.expr;
                                    var $4306 = self.name;
                                    var $4307 = self.with;
                                    var $4308 = self.cses;
                                    var $4309 = self.moti;
                                    var $4310 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4310;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4311 = self.orig;
                                    var $4312 = self.expr;
                                    var $4313 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4261 = $4313;
                                    break;
                            };
                            var $3586 = $4261;
                            break;
                        case 'Fm.Term.cse':
                            var $4314 = self.path;
                            var $4315 = self.expr;
                            var $4316 = self.name;
                            var $4317 = self.with;
                            var $4318 = self.cses;
                            var $4319 = self.moti;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4321 = self.name;
                                    var $4322 = self.indx;
                                    var $4323 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4323;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4324 = self.name;
                                    var $4325 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4325;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4326 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4326;
                                    break;
                                case 'Fm.Term.all':
                                    var $4327 = self.eras;
                                    var $4328 = self.self;
                                    var $4329 = self.name;
                                    var $4330 = self.xtyp;
                                    var $4331 = self.body;
                                    var $4332 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4332;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4333 = self.name;
                                    var $4334 = self.body;
                                    var $4335 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4335;
                                    break;
                                case 'Fm.Term.app':
                                    var $4336 = self.func;
                                    var $4337 = self.argm;
                                    var $4338 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4338;
                                    break;
                                case 'Fm.Term.let':
                                    var $4339 = self.name;
                                    var $4340 = self.expr;
                                    var $4341 = self.body;
                                    var $4342 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4342;
                                    break;
                                case 'Fm.Term.def':
                                    var $4343 = self.name;
                                    var $4344 = self.expr;
                                    var $4345 = self.body;
                                    var $4346 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4346;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4347 = self.done;
                                    var $4348 = self.term;
                                    var $4349 = self.type;
                                    var $4350 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4350;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4351 = self.name;
                                    var $4352 = self.dref;
                                    var $4353 = self.verb;
                                    var $4354 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4354;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4355 = self.path;
                                    var $4356 = Fm$Term$equal$patch$($4355, _a$1, Bool$true);
                                    var $4320 = $4356;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4357 = self.natx;
                                    var $4358 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4358;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4359 = self.chrx;
                                    var $4360 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4360;
                                    break;
                                case 'Fm.Term.str':
                                    var $4361 = self.strx;
                                    var $4362 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4362;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4363 = self.path;
                                    var $4364 = self.expr;
                                    var $4365 = self.name;
                                    var $4366 = self.with;
                                    var $4367 = self.cses;
                                    var $4368 = self.moti;
                                    var $4369 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4369;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4370 = self.orig;
                                    var $4371 = self.expr;
                                    var $4372 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4320 = $4372;
                                    break;
                            };
                            var $3586 = $4320;
                            break;
                        case 'Fm.Term.ori':
                            var $4373 = self.orig;
                            var $4374 = self.expr;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4376 = self.name;
                                    var $4377 = self.indx;
                                    var $4378 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4378;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4379 = self.name;
                                    var $4380 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4380;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4381 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4381;
                                    break;
                                case 'Fm.Term.all':
                                    var $4382 = self.eras;
                                    var $4383 = self.self;
                                    var $4384 = self.name;
                                    var $4385 = self.xtyp;
                                    var $4386 = self.body;
                                    var $4387 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4387;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4388 = self.name;
                                    var $4389 = self.body;
                                    var $4390 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4390;
                                    break;
                                case 'Fm.Term.app':
                                    var $4391 = self.func;
                                    var $4392 = self.argm;
                                    var $4393 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4393;
                                    break;
                                case 'Fm.Term.let':
                                    var $4394 = self.name;
                                    var $4395 = self.expr;
                                    var $4396 = self.body;
                                    var $4397 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4397;
                                    break;
                                case 'Fm.Term.def':
                                    var $4398 = self.name;
                                    var $4399 = self.expr;
                                    var $4400 = self.body;
                                    var $4401 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4401;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4402 = self.done;
                                    var $4403 = self.term;
                                    var $4404 = self.type;
                                    var $4405 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4405;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4406 = self.name;
                                    var $4407 = self.dref;
                                    var $4408 = self.verb;
                                    var $4409 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4409;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4410 = self.path;
                                    var $4411 = Fm$Term$equal$patch$($4410, _a$1, Bool$true);
                                    var $4375 = $4411;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4412 = self.natx;
                                    var $4413 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4413;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4414 = self.chrx;
                                    var $4415 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4415;
                                    break;
                                case 'Fm.Term.str':
                                    var $4416 = self.strx;
                                    var $4417 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4417;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4418 = self.path;
                                    var $4419 = self.expr;
                                    var $4420 = self.name;
                                    var $4421 = self.with;
                                    var $4422 = self.cses;
                                    var $4423 = self.moti;
                                    var $4424 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4424;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4425 = self.orig;
                                    var $4426 = self.expr;
                                    var $4427 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4375 = $4427;
                                    break;
                            };
                            var $3586 = $4375;
                            break;
                    };
                    var $3583 = $3586;
                };
                var $3581 = $3583;
            };
            var $3579 = $3581;
        };
        return $3579;
    };
    const Fm$Term$equal = x0 => x1 => x2 => x3 => x4 => Fm$Term$equal$(x0, x1, x2, x3, x4);
    const Set$new = Map$new;

    function Fm$Term$check$(_term$1, _type$2, _defs$3, _ctx$4, _path$5, _orig$6) {
        var $4428 = Monad$bind$(Fm$Check$monad)((() => {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $4429 = self.name;
                    var $4430 = self.indx;
                    var self = List$at_last$($4430, _ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4432 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $4429), List$nil));
                            var $4431 = $4432;
                            break;
                        case 'Maybe.some':
                            var $4433 = self.value;
                            var $4434 = Monad$pure$(Fm$Check$monad)((() => {
                                var self = $4433;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $4435 = self.fst;
                                        var $4436 = self.snd;
                                        var $4437 = $4436;
                                        return $4437;
                                };
                            })());
                            var $4431 = $4434;
                            break;
                    };
                    return $4431;
                case 'Fm.Term.ref':
                    var $4438 = self.name;
                    var self = Fm$get$($4438, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4440 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $4438), List$nil));
                            var $4439 = $4440;
                            break;
                        case 'Maybe.some':
                            var $4441 = self.value;
                            var self = $4441;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4443 = self.file;
                                    var $4444 = self.code;
                                    var $4445 = self.name;
                                    var $4446 = self.term;
                                    var $4447 = self.type;
                                    var $4448 = self.stat;
                                    var _ref_name$15 = $4445;
                                    var _ref_type$16 = $4447;
                                    var _ref_term$17 = $4446;
                                    var _ref_stat$18 = $4448;
                                    var self = _ref_stat$18;
                                    switch (self._) {
                                        case 'Fm.Status.init':
                                            var $4450 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$waiting$(_ref_name$15), List$nil));
                                            var $4449 = $4450;
                                            break;
                                        case 'Fm.Status.wait':
                                            var $4451 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $4449 = $4451;
                                            break;
                                        case 'Fm.Status.done':
                                            var $4452 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $4449 = $4452;
                                            break;
                                        case 'Fm.Status.fail':
                                            var $4453 = self.errors;
                                            var $4454 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$indirect$(_ref_name$15), List$nil));
                                            var $4449 = $4454;
                                            break;
                                    };
                                    var $4442 = $4449;
                                    break;
                            };
                            var $4439 = $4442;
                            break;
                    };
                    return $4439;
                case 'Fm.Term.typ':
                    var $4455 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                    return $4455;
                case 'Fm.Term.all':
                    var $4456 = self.eras;
                    var $4457 = self.self;
                    var $4458 = self.name;
                    var $4459 = self.xtyp;
                    var $4460 = self.body;
                    var _ctx_size$12 = List$length$(_ctx$4);
                    var _self_var$13 = Fm$Term$var$($4457, _ctx_size$12);
                    var _body_var$14 = Fm$Term$var$($4458, Nat$succ$(_ctx_size$12));
                    var _body_ctx$15 = List$cons$(Pair$new$($4458, $4459), List$cons$(Pair$new$($4457, _term$1), _ctx$4));
                    var $4461 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4459, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$16 => {
                        var $4462 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4460(_self_var$13)(_body_var$14), Maybe$some$(Fm$Term$typ), _defs$3, _body_ctx$15, Fm$MPath$i$(_path$5), _orig$6))((_$17 => {
                            var $4463 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                            return $4463;
                        }));
                        return $4462;
                    }));
                    return $4461;
                case 'Fm.Term.lam':
                    var $4464 = self.name;
                    var $4465 = self.body;
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            var _lam_type$9 = Fm$Term$hol$(Bits$e);
                            var _lam_term$10 = Fm$Term$ann$(Bool$false, _term$1, _lam_type$9);
                            var $4467 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$patch$(Fm$MPath$to_bits$(_path$5), _lam_term$10), List$nil));
                            var $4466 = $4467;
                            break;
                        case 'Maybe.some':
                            var $4468 = self.value;
                            var _typv$10 = Fm$Term$reduce$($4468, _defs$3);
                            var self = _typv$10;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4470 = self.name;
                                    var $4471 = self.indx;
                                    var _expected$13 = Either$left$("(function type)");
                                    var _detected$14 = Either$right$($4468);
                                    var $4472 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4469 = $4472;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4473 = self.name;
                                    var _expected$12 = Either$left$("(function type)");
                                    var _detected$13 = Either$right$($4468);
                                    var $4474 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4469 = $4474;
                                    break;
                                case 'Fm.Term.typ':
                                    var _expected$11 = Either$left$("(function type)");
                                    var _detected$12 = Either$right$($4468);
                                    var $4475 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                    var $4469 = $4475;
                                    break;
                                case 'Fm.Term.all':
                                    var $4476 = self.eras;
                                    var $4477 = self.self;
                                    var $4478 = self.name;
                                    var $4479 = self.xtyp;
                                    var $4480 = self.body;
                                    var _ctx_size$16 = List$length$(_ctx$4);
                                    var _self_var$17 = _term$1;
                                    var _body_var$18 = Fm$Term$var$($4464, _ctx_size$16);
                                    var _body_typ$19 = $4480(_self_var$17)(_body_var$18);
                                    var _body_ctx$20 = List$cons$(Pair$new$($4464, $4479), _ctx$4);
                                    var $4481 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4465(_body_var$18), Maybe$some$(_body_typ$19), _defs$3, _body_ctx$20, Fm$MPath$o$(_path$5), _orig$6))((_$21 => {
                                        var $4482 = Monad$pure$(Fm$Check$monad)($4468);
                                        return $4482;
                                    }));
                                    var $4469 = $4481;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4483 = self.name;
                                    var $4484 = self.body;
                                    var _expected$13 = Either$left$("(function type)");
                                    var _detected$14 = Either$right$($4468);
                                    var $4485 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4469 = $4485;
                                    break;
                                case 'Fm.Term.app':
                                    var $4486 = self.func;
                                    var $4487 = self.argm;
                                    var _expected$13 = Either$left$("(function type)");
                                    var _detected$14 = Either$right$($4468);
                                    var $4488 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4469 = $4488;
                                    break;
                                case 'Fm.Term.let':
                                    var $4489 = self.name;
                                    var $4490 = self.expr;
                                    var $4491 = self.body;
                                    var _expected$14 = Either$left$("(function type)");
                                    var _detected$15 = Either$right$($4468);
                                    var $4492 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4469 = $4492;
                                    break;
                                case 'Fm.Term.def':
                                    var $4493 = self.name;
                                    var $4494 = self.expr;
                                    var $4495 = self.body;
                                    var _expected$14 = Either$left$("(function type)");
                                    var _detected$15 = Either$right$($4468);
                                    var $4496 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4469 = $4496;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4497 = self.done;
                                    var $4498 = self.term;
                                    var $4499 = self.type;
                                    var _expected$14 = Either$left$("(function type)");
                                    var _detected$15 = Either$right$($4468);
                                    var $4500 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4469 = $4500;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4501 = self.name;
                                    var $4502 = self.dref;
                                    var $4503 = self.verb;
                                    var _expected$14 = Either$left$("(function type)");
                                    var _detected$15 = Either$right$($4468);
                                    var $4504 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4469 = $4504;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4505 = self.path;
                                    var _expected$12 = Either$left$("(function type)");
                                    var _detected$13 = Either$right$($4468);
                                    var $4506 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4469 = $4506;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4507 = self.natx;
                                    var _expected$12 = Either$left$("(function type)");
                                    var _detected$13 = Either$right$($4468);
                                    var $4508 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4469 = $4508;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4509 = self.chrx;
                                    var _expected$12 = Either$left$("(function type)");
                                    var _detected$13 = Either$right$($4468);
                                    var $4510 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4469 = $4510;
                                    break;
                                case 'Fm.Term.str':
                                    var $4511 = self.strx;
                                    var _expected$12 = Either$left$("(function type)");
                                    var _detected$13 = Either$right$($4468);
                                    var $4512 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4469 = $4512;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4513 = self.path;
                                    var $4514 = self.expr;
                                    var $4515 = self.name;
                                    var $4516 = self.with;
                                    var $4517 = self.cses;
                                    var $4518 = self.moti;
                                    var _expected$17 = Either$left$("(function type)");
                                    var _detected$18 = Either$right$($4468);
                                    var $4519 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                    var $4469 = $4519;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4520 = self.orig;
                                    var $4521 = self.expr;
                                    var _expected$13 = Either$left$("(function type)");
                                    var _detected$14 = Either$right$($4468);
                                    var $4522 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4469 = $4522;
                                    break;
                            };
                            var $4466 = $4469;
                            break;
                    };
                    return $4466;
                case 'Fm.Term.app':
                    var $4523 = self.func;
                    var $4524 = self.argm;
                    var $4525 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4523, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_func_typ$9 => {
                        var _func_typ$10 = Fm$Term$reduce$(_func_typ$9, _defs$3);
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $4527 = self.name;
                                var $4528 = self.indx;
                                var _expected$13 = Either$left$("(function type)");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4529 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4526 = $4529;
                                break;
                            case 'Fm.Term.ref':
                                var $4530 = self.name;
                                var _expected$12 = Either$left$("(function type)");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4531 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4526 = $4531;
                                break;
                            case 'Fm.Term.typ':
                                var _expected$11 = Either$left$("(function type)");
                                var _detected$12 = Either$right$(_func_typ$10);
                                var $4532 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                var $4526 = $4532;
                                break;
                            case 'Fm.Term.all':
                                var $4533 = self.eras;
                                var $4534 = self.self;
                                var $4535 = self.name;
                                var $4536 = self.xtyp;
                                var $4537 = self.body;
                                var $4538 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4524, Maybe$some$($4536), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$16 => {
                                    var $4539 = Monad$pure$(Fm$Check$monad)($4537($4523)($4524));
                                    return $4539;
                                }));
                                var $4526 = $4538;
                                break;
                            case 'Fm.Term.lam':
                                var $4540 = self.name;
                                var $4541 = self.body;
                                var _expected$13 = Either$left$("(function type)");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4542 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4526 = $4542;
                                break;
                            case 'Fm.Term.app':
                                var $4543 = self.func;
                                var $4544 = self.argm;
                                var _expected$13 = Either$left$("(function type)");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4545 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4526 = $4545;
                                break;
                            case 'Fm.Term.let':
                                var $4546 = self.name;
                                var $4547 = self.expr;
                                var $4548 = self.body;
                                var _expected$14 = Either$left$("(function type)");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4549 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4526 = $4549;
                                break;
                            case 'Fm.Term.def':
                                var $4550 = self.name;
                                var $4551 = self.expr;
                                var $4552 = self.body;
                                var _expected$14 = Either$left$("(function type)");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4553 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4526 = $4553;
                                break;
                            case 'Fm.Term.ann':
                                var $4554 = self.done;
                                var $4555 = self.term;
                                var $4556 = self.type;
                                var _expected$14 = Either$left$("(function type)");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4557 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4526 = $4557;
                                break;
                            case 'Fm.Term.gol':
                                var $4558 = self.name;
                                var $4559 = self.dref;
                                var $4560 = self.verb;
                                var _expected$14 = Either$left$("(function type)");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4561 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4526 = $4561;
                                break;
                            case 'Fm.Term.hol':
                                var $4562 = self.path;
                                var _expected$12 = Either$left$("(function type)");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4563 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4526 = $4563;
                                break;
                            case 'Fm.Term.nat':
                                var $4564 = self.natx;
                                var _expected$12 = Either$left$("(function type)");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4565 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4526 = $4565;
                                break;
                            case 'Fm.Term.chr':
                                var $4566 = self.chrx;
                                var _expected$12 = Either$left$("(function type)");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4567 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4526 = $4567;
                                break;
                            case 'Fm.Term.str':
                                var $4568 = self.strx;
                                var _expected$12 = Either$left$("(function type)");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4569 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4526 = $4569;
                                break;
                            case 'Fm.Term.cse':
                                var $4570 = self.path;
                                var $4571 = self.expr;
                                var $4572 = self.name;
                                var $4573 = self.with;
                                var $4574 = self.cses;
                                var $4575 = self.moti;
                                var _expected$17 = Either$left$("(function type)");
                                var _detected$18 = Either$right$(_func_typ$10);
                                var $4576 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                var $4526 = $4576;
                                break;
                            case 'Fm.Term.ori':
                                var $4577 = self.orig;
                                var $4578 = self.expr;
                                var _expected$13 = Either$left$("(function type)");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4579 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4526 = $4579;
                                break;
                        };
                        return $4526;
                    }));
                    return $4525;
                case 'Fm.Term.let':
                    var $4580 = self.name;
                    var $4581 = self.expr;
                    var $4582 = self.body;
                    var _ctx_size$10 = List$length$(_ctx$4);
                    var $4583 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4581, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_expr_typ$11 => {
                        var _body_val$12 = $4582(Fm$Term$var$($4580, _ctx_size$10));
                        var _body_ctx$13 = List$cons$(Pair$new$($4580, _expr_typ$11), _ctx$4);
                        var $4584 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_body_val$12, _type$2, _defs$3, _body_ctx$13, Fm$MPath$i$(_path$5), _orig$6))((_body_typ$14 => {
                            var $4585 = Monad$pure$(Fm$Check$monad)(_body_typ$14);
                            return $4585;
                        }));
                        return $4584;
                    }));
                    return $4583;
                case 'Fm.Term.def':
                    var $4586 = self.name;
                    var $4587 = self.expr;
                    var $4588 = self.body;
                    var _ctx_size$10 = List$length$(_ctx$4);
                    var $4589 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4587, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_expr_typ$11 => {
                        var _body_val$12 = $4588(Fm$Term$ann$(Bool$true, $4587, _expr_typ$11));
                        var _body_ctx$13 = List$cons$(Pair$new$($4586, _expr_typ$11), _ctx$4);
                        var $4590 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_body_val$12, _type$2, _defs$3, _body_ctx$13, Fm$MPath$i$(_path$5), _orig$6))((_body_typ$14 => {
                            var $4591 = Monad$pure$(Fm$Check$monad)(_body_typ$14);
                            return $4591;
                        }));
                        return $4590;
                    }));
                    return $4589;
                case 'Fm.Term.ann':
                    var $4592 = self.done;
                    var $4593 = self.term;
                    var $4594 = self.type;
                    var self = $4592;
                    if (self) {
                        var $4596 = Monad$pure$(Fm$Check$monad)($4594);
                        var $4595 = $4596;
                    } else {
                        var $4597 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4593, Maybe$some$($4594), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$10 => {
                            var $4598 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4594, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$11 => {
                                var $4599 = Monad$pure$(Fm$Check$monad)($4594);
                                return $4599;
                            }));
                            return $4598;
                        }));
                        var $4595 = $4597;
                    };
                    return $4595;
                case 'Fm.Term.gol':
                    var $4600 = self.name;
                    var $4601 = self.dref;
                    var $4602 = self.verb;
                    var $4603 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$show_goal$($4600, $4601, $4602, _type$2, _ctx$4), List$nil));
                    return $4603;
                case 'Fm.Term.hol':
                    var $4604 = self.path;
                    var $4605 = Fm$Check$result$(_type$2, List$nil);
                    return $4605;
                case 'Fm.Term.nat':
                    var $4606 = self.natx;
                    var $4607 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Nat"));
                    return $4607;
                case 'Fm.Term.chr':
                    var $4608 = self.chrx;
                    var $4609 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Char"));
                    return $4609;
                case 'Fm.Term.str':
                    var $4610 = self.strx;
                    var $4611 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("String"));
                    return $4611;
                case 'Fm.Term.cse':
                    var $4612 = self.path;
                    var $4613 = self.expr;
                    var $4614 = self.name;
                    var $4615 = self.with;
                    var $4616 = self.cses;
                    var $4617 = self.moti;
                    var _expr$13 = $4613;
                    var $4618 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_expr$13, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_etyp$14 => {
                        var self = $4617;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = _type$2;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4621 = Fm$Term$hol$(Bits$e);
                                        var _moti$15 = $4621;
                                        break;
                                    case 'Maybe.some':
                                        var $4622 = self.value;
                                        var _size$16 = List$length$(_ctx$4);
                                        var _typv$17 = Fm$Term$normalize$($4622, Map$new);
                                        var _moti$18 = Fm$SmartMotive$make$($4614, $4613, _etyp$14, _typv$17, _size$16, _defs$3);
                                        var $4623 = _moti$18;
                                        var _moti$15 = $4623;
                                        break;
                                };
                                var $4620 = Maybe$some$(Fm$Term$cse$($4612, $4613, $4614, $4615, $4616, Maybe$some$(_moti$15)));
                                var _dsug$15 = $4620;
                                break;
                            case 'Maybe.some':
                                var $4624 = self.value;
                                var $4625 = Fm$Term$desugar_cse$($4613, $4614, $4615, $4616, $4624, _etyp$14, _defs$3, _ctx$4);
                                var _dsug$15 = $4625;
                                break;
                        };
                        var self = _dsug$15;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4626 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                                var $4619 = $4626;
                                break;
                            case 'Maybe.some':
                                var $4627 = self.value;
                                var $4628 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$patch$(Fm$MPath$to_bits$(_path$5), $4627), List$nil));
                                var $4619 = $4628;
                                break;
                        };
                        return $4619;
                    }));
                    return $4618;
                case 'Fm.Term.ori':
                    var $4629 = self.orig;
                    var $4630 = self.expr;
                    var $4631 = Fm$Term$check$($4630, _type$2, _defs$3, _ctx$4, _path$5, Maybe$some$($4629));
                    return $4631;
            };
        })())((_infr$7 => {
            var self = _type$2;
            switch (self._) {
                case 'Maybe.none':
                    var $4633 = Fm$Check$result$(Maybe$some$(_infr$7), List$nil);
                    var $4632 = $4633;
                    break;
                case 'Maybe.some':
                    var $4634 = self.value;
                    var $4635 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($4634, _infr$7, _defs$3, List$length$(_ctx$4), Set$new))((_eqls$9 => {
                        var self = _eqls$9;
                        if (self) {
                            var $4637 = Monad$pure$(Fm$Check$monad)($4634);
                            var $4636 = $4637;
                        } else {
                            var $4638 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, Either$right$($4634), Either$right$(_infr$7), _ctx$4), List$nil));
                            var $4636 = $4638;
                        };
                        return $4636;
                    }));
                    var $4632 = $4635;
                    break;
            };
            return $4632;
        }));
        return $4428;
    };
    const Fm$Term$check = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$check$(x0, x1, x2, x3, x4, x5);

    function Fm$Path$nil$(_x$1) {
        var $4639 = _x$1;
        return $4639;
    };
    const Fm$Path$nil = x0 => Fm$Path$nil$(x0);
    const Fm$MPath$nil = Maybe$some$(Fm$Path$nil);

    function List$is_empty$(_list$2) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $4641 = Bool$true;
                var $4640 = $4641;
                break;
            case 'List.cons':
                var $4642 = self.head;
                var $4643 = self.tail;
                var $4644 = Bool$false;
                var $4640 = $4644;
                break;
        };
        return $4640;
    };
    const List$is_empty = x0 => List$is_empty$(x0);

    function Fm$Term$patch_at$(_path$1, _term$2, _fn$3) {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $4646 = self.name;
                var $4647 = self.indx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4649 = _fn$3(_term$2);
                        var $4648 = $4649;
                        break;
                    case 'o':
                        var $4650 = self.slice(0, -1);
                        var $4651 = _term$2;
                        var $4648 = $4651;
                        break;
                    case 'i':
                        var $4652 = self.slice(0, -1);
                        var $4653 = _term$2;
                        var $4648 = $4653;
                        break;
                };
                var $4645 = $4648;
                break;
            case 'Fm.Term.ref':
                var $4654 = self.name;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4656 = _fn$3(_term$2);
                        var $4655 = $4656;
                        break;
                    case 'o':
                        var $4657 = self.slice(0, -1);
                        var $4658 = _term$2;
                        var $4655 = $4658;
                        break;
                    case 'i':
                        var $4659 = self.slice(0, -1);
                        var $4660 = _term$2;
                        var $4655 = $4660;
                        break;
                };
                var $4645 = $4655;
                break;
            case 'Fm.Term.typ':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4662 = _fn$3(_term$2);
                        var $4661 = $4662;
                        break;
                    case 'o':
                        var $4663 = self.slice(0, -1);
                        var $4664 = _term$2;
                        var $4661 = $4664;
                        break;
                    case 'i':
                        var $4665 = self.slice(0, -1);
                        var $4666 = _term$2;
                        var $4661 = $4666;
                        break;
                };
                var $4645 = $4661;
                break;
            case 'Fm.Term.all':
                var $4667 = self.eras;
                var $4668 = self.self;
                var $4669 = self.name;
                var $4670 = self.xtyp;
                var $4671 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4673 = _fn$3(_term$2);
                        var $4672 = $4673;
                        break;
                    case 'o':
                        var $4674 = self.slice(0, -1);
                        var $4675 = Fm$Term$all$($4667, $4668, $4669, Fm$Term$patch_at$($4674, $4670, _fn$3), $4671);
                        var $4672 = $4675;
                        break;
                    case 'i':
                        var $4676 = self.slice(0, -1);
                        var $4677 = Fm$Term$all$($4667, $4668, $4669, $4670, (_s$10 => _x$11 => {
                            var $4678 = Fm$Term$patch_at$($4676, $4671(_s$10)(_x$11), _fn$3);
                            return $4678;
                        }));
                        var $4672 = $4677;
                        break;
                };
                var $4645 = $4672;
                break;
            case 'Fm.Term.lam':
                var $4679 = self.name;
                var $4680 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4682 = _fn$3(_term$2);
                        var $4681 = $4682;
                        break;
                    case 'o':
                        var $4683 = self.slice(0, -1);
                        var $4684 = Fm$Term$lam$($4679, (_x$7 => {
                            var $4685 = Fm$Term$patch_at$(Bits$tail$(_path$1), $4680(_x$7), _fn$3);
                            return $4685;
                        }));
                        var $4681 = $4684;
                        break;
                    case 'i':
                        var $4686 = self.slice(0, -1);
                        var $4687 = Fm$Term$lam$($4679, (_x$7 => {
                            var $4688 = Fm$Term$patch_at$(Bits$tail$(_path$1), $4680(_x$7), _fn$3);
                            return $4688;
                        }));
                        var $4681 = $4687;
                        break;
                };
                var $4645 = $4681;
                break;
            case 'Fm.Term.app':
                var $4689 = self.func;
                var $4690 = self.argm;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4692 = _fn$3(_term$2);
                        var $4691 = $4692;
                        break;
                    case 'o':
                        var $4693 = self.slice(0, -1);
                        var $4694 = Fm$Term$app$(Fm$Term$patch_at$($4693, $4689, _fn$3), $4690);
                        var $4691 = $4694;
                        break;
                    case 'i':
                        var $4695 = self.slice(0, -1);
                        var $4696 = Fm$Term$app$($4689, Fm$Term$patch_at$($4695, $4690, _fn$3));
                        var $4691 = $4696;
                        break;
                };
                var $4645 = $4691;
                break;
            case 'Fm.Term.let':
                var $4697 = self.name;
                var $4698 = self.expr;
                var $4699 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4701 = _fn$3(_term$2);
                        var $4700 = $4701;
                        break;
                    case 'o':
                        var $4702 = self.slice(0, -1);
                        var $4703 = Fm$Term$let$($4697, Fm$Term$patch_at$($4702, $4698, _fn$3), $4699);
                        var $4700 = $4703;
                        break;
                    case 'i':
                        var $4704 = self.slice(0, -1);
                        var $4705 = Fm$Term$let$($4697, $4698, (_x$8 => {
                            var $4706 = Fm$Term$patch_at$($4704, $4699(_x$8), _fn$3);
                            return $4706;
                        }));
                        var $4700 = $4705;
                        break;
                };
                var $4645 = $4700;
                break;
            case 'Fm.Term.def':
                var $4707 = self.name;
                var $4708 = self.expr;
                var $4709 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4711 = _fn$3(_term$2);
                        var $4710 = $4711;
                        break;
                    case 'o':
                        var $4712 = self.slice(0, -1);
                        var $4713 = Fm$Term$def$($4707, Fm$Term$patch_at$($4712, $4708, _fn$3), $4709);
                        var $4710 = $4713;
                        break;
                    case 'i':
                        var $4714 = self.slice(0, -1);
                        var $4715 = Fm$Term$def$($4707, $4708, (_x$8 => {
                            var $4716 = Fm$Term$patch_at$($4714, $4709(_x$8), _fn$3);
                            return $4716;
                        }));
                        var $4710 = $4715;
                        break;
                };
                var $4645 = $4710;
                break;
            case 'Fm.Term.ann':
                var $4717 = self.done;
                var $4718 = self.term;
                var $4719 = self.type;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4721 = _fn$3(_term$2);
                        var $4720 = $4721;
                        break;
                    case 'o':
                        var $4722 = self.slice(0, -1);
                        var $4723 = Fm$Term$ann$($4717, Fm$Term$patch_at$($4722, $4718, _fn$3), $4719);
                        var $4720 = $4723;
                        break;
                    case 'i':
                        var $4724 = self.slice(0, -1);
                        var $4725 = Fm$Term$ann$($4717, $4718, Fm$Term$patch_at$($4724, $4719, _fn$3));
                        var $4720 = $4725;
                        break;
                };
                var $4645 = $4720;
                break;
            case 'Fm.Term.gol':
                var $4726 = self.name;
                var $4727 = self.dref;
                var $4728 = self.verb;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4730 = _fn$3(_term$2);
                        var $4729 = $4730;
                        break;
                    case 'o':
                        var $4731 = self.slice(0, -1);
                        var $4732 = _term$2;
                        var $4729 = $4732;
                        break;
                    case 'i':
                        var $4733 = self.slice(0, -1);
                        var $4734 = _term$2;
                        var $4729 = $4734;
                        break;
                };
                var $4645 = $4729;
                break;
            case 'Fm.Term.hol':
                var $4735 = self.path;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4737 = _fn$3(_term$2);
                        var $4736 = $4737;
                        break;
                    case 'o':
                        var $4738 = self.slice(0, -1);
                        var $4739 = _term$2;
                        var $4736 = $4739;
                        break;
                    case 'i':
                        var $4740 = self.slice(0, -1);
                        var $4741 = _term$2;
                        var $4736 = $4741;
                        break;
                };
                var $4645 = $4736;
                break;
            case 'Fm.Term.nat':
                var $4742 = self.natx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4744 = _fn$3(_term$2);
                        var $4743 = $4744;
                        break;
                    case 'o':
                        var $4745 = self.slice(0, -1);
                        var $4746 = _term$2;
                        var $4743 = $4746;
                        break;
                    case 'i':
                        var $4747 = self.slice(0, -1);
                        var $4748 = _term$2;
                        var $4743 = $4748;
                        break;
                };
                var $4645 = $4743;
                break;
            case 'Fm.Term.chr':
                var $4749 = self.chrx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4751 = _fn$3(_term$2);
                        var $4750 = $4751;
                        break;
                    case 'o':
                        var $4752 = self.slice(0, -1);
                        var $4753 = _term$2;
                        var $4750 = $4753;
                        break;
                    case 'i':
                        var $4754 = self.slice(0, -1);
                        var $4755 = _term$2;
                        var $4750 = $4755;
                        break;
                };
                var $4645 = $4750;
                break;
            case 'Fm.Term.str':
                var $4756 = self.strx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4758 = _fn$3(_term$2);
                        var $4757 = $4758;
                        break;
                    case 'o':
                        var $4759 = self.slice(0, -1);
                        var $4760 = _term$2;
                        var $4757 = $4760;
                        break;
                    case 'i':
                        var $4761 = self.slice(0, -1);
                        var $4762 = _term$2;
                        var $4757 = $4762;
                        break;
                };
                var $4645 = $4757;
                break;
            case 'Fm.Term.cse':
                var $4763 = self.path;
                var $4764 = self.expr;
                var $4765 = self.name;
                var $4766 = self.with;
                var $4767 = self.cses;
                var $4768 = self.moti;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4770 = _fn$3(_term$2);
                        var $4769 = $4770;
                        break;
                    case 'o':
                        var $4771 = self.slice(0, -1);
                        var $4772 = _term$2;
                        var $4769 = $4772;
                        break;
                    case 'i':
                        var $4773 = self.slice(0, -1);
                        var $4774 = _term$2;
                        var $4769 = $4774;
                        break;
                };
                var $4645 = $4769;
                break;
            case 'Fm.Term.ori':
                var $4775 = self.orig;
                var $4776 = self.expr;
                var $4777 = Fm$Term$patch_at$(_path$1, $4776, _fn$3);
                var $4645 = $4777;
                break;
        };
        return $4645;
    };
    const Fm$Term$patch_at = x0 => x1 => x2 => Fm$Term$patch_at$(x0, x1, x2);

    function Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, _errs$7, _fixd$8) {
        var self = _errs$7;
        switch (self._) {
            case 'List.nil':
                var self = _fixd$8;
                if (self) {
                    var _type$9 = Fm$Term$bind$(List$nil, (_x$9 => {
                        var $4781 = (_x$9 + '1');
                        return $4781;
                    }), _type$5);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $4782 = (_x$10 + '0');
                        return $4782;
                    }), _term$4);
                    var _defs$11 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$10, _type$9, Fm$Status$init), _defs$6);
                    var $4780 = Monad$pure$(IO$monad)(Maybe$some$(_defs$11));
                    var $4779 = $4780;
                } else {
                    var $4783 = Monad$pure$(IO$monad)(Maybe$none);
                    var $4779 = $4783;
                };
                var $4778 = $4779;
                break;
            case 'List.cons':
                var $4784 = self.head;
                var $4785 = self.tail;
                var self = $4784;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $4787 = self.origin;
                        var $4788 = self.expected;
                        var $4789 = self.detected;
                        var $4790 = self.context;
                        var $4791 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4785, _fixd$8);
                        var $4786 = $4791;
                        break;
                    case 'Fm.Error.show_goal':
                        var $4792 = self.name;
                        var $4793 = self.dref;
                        var $4794 = self.verb;
                        var $4795 = self.goal;
                        var $4796 = self.context;
                        var $4797 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4785, _fixd$8);
                        var $4786 = $4797;
                        break;
                    case 'Fm.Error.waiting':
                        var $4798 = self.name;
                        var $4799 = Monad$bind$(IO$monad)(Fm$Synth$one$($4798, _defs$6))((_defs$12 => {
                            var $4800 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$12, $4785, Bool$true);
                            return $4800;
                        }));
                        var $4786 = $4799;
                        break;
                    case 'Fm.Error.indirect':
                        var $4801 = self.name;
                        var $4802 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4785, _fixd$8);
                        var $4786 = $4802;
                        break;
                    case 'Fm.Error.patch':
                        var $4803 = self.path;
                        var $4804 = self.term;
                        var self = $4803;
                        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                            case 'e':
                                var $4806 = Monad$pure$(IO$monad)(Maybe$none);
                                var $4805 = $4806;
                                break;
                            case 'o':
                                var $4807 = self.slice(0, -1);
                                var _term$14 = Fm$Term$patch_at$($4807, _term$4, (_x$14 => {
                                    var $4809 = $4804;
                                    return $4809;
                                }));
                                var $4808 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$14, _type$5, _defs$6, $4785, Bool$true);
                                var $4805 = $4808;
                                break;
                            case 'i':
                                var $4810 = self.slice(0, -1);
                                var _type$14 = Fm$Term$patch_at$($4810, _type$5, (_x$14 => {
                                    var $4812 = $4804;
                                    return $4812;
                                }));
                                var $4811 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$14, _defs$6, $4785, Bool$true);
                                var $4805 = $4811;
                                break;
                        };
                        var $4786 = $4805;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $4813 = self.origin;
                        var $4814 = self.name;
                        var $4815 = Monad$bind$(IO$monad)(Fm$Synth$one$($4814, _defs$6))((_defs$13 => {
                            var $4816 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$13, $4785, Bool$true);
                            return $4816;
                        }));
                        var $4786 = $4815;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $4817 = self.origin;
                        var $4818 = self.term;
                        var $4819 = self.context;
                        var $4820 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4785, _fixd$8);
                        var $4786 = $4820;
                        break;
                };
                var $4778 = $4786;
                break;
        };
        return $4778;
    };
    const Fm$Synth$fix = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Synth$fix$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Status$fail$(_errors$1) {
        var $4821 = ({
            _: 'Fm.Status.fail',
            'errors': _errors$1
        });
        return $4821;
    };
    const Fm$Status$fail = x0 => Fm$Status$fail$(x0);

    function Fm$Synth$one$(_name$1, _defs$2) {
        var self = Fm$get$(_name$1, _defs$2);
        switch (self._) {
            case 'Maybe.none':
                var $4823 = Monad$bind$(IO$monad)(Fm$Synth$load$(_name$1, _defs$2))((_loaded$3 => {
                    var self = _loaded$3;
                    switch (self._) {
                        case 'Maybe.none':
                            var $4825 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("Undefined: ", List$cons$(_name$1, List$nil)))))((_$4 => {
                                var $4826 = Monad$pure$(IO$monad)(_defs$2);
                                return $4826;
                            }));
                            var $4824 = $4825;
                            break;
                        case 'Maybe.some':
                            var $4827 = self.value;
                            var $4828 = Fm$Synth$one$(_name$1, $4827);
                            var $4824 = $4828;
                            break;
                    };
                    return $4824;
                }));
                var $4822 = $4823;
                break;
            case 'Maybe.some':
                var $4829 = self.value;
                var self = $4829;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $4831 = self.file;
                        var $4832 = self.code;
                        var $4833 = self.name;
                        var $4834 = self.term;
                        var $4835 = self.type;
                        var $4836 = self.stat;
                        var _file$10 = $4831;
                        var _code$11 = $4832;
                        var _name$12 = $4833;
                        var _term$13 = $4834;
                        var _type$14 = $4835;
                        var _stat$15 = $4836;
                        var self = _stat$15;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var _defs$16 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, Fm$Status$wait), _defs$2);
                                var _checked$17 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_type$14, Maybe$some$(Fm$Term$typ), _defs$16, List$nil, Fm$MPath$i$(Fm$MPath$nil), Maybe$none))((_chk_type$17 => {
                                    var $4839 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_term$13, Maybe$some$(_type$14), _defs$16, List$nil, Fm$MPath$o$(Fm$MPath$nil), Maybe$none))((_chk_term$18 => {
                                        var $4840 = Monad$pure$(Fm$Check$monad)(Unit$new);
                                        return $4840;
                                    }));
                                    return $4839;
                                }));
                                var self = _checked$17;
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $4841 = self.value;
                                        var $4842 = self.errors;
                                        var self = List$is_empty$($4842);
                                        if (self) {
                                            var _defs$20 = Fm$define$(_file$10, _code$11, _name$12, _term$13, _type$14, Bool$true, _defs$16);
                                            var $4844 = Monad$pure$(IO$monad)(_defs$20);
                                            var $4843 = $4844;
                                        } else {
                                            var $4845 = Monad$bind$(IO$monad)(Fm$Synth$fix$(_file$10, _code$11, _name$12, _term$13, _type$14, _defs$16, $4842, Bool$false))((_fixed$20 => {
                                                var self = _fixed$20;
                                                switch (self._) {
                                                    case 'Maybe.none':
                                                        var _stat$21 = Fm$Status$fail$($4842);
                                                        var _defs$22 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, _stat$21), _defs$16);
                                                        var $4847 = Monad$pure$(IO$monad)(_defs$22);
                                                        var $4846 = $4847;
                                                        break;
                                                    case 'Maybe.some':
                                                        var $4848 = self.value;
                                                        var $4849 = Fm$Synth$one$(_name$12, $4848);
                                                        var $4846 = $4849;
                                                        break;
                                                };
                                                return $4846;
                                            }));
                                            var $4843 = $4845;
                                        };
                                        var $4838 = $4843;
                                        break;
                                };
                                var $4837 = $4838;
                                break;
                            case 'Fm.Status.wait':
                                var $4850 = Monad$pure$(IO$monad)(_defs$2);
                                var $4837 = $4850;
                                break;
                            case 'Fm.Status.done':
                                var $4851 = Monad$pure$(IO$monad)(_defs$2);
                                var $4837 = $4851;
                                break;
                            case 'Fm.Status.fail':
                                var $4852 = self.errors;
                                var $4853 = Monad$pure$(IO$monad)(_defs$2);
                                var $4837 = $4853;
                                break;
                        };
                        var $4830 = $4837;
                        break;
                };
                var $4822 = $4830;
                break;
        };
        return $4822;
    };
    const Fm$Synth$one = x0 => x1 => Fm$Synth$one$(x0, x1);

    function Map$values$go$(_xs$2, _list$3) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $4855 = _list$3;
                var $4854 = $4855;
                break;
            case 'Map.tie':
                var $4856 = self.val;
                var $4857 = self.lft;
                var $4858 = self.rgt;
                var self = $4856;
                switch (self._) {
                    case 'Maybe.none':
                        var $4860 = _list$3;
                        var _list0$7 = $4860;
                        break;
                    case 'Maybe.some':
                        var $4861 = self.value;
                        var $4862 = List$cons$($4861, _list$3);
                        var _list0$7 = $4862;
                        break;
                };
                var _list1$8 = Map$values$go$($4857, _list0$7);
                var _list2$9 = Map$values$go$($4858, _list1$8);
                var $4859 = _list2$9;
                var $4854 = $4859;
                break;
        };
        return $4854;
    };
    const Map$values$go = x0 => x1 => Map$values$go$(x0, x1);

    function Map$values$(_xs$2) {
        var $4863 = Map$values$go$(_xs$2, List$nil);
        return $4863;
    };
    const Map$values = x0 => Map$values$(x0);

    function Fm$Name$show$(_name$1) {
        var $4864 = _name$1;
        return $4864;
    };
    const Fm$Name$show = x0 => Fm$Name$show$(x0);

    function Bits$to_nat$(_b$1) {
        var self = _b$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $4866 = 0n;
                var $4865 = $4866;
                break;
            case 'o':
                var $4867 = self.slice(0, -1);
                var $4868 = (2n * Bits$to_nat$($4867));
                var $4865 = $4868;
                break;
            case 'i':
                var $4869 = self.slice(0, -1);
                var $4870 = Nat$succ$((2n * Bits$to_nat$($4869)));
                var $4865 = $4870;
                break;
        };
        return $4865;
    };
    const Bits$to_nat = x0 => Bits$to_nat$(x0);

    function U16$show_hex$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $4872 = u16_to_word(self);
                var $4873 = Nat$to_string_base$(16n, Bits$to_nat$(Word$to_bits$($4872)));
                var $4871 = $4873;
                break;
        };
        return $4871;
    };
    const U16$show_hex = x0 => U16$show_hex$(x0);

    function Fm$escape$char$(_chr$1) {
        var self = (_chr$1 === Fm$backslash);
        if (self) {
            var $4875 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
            var $4874 = $4875;
        } else {
            var self = (_chr$1 === 34);
            if (self) {
                var $4877 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                var $4876 = $4877;
            } else {
                var self = (_chr$1 === 39);
                if (self) {
                    var $4879 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                    var $4878 = $4879;
                } else {
                    var self = U16$btw$(32, _chr$1, 126);
                    if (self) {
                        var $4881 = String$cons$(_chr$1, String$nil);
                        var $4880 = $4881;
                    } else {
                        var $4882 = String$flatten$(List$cons$(String$cons$(Fm$backslash, String$nil), List$cons$("u{", List$cons$(U16$show_hex$(_chr$1), List$cons$("}", List$cons$(String$nil, List$nil))))));
                        var $4880 = $4882;
                    };
                    var $4878 = $4880;
                };
                var $4876 = $4878;
            };
            var $4874 = $4876;
        };
        return $4874;
    };
    const Fm$escape$char = x0 => Fm$escape$char$(x0);

    function Fm$escape$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $4884 = String$nil;
            var $4883 = $4884;
        } else {
            var $4885 = self.charCodeAt(0);
            var $4886 = self.slice(1);
            var _head$4 = Fm$escape$char$($4885);
            var _tail$5 = Fm$escape$($4886);
            var $4887 = (_head$4 + _tail$5);
            var $4883 = $4887;
        };
        return $4883;
    };
    const Fm$escape = x0 => Fm$escape$(x0);

    function Fm$Term$core$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4889 = self.name;
                var $4890 = self.indx;
                var $4891 = Fm$Name$show$($4889);
                var $4888 = $4891;
                break;
            case 'Fm.Term.ref':
                var $4892 = self.name;
                var $4893 = Fm$Name$show$($4892);
                var $4888 = $4893;
                break;
            case 'Fm.Term.typ':
                var $4894 = "*";
                var $4888 = $4894;
                break;
            case 'Fm.Term.all':
                var $4895 = self.eras;
                var $4896 = self.self;
                var $4897 = self.name;
                var $4898 = self.xtyp;
                var $4899 = self.body;
                var _eras$7 = $4895;
                var self = _eras$7;
                if (self) {
                    var $4901 = "%";
                    var _init$8 = $4901;
                } else {
                    var $4902 = "@";
                    var _init$8 = $4902;
                };
                var _self$9 = Fm$Name$show$($4896);
                var _name$10 = Fm$Name$show$($4897);
                var _xtyp$11 = Fm$Term$core$($4898);
                var _body$12 = Fm$Term$core$($4899(Fm$Term$var$($4896, 0n))(Fm$Term$var$($4897, 0n)));
                var $4900 = String$flatten$(List$cons$(_init$8, List$cons$(_self$9, List$cons$("(", List$cons$(_name$10, List$cons$(":", List$cons$(_xtyp$11, List$cons$(") ", List$cons$(_body$12, List$nil)))))))));
                var $4888 = $4900;
                break;
            case 'Fm.Term.lam':
                var $4903 = self.name;
                var $4904 = self.body;
                var _name$4 = Fm$Name$show$($4903);
                var _body$5 = Fm$Term$core$($4904(Fm$Term$var$($4903, 0n)));
                var $4905 = String$flatten$(List$cons$("#", List$cons$(_name$4, List$cons$(" ", List$cons$(_body$5, List$nil)))));
                var $4888 = $4905;
                break;
            case 'Fm.Term.app':
                var $4906 = self.func;
                var $4907 = self.argm;
                var _func$4 = Fm$Term$core$($4906);
                var _argm$5 = Fm$Term$core$($4907);
                var $4908 = String$flatten$(List$cons$("(", List$cons$(_func$4, List$cons$(" ", List$cons$(_argm$5, List$cons$(")", List$nil))))));
                var $4888 = $4908;
                break;
            case 'Fm.Term.let':
                var $4909 = self.name;
                var $4910 = self.expr;
                var $4911 = self.body;
                var _name$5 = Fm$Name$show$($4909);
                var _expr$6 = Fm$Term$core$($4910);
                var _body$7 = Fm$Term$core$($4911(Fm$Term$var$($4909, 0n)));
                var $4912 = String$flatten$(List$cons$("!", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $4888 = $4912;
                break;
            case 'Fm.Term.def':
                var $4913 = self.name;
                var $4914 = self.expr;
                var $4915 = self.body;
                var _name$5 = Fm$Name$show$($4913);
                var _expr$6 = Fm$Term$core$($4914);
                var _body$7 = Fm$Term$core$($4915(Fm$Term$var$($4913, 0n)));
                var $4916 = String$flatten$(List$cons$("$", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $4888 = $4916;
                break;
            case 'Fm.Term.ann':
                var $4917 = self.done;
                var $4918 = self.term;
                var $4919 = self.type;
                var _term$5 = Fm$Term$core$($4918);
                var _type$6 = Fm$Term$core$($4919);
                var $4920 = String$flatten$(List$cons$("{", List$cons$(_term$5, List$cons$(":", List$cons$(_type$6, List$cons$("}", List$nil))))));
                var $4888 = $4920;
                break;
            case 'Fm.Term.gol':
                var $4921 = self.name;
                var $4922 = self.dref;
                var $4923 = self.verb;
                var $4924 = "<GOL>";
                var $4888 = $4924;
                break;
            case 'Fm.Term.hol':
                var $4925 = self.path;
                var $4926 = "<HOL>";
                var $4888 = $4926;
                break;
            case 'Fm.Term.nat':
                var $4927 = self.natx;
                var $4928 = String$flatten$(List$cons$("+", List$cons$(Nat$show$($4927), List$nil)));
                var $4888 = $4928;
                break;
            case 'Fm.Term.chr':
                var $4929 = self.chrx;
                var $4930 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($4929), List$cons$("\'", List$nil))));
                var $4888 = $4930;
                break;
            case 'Fm.Term.str':
                var $4931 = self.strx;
                var $4932 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($4931), List$cons$("\"", List$nil))));
                var $4888 = $4932;
                break;
            case 'Fm.Term.cse':
                var $4933 = self.path;
                var $4934 = self.expr;
                var $4935 = self.name;
                var $4936 = self.with;
                var $4937 = self.cses;
                var $4938 = self.moti;
                var $4939 = "<CSE>";
                var $4888 = $4939;
                break;
            case 'Fm.Term.ori':
                var $4940 = self.orig;
                var $4941 = self.expr;
                var $4942 = Fm$Term$core$($4941);
                var $4888 = $4942;
                break;
        };
        return $4888;
    };
    const Fm$Term$core = x0 => Fm$Term$core$(x0);

    function Fm$Defs$core$(_defs$1) {
        var _result$2 = "";
        var _result$3 = (() => {
            var $4945 = _result$2;
            var $4946 = Map$values$(_defs$1);
            let _result$4 = $4945;
            let _defn$3;
            while ($4946._ === 'List.cons') {
                _defn$3 = $4946.head;
                var self = _defn$3;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $4947 = self.file;
                        var $4948 = self.code;
                        var $4949 = self.name;
                        var $4950 = self.term;
                        var $4951 = self.type;
                        var $4952 = self.stat;
                        var self = $4952;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var $4954 = _result$4;
                                var $4953 = $4954;
                                break;
                            case 'Fm.Status.wait':
                                var $4955 = _result$4;
                                var $4953 = $4955;
                                break;
                            case 'Fm.Status.done':
                                var _name$11 = $4949;
                                var _term$12 = Fm$Term$core$($4950);
                                var _type$13 = Fm$Term$core$($4951);
                                var $4956 = String$flatten$(List$cons$(_result$4, List$cons$(_name$11, List$cons$(" : ", List$cons$(_type$13, List$cons$(" = ", List$cons$(_term$12, List$cons$(";\u{a}", List$nil))))))));
                                var $4953 = $4956;
                                break;
                            case 'Fm.Status.fail':
                                var $4957 = self.errors;
                                var $4958 = _result$4;
                                var $4953 = $4958;
                                break;
                        };
                        var $4945 = $4953;
                        break;
                };
                _result$4 = $4945;
                $4946 = $4946.tail;
            }
            return _result$4;
        })();
        var $4943 = _result$3;
        return $4943;
    };
    const Fm$Defs$core = x0 => Fm$Defs$core$(x0);

    function Fm$to_core$io$one$(_name$1) {
        var $4959 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $4960 = Monad$pure$(IO$monad)(Fm$Defs$core$(_defs$2));
            return $4960;
        }));
        return $4959;
    };
    const Fm$to_core$io$one = x0 => Fm$to_core$io$one$(x0);

    function Maybe$bind$(_m$3, _f$4) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $4962 = Maybe$none;
                var $4961 = $4962;
                break;
            case 'Maybe.some':
                var $4963 = self.value;
                var $4964 = _f$4($4963);
                var $4961 = $4964;
                break;
        };
        return $4961;
    };
    const Maybe$bind = x0 => x1 => Maybe$bind$(x0, x1);
    const Maybe$monad = Monad$new$(Maybe$bind, Maybe$some);

    function Fm$Term$show$as_nat$go$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4966 = self.name;
                var $4967 = self.indx;
                var $4968 = Maybe$none;
                var $4965 = $4968;
                break;
            case 'Fm.Term.ref':
                var $4969 = self.name;
                var self = ($4969 === "Nat.zero");
                if (self) {
                    var $4971 = Maybe$some$(0n);
                    var $4970 = $4971;
                } else {
                    var $4972 = Maybe$none;
                    var $4970 = $4972;
                };
                var $4965 = $4970;
                break;
            case 'Fm.Term.typ':
                var $4973 = Maybe$none;
                var $4965 = $4973;
                break;
            case 'Fm.Term.all':
                var $4974 = self.eras;
                var $4975 = self.self;
                var $4976 = self.name;
                var $4977 = self.xtyp;
                var $4978 = self.body;
                var $4979 = Maybe$none;
                var $4965 = $4979;
                break;
            case 'Fm.Term.lam':
                var $4980 = self.name;
                var $4981 = self.body;
                var $4982 = Maybe$none;
                var $4965 = $4982;
                break;
            case 'Fm.Term.app':
                var $4983 = self.func;
                var $4984 = self.argm;
                var self = $4983;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $4986 = self.name;
                        var $4987 = self.indx;
                        var $4988 = Maybe$none;
                        var $4985 = $4988;
                        break;
                    case 'Fm.Term.ref':
                        var $4989 = self.name;
                        var self = ($4989 === "Nat.succ");
                        if (self) {
                            var $4991 = Monad$bind$(Maybe$monad)(Fm$Term$show$as_nat$go$($4984))((_pred$5 => {
                                var $4992 = Monad$pure$(Maybe$monad)(Nat$succ$(_pred$5));
                                return $4992;
                            }));
                            var $4990 = $4991;
                        } else {
                            var $4993 = Maybe$none;
                            var $4990 = $4993;
                        };
                        var $4985 = $4990;
                        break;
                    case 'Fm.Term.typ':
                        var $4994 = Maybe$none;
                        var $4985 = $4994;
                        break;
                    case 'Fm.Term.all':
                        var $4995 = self.eras;
                        var $4996 = self.self;
                        var $4997 = self.name;
                        var $4998 = self.xtyp;
                        var $4999 = self.body;
                        var $5000 = Maybe$none;
                        var $4985 = $5000;
                        break;
                    case 'Fm.Term.lam':
                        var $5001 = self.name;
                        var $5002 = self.body;
                        var $5003 = Maybe$none;
                        var $4985 = $5003;
                        break;
                    case 'Fm.Term.app':
                        var $5004 = self.func;
                        var $5005 = self.argm;
                        var $5006 = Maybe$none;
                        var $4985 = $5006;
                        break;
                    case 'Fm.Term.let':
                        var $5007 = self.name;
                        var $5008 = self.expr;
                        var $5009 = self.body;
                        var $5010 = Maybe$none;
                        var $4985 = $5010;
                        break;
                    case 'Fm.Term.def':
                        var $5011 = self.name;
                        var $5012 = self.expr;
                        var $5013 = self.body;
                        var $5014 = Maybe$none;
                        var $4985 = $5014;
                        break;
                    case 'Fm.Term.ann':
                        var $5015 = self.done;
                        var $5016 = self.term;
                        var $5017 = self.type;
                        var $5018 = Maybe$none;
                        var $4985 = $5018;
                        break;
                    case 'Fm.Term.gol':
                        var $5019 = self.name;
                        var $5020 = self.dref;
                        var $5021 = self.verb;
                        var $5022 = Maybe$none;
                        var $4985 = $5022;
                        break;
                    case 'Fm.Term.hol':
                        var $5023 = self.path;
                        var $5024 = Maybe$none;
                        var $4985 = $5024;
                        break;
                    case 'Fm.Term.nat':
                        var $5025 = self.natx;
                        var $5026 = Maybe$none;
                        var $4985 = $5026;
                        break;
                    case 'Fm.Term.chr':
                        var $5027 = self.chrx;
                        var $5028 = Maybe$none;
                        var $4985 = $5028;
                        break;
                    case 'Fm.Term.str':
                        var $5029 = self.strx;
                        var $5030 = Maybe$none;
                        var $4985 = $5030;
                        break;
                    case 'Fm.Term.cse':
                        var $5031 = self.path;
                        var $5032 = self.expr;
                        var $5033 = self.name;
                        var $5034 = self.with;
                        var $5035 = self.cses;
                        var $5036 = self.moti;
                        var $5037 = Maybe$none;
                        var $4985 = $5037;
                        break;
                    case 'Fm.Term.ori':
                        var $5038 = self.orig;
                        var $5039 = self.expr;
                        var $5040 = Maybe$none;
                        var $4985 = $5040;
                        break;
                };
                var $4965 = $4985;
                break;
            case 'Fm.Term.let':
                var $5041 = self.name;
                var $5042 = self.expr;
                var $5043 = self.body;
                var $5044 = Maybe$none;
                var $4965 = $5044;
                break;
            case 'Fm.Term.def':
                var $5045 = self.name;
                var $5046 = self.expr;
                var $5047 = self.body;
                var $5048 = Maybe$none;
                var $4965 = $5048;
                break;
            case 'Fm.Term.ann':
                var $5049 = self.done;
                var $5050 = self.term;
                var $5051 = self.type;
                var $5052 = Maybe$none;
                var $4965 = $5052;
                break;
            case 'Fm.Term.gol':
                var $5053 = self.name;
                var $5054 = self.dref;
                var $5055 = self.verb;
                var $5056 = Maybe$none;
                var $4965 = $5056;
                break;
            case 'Fm.Term.hol':
                var $5057 = self.path;
                var $5058 = Maybe$none;
                var $4965 = $5058;
                break;
            case 'Fm.Term.nat':
                var $5059 = self.natx;
                var $5060 = Maybe$none;
                var $4965 = $5060;
                break;
            case 'Fm.Term.chr':
                var $5061 = self.chrx;
                var $5062 = Maybe$none;
                var $4965 = $5062;
                break;
            case 'Fm.Term.str':
                var $5063 = self.strx;
                var $5064 = Maybe$none;
                var $4965 = $5064;
                break;
            case 'Fm.Term.cse':
                var $5065 = self.path;
                var $5066 = self.expr;
                var $5067 = self.name;
                var $5068 = self.with;
                var $5069 = self.cses;
                var $5070 = self.moti;
                var $5071 = Maybe$none;
                var $4965 = $5071;
                break;
            case 'Fm.Term.ori':
                var $5072 = self.orig;
                var $5073 = self.expr;
                var $5074 = Maybe$none;
                var $4965 = $5074;
                break;
        };
        return $4965;
    };
    const Fm$Term$show$as_nat$go = x0 => Fm$Term$show$as_nat$go$(x0);

    function Fm$Term$show$as_nat$(_term$1) {
        var $5075 = Maybe$mapped$(Fm$Term$show$as_nat$go$(_term$1), Nat$show);
        return $5075;
    };
    const Fm$Term$show$as_nat = x0 => Fm$Term$show$as_nat$(x0);

    function Fm$Term$show$is_ref$(_term$1, _name$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $5077 = self.name;
                var $5078 = self.indx;
                var $5079 = Bool$false;
                var $5076 = $5079;
                break;
            case 'Fm.Term.ref':
                var $5080 = self.name;
                var $5081 = (_name$2 === $5080);
                var $5076 = $5081;
                break;
            case 'Fm.Term.typ':
                var $5082 = Bool$false;
                var $5076 = $5082;
                break;
            case 'Fm.Term.all':
                var $5083 = self.eras;
                var $5084 = self.self;
                var $5085 = self.name;
                var $5086 = self.xtyp;
                var $5087 = self.body;
                var $5088 = Bool$false;
                var $5076 = $5088;
                break;
            case 'Fm.Term.lam':
                var $5089 = self.name;
                var $5090 = self.body;
                var $5091 = Bool$false;
                var $5076 = $5091;
                break;
            case 'Fm.Term.app':
                var $5092 = self.func;
                var $5093 = self.argm;
                var $5094 = Bool$false;
                var $5076 = $5094;
                break;
            case 'Fm.Term.let':
                var $5095 = self.name;
                var $5096 = self.expr;
                var $5097 = self.body;
                var $5098 = Bool$false;
                var $5076 = $5098;
                break;
            case 'Fm.Term.def':
                var $5099 = self.name;
                var $5100 = self.expr;
                var $5101 = self.body;
                var $5102 = Bool$false;
                var $5076 = $5102;
                break;
            case 'Fm.Term.ann':
                var $5103 = self.done;
                var $5104 = self.term;
                var $5105 = self.type;
                var $5106 = Bool$false;
                var $5076 = $5106;
                break;
            case 'Fm.Term.gol':
                var $5107 = self.name;
                var $5108 = self.dref;
                var $5109 = self.verb;
                var $5110 = Bool$false;
                var $5076 = $5110;
                break;
            case 'Fm.Term.hol':
                var $5111 = self.path;
                var $5112 = Bool$false;
                var $5076 = $5112;
                break;
            case 'Fm.Term.nat':
                var $5113 = self.natx;
                var $5114 = Bool$false;
                var $5076 = $5114;
                break;
            case 'Fm.Term.chr':
                var $5115 = self.chrx;
                var $5116 = Bool$false;
                var $5076 = $5116;
                break;
            case 'Fm.Term.str':
                var $5117 = self.strx;
                var $5118 = Bool$false;
                var $5076 = $5118;
                break;
            case 'Fm.Term.cse':
                var $5119 = self.path;
                var $5120 = self.expr;
                var $5121 = self.name;
                var $5122 = self.with;
                var $5123 = self.cses;
                var $5124 = self.moti;
                var $5125 = Bool$false;
                var $5076 = $5125;
                break;
            case 'Fm.Term.ori':
                var $5126 = self.orig;
                var $5127 = self.expr;
                var $5128 = Bool$false;
                var $5076 = $5128;
                break;
        };
        return $5076;
    };
    const Fm$Term$show$is_ref = x0 => x1 => Fm$Term$show$is_ref$(x0, x1);
    const Nat$eql = a0 => a1 => (a0 === a1);

    function Fm$Term$show$app$(_term$1, _path$2, _args$3) {
        var Fm$Term$show$app$ = (_term$1, _path$2, _args$3) => ({
            ctr: 'TCO',
            arg: [_term$1, _path$2, _args$3]
        });
        var Fm$Term$show$app = _term$1 => _path$2 => _args$3 => Fm$Term$show$app$(_term$1, _path$2, _args$3);
        var arg = [_term$1, _path$2, _args$3];
        while (true) {
            let [_term$1, _path$2, _args$3] = arg;
            var R = (() => {
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $5129 = self.name;
                        var $5130 = self.indx;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5132 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $5131 = $5132;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $5134 = Bool$false;
                                var _wrap$8 = $5134;
                            } else {
                                var $5135 = self.charCodeAt(0);
                                var $5136 = self.slice(1);
                                var $5137 = ($5135 === 40);
                                var _wrap$8 = $5137;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $5138 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $5138;
                            } else {
                                var $5139 = _func$7;
                                var _func$10 = $5139;
                            };
                            var $5133 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $5131 = $5133;
                        };
                        return $5131;
                    case 'Fm.Term.ref':
                        var $5140 = self.name;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5142 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5141 = $5142;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5144 = Bool$false;
                                var _wrap$7 = $5144;
                            } else {
                                var $5145 = self.charCodeAt(0);
                                var $5146 = self.slice(1);
                                var $5147 = ($5145 === 40);
                                var _wrap$7 = $5147;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5148 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5148;
                            } else {
                                var $5149 = _func$6;
                                var _func$9 = $5149;
                            };
                            var $5143 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5141 = $5143;
                        };
                        return $5141;
                    case 'Fm.Term.typ':
                        var _arity$4 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$4 === 3n));
                        if (self) {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$6 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$7 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5151 = String$flatten$(List$cons$(_eq_lft$6, List$cons$(" == ", List$cons$(_eq_rgt$7, List$nil))));
                            var $5150 = $5151;
                        } else {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$5;
                            if (self.length === 0) {
                                var $5153 = Bool$false;
                                var _wrap$6 = $5153;
                            } else {
                                var $5154 = self.charCodeAt(0);
                                var $5155 = self.slice(1);
                                var $5156 = ($5154 === 40);
                                var _wrap$6 = $5156;
                            };
                            var _args$7 = String$join$(",", _args$3);
                            var self = _wrap$6;
                            if (self) {
                                var $5157 = String$flatten$(List$cons$("(", List$cons$(_func$5, List$cons$(")", List$nil))));
                                var _func$8 = $5157;
                            } else {
                                var $5158 = _func$5;
                                var _func$8 = $5158;
                            };
                            var $5152 = String$flatten$(List$cons$(_func$8, List$cons$("(", List$cons$(_args$7, List$cons$(")", List$nil)))));
                            var $5150 = $5152;
                        };
                        return $5150;
                    case 'Fm.Term.all':
                        var $5159 = self.eras;
                        var $5160 = self.self;
                        var $5161 = self.name;
                        var $5162 = self.xtyp;
                        var $5163 = self.body;
                        var _arity$9 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$9 === 3n));
                        if (self) {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$11 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$12 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5165 = String$flatten$(List$cons$(_eq_lft$11, List$cons$(" == ", List$cons$(_eq_rgt$12, List$nil))));
                            var $5164 = $5165;
                        } else {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$10;
                            if (self.length === 0) {
                                var $5167 = Bool$false;
                                var _wrap$11 = $5167;
                            } else {
                                var $5168 = self.charCodeAt(0);
                                var $5169 = self.slice(1);
                                var $5170 = ($5168 === 40);
                                var _wrap$11 = $5170;
                            };
                            var _args$12 = String$join$(",", _args$3);
                            var self = _wrap$11;
                            if (self) {
                                var $5171 = String$flatten$(List$cons$("(", List$cons$(_func$10, List$cons$(")", List$nil))));
                                var _func$13 = $5171;
                            } else {
                                var $5172 = _func$10;
                                var _func$13 = $5172;
                            };
                            var $5166 = String$flatten$(List$cons$(_func$13, List$cons$("(", List$cons$(_args$12, List$cons$(")", List$nil)))));
                            var $5164 = $5166;
                        };
                        return $5164;
                    case 'Fm.Term.lam':
                        var $5173 = self.name;
                        var $5174 = self.body;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5176 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $5175 = $5176;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $5178 = Bool$false;
                                var _wrap$8 = $5178;
                            } else {
                                var $5179 = self.charCodeAt(0);
                                var $5180 = self.slice(1);
                                var $5181 = ($5179 === 40);
                                var _wrap$8 = $5181;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $5182 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $5182;
                            } else {
                                var $5183 = _func$7;
                                var _func$10 = $5183;
                            };
                            var $5177 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $5175 = $5177;
                        };
                        return $5175;
                    case 'Fm.Term.app':
                        var $5184 = self.func;
                        var $5185 = self.argm;
                        var _argm$6 = Fm$Term$show$go$($5185, Fm$MPath$i$(_path$2));
                        var $5186 = Fm$Term$show$app$($5184, Fm$MPath$o$(_path$2), List$cons$(_argm$6, _args$3));
                        return $5186;
                    case 'Fm.Term.let':
                        var $5187 = self.name;
                        var $5188 = self.expr;
                        var $5189 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5191 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5190 = $5191;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5193 = Bool$false;
                                var _wrap$9 = $5193;
                            } else {
                                var $5194 = self.charCodeAt(0);
                                var $5195 = self.slice(1);
                                var $5196 = ($5194 === 40);
                                var _wrap$9 = $5196;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5197 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5197;
                            } else {
                                var $5198 = _func$8;
                                var _func$11 = $5198;
                            };
                            var $5192 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5190 = $5192;
                        };
                        return $5190;
                    case 'Fm.Term.def':
                        var $5199 = self.name;
                        var $5200 = self.expr;
                        var $5201 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5203 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5202 = $5203;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5205 = Bool$false;
                                var _wrap$9 = $5205;
                            } else {
                                var $5206 = self.charCodeAt(0);
                                var $5207 = self.slice(1);
                                var $5208 = ($5206 === 40);
                                var _wrap$9 = $5208;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5209 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5209;
                            } else {
                                var $5210 = _func$8;
                                var _func$11 = $5210;
                            };
                            var $5204 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5202 = $5204;
                        };
                        return $5202;
                    case 'Fm.Term.ann':
                        var $5211 = self.done;
                        var $5212 = self.term;
                        var $5213 = self.type;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5215 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5214 = $5215;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5217 = Bool$false;
                                var _wrap$9 = $5217;
                            } else {
                                var $5218 = self.charCodeAt(0);
                                var $5219 = self.slice(1);
                                var $5220 = ($5218 === 40);
                                var _wrap$9 = $5220;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5221 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5221;
                            } else {
                                var $5222 = _func$8;
                                var _func$11 = $5222;
                            };
                            var $5216 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5214 = $5216;
                        };
                        return $5214;
                    case 'Fm.Term.gol':
                        var $5223 = self.name;
                        var $5224 = self.dref;
                        var $5225 = self.verb;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5227 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5226 = $5227;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5229 = Bool$false;
                                var _wrap$9 = $5229;
                            } else {
                                var $5230 = self.charCodeAt(0);
                                var $5231 = self.slice(1);
                                var $5232 = ($5230 === 40);
                                var _wrap$9 = $5232;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5233 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5233;
                            } else {
                                var $5234 = _func$8;
                                var _func$11 = $5234;
                            };
                            var $5228 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5226 = $5228;
                        };
                        return $5226;
                    case 'Fm.Term.hol':
                        var $5235 = self.path;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5237 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5236 = $5237;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5239 = Bool$false;
                                var _wrap$7 = $5239;
                            } else {
                                var $5240 = self.charCodeAt(0);
                                var $5241 = self.slice(1);
                                var $5242 = ($5240 === 40);
                                var _wrap$7 = $5242;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5243 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5243;
                            } else {
                                var $5244 = _func$6;
                                var _func$9 = $5244;
                            };
                            var $5238 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5236 = $5238;
                        };
                        return $5236;
                    case 'Fm.Term.nat':
                        var $5245 = self.natx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5247 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5246 = $5247;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5249 = Bool$false;
                                var _wrap$7 = $5249;
                            } else {
                                var $5250 = self.charCodeAt(0);
                                var $5251 = self.slice(1);
                                var $5252 = ($5250 === 40);
                                var _wrap$7 = $5252;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5253 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5253;
                            } else {
                                var $5254 = _func$6;
                                var _func$9 = $5254;
                            };
                            var $5248 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5246 = $5248;
                        };
                        return $5246;
                    case 'Fm.Term.chr':
                        var $5255 = self.chrx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5257 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5256 = $5257;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5259 = Bool$false;
                                var _wrap$7 = $5259;
                            } else {
                                var $5260 = self.charCodeAt(0);
                                var $5261 = self.slice(1);
                                var $5262 = ($5260 === 40);
                                var _wrap$7 = $5262;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5263 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5263;
                            } else {
                                var $5264 = _func$6;
                                var _func$9 = $5264;
                            };
                            var $5258 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5256 = $5258;
                        };
                        return $5256;
                    case 'Fm.Term.str':
                        var $5265 = self.strx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5267 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5266 = $5267;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5269 = Bool$false;
                                var _wrap$7 = $5269;
                            } else {
                                var $5270 = self.charCodeAt(0);
                                var $5271 = self.slice(1);
                                var $5272 = ($5270 === 40);
                                var _wrap$7 = $5272;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5273 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5273;
                            } else {
                                var $5274 = _func$6;
                                var _func$9 = $5274;
                            };
                            var $5268 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5266 = $5268;
                        };
                        return $5266;
                    case 'Fm.Term.cse':
                        var $5275 = self.path;
                        var $5276 = self.expr;
                        var $5277 = self.name;
                        var $5278 = self.with;
                        var $5279 = self.cses;
                        var $5280 = self.moti;
                        var _arity$10 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$10 === 3n));
                        if (self) {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$12 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$13 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5282 = String$flatten$(List$cons$(_eq_lft$12, List$cons$(" == ", List$cons$(_eq_rgt$13, List$nil))));
                            var $5281 = $5282;
                        } else {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$11;
                            if (self.length === 0) {
                                var $5284 = Bool$false;
                                var _wrap$12 = $5284;
                            } else {
                                var $5285 = self.charCodeAt(0);
                                var $5286 = self.slice(1);
                                var $5287 = ($5285 === 40);
                                var _wrap$12 = $5287;
                            };
                            var _args$13 = String$join$(",", _args$3);
                            var self = _wrap$12;
                            if (self) {
                                var $5288 = String$flatten$(List$cons$("(", List$cons$(_func$11, List$cons$(")", List$nil))));
                                var _func$14 = $5288;
                            } else {
                                var $5289 = _func$11;
                                var _func$14 = $5289;
                            };
                            var $5283 = String$flatten$(List$cons$(_func$14, List$cons$("(", List$cons$(_args$13, List$cons$(")", List$nil)))));
                            var $5281 = $5283;
                        };
                        return $5281;
                    case 'Fm.Term.ori':
                        var $5290 = self.orig;
                        var $5291 = self.expr;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5293 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $5292 = $5293;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $5295 = Bool$false;
                                var _wrap$8 = $5295;
                            } else {
                                var $5296 = self.charCodeAt(0);
                                var $5297 = self.slice(1);
                                var $5298 = ($5296 === 40);
                                var _wrap$8 = $5298;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $5299 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $5299;
                            } else {
                                var $5300 = _func$7;
                                var _func$10 = $5300;
                            };
                            var $5294 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $5292 = $5294;
                        };
                        return $5292;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Term$show$app = x0 => x1 => x2 => Fm$Term$show$app$(x0, x1, x2);

    function Map$to_list$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $5302 = _list$4;
                var $5301 = $5302;
                break;
            case 'Map.tie':
                var $5303 = self.val;
                var $5304 = self.lft;
                var $5305 = self.rgt;
                var self = $5303;
                switch (self._) {
                    case 'Maybe.none':
                        var $5307 = _list$4;
                        var _list0$8 = $5307;
                        break;
                    case 'Maybe.some':
                        var $5308 = self.value;
                        var $5309 = List$cons$(Pair$new$(Bits$reverse$(_key$3), $5308), _list$4);
                        var _list0$8 = $5309;
                        break;
                };
                var _list1$9 = Map$to_list$go$($5304, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$to_list$go$($5305, (_key$3 + '1'), _list1$9);
                var $5306 = _list2$10;
                var $5301 = $5306;
                break;
        };
        return $5301;
    };
    const Map$to_list$go = x0 => x1 => x2 => Map$to_list$go$(x0, x1, x2);

    function Map$to_list$(_xs$2) {
        var $5310 = List$reverse$(Map$to_list$go$(_xs$2, Bits$e, List$nil));
        return $5310;
    };
    const Map$to_list = x0 => Map$to_list$(x0);

    function Bits$chunks_of$go$(_len$1, _bits$2, _need$3, _chunk$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $5312 = List$cons$(Bits$reverse$(_chunk$4), List$nil);
                var $5311 = $5312;
                break;
            case 'o':
                var $5313 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $5315 = List$cons$(_head$6, _tail$7);
                    var $5314 = $5315;
                } else {
                    var $5316 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '0');
                    var $5317 = Bits$chunks_of$go$(_len$1, $5313, $5316, _chunk$7);
                    var $5314 = $5317;
                };
                var $5311 = $5314;
                break;
            case 'i':
                var $5318 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $5320 = List$cons$(_head$6, _tail$7);
                    var $5319 = $5320;
                } else {
                    var $5321 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '1');
                    var $5322 = Bits$chunks_of$go$(_len$1, $5318, $5321, _chunk$7);
                    var $5319 = $5322;
                };
                var $5311 = $5319;
                break;
        };
        return $5311;
    };
    const Bits$chunks_of$go = x0 => x1 => x2 => x3 => Bits$chunks_of$go$(x0, x1, x2, x3);

    function Bits$chunks_of$(_len$1, _bits$2) {
        var $5323 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
        return $5323;
    };
    const Bits$chunks_of = x0 => x1 => Bits$chunks_of$(x0, x1);

    function Word$from_bits$(_size$1, _bits$2) {
        var self = _size$1;
        if (self === 0n) {
            var $5325 = Word$e;
            var $5324 = $5325;
        } else {
            var $5326 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $5328 = Word$o$(Word$from_bits$($5326, Bits$e));
                    var $5327 = $5328;
                    break;
                case 'o':
                    var $5329 = self.slice(0, -1);
                    var $5330 = Word$o$(Word$from_bits$($5326, $5329));
                    var $5327 = $5330;
                    break;
                case 'i':
                    var $5331 = self.slice(0, -1);
                    var $5332 = Word$i$(Word$from_bits$($5326, $5331));
                    var $5327 = $5332;
                    break;
            };
            var $5324 = $5327;
        };
        return $5324;
    };
    const Word$from_bits = x0 => x1 => Word$from_bits$(x0, x1);

    function Fm$Name$from_bits$(_bits$1) {
        var _list$2 = Bits$chunks_of$(6n, _bits$1);
        var _name$3 = List$fold$(_list$2, String$nil, (_bts$3 => _name$4 => {
            var _u16$5 = U16$new$(Word$from_bits$(16n, Bits$reverse$(_bts$3)));
            var self = U16$btw$(0, _u16$5, 25);
            if (self) {
                var $5335 = ((_u16$5 + 65) & 0xFFFF);
                var _chr$6 = $5335;
            } else {
                var self = U16$btw$(26, _u16$5, 51);
                if (self) {
                    var $5337 = ((_u16$5 + 71) & 0xFFFF);
                    var $5336 = $5337;
                } else {
                    var self = U16$btw$(52, _u16$5, 61);
                    if (self) {
                        var $5339 = (Math.max(_u16$5 - 4, 0));
                        var $5338 = $5339;
                    } else {
                        var self = (62 === _u16$5);
                        if (self) {
                            var $5341 = 46;
                            var $5340 = $5341;
                        } else {
                            var $5342 = 95;
                            var $5340 = $5342;
                        };
                        var $5338 = $5340;
                    };
                    var $5336 = $5338;
                };
                var _chr$6 = $5336;
            };
            var $5334 = String$cons$(_chr$6, _name$4);
            return $5334;
        }));
        var $5333 = _name$3;
        return $5333;
    };
    const Fm$Name$from_bits = x0 => Fm$Name$from_bits$(x0);

    function Pair$fst$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $5344 = self.fst;
                var $5345 = self.snd;
                var $5346 = $5344;
                var $5343 = $5346;
                break;
        };
        return $5343;
    };
    const Pair$fst = x0 => Pair$fst$(x0);

    function Fm$Term$show$go$(_term$1, _path$2) {
        var self = Fm$Term$show$as_nat$(_term$1);
        switch (self._) {
            case 'Maybe.none':
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $5349 = self.name;
                        var $5350 = self.indx;
                        var $5351 = Fm$Name$show$($5349);
                        var $5348 = $5351;
                        break;
                    case 'Fm.Term.ref':
                        var $5352 = self.name;
                        var _name$4 = Fm$Name$show$($5352);
                        var self = _path$2;
                        switch (self._) {
                            case 'Maybe.none':
                                var $5354 = _name$4;
                                var $5353 = $5354;
                                break;
                            case 'Maybe.some':
                                var $5355 = self.value;
                                var _path_val$6 = ((Bits$e + '1') + Fm$Path$to_bits$($5355));
                                var _path_str$7 = Nat$show$(Bits$to_nat$(_path_val$6));
                                var $5356 = String$flatten$(List$cons$(_name$4, List$cons$(Fm$color$("2", ("-" + _path_str$7)), List$nil)));
                                var $5353 = $5356;
                                break;
                        };
                        var $5348 = $5353;
                        break;
                    case 'Fm.Term.typ':
                        var $5357 = "Type";
                        var $5348 = $5357;
                        break;
                    case 'Fm.Term.all':
                        var $5358 = self.eras;
                        var $5359 = self.self;
                        var $5360 = self.name;
                        var $5361 = self.xtyp;
                        var $5362 = self.body;
                        var _eras$8 = $5358;
                        var _self$9 = Fm$Name$show$($5359);
                        var _name$10 = Fm$Name$show$($5360);
                        var _type$11 = Fm$Term$show$go$($5361, Fm$MPath$o$(_path$2));
                        var self = _eras$8;
                        if (self) {
                            var $5364 = "<";
                            var _open$12 = $5364;
                        } else {
                            var $5365 = "(";
                            var _open$12 = $5365;
                        };
                        var self = _eras$8;
                        if (self) {
                            var $5366 = ">";
                            var _clos$13 = $5366;
                        } else {
                            var $5367 = ")";
                            var _clos$13 = $5367;
                        };
                        var _body$14 = Fm$Term$show$go$($5362(Fm$Term$var$($5359, 0n))(Fm$Term$var$($5360, 0n)), Fm$MPath$i$(_path$2));
                        var $5363 = String$flatten$(List$cons$(_self$9, List$cons$(_open$12, List$cons$(_name$10, List$cons$(":", List$cons$(_type$11, List$cons$(_clos$13, List$cons$(" ", List$cons$(_body$14, List$nil)))))))));
                        var $5348 = $5363;
                        break;
                    case 'Fm.Term.lam':
                        var $5368 = self.name;
                        var $5369 = self.body;
                        var _name$5 = Fm$Name$show$($5368);
                        var _body$6 = Fm$Term$show$go$($5369(Fm$Term$var$($5368, 0n)), Fm$MPath$o$(_path$2));
                        var $5370 = String$flatten$(List$cons$("(", List$cons$(_name$5, List$cons$(") ", List$cons$(_body$6, List$nil)))));
                        var $5348 = $5370;
                        break;
                    case 'Fm.Term.app':
                        var $5371 = self.func;
                        var $5372 = self.argm;
                        var $5373 = Fm$Term$show$app$(_term$1, _path$2, List$nil);
                        var $5348 = $5373;
                        break;
                    case 'Fm.Term.let':
                        var $5374 = self.name;
                        var $5375 = self.expr;
                        var $5376 = self.body;
                        var _name$6 = Fm$Name$show$($5374);
                        var _expr$7 = Fm$Term$show$go$($5375, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($5376(Fm$Term$var$($5374, 0n)), Fm$MPath$i$(_path$2));
                        var $5377 = String$flatten$(List$cons$("let ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $5348 = $5377;
                        break;
                    case 'Fm.Term.def':
                        var $5378 = self.name;
                        var $5379 = self.expr;
                        var $5380 = self.body;
                        var _name$6 = Fm$Name$show$($5378);
                        var _expr$7 = Fm$Term$show$go$($5379, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($5380(Fm$Term$var$($5378, 0n)), Fm$MPath$i$(_path$2));
                        var $5381 = String$flatten$(List$cons$("def ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $5348 = $5381;
                        break;
                    case 'Fm.Term.ann':
                        var $5382 = self.done;
                        var $5383 = self.term;
                        var $5384 = self.type;
                        var _term$6 = Fm$Term$show$go$($5383, Fm$MPath$o$(_path$2));
                        var _type$7 = Fm$Term$show$go$($5384, Fm$MPath$i$(_path$2));
                        var $5385 = String$flatten$(List$cons$(_term$6, List$cons$("::", List$cons$(_type$7, List$nil))));
                        var $5348 = $5385;
                        break;
                    case 'Fm.Term.gol':
                        var $5386 = self.name;
                        var $5387 = self.dref;
                        var $5388 = self.verb;
                        var _name$6 = Fm$Name$show$($5386);
                        var $5389 = String$flatten$(List$cons$("?", List$cons$(_name$6, List$nil)));
                        var $5348 = $5389;
                        break;
                    case 'Fm.Term.hol':
                        var $5390 = self.path;
                        var $5391 = "_";
                        var $5348 = $5391;
                        break;
                    case 'Fm.Term.nat':
                        var $5392 = self.natx;
                        var $5393 = String$flatten$(List$cons$(Nat$show$($5392), List$nil));
                        var $5348 = $5393;
                        break;
                    case 'Fm.Term.chr':
                        var $5394 = self.chrx;
                        var $5395 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($5394), List$cons$("\'", List$nil))));
                        var $5348 = $5395;
                        break;
                    case 'Fm.Term.str':
                        var $5396 = self.strx;
                        var $5397 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($5396), List$cons$("\"", List$nil))));
                        var $5348 = $5397;
                        break;
                    case 'Fm.Term.cse':
                        var $5398 = self.path;
                        var $5399 = self.expr;
                        var $5400 = self.name;
                        var $5401 = self.with;
                        var $5402 = self.cses;
                        var $5403 = self.moti;
                        var _expr$9 = Fm$Term$show$go$($5399, Fm$MPath$o$(_path$2));
                        var _name$10 = Fm$Name$show$($5400);
                        var _wyth$11 = String$join$("", List$mapped$($5401, (_defn$11 => {
                            var self = _defn$11;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $5406 = self.file;
                                    var $5407 = self.code;
                                    var $5408 = self.name;
                                    var $5409 = self.term;
                                    var $5410 = self.type;
                                    var $5411 = self.stat;
                                    var _name$18 = Fm$Name$show$($5408);
                                    var _type$19 = Fm$Term$show$go$($5410, Maybe$none);
                                    var _term$20 = Fm$Term$show$go$($5409, Maybe$none);
                                    var $5412 = String$flatten$(List$cons$(_name$18, List$cons$(": ", List$cons$(_type$19, List$cons$(" = ", List$cons$(_term$20, List$cons$(";", List$nil)))))));
                                    var $5405 = $5412;
                                    break;
                            };
                            return $5405;
                        })));
                        var _cses$12 = Map$to_list$($5402);
                        var _cses$13 = String$join$("", List$mapped$(_cses$12, (_x$13 => {
                            var _name$14 = Fm$Name$from_bits$(Pair$fst$(_x$13));
                            var _term$15 = Fm$Term$show$go$(Pair$snd$(_x$13), Maybe$none);
                            var $5413 = String$flatten$(List$cons$(_name$14, List$cons$(": ", List$cons$(_term$15, List$cons$("; ", List$nil)))));
                            return $5413;
                        })));
                        var self = $5403;
                        switch (self._) {
                            case 'Maybe.none':
                                var $5414 = "";
                                var _moti$14 = $5414;
                                break;
                            case 'Maybe.some':
                                var $5415 = self.value;
                                var $5416 = String$flatten$(List$cons$(": ", List$cons$(Fm$Term$show$go$($5415, Maybe$none), List$nil)));
                                var _moti$14 = $5416;
                                break;
                        };
                        var $5404 = String$flatten$(List$cons$("case ", List$cons$(_expr$9, List$cons$(" as ", List$cons$(_name$10, List$cons$(_wyth$11, List$cons$(" { ", List$cons$(_cses$13, List$cons$("}", List$cons$(_moti$14, List$nil))))))))));
                        var $5348 = $5404;
                        break;
                    case 'Fm.Term.ori':
                        var $5417 = self.orig;
                        var $5418 = self.expr;
                        var $5419 = Fm$Term$show$go$($5418, _path$2);
                        var $5348 = $5419;
                        break;
                };
                var $5347 = $5348;
                break;
            case 'Maybe.some':
                var $5420 = self.value;
                var $5421 = $5420;
                var $5347 = $5421;
                break;
        };
        return $5347;
    };
    const Fm$Term$show$go = x0 => x1 => Fm$Term$show$go$(x0, x1);

    function Fm$Term$show$(_term$1) {
        var $5422 = Fm$Term$show$go$(_term$1, Maybe$none);
        return $5422;
    };
    const Fm$Term$show = x0 => Fm$Term$show$(x0);

    function Fm$Error$relevant$(_errors$1, _got$2) {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                var $5424 = List$nil;
                var $5423 = $5424;
                break;
            case 'List.cons':
                var $5425 = self.head;
                var $5426 = self.tail;
                var self = $5425;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $5428 = self.origin;
                        var $5429 = self.expected;
                        var $5430 = self.detected;
                        var $5431 = self.context;
                        var $5432 = (!_got$2);
                        var _keep$5 = $5432;
                        break;
                    case 'Fm.Error.show_goal':
                        var $5433 = self.name;
                        var $5434 = self.dref;
                        var $5435 = self.verb;
                        var $5436 = self.goal;
                        var $5437 = self.context;
                        var $5438 = Bool$true;
                        var _keep$5 = $5438;
                        break;
                    case 'Fm.Error.waiting':
                        var $5439 = self.name;
                        var $5440 = Bool$false;
                        var _keep$5 = $5440;
                        break;
                    case 'Fm.Error.indirect':
                        var $5441 = self.name;
                        var $5442 = Bool$false;
                        var _keep$5 = $5442;
                        break;
                    case 'Fm.Error.patch':
                        var $5443 = self.path;
                        var $5444 = self.term;
                        var $5445 = Bool$false;
                        var _keep$5 = $5445;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $5446 = self.origin;
                        var $5447 = self.name;
                        var $5448 = (!_got$2);
                        var _keep$5 = $5448;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $5449 = self.origin;
                        var $5450 = self.term;
                        var $5451 = self.context;
                        var $5452 = (!_got$2);
                        var _keep$5 = $5452;
                        break;
                };
                var self = $5425;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $5453 = self.origin;
                        var $5454 = self.expected;
                        var $5455 = self.detected;
                        var $5456 = self.context;
                        var $5457 = Bool$true;
                        var _got$6 = $5457;
                        break;
                    case 'Fm.Error.show_goal':
                        var $5458 = self.name;
                        var $5459 = self.dref;
                        var $5460 = self.verb;
                        var $5461 = self.goal;
                        var $5462 = self.context;
                        var $5463 = _got$2;
                        var _got$6 = $5463;
                        break;
                    case 'Fm.Error.waiting':
                        var $5464 = self.name;
                        var $5465 = _got$2;
                        var _got$6 = $5465;
                        break;
                    case 'Fm.Error.indirect':
                        var $5466 = self.name;
                        var $5467 = _got$2;
                        var _got$6 = $5467;
                        break;
                    case 'Fm.Error.patch':
                        var $5468 = self.path;
                        var $5469 = self.term;
                        var $5470 = _got$2;
                        var _got$6 = $5470;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $5471 = self.origin;
                        var $5472 = self.name;
                        var $5473 = Bool$true;
                        var _got$6 = $5473;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $5474 = self.origin;
                        var $5475 = self.term;
                        var $5476 = self.context;
                        var $5477 = _got$2;
                        var _got$6 = $5477;
                        break;
                };
                var _tail$7 = Fm$Error$relevant$($5426, _got$6);
                var self = _keep$5;
                if (self) {
                    var $5478 = List$cons$($5425, _tail$7);
                    var $5427 = $5478;
                } else {
                    var $5479 = _tail$7;
                    var $5427 = $5479;
                };
                var $5423 = $5427;
                break;
        };
        return $5423;
    };
    const Fm$Error$relevant = x0 => x1 => Fm$Error$relevant$(x0, x1);

    function Fm$Context$show$(_context$1) {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                var $5481 = "";
                var $5480 = $5481;
                break;
            case 'List.cons':
                var $5482 = self.head;
                var $5483 = self.tail;
                var self = $5482;
                switch (self._) {
                    case 'Pair.new':
                        var $5485 = self.fst;
                        var $5486 = self.snd;
                        var _name$6 = Fm$Name$show$($5485);
                        var _type$7 = Fm$Term$show$(Fm$Term$normalize$($5486, Map$new));
                        var _rest$8 = Fm$Context$show$($5483);
                        var $5487 = String$flatten$(List$cons$(_rest$8, List$cons$("- ", List$cons$(_name$6, List$cons$(": ", List$cons$(_type$7, List$cons$("\u{a}", List$nil)))))));
                        var $5484 = $5487;
                        break;
                };
                var $5480 = $5484;
                break;
        };
        return $5480;
    };
    const Fm$Context$show = x0 => Fm$Context$show$(x0);

    function Fm$Term$expand_at$(_path$1, _term$2, _defs$3) {
        var $5488 = Fm$Term$patch_at$(_path$1, _term$2, (_term$4 => {
            var self = _term$4;
            switch (self._) {
                case 'Fm.Term.var':
                    var $5490 = self.name;
                    var $5491 = self.indx;
                    var $5492 = _term$4;
                    var $5489 = $5492;
                    break;
                case 'Fm.Term.ref':
                    var $5493 = self.name;
                    var self = Fm$get$($5493, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $5495 = Fm$Term$ref$($5493);
                            var $5494 = $5495;
                            break;
                        case 'Maybe.some':
                            var $5496 = self.value;
                            var self = $5496;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $5498 = self.file;
                                    var $5499 = self.code;
                                    var $5500 = self.name;
                                    var $5501 = self.term;
                                    var $5502 = self.type;
                                    var $5503 = self.stat;
                                    var $5504 = $5501;
                                    var $5497 = $5504;
                                    break;
                            };
                            var $5494 = $5497;
                            break;
                    };
                    var $5489 = $5494;
                    break;
                case 'Fm.Term.typ':
                    var $5505 = _term$4;
                    var $5489 = $5505;
                    break;
                case 'Fm.Term.all':
                    var $5506 = self.eras;
                    var $5507 = self.self;
                    var $5508 = self.name;
                    var $5509 = self.xtyp;
                    var $5510 = self.body;
                    var $5511 = _term$4;
                    var $5489 = $5511;
                    break;
                case 'Fm.Term.lam':
                    var $5512 = self.name;
                    var $5513 = self.body;
                    var $5514 = _term$4;
                    var $5489 = $5514;
                    break;
                case 'Fm.Term.app':
                    var $5515 = self.func;
                    var $5516 = self.argm;
                    var $5517 = _term$4;
                    var $5489 = $5517;
                    break;
                case 'Fm.Term.let':
                    var $5518 = self.name;
                    var $5519 = self.expr;
                    var $5520 = self.body;
                    var $5521 = _term$4;
                    var $5489 = $5521;
                    break;
                case 'Fm.Term.def':
                    var $5522 = self.name;
                    var $5523 = self.expr;
                    var $5524 = self.body;
                    var $5525 = _term$4;
                    var $5489 = $5525;
                    break;
                case 'Fm.Term.ann':
                    var $5526 = self.done;
                    var $5527 = self.term;
                    var $5528 = self.type;
                    var $5529 = _term$4;
                    var $5489 = $5529;
                    break;
                case 'Fm.Term.gol':
                    var $5530 = self.name;
                    var $5531 = self.dref;
                    var $5532 = self.verb;
                    var $5533 = _term$4;
                    var $5489 = $5533;
                    break;
                case 'Fm.Term.hol':
                    var $5534 = self.path;
                    var $5535 = _term$4;
                    var $5489 = $5535;
                    break;
                case 'Fm.Term.nat':
                    var $5536 = self.natx;
                    var $5537 = _term$4;
                    var $5489 = $5537;
                    break;
                case 'Fm.Term.chr':
                    var $5538 = self.chrx;
                    var $5539 = _term$4;
                    var $5489 = $5539;
                    break;
                case 'Fm.Term.str':
                    var $5540 = self.strx;
                    var $5541 = _term$4;
                    var $5489 = $5541;
                    break;
                case 'Fm.Term.cse':
                    var $5542 = self.path;
                    var $5543 = self.expr;
                    var $5544 = self.name;
                    var $5545 = self.with;
                    var $5546 = self.cses;
                    var $5547 = self.moti;
                    var $5548 = _term$4;
                    var $5489 = $5548;
                    break;
                case 'Fm.Term.ori':
                    var $5549 = self.orig;
                    var $5550 = self.expr;
                    var $5551 = _term$4;
                    var $5489 = $5551;
                    break;
            };
            return $5489;
        }));
        return $5488;
    };
    const Fm$Term$expand_at = x0 => x1 => x2 => Fm$Term$expand_at$(x0, x1, x2);
    const Bool$or = a0 => a1 => (a0 || a1);

    function Fm$Term$expand_ct$(_term$1, _defs$2, _arity$3) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $5553 = self.name;
                var $5554 = self.indx;
                var $5555 = Fm$Term$var$($5553, $5554);
                var $5552 = $5555;
                break;
            case 'Fm.Term.ref':
                var $5556 = self.name;
                var _expand$5 = Bool$false;
                var _expand$6 = ((($5556 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                var _expand$7 = ((($5556 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                var _expand$8 = ((($5556 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                var _expand$9 = ((($5556 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                var self = _expand$9;
                if (self) {
                    var self = Fm$get$($5556, _defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            var $5559 = Fm$Term$ref$($5556);
                            var $5558 = $5559;
                            break;
                        case 'Maybe.some':
                            var $5560 = self.value;
                            var self = $5560;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $5562 = self.file;
                                    var $5563 = self.code;
                                    var $5564 = self.name;
                                    var $5565 = self.term;
                                    var $5566 = self.type;
                                    var $5567 = self.stat;
                                    var $5568 = $5565;
                                    var $5561 = $5568;
                                    break;
                            };
                            var $5558 = $5561;
                            break;
                    };
                    var $5557 = $5558;
                } else {
                    var $5569 = Fm$Term$ref$($5556);
                    var $5557 = $5569;
                };
                var $5552 = $5557;
                break;
            case 'Fm.Term.typ':
                var $5570 = Fm$Term$typ;
                var $5552 = $5570;
                break;
            case 'Fm.Term.all':
                var $5571 = self.eras;
                var $5572 = self.self;
                var $5573 = self.name;
                var $5574 = self.xtyp;
                var $5575 = self.body;
                var $5576 = Fm$Term$all$($5571, $5572, $5573, Fm$Term$expand_ct$($5574, _defs$2, 0n), (_s$9 => _x$10 => {
                    var $5577 = Fm$Term$expand_ct$($5575(_s$9)(_x$10), _defs$2, 0n);
                    return $5577;
                }));
                var $5552 = $5576;
                break;
            case 'Fm.Term.lam':
                var $5578 = self.name;
                var $5579 = self.body;
                var $5580 = Fm$Term$lam$($5578, (_x$6 => {
                    var $5581 = Fm$Term$expand_ct$($5579(_x$6), _defs$2, 0n);
                    return $5581;
                }));
                var $5552 = $5580;
                break;
            case 'Fm.Term.app':
                var $5582 = self.func;
                var $5583 = self.argm;
                var $5584 = Fm$Term$app$(Fm$Term$expand_ct$($5582, _defs$2, Nat$succ$(_arity$3)), Fm$Term$expand_ct$($5583, _defs$2, 0n));
                var $5552 = $5584;
                break;
            case 'Fm.Term.let':
                var $5585 = self.name;
                var $5586 = self.expr;
                var $5587 = self.body;
                var $5588 = Fm$Term$let$($5585, Fm$Term$expand_ct$($5586, _defs$2, 0n), (_x$7 => {
                    var $5589 = Fm$Term$expand_ct$($5587(_x$7), _defs$2, 0n);
                    return $5589;
                }));
                var $5552 = $5588;
                break;
            case 'Fm.Term.def':
                var $5590 = self.name;
                var $5591 = self.expr;
                var $5592 = self.body;
                var $5593 = Fm$Term$def$($5590, Fm$Term$expand_ct$($5591, _defs$2, 0n), (_x$7 => {
                    var $5594 = Fm$Term$expand_ct$($5592(_x$7), _defs$2, 0n);
                    return $5594;
                }));
                var $5552 = $5593;
                break;
            case 'Fm.Term.ann':
                var $5595 = self.done;
                var $5596 = self.term;
                var $5597 = self.type;
                var $5598 = Fm$Term$ann$($5595, Fm$Term$expand_ct$($5596, _defs$2, 0n), Fm$Term$expand_ct$($5597, _defs$2, 0n));
                var $5552 = $5598;
                break;
            case 'Fm.Term.gol':
                var $5599 = self.name;
                var $5600 = self.dref;
                var $5601 = self.verb;
                var $5602 = Fm$Term$gol$($5599, $5600, $5601);
                var $5552 = $5602;
                break;
            case 'Fm.Term.hol':
                var $5603 = self.path;
                var $5604 = Fm$Term$hol$($5603);
                var $5552 = $5604;
                break;
            case 'Fm.Term.nat':
                var $5605 = self.natx;
                var $5606 = Fm$Term$nat$($5605);
                var $5552 = $5606;
                break;
            case 'Fm.Term.chr':
                var $5607 = self.chrx;
                var $5608 = Fm$Term$chr$($5607);
                var $5552 = $5608;
                break;
            case 'Fm.Term.str':
                var $5609 = self.strx;
                var $5610 = Fm$Term$str$($5609);
                var $5552 = $5610;
                break;
            case 'Fm.Term.cse':
                var $5611 = self.path;
                var $5612 = self.expr;
                var $5613 = self.name;
                var $5614 = self.with;
                var $5615 = self.cses;
                var $5616 = self.moti;
                var $5617 = _term$1;
                var $5552 = $5617;
                break;
            case 'Fm.Term.ori':
                var $5618 = self.orig;
                var $5619 = self.expr;
                var $5620 = Fm$Term$ori$($5618, $5619);
                var $5552 = $5620;
                break;
        };
        return $5552;
    };
    const Fm$Term$expand_ct = x0 => x1 => x2 => Fm$Term$expand_ct$(x0, x1, x2);

    function Fm$Term$expand$(_dref$1, _term$2, _defs$3) {
        var _term$4 = Fm$Term$normalize$(_term$2, Map$new);
        var _term$5 = (() => {
            var $5623 = _term$4;
            var $5624 = _dref$1;
            let _term$6 = $5623;
            let _path$5;
            while ($5624._ === 'List.cons') {
                _path$5 = $5624.head;
                var _term$7 = Fm$Term$expand_at$(_path$5, _term$6, _defs$3);
                var _term$8 = Fm$Term$normalize$(_term$7, Map$new);
                var _term$9 = Fm$Term$expand_ct$(_term$8, _defs$3, 0n);
                var _term$10 = Fm$Term$normalize$(_term$9, Map$new);
                var $5623 = _term$10;
                _term$6 = $5623;
                $5624 = $5624.tail;
            }
            return _term$6;
        })();
        var $5621 = _term$5;
        return $5621;
    };
    const Fm$Term$expand = x0 => x1 => x2 => Fm$Term$expand$(x0, x1, x2);

    function Fm$Error$show$(_error$1, _defs$2) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $5626 = self.origin;
                var $5627 = self.expected;
                var $5628 = self.detected;
                var $5629 = self.context;
                var self = $5627;
                switch (self._) {
                    case 'Either.left':
                        var $5631 = self.value;
                        var $5632 = $5631;
                        var _expected$7 = $5632;
                        break;
                    case 'Either.right':
                        var $5633 = self.value;
                        var $5634 = Fm$Term$show$(Fm$Term$normalize$($5633, Map$new));
                        var _expected$7 = $5634;
                        break;
                };
                var self = $5628;
                switch (self._) {
                    case 'Either.left':
                        var $5635 = self.value;
                        var $5636 = $5635;
                        var _detected$8 = $5636;
                        break;
                    case 'Either.right':
                        var $5637 = self.value;
                        var $5638 = Fm$Term$show$(Fm$Term$normalize$($5637, Map$new));
                        var _detected$8 = $5638;
                        break;
                };
                var $5630 = String$flatten$(List$cons$("Type mismatch.\u{a}", List$cons$("- Expected: ", List$cons$(_expected$7, List$cons$("\u{a}", List$cons$("- Detected: ", List$cons$(_detected$8, List$cons$("\u{a}", List$cons$((() => {
                    var self = $5629;
                    switch (self._) {
                        case 'List.nil':
                            var $5639 = "";
                            return $5639;
                        case 'List.cons':
                            var $5640 = self.head;
                            var $5641 = self.tail;
                            var $5642 = String$flatten$(List$cons$("With context:\u{a}", List$cons$(Fm$Context$show$($5629), List$nil)));
                            return $5642;
                    };
                })(), List$nil)))))))));
                var $5625 = $5630;
                break;
            case 'Fm.Error.show_goal':
                var $5643 = self.name;
                var $5644 = self.dref;
                var $5645 = self.verb;
                var $5646 = self.goal;
                var $5647 = self.context;
                var _goal_name$8 = String$flatten$(List$cons$("Goal ?", List$cons$(Fm$Name$show$($5643), List$cons$(":\u{a}", List$nil))));
                var self = $5646;
                switch (self._) {
                    case 'Maybe.none':
                        var $5649 = "";
                        var _with_type$9 = $5649;
                        break;
                    case 'Maybe.some':
                        var $5650 = self.value;
                        var _goal$10 = Fm$Term$expand$($5644, $5650, _defs$2);
                        var $5651 = String$flatten$(List$cons$("With type: ", List$cons$((() => {
                            var self = $5645;
                            if (self) {
                                var $5652 = Fm$Term$show$go$(_goal$10, Maybe$some$((_x$11 => {
                                    var $5653 = _x$11;
                                    return $5653;
                                })));
                                return $5652;
                            } else {
                                var $5654 = Fm$Term$show$(_goal$10);
                                return $5654;
                            };
                        })(), List$cons$("\u{a}", List$nil))));
                        var _with_type$9 = $5651;
                        break;
                };
                var self = $5647;
                switch (self._) {
                    case 'List.nil':
                        var $5655 = "";
                        var _with_ctxt$10 = $5655;
                        break;
                    case 'List.cons':
                        var $5656 = self.head;
                        var $5657 = self.tail;
                        var $5658 = String$flatten$(List$cons$("With ctxt:\u{a}", List$cons$(Fm$Context$show$($5647), List$nil)));
                        var _with_ctxt$10 = $5658;
                        break;
                };
                var $5648 = String$flatten$(List$cons$(_goal_name$8, List$cons$(_with_type$9, List$cons$(_with_ctxt$10, List$nil))));
                var $5625 = $5648;
                break;
            case 'Fm.Error.waiting':
                var $5659 = self.name;
                var $5660 = String$flatten$(List$cons$("Waiting for \'", List$cons$($5659, List$cons$("\'.", List$nil))));
                var $5625 = $5660;
                break;
            case 'Fm.Error.indirect':
                var $5661 = self.name;
                var $5662 = String$flatten$(List$cons$("Error on dependency \'", List$cons$($5661, List$cons$("\'.", List$nil))));
                var $5625 = $5662;
                break;
            case 'Fm.Error.patch':
                var $5663 = self.path;
                var $5664 = self.term;
                var $5665 = String$flatten$(List$cons$("Patching: ", List$cons$(Fm$Term$show$($5664), List$nil)));
                var $5625 = $5665;
                break;
            case 'Fm.Error.undefined_reference':
                var $5666 = self.origin;
                var $5667 = self.name;
                var $5668 = String$flatten$(List$cons$("Undefined reference: ", List$cons$(Fm$Name$show$($5667), List$cons$("\u{a}", List$nil))));
                var $5625 = $5668;
                break;
            case 'Fm.Error.cant_infer':
                var $5669 = self.origin;
                var $5670 = self.term;
                var $5671 = self.context;
                var _term$6 = Fm$Term$show$($5670);
                var _context$7 = Fm$Context$show$($5671);
                var $5672 = String$flatten$(List$cons$("Can\'t infer type of: ", List$cons$(_term$6, List$cons$("\u{a}", List$cons$("With ctxt:\u{a}", List$cons$(_context$7, List$nil))))));
                var $5625 = $5672;
                break;
        };
        return $5625;
    };
    const Fm$Error$show = x0 => x1 => Fm$Error$show$(x0, x1);

    function Fm$Error$origin$(_error$1) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $5674 = self.origin;
                var $5675 = self.expected;
                var $5676 = self.detected;
                var $5677 = self.context;
                var $5678 = $5674;
                var $5673 = $5678;
                break;
            case 'Fm.Error.show_goal':
                var $5679 = self.name;
                var $5680 = self.dref;
                var $5681 = self.verb;
                var $5682 = self.goal;
                var $5683 = self.context;
                var $5684 = Maybe$none;
                var $5673 = $5684;
                break;
            case 'Fm.Error.waiting':
                var $5685 = self.name;
                var $5686 = Maybe$none;
                var $5673 = $5686;
                break;
            case 'Fm.Error.indirect':
                var $5687 = self.name;
                var $5688 = Maybe$none;
                var $5673 = $5688;
                break;
            case 'Fm.Error.patch':
                var $5689 = self.path;
                var $5690 = self.term;
                var $5691 = Maybe$none;
                var $5673 = $5691;
                break;
            case 'Fm.Error.undefined_reference':
                var $5692 = self.origin;
                var $5693 = self.name;
                var $5694 = $5692;
                var $5673 = $5694;
                break;
            case 'Fm.Error.cant_infer':
                var $5695 = self.origin;
                var $5696 = self.term;
                var $5697 = self.context;
                var $5698 = $5695;
                var $5673 = $5698;
                break;
        };
        return $5673;
    };
    const Fm$Error$origin = x0 => Fm$Error$origin$(x0);

    function Fm$Defs$report$go$(_defs$1, _list$2, _errs$3, _typs$4) {
        var Fm$Defs$report$go$ = (_defs$1, _list$2, _errs$3, _typs$4) => ({
            ctr: 'TCO',
            arg: [_defs$1, _list$2, _errs$3, _typs$4]
        });
        var Fm$Defs$report$go = _defs$1 => _list$2 => _errs$3 => _typs$4 => Fm$Defs$report$go$(_defs$1, _list$2, _errs$3, _typs$4);
        var arg = [_defs$1, _list$2, _errs$3, _typs$4];
        while (true) {
            let [_defs$1, _list$2, _errs$3, _typs$4] = arg;
            var R = (() => {
                var self = _list$2;
                switch (self._) {
                    case 'List.nil':
                        var $5699 = String$flatten$(List$cons$(_typs$4, List$cons$("\u{a}", List$cons$((() => {
                            var self = _errs$3;
                            if (self.length === 0) {
                                var $5700 = "All terms check.";
                                return $5700;
                            } else {
                                var $5701 = self.charCodeAt(0);
                                var $5702 = self.slice(1);
                                var $5703 = _errs$3;
                                return $5703;
                            };
                        })(), List$nil))));
                        return $5699;
                    case 'List.cons':
                        var $5704 = self.head;
                        var $5705 = self.tail;
                        var _name$7 = $5704;
                        var self = Fm$get$(_name$7, _defs$1);
                        switch (self._) {
                            case 'Maybe.none':
                                var $5707 = Fm$Defs$report$go$(_defs$1, $5705, _errs$3, _typs$4);
                                var $5706 = $5707;
                                break;
                            case 'Maybe.some':
                                var $5708 = self.value;
                                var self = $5708;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $5710 = self.file;
                                        var $5711 = self.code;
                                        var $5712 = self.name;
                                        var $5713 = self.term;
                                        var $5714 = self.type;
                                        var $5715 = self.stat;
                                        var _typs$15 = String$flatten$(List$cons$(_typs$4, List$cons$(_name$7, List$cons$(": ", List$cons$(Fm$Term$show$($5714), List$cons$("\u{a}", List$nil))))));
                                        var self = $5715;
                                        switch (self._) {
                                            case 'Fm.Status.init':
                                                var $5717 = Fm$Defs$report$go$(_defs$1, $5705, _errs$3, _typs$15);
                                                var $5716 = $5717;
                                                break;
                                            case 'Fm.Status.wait':
                                                var $5718 = Fm$Defs$report$go$(_defs$1, $5705, _errs$3, _typs$15);
                                                var $5716 = $5718;
                                                break;
                                            case 'Fm.Status.done':
                                                var $5719 = Fm$Defs$report$go$(_defs$1, $5705, _errs$3, _typs$15);
                                                var $5716 = $5719;
                                                break;
                                            case 'Fm.Status.fail':
                                                var $5720 = self.errors;
                                                var self = $5720;
                                                switch (self._) {
                                                    case 'List.nil':
                                                        var $5722 = Fm$Defs$report$go$(_defs$1, $5705, _errs$3, _typs$15);
                                                        var $5721 = $5722;
                                                        break;
                                                    case 'List.cons':
                                                        var $5723 = self.head;
                                                        var $5724 = self.tail;
                                                        var _name_str$19 = Fm$Name$show$($5712);
                                                        var _rel_errs$20 = Fm$Error$relevant$($5720, Bool$false);
                                                        var _rel_msgs$21 = List$mapped$(_rel_errs$20, (_err$21 => {
                                                            var $5726 = String$flatten$(List$cons$(Fm$Error$show$(_err$21, _defs$1), List$cons$((() => {
                                                                var self = Fm$Error$origin$(_err$21);
                                                                switch (self._) {
                                                                    case 'Maybe.none':
                                                                        var $5727 = "";
                                                                        return $5727;
                                                                    case 'Maybe.some':
                                                                        var $5728 = self.value;
                                                                        var self = $5728;
                                                                        switch (self._) {
                                                                            case 'Fm.Origin.new':
                                                                                var $5730 = self.file;
                                                                                var $5731 = self.from;
                                                                                var $5732 = self.upto;
                                                                                var $5733 = String$flatten$(List$cons$("Inside \'", List$cons$($5710, List$cons$("\':\u{a}", List$cons$(Fm$highlight$($5711, $5731, $5732), List$cons$("\u{a}", List$nil))))));
                                                                                var $5729 = $5733;
                                                                                break;
                                                                        };
                                                                        return $5729;
                                                                };
                                                            })(), List$nil)));
                                                            return $5726;
                                                        }));
                                                        var _errs$22 = String$flatten$(List$cons$(_errs$3, List$cons$(String$join$("\u{a}", _rel_msgs$21), List$cons$("\u{a}", List$nil))));
                                                        var $5725 = Fm$Defs$report$go$(_defs$1, $5705, _errs$22, _typs$15);
                                                        var $5721 = $5725;
                                                        break;
                                                };
                                                var $5716 = $5721;
                                                break;
                                        };
                                        var $5709 = $5716;
                                        break;
                                };
                                var $5706 = $5709;
                                break;
                        };
                        return $5706;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Defs$report$go = x0 => x1 => x2 => x3 => Fm$Defs$report$go$(x0, x1, x2, x3);

    function Fm$Defs$report$(_defs$1, _list$2) {
        var $5734 = Fm$Defs$report$go$(_defs$1, _list$2, "", "");
        return $5734;
    };
    const Fm$Defs$report = x0 => x1 => Fm$Defs$report$(x0, x1);

    function Fm$checker$io$one$(_name$1) {
        var $5735 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $5736 = IO$print$(Fm$Defs$report$(_defs$2, List$cons$(_name$1, List$nil)));
            return $5736;
        }));
        return $5735;
    };
    const Fm$checker$io$one = x0 => Fm$checker$io$one$(x0);

    function Map$keys$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $5738 = _list$4;
                var $5737 = $5738;
                break;
            case 'Map.tie':
                var $5739 = self.val;
                var $5740 = self.lft;
                var $5741 = self.rgt;
                var self = $5739;
                switch (self._) {
                    case 'Maybe.none':
                        var $5743 = _list$4;
                        var _list0$8 = $5743;
                        break;
                    case 'Maybe.some':
                        var $5744 = self.value;
                        var $5745 = List$cons$(Bits$reverse$(_key$3), _list$4);
                        var _list0$8 = $5745;
                        break;
                };
                var _list1$9 = Map$keys$go$($5740, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$keys$go$($5741, (_key$3 + '1'), _list1$9);
                var $5742 = _list2$10;
                var $5737 = $5742;
                break;
        };
        return $5737;
    };
    const Map$keys$go = x0 => x1 => x2 => Map$keys$go$(x0, x1, x2);

    function Map$keys$(_xs$2) {
        var $5746 = List$reverse$(Map$keys$go$(_xs$2, Bits$e, List$nil));
        return $5746;
    };
    const Map$keys = x0 => Map$keys$(x0);

    function Fm$Synth$many$(_names$1, _defs$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $5748 = Monad$pure$(IO$monad)(_defs$2);
                var $5747 = $5748;
                break;
            case 'List.cons':
                var $5749 = self.head;
                var $5750 = self.tail;
                var $5751 = Monad$bind$(IO$monad)(Fm$Synth$one$($5749, _defs$2))((_defs$5 => {
                    var $5752 = Fm$Synth$many$($5750, _defs$5);
                    return $5752;
                }));
                var $5747 = $5751;
                break;
        };
        return $5747;
    };
    const Fm$Synth$many = x0 => x1 => Fm$Synth$many$(x0, x1);

    function Fm$Synth$file$(_file$1, _defs$2) {
        var $5753 = Monad$bind$(IO$monad)(IO$get_file$(_file$1))((_code$3 => {
            var _read$4 = Fm$Defs$read$(_file$1, _code$3, _defs$2);
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $5755 = self.value;
                    var $5756 = Monad$pure$(IO$monad)(Either$left$($5755));
                    var $5754 = $5756;
                    break;
                case 'Either.right':
                    var $5757 = self.value;
                    var _file_defs$6 = $5757;
                    var _file_keys$7 = Map$keys$(_file_defs$6);
                    var _file_nams$8 = List$mapped$(_file_keys$7, Fm$Name$from_bits);
                    var $5758 = Monad$bind$(IO$monad)(Fm$Synth$many$(_file_nams$8, _file_defs$6))((_defs$9 => {
                        var $5759 = Monad$pure$(IO$monad)(Either$right$(Pair$new$(_file_nams$8, _defs$9)));
                        return $5759;
                    }));
                    var $5754 = $5758;
                    break;
            };
            return $5754;
        }));
        return $5753;
    };
    const Fm$Synth$file = x0 => x1 => Fm$Synth$file$(x0, x1);

    function Fm$checker$io$file$(_file$1) {
        var $5760 = Monad$bind$(IO$monad)(Fm$Synth$file$(_file$1, Map$new))((_loaded$2 => {
            var self = _loaded$2;
            switch (self._) {
                case 'Either.left':
                    var $5762 = self.value;
                    var $5763 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("On \'", List$cons$(_file$1, List$cons$("\':", List$nil))))))((_$4 => {
                        var $5764 = IO$print$($5762);
                        return $5764;
                    }));
                    var $5761 = $5763;
                    break;
                case 'Either.right':
                    var $5765 = self.value;
                    var self = $5765;
                    switch (self._) {
                        case 'Pair.new':
                            var $5767 = self.fst;
                            var $5768 = self.snd;
                            var _nams$6 = $5767;
                            var _defs$7 = $5768;
                            var $5769 = IO$print$(Fm$Defs$report$(_defs$7, _nams$6));
                            var $5766 = $5769;
                            break;
                    };
                    var $5761 = $5766;
                    break;
            };
            return $5761;
        }));
        return $5760;
    };
    const Fm$checker$io$file = x0 => Fm$checker$io$file$(x0);

    function IO$purify$(_io$2) {
        var IO$purify$ = (_io$2) => ({
            ctr: 'TCO',
            arg: [_io$2]
        });
        var IO$purify = _io$2 => IO$purify$(_io$2);
        var arg = [_io$2];
        while (true) {
            let [_io$2] = arg;
            var R = (() => {
                var self = _io$2;
                switch (self._) {
                    case 'IO.end':
                        var $5770 = self.value;
                        var $5771 = $5770;
                        return $5771;
                    case 'IO.ask':
                        var $5772 = self.query;
                        var $5773 = self.param;
                        var $5774 = self.then;
                        var $5775 = IO$purify$($5774(""));
                        return $5775;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const IO$purify = x0 => IO$purify$(x0);

    function Fm$checker$code$(_code$1) {
        var self = Fm$Defs$read$("Main.fm", _code$1, Map$new);
        switch (self._) {
            case 'Either.left':
                var $5777 = self.value;
                var $5778 = $5777;
                var $5776 = $5778;
                break;
            case 'Either.right':
                var $5779 = self.value;
                var $5780 = IO$purify$((() => {
                    var _defs$3 = $5779;
                    var _nams$4 = List$mapped$(Map$keys$(_defs$3), Fm$Name$from_bits);
                    var $5781 = Monad$bind$(IO$monad)(Fm$Synth$many$(_nams$4, _defs$3))((_defs$5 => {
                        var $5782 = Monad$pure$(IO$monad)(Fm$Defs$report$(_defs$5, _nams$4));
                        return $5782;
                    }));
                    return $5781;
                })());
                var $5776 = $5780;
                break;
        };
        return $5776;
    };
    const Fm$checker$code = x0 => Fm$checker$code$(x0);

    function Fm$Term$read$(_code$1) {
        var self = Fm$Parser$term(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $5784 = self.idx;
                var $5785 = self.code;
                var $5786 = self.err;
                var $5787 = Maybe$none;
                var $5783 = $5787;
                break;
            case 'Parser.Reply.value':
                var $5788 = self.idx;
                var $5789 = self.code;
                var $5790 = self.val;
                var $5791 = Maybe$some$($5790);
                var $5783 = $5791;
                break;
        };
        return $5783;
    };
    const Fm$Term$read = x0 => Fm$Term$read$(x0);
    const Fm = (() => {
        var __$1 = Fm$to_core$io$one;
        var __$2 = Fm$checker$io$one;
        var __$3 = Fm$checker$io$file;
        var __$4 = Fm$checker$code;
        var __$5 = Fm$Term$read;
        var $5792 = Fm$checker$io$file$("Main.fm");
        return $5792;
    })();
    return {
        '$main$': () => run(Fm),
        'run': run,
        'Monad.bind': Monad$bind,
        'IO': IO,
        'Monad.new': Monad$new,
        'IO.ask': IO$ask,
        'IO.bind': IO$bind,
        'IO.end': IO$end,
        'IO.monad': IO$monad,
        'Map': Map,
        'Maybe': Maybe,
        'Maybe.none': Maybe$none,
        'Map.get': Map$get,
        'Bits.e': Bits$e,
        'Bool.false': Bool$false,
        'Bool.and': Bool$and,
        'Bool.true': Bool$true,
        'Cmp.as_lte': Cmp$as_lte,
        'Cmp.ltn': Cmp$ltn,
        'Cmp.gtn': Cmp$gtn,
        'Word.cmp.go': Word$cmp$go,
        'Cmp.eql': Cmp$eql,
        'Word.cmp': Word$cmp,
        'Word.lte': Word$lte,
        'Nat.succ': Nat$succ,
        'Nat.zero': Nat$zero,
        'U16.lte': U16$lte,
        'U16.btw': U16$btw,
        'U16.new': U16$new,
        'Word.e': Word$e,
        'Word': Word,
        'Word.i': Word$i,
        'Word.o': Word$o,
        'Word.subber': Word$subber,
        'Word.sub': Word$sub,
        'U16.sub': U16$sub,
        'Nat.apply': Nat$apply,
        'Word.inc': Word$inc,
        'U16.inc': U16$inc,
        'Word.zero': Word$zero,
        'U16.zero': U16$zero,
        'Nat.to_u16': Nat$to_u16,
        'Word.adder': Word$adder,
        'Word.add': Word$add,
        'U16.add': U16$add,
        'Cmp.as_eql': Cmp$as_eql,
        'Word.eql': Word$eql,
        'U16.eql': U16$eql,
        'Bits.o': Bits$o,
        'Bits.i': Bits$i,
        'Word.to_bits': Word$to_bits,
        'Word.trim': Word$trim,
        'Bits.concat': Bits$concat,
        'Bits.reverse.tco': Bits$reverse$tco,
        'Bits.reverse': Bits$reverse,
        'Fm.Name.to_bits': Fm$Name$to_bits,
        'Fm.get': Fm$get,
        'String.cons': String$cons,
        'Fm.Synth.file_of': Fm$Synth$file_of,
        'IO.get_file': IO$get_file,
        'Parser': Parser,
        'Parser.Reply': Parser$Reply,
        'Parser.Reply.error': Parser$Reply$error,
        'Parser.bind': Parser$bind,
        'Parser.Reply.value': Parser$Reply$value,
        'Parser.pure': Parser$pure,
        'Parser.monad': Parser$monad,
        'Parser.is_eof': Parser$is_eof,
        'Monad.pure': Monad$pure,
        'Maybe.some': Maybe$some,
        'Parser.ErrorAt.new': Parser$ErrorAt$new,
        'Nat.gtn': Nat$gtn,
        'Parser.ErrorAt.combine': Parser$ErrorAt$combine,
        'Parser.first_of.go': Parser$first_of$go,
        'Parser.first_of': Parser$first_of,
        'List.cons': List$cons,
        'List': List,
        'List.nil': List$nil,
        'Parser.many.go': Parser$many$go,
        'Parser.many': Parser$many,
        'Unit.new': Unit$new,
        'String.concat': String$concat,
        'String.flatten.go': String$flatten$go,
        'String.flatten': String$flatten,
        'String.nil': String$nil,
        'Parser.text.go': Parser$text$go,
        'Parser.text': Parser$text,
        'Parser.until.go': Parser$until$go,
        'Parser.until': Parser$until,
        'Parser.one': Parser$one,
        'Fm.Parser.spaces': Fm$Parser$spaces,
        'Fm.Parser.text': Fm$Parser$text,
        'Parser.many1': Parser$many1,
        'Fm.Name.is_letter': Fm$Name$is_letter,
        'Fm.Parser.letter': Fm$Parser$letter,
        'List.fold': List$fold,
        'Fm.Parser.name1': Fm$Parser$name1,
        'Pair': Pair,
        'Parser.until1': Parser$until1,
        'Parser.maybe': Parser$maybe,
        'Fm.Parser.item': Fm$Parser$item,
        'Fm.Parser.name': Fm$Parser$name,
        'Parser.get_code': Parser$get_code,
        'Parser.get_index': Parser$get_index,
        'Fm.Parser.init': Fm$Parser$init,
        'Fm.Origin.new': Fm$Origin$new,
        'Fm.Parser.stop': Fm$Parser$stop,
        'Fm.Term.ori': Fm$Term$ori,
        'Fm.Term.typ': Fm$Term$typ,
        'Fm.Parser.type': Fm$Parser$type,
        'Fm.Term.all': Fm$Term$all,
        'Fm.Parser.forall': Fm$Parser$forall,
        'Fm.Term.lam': Fm$Term$lam,
        'Fm.Parser.make_lambda': Fm$Parser$make_lambda,
        'Fm.Parser.lambda': Fm$Parser$lambda,
        'Fm.Parser.lambda.erased': Fm$Parser$lambda$erased,
        'Fm.Parser.lambda.nameless': Fm$Parser$lambda$nameless,
        'Fm.Parser.parenthesis': Fm$Parser$parenthesis,
        'Fm.Term.ref': Fm$Term$ref,
        'Fm.Term.app': Fm$Term$app,
        'Fm.Term.hol': Fm$Term$hol,
        'Fm.Term.let': Fm$Term$let,
        'Fm.Parser.letforrange.u32': Fm$Parser$letforrange$u32,
        'Fm.Parser.letforin': Fm$Parser$letforin,
        'Fm.Parser.let': Fm$Parser$let,
        'Fm.Parser.get': Fm$Parser$get,
        'Fm.Term.def': Fm$Term$def,
        'Fm.Parser.def': Fm$Parser$def,
        'Fm.Parser.if': Fm$Parser$if,
        'List.mapped': List$mapped,
        'Pair.new': Pair$new,
        'Fm.backslash': Fm$backslash,
        'Fm.escapes': Fm$escapes,
        'Fm.Parser.char.single': Fm$Parser$char$single,
        'Fm.Term.chr': Fm$Term$chr,
        'Fm.Parser.char': Fm$Parser$char,
        'Fm.Term.str': Fm$Term$str,
        'Fm.Parser.string': Fm$Parser$string,
        'Fm.Parser.pair': Fm$Parser$pair,
        'Fm.Parser.sigma.type': Fm$Parser$sigma$type,
        'Fm.Parser.some': Fm$Parser$some,
        'Fm.Parser.apply': Fm$Parser$apply,
        'Fm.Name.read': Fm$Name$read,
        'Fm.Parser.list': Fm$Parser$list,
        'Fm.Parser.log': Fm$Parser$log,
        'Fm.Parser.forrange.u32': Fm$Parser$forrange$u32,
        'Fm.Parser.forrange.u32.2': Fm$Parser$forrange$u32$2,
        'Fm.Parser.forin': Fm$Parser$forin,
        'Fm.Parser.forin.2': Fm$Parser$forin$2,
        'Fm.Parser.do.statements': Fm$Parser$do$statements,
        'Fm.Parser.do': Fm$Parser$do,
        'Fm.Term.nat': Fm$Term$nat,
        'Fm.Term.unroll_nat': Fm$Term$unroll_nat,
        'U16.to_bits': U16$to_bits,
        'Fm.Term.unroll_chr.bits': Fm$Term$unroll_chr$bits,
        'Fm.Term.unroll_chr': Fm$Term$unroll_chr,
        'Fm.Term.unroll_str': Fm$Term$unroll_str,
        'Fm.Term.reduce': Fm$Term$reduce,
        'Map.new': Map$new,
        'Fm.Def.new': Fm$Def$new,
        'Fm.Status.init': Fm$Status$init,
        'Fm.Parser.case.with': Fm$Parser$case$with,
        'Fm.Parser.case.case': Fm$Parser$case$case,
        'Map.tie': Map$tie,
        'Map.set': Map$set,
        'Map.from_list': Map$from_list,
        'Fm.Term.cse': Fm$Term$cse,
        'Fm.Parser.case': Fm$Parser$case,
        'Fm.Parser.open': Fm$Parser$open,
        'Parser.digit': Parser$digit,
        'Nat.add': Nat$add,
        'Nat.mul': Nat$mul,
        'Nat.from_base.go': Nat$from_base$go,
        'List.reverse.go': List$reverse$go,
        'List.reverse': List$reverse,
        'Nat.from_base': Nat$from_base,
        'Parser.nat': Parser$nat,
        'Bits.tail': Bits$tail,
        'Bits.inc': Bits$inc,
        'Nat.to_bits': Nat$to_bits,
        'Maybe.to_bool': Maybe$to_bool,
        'Fm.Term.gol': Fm$Term$gol,
        'Fm.Parser.goal': Fm$Parser$goal,
        'Fm.Parser.hole': Fm$Parser$hole,
        'Fm.Parser.u8': Fm$Parser$u8,
        'Fm.Parser.u16': Fm$Parser$u16,
        'Fm.Parser.u32': Fm$Parser$u32,
        'Fm.Parser.u64': Fm$Parser$u64,
        'Fm.Parser.nat': Fm$Parser$nat,
        'String.eql': String$eql,
        'Parser.fail': Parser$fail,
        'Fm.Parser.reference': Fm$Parser$reference,
        'List.for': List$for,
        'Fm.Parser.application': Fm$Parser$application,
        'Parser.spaces': Parser$spaces,
        'Parser.spaces_text': Parser$spaces_text,
        'Fm.Parser.application.erased': Fm$Parser$application$erased,
        'Fm.Parser.arrow': Fm$Parser$arrow,
        'Fm.Parser.op': Fm$Parser$op,
        'Fm.Parser.add': Fm$Parser$add,
        'Fm.Parser.sub': Fm$Parser$sub,
        'Fm.Parser.mul': Fm$Parser$mul,
        'Fm.Parser.div': Fm$Parser$div,
        'Fm.Parser.mod': Fm$Parser$mod,
        'Fm.Parser.cons': Fm$Parser$cons,
        'Fm.Parser.concat': Fm$Parser$concat,
        'Fm.Parser.string_concat': Fm$Parser$string_concat,
        'Fm.Parser.sigma': Fm$Parser$sigma,
        'Fm.Parser.equality': Fm$Parser$equality,
        'Fm.Parser.inequality': Fm$Parser$inequality,
        'Fm.Parser.rewrite': Fm$Parser$rewrite,
        'Fm.Term.ann': Fm$Term$ann,
        'Fm.Parser.annotation': Fm$Parser$annotation,
        'Fm.Parser.suffix': Fm$Parser$suffix,
        'Fm.Parser.term': Fm$Parser$term,
        'Fm.Parser.name_term': Fm$Parser$name_term,
        'Fm.Binder.new': Fm$Binder$new,
        'Fm.Parser.binder.homo': Fm$Parser$binder$homo,
        'List.concat': List$concat,
        'List.flatten': List$flatten,
        'Fm.Parser.binder': Fm$Parser$binder,
        'Fm.Parser.make_forall': Fm$Parser$make_forall,
        'List.at': List$at,
        'List.at_last': List$at_last,
        'Fm.Term.var': Fm$Term$var,
        'Pair.snd': Pair$snd,
        'Fm.Name.eql': Fm$Name$eql,
        'Fm.Context.find': Fm$Context$find,
        'List.length': List$length,
        'Fm.Path.o': Fm$Path$o,
        'Fm.Path.i': Fm$Path$i,
        'Fm.Path.to_bits': Fm$Path$to_bits,
        'Fm.Term.bind': Fm$Term$bind,
        'Fm.Status.done': Fm$Status$done,
        'Fm.set': Fm$set,
        'Fm.define': Fm$define,
        'Fm.Parser.file.def': Fm$Parser$file$def,
        'Maybe.default': Maybe$default,
        'Fm.Constructor.new': Fm$Constructor$new,
        'Fm.Parser.constructor': Fm$Parser$constructor,
        'Fm.Datatype.new': Fm$Datatype$new,
        'Fm.Parser.datatype': Fm$Parser$datatype,
        'Fm.Datatype.build_term.motive.go': Fm$Datatype$build_term$motive$go,
        'Fm.Datatype.build_term.motive': Fm$Datatype$build_term$motive,
        'Fm.Datatype.build_term.constructor.go': Fm$Datatype$build_term$constructor$go,
        'Fm.Datatype.build_term.constructor': Fm$Datatype$build_term$constructor,
        'Fm.Datatype.build_term.constructors.go': Fm$Datatype$build_term$constructors$go,
        'Fm.Datatype.build_term.constructors': Fm$Datatype$build_term$constructors,
        'Fm.Datatype.build_term.go': Fm$Datatype$build_term$go,
        'Fm.Datatype.build_term': Fm$Datatype$build_term,
        'Fm.Datatype.build_type.go': Fm$Datatype$build_type$go,
        'Fm.Datatype.build_type': Fm$Datatype$build_type,
        'Fm.Constructor.build_term.opt.go': Fm$Constructor$build_term$opt$go,
        'Fm.Constructor.build_term.opt': Fm$Constructor$build_term$opt,
        'Fm.Constructor.build_term.go': Fm$Constructor$build_term$go,
        'Fm.Constructor.build_term': Fm$Constructor$build_term,
        'Fm.Constructor.build_type.go': Fm$Constructor$build_type$go,
        'Fm.Constructor.build_type': Fm$Constructor$build_type,
        'Fm.Parser.file.adt': Fm$Parser$file$adt,
        'Parser.eof': Parser$eof,
        'Fm.Parser.file.end': Fm$Parser$file$end,
        'Fm.Parser.file': Fm$Parser$file,
        'Either': Either,
        'String.join.go': String$join$go,
        'String.join': String$join,
        'Fm.highlight.end': Fm$highlight$end,
        'Maybe.extract': Maybe$extract,
        'Nat.is_zero': Nat$is_zero,
        'Nat.double': Nat$double,
        'Nat.pred': Nat$pred,
        'List.take': List$take,
        'String.reverse.go': String$reverse$go,
        'String.reverse': String$reverse,
        'String.pad_right': String$pad_right,
        'String.pad_left': String$pad_left,
        'Either.left': Either$left,
        'Either.right': Either$right,
        'Nat.sub_rem': Nat$sub_rem,
        'Nat.div_mod.go': Nat$div_mod$go,
        'Nat.div_mod': Nat$div_mod,
        'Nat.to_base.go': Nat$to_base$go,
        'Nat.to_base': Nat$to_base,
        'Nat.mod.go': Nat$mod$go,
        'Nat.mod': Nat$mod,
        'Nat.lte': Nat$lte,
        'Nat.show_digit': Nat$show_digit,
        'Nat.to_string_base': Nat$to_string_base,
        'Nat.show': Nat$show,
        'Bool.not': Bool$not,
        'Fm.color': Fm$color,
        'Fm.highlight.tc': Fm$highlight$tc,
        'Fm.highlight': Fm$highlight,
        'Fm.Defs.read': Fm$Defs$read,
        'Fm.Synth.load': Fm$Synth$load,
        'IO.print': IO$print,
        'Fm.Status.wait': Fm$Status$wait,
        'Fm.Check': Fm$Check,
        'Fm.Check.result': Fm$Check$result,
        'Fm.Check.bind': Fm$Check$bind,
        'Fm.Check.pure': Fm$Check$pure,
        'Fm.Check.monad': Fm$Check$monad,
        'Fm.Error.undefined_reference': Fm$Error$undefined_reference,
        'Fm.Error.waiting': Fm$Error$waiting,
        'Fm.Error.indirect': Fm$Error$indirect,
        'Maybe.mapped': Maybe$mapped,
        'Fm.MPath.o': Fm$MPath$o,
        'Fm.MPath.i': Fm$MPath$i,
        'Fm.Error.patch': Fm$Error$patch,
        'Fm.MPath.to_bits': Fm$MPath$to_bits,
        'Fm.Error.type_mismatch': Fm$Error$type_mismatch,
        'Fm.Error.show_goal': Fm$Error$show_goal,
        'Fm.Term.normalize': Fm$Term$normalize,
        'List.tail': List$tail,
        'Fm.SmartMotive.vals.cont': Fm$SmartMotive$vals$cont,
        'Fm.SmartMotive.vals': Fm$SmartMotive$vals,
        'Fm.SmartMotive.nams.cont': Fm$SmartMotive$nams$cont,
        'Fm.SmartMotive.nams': Fm$SmartMotive$nams,
        'List.zip': List$zip,
        'Nat.gte': Nat$gte,
        'Nat.sub': Nat$sub,
        'Fm.Term.serialize.name': Fm$Term$serialize$name,
        'Fm.Term.serialize': Fm$Term$serialize,
        'Bits.eql': Bits$eql,
        'Fm.Term.identical': Fm$Term$identical,
        'Fm.SmartMotive.replace': Fm$SmartMotive$replace,
        'Fm.SmartMotive.make': Fm$SmartMotive$make,
        'Fm.Term.desugar_cse.motive': Fm$Term$desugar_cse$motive,
        'String.is_empty': String$is_empty,
        'Fm.Term.desugar_cse.argument': Fm$Term$desugar_cse$argument,
        'Maybe.or': Maybe$or,
        'Fm.Term.desugar_cse.cases': Fm$Term$desugar_cse$cases,
        'Fm.Term.desugar_cse': Fm$Term$desugar_cse,
        'Fm.Error.cant_infer': Fm$Error$cant_infer,
        'Set.has': Set$has,
        'Fm.Term.equal.patch': Fm$Term$equal$patch,
        'Fm.Term.equal.extra_holes': Fm$Term$equal$extra_holes,
        'Set.set': Set$set,
        'Bool.eql': Bool$eql,
        'Fm.Term.equal': Fm$Term$equal,
        'Set.new': Set$new,
        'Fm.Term.check': Fm$Term$check,
        'Fm.Path.nil': Fm$Path$nil,
        'Fm.MPath.nil': Fm$MPath$nil,
        'List.is_empty': List$is_empty,
        'Fm.Term.patch_at': Fm$Term$patch_at,
        'Fm.Synth.fix': Fm$Synth$fix,
        'Fm.Status.fail': Fm$Status$fail,
        'Fm.Synth.one': Fm$Synth$one,
        'Map.values.go': Map$values$go,
        'Map.values': Map$values,
        'Fm.Name.show': Fm$Name$show,
        'Bits.to_nat': Bits$to_nat,
        'U16.show_hex': U16$show_hex,
        'Fm.escape.char': Fm$escape$char,
        'Fm.escape': Fm$escape,
        'Fm.Term.core': Fm$Term$core,
        'Fm.Defs.core': Fm$Defs$core,
        'Fm.to_core.io.one': Fm$to_core$io$one,
        'Maybe.bind': Maybe$bind,
        'Maybe.monad': Maybe$monad,
        'Fm.Term.show.as_nat.go': Fm$Term$show$as_nat$go,
        'Fm.Term.show.as_nat': Fm$Term$show$as_nat,
        'Fm.Term.show.is_ref': Fm$Term$show$is_ref,
        'Nat.eql': Nat$eql,
        'Fm.Term.show.app': Fm$Term$show$app,
        'Map.to_list.go': Map$to_list$go,
        'Map.to_list': Map$to_list,
        'Bits.chunks_of.go': Bits$chunks_of$go,
        'Bits.chunks_of': Bits$chunks_of,
        'Word.from_bits': Word$from_bits,
        'Fm.Name.from_bits': Fm$Name$from_bits,
        'Pair.fst': Pair$fst,
        'Fm.Term.show.go': Fm$Term$show$go,
        'Fm.Term.show': Fm$Term$show,
        'Fm.Error.relevant': Fm$Error$relevant,
        'Fm.Context.show': Fm$Context$show,
        'Fm.Term.expand_at': Fm$Term$expand_at,
        'Bool.or': Bool$or,
        'Fm.Term.expand_ct': Fm$Term$expand_ct,
        'Fm.Term.expand': Fm$Term$expand,
        'Fm.Error.show': Fm$Error$show,
        'Fm.Error.origin': Fm$Error$origin,
        'Fm.Defs.report.go': Fm$Defs$report$go,
        'Fm.Defs.report': Fm$Defs$report,
        'Fm.checker.io.one': Fm$checker$io$one,
        'Map.keys.go': Map$keys$go,
        'Map.keys': Map$keys,
        'Fm.Synth.many': Fm$Synth$many,
        'Fm.Synth.file': Fm$Synth$file,
        'Fm.checker.io.file': Fm$checker$io$file,
        'IO.purify': IO$purify,
        'Fm.checker.code': Fm$checker$code,
        'Fm.Term.read': Fm$Term$read,
        'Fm': Fm,
    };
})();