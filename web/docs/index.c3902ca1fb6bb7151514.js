(self["webpackChunkformality_web"] = self["webpackChunkformality_web"] || []).push([[191],{

/***/ 191:
/***/ ((module) => {

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

    function word_to_u32(w) {
        var u = 0;
        for (var i = 0; i < 32; ++i) {
            u = u | (w._ === 'Word.i' ? 1 << i : 0);
            w = w.pred;
        };
        return u;
    };

    function u32_to_word(u) {
        var w = {
            _: 'Word.e'
        };
        for (var i = 0; i < 32; ++i) {
            w = {
                _: (u >>> (32 - i - 1)) & 1 ? 'Word.i' : 'Word.o',
                pred: w
            };
        };
        return w;
    };

    function u32_for(state, from, til, func) {
        for (var i = from; i < til; ++i) {
            state = func(i)(state);
        }
        return state;
    };

    function word_to_u64(w) {
        var u = 0n;
        for (var i = 0n; i < 64n; i += 1n) {
            u = u | (w._ === 'Word.i' ? 1n << i : 0n);
            w = w.pred;
        };
        return u;
    };

    function u64_to_word(u) {
        var w = {
            _: 'Word.e'
        };
        for (var i = 0n; i < 64n; i += 1n) {
            w = {
                _: (u >> (64n - i - 1n)) & 1n ? 'Word.i' : 'Word.o',
                pred: w
            };
        };
        return w;
    };

    function u32array_to_buffer32(a) {
        function go(a, buffer) {
            switch (a._) {
                case 'Array.tip':
                    buffer.push(a.value);
                    break;
                case 'Array.tie':
                    go(a.lft, buffer);
                    go(a.rgt, buffer);
                    break;
            }
            return buffer;
        };
        return new Uint32Array(go(a, []));
    };

    function buffer32_to_u32array(b) {
        function go(b) {
            if (b.length === 1) {
                return {
                    _: 'Array.tip',
                    value: b[0]
                };
            } else {
                var lft = go(b.slice(0, b.length / 2));
                var rgt = go(b.slice(b.length / 2));
                return {
                    _: 'Array.tie',
                    lft,
                    rgt
                };
            };
        };
        return go(b);
    };

    function buffer32_to_depth(b) {
        return BigInt(Math.log(b.length) / Math.log(2));
    };
    var list_for = list => nil => cons => {
        while (list._ !== 'List.nil') {
            nil = cons(list.head)(nil);
            list = list.tail;
        }
        return nil;
    };
    var list_length = list => {
        var len = 0;
        while (list._ === 'List.cons') {
            len += 1;
            list = list.tail;
        };
        return BigInt(len);
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
    const inst_u32 = x => x(x0 => word_to_u32(x0));
    const elim_u32 = (x => {
        var $20 = (() => c0 => {
            var self = x;
            switch ('u32') {
                case 'u32':
                    var $18 = u32_to_word(self);
                    var $19 = c0($18);
                    return $19;
            };
        })();
        return $20;
    });
    const inst_u64 = x => x(x0 => word_to_u64(x0));
    const elim_u64 = (x => {
        var $23 = (() => c0 => {
            var self = x;
            switch ('u64') {
                case 'u64':
                    var $21 = u64_to_word(self);
                    var $22 = c0($21);
                    return $22;
            };
        })();
        return $23;
    });
    const inst_string = x => x('')(x0 => x1 => (String.fromCharCode(x0) + x1));
    const elim_string = (x => {
        var $28 = (() => c0 => c1 => {
            var self = x;
            if (self.length === 0) {
                var $24 = c2;
                return $24;
            } else {
                var $25 = self.charCodeAt(0);
                var $26 = self.slice(1);
                var $27 = c2($25)($26);
                return $27;
            };
        })();
        return $28;
    });
    const inst_buffer32 = x => x(x0 => x1 => u32array_to_buffer32(x1));
    const elim_buffer32 = (x => {
        var $32 = (() => c0 => {
            var self = x;
            switch ('b32') {
                case 'b32':
                    var $29 = buffer32_to_depth(self);
                    var $30 = buffer32_to_u32array(self);
                    var $31 = c0($29)($30);
                    return $31;
            };
        })();
        return $32;
    });

    function Buffer32$new$(_depth$1, _array$2) {
        var $33 = u32array_to_buffer32(_array$2);
        return $33;
    };
    const Buffer32$new = x0 => x1 => Buffer32$new$(x0, x1);

    function Array$(_A$1, _depth$2) {
        var $34 = null;
        return $34;
    };
    const Array = x0 => x1 => Array$(x0, x1);

    function Array$tip$(_value$2) {
        var $35 = ({
            _: 'Array.tip',
            'value': _value$2
        });
        return $35;
    };
    const Array$tip = x0 => Array$tip$(x0);

    function Array$tie$(_lft$3, _rgt$4) {
        var $36 = ({
            _: 'Array.tie',
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $36;
    };
    const Array$tie = x0 => x1 => Array$tie$(x0, x1);

    function Array$alloc$(_depth$2, _x$3) {
        var self = _depth$2;
        if (self === 0n) {
            var $38 = Array$tip$(_x$3);
            var $37 = $38;
        } else {
            var $39 = (self - 1n);
            var _half$5 = Array$alloc$($39, _x$3);
            var $40 = Array$tie$(_half$5, _half$5);
            var $37 = $40;
        };
        return $37;
    };
    const Array$alloc = x0 => x1 => Array$alloc$(x0, x1);

    function U32$new$(_value$1) {
        var $41 = word_to_u32(_value$1);
        return $41;
    };
    const U32$new = x0 => U32$new$(x0);

    function Word$(_size$1) {
        var $42 = null;
        return $42;
    };
    const Word = x0 => Word$(x0);
    const Word$e = ({
        _: 'Word.e'
    });

    function Word$o$(_pred$2) {
        var $43 = ({
            _: 'Word.o',
            'pred': _pred$2
        });
        return $43;
    };
    const Word$o = x0 => Word$o$(x0);

    function Word$zero$(_size$1) {
        var self = _size$1;
        if (self === 0n) {
            var $45 = Word$e;
            var $44 = $45;
        } else {
            var $46 = (self - 1n);
            var $47 = Word$o$(Word$zero$($46));
            var $44 = $47;
        };
        return $44;
    };
    const Word$zero = x0 => Word$zero$(x0);
    const U32$zero = U32$new$(Word$zero$(32n));
    const Buffer32$alloc = a0 => (new Uint32Array(2 ** Number(a0)));
    const Bool$false = false;
    const Bool$true = true;

    function Cmp$as_eql$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $49 = Bool$false;
                var $48 = $49;
                break;
            case 'Cmp.eql':
                var $50 = Bool$true;
                var $48 = $50;
                break;
            case 'Cmp.gtn':
                var $51 = Bool$false;
                var $48 = $51;
                break;
        };
        return $48;
    };
    const Cmp$as_eql = x0 => Cmp$as_eql$(x0);
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
                var $53 = (_b$5 => {
                    var $54 = _c$4;
                    return $54;
                });
                var $52 = $53;
                break;
            case 'Word.o':
                var $55 = self.pred;
                var $56 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $58 = (_a$pred$8 => {
                                var $59 = _c$4;
                                return $59;
                            });
                            var $57 = $58;
                            break;
                        case 'Word.o':
                            var $60 = self.pred;
                            var $61 = (_a$pred$10 => {
                                var $62 = Word$cmp$go$(_a$pred$10, $60, _c$4);
                                return $62;
                            });
                            var $57 = $61;
                            break;
                        case 'Word.i':
                            var $63 = self.pred;
                            var $64 = (_a$pred$10 => {
                                var $65 = Word$cmp$go$(_a$pred$10, $63, Cmp$ltn);
                                return $65;
                            });
                            var $57 = $64;
                            break;
                    };
                    var $57 = $57($55);
                    return $57;
                });
                var $52 = $56;
                break;
            case 'Word.i':
                var $66 = self.pred;
                var $67 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $69 = (_a$pred$8 => {
                                var $70 = _c$4;
                                return $70;
                            });
                            var $68 = $69;
                            break;
                        case 'Word.o':
                            var $71 = self.pred;
                            var $72 = (_a$pred$10 => {
                                var $73 = Word$cmp$go$(_a$pred$10, $71, Cmp$gtn);
                                return $73;
                            });
                            var $68 = $72;
                            break;
                        case 'Word.i':
                            var $74 = self.pred;
                            var $75 = (_a$pred$10 => {
                                var $76 = Word$cmp$go$(_a$pred$10, $74, _c$4);
                                return $76;
                            });
                            var $68 = $75;
                            break;
                    };
                    var $68 = $68($66);
                    return $68;
                });
                var $52 = $67;
                break;
        };
        var $52 = $52(_b$3);
        return $52;
    };
    const Word$cmp$go = x0 => x1 => x2 => Word$cmp$go$(x0, x1, x2);
    const Cmp$eql = ({
        _: 'Cmp.eql'
    });

    function Word$cmp$(_a$2, _b$3) {
        var $77 = Word$cmp$go$(_a$2, _b$3, Cmp$eql);
        return $77;
    };
    const Word$cmp = x0 => x1 => Word$cmp$(x0, x1);

    function Word$eql$(_a$2, _b$3) {
        var $78 = Cmp$as_eql$(Word$cmp$(_a$2, _b$3));
        return $78;
    };
    const Word$eql = x0 => x1 => Word$eql$(x0, x1);

    function Nat$succ$(_pred$1) {
        var $79 = 1n + _pred$1;
        return $79;
    };
    const Nat$succ = x0 => Nat$succ$(x0);
    const Nat$zero = 0n;
    const U32$eql = a0 => a1 => (a0 === a1);

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
                    var $80 = _x$4;
                    return $80;
                } else {
                    var $81 = (self - 1n);
                    var $82 = Nat$apply$($81, _f$3, _f$3(_x$4));
                    return $82;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$apply = x0 => x1 => x2 => Nat$apply$(x0, x1, x2);

    function Word$i$(_pred$2) {
        var $83 = ({
            _: 'Word.i',
            'pred': _pred$2
        });
        return $83;
    };
    const Word$i = x0 => Word$i$(x0);

    function Word$inc$(_word$2) {
        var self = _word$2;
        switch (self._) {
            case 'Word.e':
                var $85 = Word$e;
                var $84 = $85;
                break;
            case 'Word.o':
                var $86 = self.pred;
                var $87 = Word$i$($86);
                var $84 = $87;
                break;
            case 'Word.i':
                var $88 = self.pred;
                var $89 = Word$o$(Word$inc$($88));
                var $84 = $89;
                break;
        };
        return $84;
    };
    const Word$inc = x0 => Word$inc$(x0);

    function U32$inc$(_a$1) {
        var self = _a$1;
        switch ('u32') {
            case 'u32':
                var $91 = u32_to_word(self);
                var $92 = U32$new$(Word$inc$($91));
                var $90 = $92;
                break;
        };
        return $90;
    };
    const U32$inc = x0 => U32$inc$(x0);
    const Nat$to_u32 = a0 => (Number(a0));
    const U32$shr = a0 => a1 => (a0 >>> a1);

    function U32$needed_depth$go$(_n$1) {
        var self = (_n$1 === 0);
        if (self) {
            var $94 = 0n;
            var $93 = $94;
        } else {
            var $95 = Nat$succ$(U32$needed_depth$go$((_n$1 >>> 1)));
            var $93 = $95;
        };
        return $93;
    };
    const U32$needed_depth$go = x0 => U32$needed_depth$go$(x0);

    function Word$subber$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $97 = (_b$5 => {
                    var $98 = Word$e;
                    return $98;
                });
                var $96 = $97;
                break;
            case 'Word.o':
                var $99 = self.pred;
                var $100 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $102 = (_a$pred$8 => {
                                var $103 = Word$e;
                                return $103;
                            });
                            var $101 = $102;
                            break;
                        case 'Word.o':
                            var $104 = self.pred;
                            var $105 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $107 = Word$i$(Word$subber$(_a$pred$10, $104, Bool$true));
                                    var $106 = $107;
                                } else {
                                    var $108 = Word$o$(Word$subber$(_a$pred$10, $104, Bool$false));
                                    var $106 = $108;
                                };
                                return $106;
                            });
                            var $101 = $105;
                            break;
                        case 'Word.i':
                            var $109 = self.pred;
                            var $110 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $112 = Word$o$(Word$subber$(_a$pred$10, $109, Bool$true));
                                    var $111 = $112;
                                } else {
                                    var $113 = Word$i$(Word$subber$(_a$pred$10, $109, Bool$true));
                                    var $111 = $113;
                                };
                                return $111;
                            });
                            var $101 = $110;
                            break;
                    };
                    var $101 = $101($99);
                    return $101;
                });
                var $96 = $100;
                break;
            case 'Word.i':
                var $114 = self.pred;
                var $115 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $117 = (_a$pred$8 => {
                                var $118 = Word$e;
                                return $118;
                            });
                            var $116 = $117;
                            break;
                        case 'Word.o':
                            var $119 = self.pred;
                            var $120 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $122 = Word$o$(Word$subber$(_a$pred$10, $119, Bool$false));
                                    var $121 = $122;
                                } else {
                                    var $123 = Word$i$(Word$subber$(_a$pred$10, $119, Bool$false));
                                    var $121 = $123;
                                };
                                return $121;
                            });
                            var $116 = $120;
                            break;
                        case 'Word.i':
                            var $124 = self.pred;
                            var $125 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $127 = Word$i$(Word$subber$(_a$pred$10, $124, Bool$true));
                                    var $126 = $127;
                                } else {
                                    var $128 = Word$o$(Word$subber$(_a$pred$10, $124, Bool$false));
                                    var $126 = $128;
                                };
                                return $126;
                            });
                            var $116 = $125;
                            break;
                    };
                    var $116 = $116($114);
                    return $116;
                });
                var $96 = $115;
                break;
        };
        var $96 = $96(_b$3);
        return $96;
    };
    const Word$subber = x0 => x1 => x2 => Word$subber$(x0, x1, x2);

    function Word$sub$(_a$2, _b$3) {
        var $129 = Word$subber$(_a$2, _b$3, Bool$false);
        return $129;
    };
    const Word$sub = x0 => x1 => Word$sub$(x0, x1);
    const U32$sub = a0 => a1 => (Math.max(a0 - a1, 0));

    function U32$needed_depth$(_size$1) {
        var $130 = U32$needed_depth$go$((Math.max(_size$1 - 1, 0)));
        return $130;
    };
    const U32$needed_depth = x0 => U32$needed_depth$(x0);

    function Word$mul$(_a$2, _b$3) {
        var Word$mul$ = (_a$2, _b$3) => ({
            ctr: 'TCO',
            arg: [_a$2, _b$3]
        });
        var Word$mul = _a$2 => _b$3 => Word$mul$(_a$2, _b$3);
        var arg = [_a$2, _b$3];
        while (true) {
            let [_a$2, _b$3] = arg;
            var R = Word$mul$(_a$2, _b$3);
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Word$mul = x0 => x1 => Word$mul$(x0, x1);
    const U32$mul = a0 => a1 => ((a0 * a1) >>> 0);

    function Image3D$new$(_length$1, _capacity$2, _buffer$3) {
        var $131 = ({
            _: 'Image3D.new',
            'length': _length$1,
            'capacity': _capacity$2,
            'buffer': _buffer$3
        });
        return $131;
    };
    const Image3D$new = x0 => x1 => x2 => Image3D$new$(x0, x1, x2);

    function Image3D$alloc_capacity$(_capacity$1) {
        var _buffer$2 = (new Uint32Array(2 ** Number(U32$needed_depth$(((2 * _capacity$1) >>> 0)))));
        var $132 = Image3D$new$(0, _capacity$1, _buffer$2);
        return $132;
    };
    const Image3D$alloc_capacity = x0 => Image3D$alloc_capacity$(x0);
    const Map$new = ({
        _: 'Map.new'
    });

    function Word$adder$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $134 = (_b$5 => {
                    var $135 = Word$e;
                    return $135;
                });
                var $133 = $134;
                break;
            case 'Word.o':
                var $136 = self.pred;
                var $137 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $139 = (_a$pred$8 => {
                                var $140 = Word$e;
                                return $140;
                            });
                            var $138 = $139;
                            break;
                        case 'Word.o':
                            var $141 = self.pred;
                            var $142 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $144 = Word$i$(Word$adder$(_a$pred$10, $141, Bool$false));
                                    var $143 = $144;
                                } else {
                                    var $145 = Word$o$(Word$adder$(_a$pred$10, $141, Bool$false));
                                    var $143 = $145;
                                };
                                return $143;
                            });
                            var $138 = $142;
                            break;
                        case 'Word.i':
                            var $146 = self.pred;
                            var $147 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $149 = Word$o$(Word$adder$(_a$pred$10, $146, Bool$true));
                                    var $148 = $149;
                                } else {
                                    var $150 = Word$i$(Word$adder$(_a$pred$10, $146, Bool$false));
                                    var $148 = $150;
                                };
                                return $148;
                            });
                            var $138 = $147;
                            break;
                    };
                    var $138 = $138($136);
                    return $138;
                });
                var $133 = $137;
                break;
            case 'Word.i':
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
                                    var $159 = Word$o$(Word$adder$(_a$pred$10, $156, Bool$true));
                                    var $158 = $159;
                                } else {
                                    var $160 = Word$i$(Word$adder$(_a$pred$10, $156, Bool$false));
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
                                    var $164 = Word$i$(Word$adder$(_a$pred$10, $161, Bool$true));
                                    var $163 = $164;
                                } else {
                                    var $165 = Word$o$(Word$adder$(_a$pred$10, $161, Bool$true));
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
                var $133 = $152;
                break;
        };
        var $133 = $133(_b$3);
        return $133;
    };
    const Word$adder = x0 => x1 => x2 => Word$adder$(x0, x1, x2);

    function Word$add$(_a$2, _b$3) {
        var $166 = Word$adder$(_a$2, _b$3, Bool$false);
        return $166;
    };
    const Word$add = x0 => x1 => Word$add$(x0, x1);
    const U32$add = a0 => a1 => ((a0 + a1) >>> 0);

    function List$ifor_u32$(_xs$2, _b$4, _f$5) {
        var List$ifor_u32$ = (_xs$2, _b$4, _f$5) => ({
            ctr: 'TCO',
            arg: [_xs$2, _b$4, _f$5]
        });
        var List$ifor_u32 = _xs$2 => _b$4 => _f$5 => List$ifor_u32$(_xs$2, _b$4, _f$5);
        var arg = [_xs$2, _b$4, _f$5];
        while (true) {
            let [_xs$2, _b$4, _f$5] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        var $167 = _b$4;
                        return $167;
                    case 'List.cons':
                        var $168 = self.head;
                        var $169 = self.tail;
                        var $170 = List$ifor_u32$($169, _f$5(0)($168)(_b$4), (_n$8 => {
                            var $171 = _f$5(((_n$8 + 1) >>> 0));
                            return $171;
                        }));
                        return $170;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$ifor_u32 = x0 => x1 => x2 => List$ifor_u32$(x0, x1, x2);

    function List$(_A$1) {
        var $172 = null;
        return $172;
    };
    const List = x0 => List$(x0);

    function Map$(_A$1) {
        var $173 = null;
        return $173;
    };
    const Map = x0 => Map$(x0);
    const Mons$Map$new = Map$new;

    function List$length_u32_go$(_xs$2, _n$3) {
        var List$length_u32_go$ = (_xs$2, _n$3) => ({
            ctr: 'TCO',
            arg: [_xs$2, _n$3]
        });
        var List$length_u32_go = _xs$2 => _n$3 => List$length_u32_go$(_xs$2, _n$3);
        var arg = [_xs$2, _n$3];
        while (true) {
            let [_xs$2, _n$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        var $174 = _n$3;
                        return $174;
                    case 'List.cons':
                        var $175 = self.head;
                        var $176 = self.tail;
                        var $177 = List$length_u32_go$($176, ((1 + _n$3) >>> 0));
                        return $177;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$length_u32_go = x0 => x1 => List$length_u32_go$(x0, x1);

    function List$length_u32$(_xs$2) {
        var $178 = List$length_u32_go$(_xs$2, 0);
        return $178;
    };
    const List$length_u32 = x0 => List$length_u32$(x0);
    const U32$for = a0 => a1 => a2 => a3 => (u32_for(a0, a1, a2, a3));

    function Word$div$(_a$2, _b$3) {
        var Word$div$ = (_a$2, _b$3) => ({
            ctr: 'TCO',
            arg: [_a$2, _b$3]
        });
        var Word$div = _a$2 => _b$3 => Word$div$(_a$2, _b$3);
        var arg = [_a$2, _b$3];
        while (true) {
            let [_a$2, _b$3] = arg;
            var R = Word$div$(_a$2, _b$3);
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Word$div = x0 => x1 => Word$div$(x0, x1);
    const U32$div = a0 => a1 => ((a0 / a1) >>> 0);

    function Word$or$(_a$2, _b$3) {
        var Word$or$ = (_a$2, _b$3) => ({
            ctr: 'TCO',
            arg: [_a$2, _b$3]
        });
        var Word$or = _a$2 => _b$3 => Word$or$(_a$2, _b$3);
        var arg = [_a$2, _b$3];
        while (true) {
            let [_a$2, _b$3] = arg;
            var R = Word$or$(_a$2, _b$3);
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Word$or = x0 => x1 => Word$or$(x0, x1);
    const U32$or = a0 => a1 => (a0 | a1);
    const U32$shl = a0 => a1 => (a0 << a1);
    const Pos32$new = a0 => a1 => a2 => ((0 | a0 | (a1 << 12) | (a2 << 24)));

    function Word$fold$(_nil$3, _w0$4, _w1$5, _word$6) {
        var self = _word$6;
        switch (self._) {
            case 'Word.e':
                var $180 = _nil$3;
                var $179 = $180;
                break;
            case 'Word.o':
                var $181 = self.pred;
                var $182 = _w0$4(Word$fold$(_nil$3, _w0$4, _w1$5, $181));
                var $179 = $182;
                break;
            case 'Word.i':
                var $183 = self.pred;
                var $184 = _w1$5(Word$fold$(_nil$3, _w0$4, _w1$5, $183));
                var $179 = $184;
                break;
        };
        return $179;
    };
    const Word$fold = x0 => x1 => x2 => x3 => Word$fold$(x0, x1, x2, x3);
    const Nat$add = a0 => a1 => (a0 + a1);
    const Nat$mul = a0 => a1 => (a0 * a1);

    function Word$to_nat$(_word$2) {
        var $185 = Word$fold$(0n, a1 => (2n * a1), (_x$4 => {
            var $186 = Nat$succ$((2n * _x$4));
            return $186;
        }), _word$2);
        return $185;
    };
    const Word$to_nat = x0 => Word$to_nat$(x0);

    function U32$to_nat$(_a$1) {
        var self = _a$1;
        switch ('u32') {
            case 'u32':
                var $188 = u32_to_word(self);
                var $189 = Word$to_nat$($188);
                var $187 = $189;
                break;
        };
        return $187;
    };
    const U32$to_nat = x0 => U32$to_nat$(x0);
    const String$nil = '';

    function String$cons$(_head$1, _tail$2) {
        var $190 = (String.fromCharCode(_head$1) + _tail$2);
        return $190;
    };
    const String$cons = x0 => x1 => String$cons$(x0, x1);

    function String$take$(_n$1, _xs$2) {
        var self = _xs$2;
        if (self.length === 0) {
            var $192 = String$nil;
            var $191 = $192;
        } else {
            var $193 = self.charCodeAt(0);
            var $194 = self.slice(1);
            var self = _n$1;
            if (self === 0n) {
                var $196 = String$nil;
                var $195 = $196;
            } else {
                var $197 = (self - 1n);
                var $198 = String$cons$($193, String$take$($197, $194));
                var $195 = $198;
            };
            var $191 = $195;
        };
        return $191;
    };
    const String$take = x0 => x1 => String$take$(x0, x1);
    const Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);

    function String$drop$(_n$1, _xs$2) {
        var String$drop$ = (_n$1, _xs$2) => ({
            ctr: 'TCO',
            arg: [_n$1, _xs$2]
        });
        var String$drop = _n$1 => _xs$2 => String$drop$(_n$1, _xs$2);
        var arg = [_n$1, _xs$2];
        while (true) {
            let [_n$1, _xs$2] = arg;
            var R = (() => {
                var self = _n$1;
                if (self === 0n) {
                    var $199 = _xs$2;
                    return $199;
                } else {
                    var $200 = (self - 1n);
                    var self = _xs$2;
                    if (self.length === 0) {
                        var $202 = String$nil;
                        var $201 = $202;
                    } else {
                        var $203 = self.charCodeAt(0);
                        var $204 = self.slice(1);
                        var $205 = String$drop$($200, $204);
                        var $201 = $205;
                    };
                    return $201;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$drop = x0 => x1 => String$drop$(x0, x1);

    function String$slice$(_i$1, _j$2, _xs$3) {
        var $206 = String$take$((_j$2 - _i$1 <= 0n ? 0n : _j$2 - _i$1), String$drop$(_i$1, _xs$3));
        return $206;
    };
    const String$slice = x0 => x1 => x2 => String$slice$(x0, x1, x2);

    function Map$tie$(_val$2, _lft$3, _rgt$4) {
        var $207 = ({
            _: 'Map.tie',
            'val': _val$2,
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $207;
    };
    const Map$tie = x0 => x1 => x2 => Map$tie$(x0, x1, x2);

    function Maybe$some$(_value$2) {
        var $208 = ({
            _: 'Maybe.some',
            'value': _value$2
        });
        return $208;
    };
    const Maybe$some = x0 => Maybe$some$(x0);
    const Maybe$none = ({
        _: 'Maybe.none'
    });

    function Map$set$(_bits$2, _val$3, _map$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $211 = Map$tie$(Maybe$some$(_val$3), Map$new, Map$new);
                        var $210 = $211;
                        break;
                    case 'Map.tie':
                        var $212 = self.val;
                        var $213 = self.lft;
                        var $214 = self.rgt;
                        var $215 = Map$tie$(Maybe$some$(_val$3), $213, $214);
                        var $210 = $215;
                        break;
                };
                var $209 = $210;
                break;
            case 'o':
                var $216 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $218 = Map$tie$(Maybe$none, Map$set$($216, _val$3, Map$new), Map$new);
                        var $217 = $218;
                        break;
                    case 'Map.tie':
                        var $219 = self.val;
                        var $220 = self.lft;
                        var $221 = self.rgt;
                        var $222 = Map$tie$($219, Map$set$($216, _val$3, $220), $221);
                        var $217 = $222;
                        break;
                };
                var $209 = $217;
                break;
            case 'i':
                var $223 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $225 = Map$tie$(Maybe$none, Map$new, Map$set$($223, _val$3, Map$new));
                        var $224 = $225;
                        break;
                    case 'Map.tie':
                        var $226 = self.val;
                        var $227 = self.lft;
                        var $228 = self.rgt;
                        var $229 = Map$tie$($226, $227, Map$set$($223, _val$3, $228));
                        var $224 = $229;
                        break;
                };
                var $209 = $224;
                break;
        };
        return $209;
    };
    const Map$set = x0 => x1 => x2 => Map$set$(x0, x1, x2);
    const Bits$e = '';
    const Bits$o = a0 => (a0 + '0');
    const Bits$i = a0 => (a0 + '1');

    function Word$to_bits$(_a$2) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $231 = Bits$e;
                var $230 = $231;
                break;
            case 'Word.o':
                var $232 = self.pred;
                var $233 = (Word$to_bits$($232) + '0');
                var $230 = $233;
                break;
            case 'Word.i':
                var $234 = self.pred;
                var $235 = (Word$to_bits$($234) + '1');
                var $230 = $235;
                break;
        };
        return $230;
    };
    const Word$to_bits = x0 => Word$to_bits$(x0);

    function U32$to_bits$(_a$1) {
        var self = _a$1;
        switch ('u32') {
            case 'u32':
                var $237 = u32_to_word(self);
                var $238 = Word$to_bits$($237);
                var $236 = $238;
                break;
        };
        return $236;
    };
    const U32$to_bits = x0 => U32$to_bits$(x0);

    function Mons$Map$set_list$(_pos$1, _objs$2, _map$3) {
        var $239 = Map$set$(U32$to_bits$(_pos$1), _objs$2, _map$3);
        return $239;
    };
    const Mons$Map$set_list = x0 => x1 => x2 => Mons$Map$set_list$(x0, x1, x2);

    function Mons$Object$new$(_kin$1, _dir$2, _pad$3, _ani$4, _dmg$5, _bag$6, _mon$7, _bos$8, _cap$9, _idl$10, _eff$11) {
        var $240 = ({
            _: 'Mons.Object.new',
            'kin': _kin$1,
            'dir': _dir$2,
            'pad': _pad$3,
            'ani': _ani$4,
            'dmg': _dmg$5,
            'bag': _bag$6,
            'mon': _mon$7,
            'bos': _bos$8,
            'cap': _cap$9,
            'idl': _idl$10,
            'eff': _eff$11
        });
        return $240;
    };
    const Mons$Object$new = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => x8 => x9 => x10 => Mons$Object$new$(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10);
    const Mons$Dir$down = ({
        _: 'Mons.Dir.down'
    });

    function Mons$Pad$new$(_r$1, _u$2, _l$3, _d$4) {
        var $241 = ({
            _: 'Mons.Pad.new',
            'r': _r$1,
            'u': _u$2,
            'l': _l$3,
            'd': _d$4
        });
        return $241;
    };
    const Mons$Pad$new = x0 => x1 => x2 => x3 => Mons$Pad$new$(x0, x1, x2, x3);
    const Mons$Pad$null = Mons$Pad$new$(Bool$false, Bool$false, Bool$false, Bool$false);
    const List$nil = ({
        _: 'List.nil'
    });

    function Pair$new$(_fst$3, _snd$4) {
        var $242 = ({
            _: 'Pair.new',
            'fst': _fst$3,
            'snd': _snd$4
        });
        return $242;
    };
    const Pair$new = x0 => x1 => Pair$new$(x0, x1);

    function Mons$Effect$new$(_sleep$1, _burn$2, _protect$3, _minimize$4, _invulnerable$5, _hit$6, _poison$7, _swap_agi$8) {
        var $243 = ({
            _: 'Mons.Effect.new',
            'sleep': _sleep$1,
            'burn': _burn$2,
            'protect': _protect$3,
            'minimize': _minimize$4,
            'invulnerable': _invulnerable$5,
            'hit': _hit$6,
            'poison': _poison$7,
            'swap_agi': _swap_agi$8
        });
        return $243;
    };
    const Mons$Effect$new = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Mons$Effect$new$(x0, x1, x2, x3, x4, x5, x6, x7);
    const Mons$Effect$clear = (() => {
        var _clean$1 = Pair$new$(0, Bool$false);
        var _clean_bool$2 = Pair$new$(Bool$false, Bool$false);
        var $244 = Mons$Effect$new$(_clean$1, 0, _clean$1, _clean$1, _clean_bool$2, 0, Bool$false, Bool$false);
        return $244;
    })();

    function Mons$Object$new_of_kind$(_kin$1) {
        var $245 = Mons$Object$new$(_kin$1, Mons$Dir$down, Mons$Pad$null, 0, 0, List$nil, 0, List$nil, Pair$new$(11, List$nil), 0, Mons$Effect$clear);
        return $245;
    };
    const Mons$Object$new_of_kind = x0 => Mons$Object$new_of_kind$(x0);

    function Mons$Kind$Terrain$(_ele$1) {
        var $246 = ({
            _: 'Mons.Kind.Terrain',
            'ele': _ele$1
        });
        return $246;
    };
    const Mons$Kind$Terrain = x0 => Mons$Kind$Terrain$(x0);

    function Mons$Kind$new_terrain$(_kin$1) {
        var $247 = Mons$Object$new_of_kind$(Mons$Kind$Terrain$(_kin$1));
        return $247;
    };
    const Mons$Kind$new_terrain = x0 => Mons$Kind$new_terrain$(x0);

    function Mons$Kind$terrain$FLOOR$(_lvl$1, _model$2) {
        var $248 = ({
            _: 'Mons.Kind.terrain.FLOOR',
            'lvl': _lvl$1,
            'model': _model$2
        });
        return $248;
    };
    const Mons$Kind$terrain$FLOOR = x0 => x1 => Mons$Kind$terrain$FLOOR$(x0, x1);

    function Mons$Kind$terrain$PATH_BLOCKER$(_lvl$1, _model$2) {
        var $249 = ({
            _: 'Mons.Kind.terrain.PATH_BLOCKER',
            'lvl': _lvl$1,
            'model': _model$2
        });
        return $249;
    };
    const Mons$Kind$terrain$PATH_BLOCKER = x0 => x1 => Mons$Kind$terrain$PATH_BLOCKER$(x0, x1);
    const Bool$and = a0 => a1 => (a0 && a1);
    const U16$eql = a0 => a1 => (a0 === a1);
    const String$eql = a0 => a1 => (a0 === a1);

    function Mons$Map$code_to_tile$aux$(_code$1, _cond$2) {
        var Mons$Map$code_to_tile$aux$ = (_code$1, _cond$2) => ({
            ctr: 'TCO',
            arg: [_code$1, _cond$2]
        });
        var Mons$Map$code_to_tile$aux = _code$1 => _cond$2 => Mons$Map$code_to_tile$aux$(_code$1, _cond$2);
        var arg = [_code$1, _cond$2];
        while (true) {
            let [_code$1, _cond$2] = arg;
            var R = (() => {
                var self = _cond$2;
                switch (self._) {
                    case 'List.nil':
                        var $250 = List$nil;
                        return $250;
                    case 'List.cons':
                        var $251 = self.head;
                        var $252 = self.tail;
                        var self = $251;
                        switch (self._) {
                            case 'Pair.new':
                                var $254 = self.fst;
                                var $255 = self.snd;
                                var self = (_code$1 === $254);
                                if (self) {
                                    var $257 = $255;
                                    var $256 = $257;
                                } else {
                                    var $258 = Mons$Map$code_to_tile$aux$(_code$1, $252);
                                    var $256 = $258;
                                };
                                var $253 = $256;
                                break;
                        };
                        return $253;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Mons$Map$code_to_tile$aux = x0 => x1 => Mons$Map$code_to_tile$aux$(x0, x1);

    function List$cons$(_head$2, _tail$3) {
        var $259 = ({
            _: 'List.cons',
            'head': _head$2,
            'tail': _tail$3
        });
        return $259;
    };
    const List$cons = x0 => x1 => List$cons$(x0, x1);

    function Pair$(_A$1, _B$2) {
        var $260 = null;
        return $260;
    };
    const Pair = x0 => x1 => Pair$(x0, x1);

    function Mons$Kind$Mons$(_ele$1, _boss$2, _pri_type$3, _agi$4) {
        var $261 = ({
            _: 'Mons.Kind.Mons',
            'ele': _ele$1,
            'boss': _boss$2,
            'pri_type': _pri_type$3,
            'agi': _agi$4
        });
        return $261;
    };
    const Mons$Kind$Mons = x0 => x1 => x2 => x3 => Mons$Kind$Mons$(x0, x1, x2, x3);

    function Mons$Kind$new_mons$(_kin$1, _type$2, _agi$3) {
        var $262 = List$cons$(Mons$Object$new_of_kind$(Mons$Kind$Mons$(_kin$1, Bool$false, _type$2, _agi$3)), List$nil);
        return $262;
    };
    const Mons$Kind$new_mons = x0 => x1 => x2 => Mons$Kind$new_mons$(x0, x1, x2);
    const Mons$Kind$mons$MAGE = ({
        _: 'Mons.Kind.mons.MAGE'
    });
    const Mons$Type$normal = ({
        _: 'Mons.Type.normal'
    });

    function Mons$Kind$Const$(_ele$1) {
        var $263 = ({
            _: 'Mons.Kind.Const',
            'ele': _ele$1
        });
        return $263;
    };
    const Mons$Kind$Const = x0 => Mons$Kind$Const$(x0);

    function Mons$Kind$new_const$(_kin$1) {
        var $264 = Mons$Object$new_of_kind$(Mons$Kind$Const$(_kin$1));
        return $264;
    };
    const Mons$Kind$new_const = x0 => Mons$Kind$new_const$(x0);
    const Mons$Kind$const$CRYSTAL = ({
        _: 'Mons.Kind.const.CRYSTAL'
    });

    function Mons$Kind$const$FOUNTAIN$(_model$1, _slice$2) {
        var $265 = ({
            _: 'Mons.Kind.const.FOUNTAIN',
            'model': _model$1,
            'slice': _slice$2
        });
        return $265;
    };
    const Mons$Kind$const$FOUNTAIN = x0 => x1 => Mons$Kind$const$FOUNTAIN$(x0, x1);
    const Mons$Kind$const$PORTAL = ({
        _: 'Mons.Kind.const.PORTAL'
    });
    const Mons$Kind$terrain$VOID_BLACK = ({
        _: 'Mons.Kind.terrain.VOID_BLACK'
    });

    function Mons$Kind$terrain$MID_CITY$(_row$1, _column$2) {
        var $266 = ({
            _: 'Mons.Kind.terrain.MID_CITY',
            'row': _row$1,
            'column': _column$2
        });
        return $266;
    };
    const Mons$Kind$terrain$MID_CITY = x0 => x1 => Mons$Kind$terrain$MID_CITY$(x0, x1);

    function Mons$Kind$terrain$STAIRS$(_row$1, _column$2) {
        var $267 = ({
            _: 'Mons.Kind.terrain.STAIRS',
            'row': _row$1,
            'column': _column$2
        });
        return $267;
    };
    const Mons$Kind$terrain$STAIRS = x0 => x1 => Mons$Kind$terrain$STAIRS$(x0, x1);

    function Mons$Kind$Interactive$(_ele$1, _on$2, _eff$3) {
        var $268 = ({
            _: 'Mons.Kind.Interactive',
            'ele': _ele$1,
            'on': _on$2,
            'eff': _eff$3
        });
        return $268;
    };
    const Mons$Kind$Interactive = x0 => x1 => x2 => Mons$Kind$Interactive$(x0, x1, x2);

    function Mons$Kind$new_interactive_tool$(_kin$1, _stt$2, _fun$3) {
        var $269 = Mons$Object$new_of_kind$(Mons$Kind$Interactive$(_kin$1, _stt$2, _fun$3));
        return $269;
    };
    const Mons$Kind$new_interactive_tool = x0 => x1 => x2 => Mons$Kind$new_interactive_tool$(x0, x1, x2);
    const Mons$Kind$inter$HEAL = ({
        _: 'Mons.Kind.inter.HEAL'
    });

    function Maybe$(_A$1) {
        var $270 = null;
        return $270;
    };
    const Maybe = x0 => Maybe$(x0);

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
                                var $272 = Maybe$none;
                                var $271 = $272;
                                break;
                            case 'Map.tie':
                                var $273 = self.val;
                                var $274 = self.lft;
                                var $275 = self.rgt;
                                var $276 = $273;
                                var $271 = $276;
                                break;
                        };
                        return $271;
                    case 'o':
                        var $277 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $279 = Maybe$none;
                                var $278 = $279;
                                break;
                            case 'Map.tie':
                                var $280 = self.val;
                                var $281 = self.lft;
                                var $282 = self.rgt;
                                var $283 = Map$get$($277, $281);
                                var $278 = $283;
                                break;
                        };
                        return $278;
                    case 'i':
                        var $284 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $286 = Maybe$none;
                                var $285 = $286;
                                break;
                            case 'Map.tie':
                                var $287 = self.val;
                                var $288 = self.lft;
                                var $289 = self.rgt;
                                var $290 = Map$get$($284, $289);
                                var $285 = $290;
                                break;
                        };
                        return $285;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Map$get = x0 => x1 => Map$get$(x0, x1);

    function Mons$Game$get_user_pos$(_user$1, _game$2) {
        var self = _game$2;
        switch (self._) {
            case 'Mons.Game.new':
                var $292 = self.usr;
                var $293 = self.pos;
                var $294 = self.map;
                var $295 = self.stt;
                var $296 = self.tik;
                var $297 = Map$get$(Word$to_bits$(_user$1), $293);
                var $291 = $297;
                break;
        };
        return $291;
    };
    const Mons$Game$get_user_pos = x0 => x1 => Mons$Game$get_user_pos$(x0, x1);

    function Mons$Game$get_hero_pos$(_game$1) {
        var self = _game$1;
        switch (self._) {
            case 'Mons.Game.new':
                var $299 = self.usr;
                var $300 = self.pos;
                var $301 = self.map;
                var $302 = self.stt;
                var $303 = self.tik;
                var $304 = Mons$Game$get_user_pos$($299, _game$1);
                var $298 = $304;
                break;
        };
        return $298;
    };
    const Mons$Game$get_hero_pos = x0 => Mons$Game$get_hero_pos$(x0);

    function Word$and$(_a$2, _b$3) {
        var Word$and$ = (_a$2, _b$3) => ({
            ctr: 'TCO',
            arg: [_a$2, _b$3]
        });
        var Word$and = _a$2 => _b$3 => Word$and$(_a$2, _b$3);
        var arg = [_a$2, _b$3];
        while (true) {
            let [_a$2, _b$3] = arg;
            var R = Word$and$(_a$2, _b$3);
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Word$and = x0 => x1 => Word$and$(x0, x1);
    const U32$and = a0 => a1 => (a0 & a1);
    const Pos32$get_x = a0 => ((a0 & 0xFFF));
    const Pos32$get_y = a0 => (((a0 >>> 12) & 0xFFF));
    const Pos32$get_z = a0 => ((a0 >>> 24));

    function Mons$Map$get_list$(_pos$1, _map$2) {
        var self = Map$get$(U32$to_bits$(_pos$1), _map$2);
        switch (self._) {
            case 'Maybe.none':
                var $306 = List$nil;
                var $305 = $306;
                break;
            case 'Maybe.some':
                var $307 = self.value;
                var $308 = $307;
                var $305 = $308;
                break;
        };
        return $305;
    };
    const Mons$Map$get_list = x0 => x1 => Mons$Map$get_list$(x0, x1);

    function Mons$Kind$is_hero$(_kind$1) {
        var self = _kind$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $310 = self.ele;
                var $311 = self.boss;
                var $312 = self.pri_type;
                var $313 = self.agi;
                var self = $310;
                switch (self._) {
                    case 'Mons.Kind.mons.HERO':
                        var $315 = Bool$true;
                        var $314 = $315;
                        break;
                    case 'Mons.Kind.mons.MAGE':
                        var $316 = Bool$false;
                        var $314 = $316;
                        break;
                    case 'Mons.Kind.mons.BEHOLDER':
                        var $317 = Bool$false;
                        var $314 = $317;
                        break;
                    case 'Mons.Kind.mons.ZOIO':
                        var $318 = Bool$false;
                        var $314 = $318;
                        break;
                    case 'Mons.Kind.mons.CYCLOPE':
                        var $319 = Bool$false;
                        var $314 = $319;
                        break;
                    case 'Mons.Kind.mons.POISOLICK':
                        var $320 = Bool$false;
                        var $314 = $320;
                        break;
                    case 'Mons.Kind.mons.TROWL':
                        var $321 = Bool$false;
                        var $314 = $321;
                        break;
                    case 'Mons.Kind.mons.MIMIC':
                        var $322 = Bool$false;
                        var $314 = $322;
                        break;
                    case 'Mons.Kind.mons.MIMIC2':
                        var $323 = Bool$false;
                        var $314 = $323;
                        break;
                    case 'Mons.Kind.mons.AZULA':
                        var $324 = Bool$false;
                        var $314 = $324;
                        break;
                    case 'Mons.Kind.mons.EMERELDER':
                        var $325 = Bool$false;
                        var $314 = $325;
                        break;
                    case 'Mons.Kind.mons.EMERELDER2':
                        var $326 = Bool$false;
                        var $314 = $326;
                        break;
                };
                var $309 = $314;
                break;
            case 'Mons.Kind.Const':
                var $327 = self.ele;
                var $328 = Bool$false;
                var $309 = $328;
                break;
            case 'Mons.Kind.Terrain':
                var $329 = self.ele;
                var $330 = Bool$false;
                var $309 = $330;
                break;
            case 'Mons.Kind.Interactive':
                var $331 = self.ele;
                var $332 = self.on;
                var $333 = self.eff;
                var $334 = Bool$false;
                var $309 = $334;
                break;
        };
        return $309;
    };
    const Mons$Kind$is_hero = x0 => Mons$Kind$is_hero$(x0);

    function Mons$Object$get_kin$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $336 = self.kin;
                var $337 = self.dir;
                var $338 = self.pad;
                var $339 = self.ani;
                var $340 = self.dmg;
                var $341 = self.bag;
                var $342 = self.mon;
                var $343 = self.bos;
                var $344 = self.cap;
                var $345 = self.idl;
                var $346 = self.eff;
                var $347 = $336;
                var $335 = $347;
                break;
        };
        return $335;
    };
    const Mons$Object$get_kin = x0 => Mons$Object$get_kin$(x0);

    function List$ifind$go$(_xs$2, _f$3, _i$4) {
        var List$ifind$go$ = (_xs$2, _f$3, _i$4) => ({
            ctr: 'TCO',
            arg: [_xs$2, _f$3, _i$4]
        });
        var List$ifind$go = _xs$2 => _f$3 => _i$4 => List$ifind$go$(_xs$2, _f$3, _i$4);
        var arg = [_xs$2, _f$3, _i$4];
        while (true) {
            let [_xs$2, _f$3, _i$4] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        var $348 = Maybe$none;
                        return $348;
                    case 'List.cons':
                        var $349 = self.head;
                        var $350 = self.tail;
                        var self = _f$3($349)(_i$4);
                        if (self) {
                            var $352 = Maybe$some$(Pair$new$($349, _i$4));
                            var $351 = $352;
                        } else {
                            var $353 = List$ifind$go$($350, _f$3, Nat$succ$(_i$4));
                            var $351 = $353;
                        };
                        return $351;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$ifind$go = x0 => x1 => x2 => List$ifind$go$(x0, x1, x2);

    function List$ifind$(_xs$2, _f$3) {
        var $354 = List$ifind$go$(_xs$2, _f$3, Nat$zero);
        return $354;
    };
    const List$ifind = x0 => x1 => List$ifind$(x0, x1);
    const Mons$Kind$terrain$VOID = ({
        _: 'Mons.Kind.terrain.VOID'
    });
    const Mons$Object$void = (() => {
        var _void$1 = Mons$Kind$Terrain$(Mons$Kind$terrain$VOID);
        var $355 = Mons$Object$new$(_void$1, Mons$Dir$down, Mons$Pad$null, 0, 0, List$nil, 0, List$nil, Pair$new$(33, List$nil), 0, Mons$Effect$clear);
        return $355;
    })();

    function Pair$fst$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $357 = self.fst;
                var $358 = self.snd;
                var $359 = $357;
                var $356 = $359;
                break;
        };
        return $356;
    };
    const Pair$fst = x0 => Pair$fst$(x0);

    function Pair$snd$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $361 = self.fst;
                var $362 = self.snd;
                var $363 = $362;
                var $360 = $363;
                break;
        };
        return $360;
    };
    const Pair$snd = x0 => Pair$snd$(x0);

    function Mons$Map$get_hero$(_pos$1, _map$2) {
        var _tile$3 = Mons$Map$get_list$(_pos$1, _map$2);
        var _obj_is_hero$4 = (_obj$4 => {
            var $365 = Mons$Kind$is_hero$(Mons$Object$get_kin$(_obj$4));
            return $365;
        });
        var _fun$5 = (_obj$5 => _idx$6 => {
            var $366 = _obj_is_hero$4(_obj$5);
            return $366;
        });
        var _both$6 = List$ifind$(_tile$3, _fun$5);
        var self = _both$6;
        switch (self._) {
            case 'Maybe.none':
                var $367 = Pair$new$(Mons$Object$void, 0);
                var $364 = $367;
                break;
            case 'Maybe.some':
                var $368 = self.value;
                var _hero$8 = Pair$fst$($368);
                var _idx$9 = (Number(Pair$snd$($368)));
                var $369 = Pair$new$(_hero$8, _idx$9);
                var $364 = $369;
                break;
        };
        return $364;
    };
    const Mons$Map$get_hero = x0 => x1 => Mons$Map$get_hero$(x0, x1);
    const Mons$Kind$const$CHEST = ({
        _: 'Mons.Kind.const.CHEST'
    });

    function Mons$Map$push$(_pos$1, _obj$2, _map$3) {
        var _objs$4 = Mons$Map$get_list$(_pos$1, _map$3);
        var _objs$5 = List$cons$(_obj$2, _objs$4);
        var $370 = Mons$Map$set_list$(_pos$1, _objs$5, _map$3);
        return $370;
    };
    const Mons$Map$push = x0 => x1 => x2 => Mons$Map$push$(x0, x1, x2);

    function Mons$Game$new$(_usr$1, _pos$2, _map$3, _stt$4, _tik$5) {
        var $371 = ({
            _: 'Mons.Game.new',
            'usr': _usr$1,
            'pos': _pos$2,
            'map': _map$3,
            'stt': _stt$4,
            'tik': _tik$5
        });
        return $371;
    };
    const Mons$Game$new = x0 => x1 => x2 => x3 => x4 => Mons$Game$new$(x0, x1, x2, x3, x4);

    function Mons$Game$set_map$(_map$1, _game$2) {
        var self = _game$2;
        switch (self._) {
            case 'Mons.Game.new':
                var $373 = self.usr;
                var $374 = self.pos;
                var $375 = self.map;
                var $376 = self.stt;
                var $377 = self.tik;
                var $378 = Mons$Game$new$($373, $374, _map$1, $376, $377);
                var $372 = $378;
                break;
        };
        return $372;
    };
    const Mons$Game$set_map = x0 => x1 => Mons$Game$set_map$(x0, x1);

    function Mons$Game$map_push$(_pos$1, _obj$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $380 = self.usr;
                var $381 = self.pos;
                var $382 = self.map;
                var $383 = self.stt;
                var $384 = self.tik;
                var _map$9 = Mons$Map$push$(_pos$1, _obj$2, $382);
                var $385 = Mons$Game$set_map$(_map$9, _game$3);
                var $379 = $385;
                break;
        };
        return $379;
    };
    const Mons$Game$map_push = x0 => x1 => x2 => Mons$Game$map_push$(x0, x1, x2);

    function Mons$Object$get_adjacent_pos$(_pos$1, _dir$2, _map$3) {
        var _x$4 = ((_pos$1 & 0xFFF));
        var _y$5 = (((_pos$1 >>> 12) & 0xFFF));
        var _z$6 = ((_pos$1 >>> 24));
        var self = _dir$2;
        switch (self._) {
            case 'Mons.Dir.right':
                var $387 = ((0 | ((_x$4 + 1) >>> 0) | (_y$5 << 12) | (_z$6 << 24)));
                var $386 = $387;
                break;
            case 'Mons.Dir.up':
                var $388 = ((0 | _x$4 | ((Math.max(_y$5 - 1, 0)) << 12) | (_z$6 << 24)));
                var $386 = $388;
                break;
            case 'Mons.Dir.left':
                var $389 = ((0 | (Math.max(_x$4 - 1, 0)) | (_y$5 << 12) | (_z$6 << 24)));
                var $386 = $389;
                break;
            case 'Mons.Dir.down':
                var $390 = ((0 | _x$4 | (((_y$5 + 1) >>> 0) << 12) | (_z$6 << 24)));
                var $386 = $390;
                break;
        };
        return $386;
    };
    const Mons$Object$get_adjacent_pos = x0 => x1 => x2 => Mons$Object$get_adjacent_pos$(x0, x1, x2);

    function Mons$Game$get_tile$(_pos$1, _game$2) {
        var self = _game$2;
        switch (self._) {
            case 'Mons.Game.new':
                var $392 = self.usr;
                var $393 = self.pos;
                var $394 = self.map;
                var $395 = self.stt;
                var $396 = self.tik;
                var $397 = Mons$Map$get_list$(_pos$1, $394);
                var $391 = $397;
                break;
        };
        return $391;
    };
    const Mons$Game$get_tile = x0 => x1 => Mons$Game$get_tile$(x0, x1);

    function Mons$Object$get_adjacent_obj_list$(_pos$1, _dir$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $399 = self.usr;
                var $400 = self.pos;
                var $401 = self.map;
                var $402 = self.stt;
                var $403 = self.tik;
                var _adjacent_pos$9 = Mons$Object$get_adjacent_pos$(_pos$1, _dir$2, $401);
                var $404 = Mons$Game$get_tile$(_adjacent_pos$9, _game$3);
                var $398 = $404;
                break;
        };
        return $398;
    };
    const Mons$Object$get_adjacent_obj_list = x0 => x1 => x2 => Mons$Object$get_adjacent_obj_list$(x0, x1, x2);
    const Nat$eql = a0 => a1 => (a0 === a1);
    const List$length = a0 => (list_length(a0));

    function Mons$Object$can_move_forward$(_pos$1, _dir$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $406 = self.usr;
                var $407 = self.pos;
                var $408 = self.map;
                var $409 = self.stt;
                var $410 = self.tik;
                var _adjacent_objs$9 = Mons$Object$get_adjacent_obj_list$(_pos$1, _dir$2, _game$3);
                var $411 = ((list_length(_adjacent_objs$9)) === 1n);
                var $405 = $411;
                break;
        };
        return $405;
    };
    const Mons$Object$can_move_forward = x0 => x1 => x2 => Mons$Object$can_move_forward$(x0, x1, x2);

    function List$tail$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $413 = List$nil;
                var $412 = $413;
                break;
            case 'List.cons':
                var $414 = self.head;
                var $415 = self.tail;
                var $416 = $415;
                var $412 = $416;
                break;
        };
        return $412;
    };
    const List$tail = x0 => List$tail$(x0);

    function List$delete_at_u32$(_idx$2, _list$3) {
        var self = (_idx$2 === 0);
        if (self) {
            var $418 = List$tail$(_list$3);
            var $417 = $418;
        } else {
            var self = _list$3;
            switch (self._) {
                case 'List.nil':
                    var $420 = _list$3;
                    var $419 = $420;
                    break;
                case 'List.cons':
                    var $421 = self.head;
                    var $422 = self.tail;
                    var $423 = List$cons$($421, List$delete_at_u32$((Math.max(_idx$2 - 1, 0)), $422));
                    var $419 = $423;
                    break;
            };
            var $417 = $419;
        };
        return $417;
    };
    const List$delete_at_u32 = x0 => x1 => List$delete_at_u32$(x0, x1);

    function Mons$Map$del$(_pos$1, _idx$2, _map$3) {
        var _objs$4 = Mons$Map$get_list$(_pos$1, _map$3);
        var _objs$5 = List$delete_at_u32$(_idx$2, _objs$4);
        var $424 = Mons$Map$set_list$(_pos$1, _objs$5, _map$3);
        return $424;
    };
    const Mons$Map$del = x0 => x1 => x2 => Mons$Map$del$(x0, x1, x2);

    function Mons$Game$map_del$(_pos$1, _idx$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $426 = self.usr;
                var $427 = self.pos;
                var $428 = self.map;
                var $429 = self.stt;
                var $430 = self.tik;
                var _map$9 = Mons$Map$del$(_pos$1, _idx$2, $428);
                var $431 = Mons$Game$set_map$(_map$9, _game$3);
                var $425 = $431;
                break;
        };
        return $425;
    };
    const Mons$Game$map_del = x0 => x1 => x2 => Mons$Game$map_del$(x0, x1, x2);

    function Mons$Object$heal_all_mons$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $433 = self.kin;
                var $434 = self.dir;
                var $435 = self.pad;
                var $436 = self.ani;
                var $437 = self.dmg;
                var $438 = self.bag;
                var $439 = self.mon;
                var $440 = self.bos;
                var $441 = self.cap;
                var $442 = self.idl;
                var $443 = self.eff;
                var $444 = _obj$1;
                var $432 = $444;
                break;
        };
        return $432;
    };
    const Mons$Object$heal_all_mons = x0 => Mons$Object$heal_all_mons$(x0);

    function List$update_at$(_index$2, _fn$3, _list$4) {
        var self = _list$4;
        switch (self._) {
            case 'List.nil':
                var $446 = List$nil;
                var $445 = $446;
                break;
            case 'List.cons':
                var $447 = self.head;
                var $448 = self.tail;
                var self = _index$2;
                if (self === 0n) {
                    var $450 = List$cons$(_fn$3($447), $448);
                    var $449 = $450;
                } else {
                    var $451 = (self - 1n);
                    var $452 = List$cons$($447, List$update_at$($451, _fn$3, $448));
                    var $449 = $452;
                };
                var $445 = $449;
                break;
        };
        return $445;
    };
    const List$update_at = x0 => x1 => x2 => List$update_at$(x0, x1, x2);

    function Mons$Map$set$(_pos$1, _idx$2, _val$3, _map$4) {
        var _list$5 = Mons$Map$get_list$(_pos$1, _map$4);
        var _list$6 = List$update_at$(U32$to_nat$(_idx$2), (_$6 => {
            var $454 = _val$3;
            return $454;
        }), _list$5);
        var $453 = Mons$Map$set_list$(_pos$1, _list$6, _map$4);
        return $453;
    };
    const Mons$Map$set = x0 => x1 => x2 => x3 => Mons$Map$set$(x0, x1, x2, x3);

    function Mons$Game$map_set$(_pos$1, _idx$2, _obj$3, _game$4) {
        var self = _game$4;
        switch (self._) {
            case 'Mons.Game.new':
                var $456 = self.usr;
                var $457 = self.pos;
                var $458 = self.map;
                var $459 = self.stt;
                var $460 = self.tik;
                var _map$10 = Mons$Map$set$(_pos$1, _idx$2, _obj$3, $458);
                var $461 = Mons$Game$set_map$(_map$10, _game$4);
                var $455 = $461;
                break;
        };
        return $455;
    };
    const Mons$Game$map_set = x0 => x1 => x2 => x3 => Mons$Game$map_set$(x0, x1, x2, x3);

    function Mons$Kind$inter_lever_eff$(_kind$1, _on$2, _game$3) {
        var self = Mons$Game$get_hero_pos$(_game$3);
        switch (self._) {
            case 'Maybe.none':
                var $463 = _game$3;
                var $462 = $463;
                break;
            case 'Maybe.some':
                var $464 = self.value;
                var _hero_pos$5 = $464;
                var _x$6 = ((_hero_pos$5 & 0xFFF));
                var _y$7 = (((_hero_pos$5 >>> 12) & 0xFFF));
                var _z$8 = ((_hero_pos$5 >>> 24));
                var self = _game$3;
                switch (self._) {
                    case 'Mons.Game.new':
                        var $466 = self.usr;
                        var $467 = self.pos;
                        var $468 = self.map;
                        var $469 = self.stt;
                        var $470 = self.tik;
                        var _map$14 = $468;
                        var _hero_pair$15 = Mons$Map$get_hero$(_hero_pos$5, _map$14);
                        var _hero_obj$16 = Pair$fst$(_hero_pair$15);
                        var _hero_idx$17 = Pair$snd$(_hero_pair$15);
                        var _obj_idx$18 = 0;
                        var self = _hero_obj$16;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $472 = self.kin;
                                var $473 = self.dir;
                                var $474 = self.pad;
                                var $475 = self.ani;
                                var $476 = self.dmg;
                                var $477 = self.bag;
                                var $478 = self.mon;
                                var $479 = self.bos;
                                var $480 = self.cap;
                                var $481 = self.idl;
                                var $482 = self.eff;
                                var self = _kind$1;
                                switch (self._) {
                                    case 'Mons.Kind.inter.LEVER':
                                        var $484 = self.id;
                                        var self = (_z$8 === 1);
                                        if (self) {
                                            var self = ($484 === 0);
                                            if (self) {
                                                var _sign$31 = Mons$Kind$new_const$(Mons$Kind$const$CHEST);
                                                var _obj_pos$32 = ((0 | ((1 + _x$6) >>> 0) | ((Math.max(_y$7 - 1, 0)) << 12) | (_z$8 << 24)));
                                                var $487 = Mons$Game$map_push$(_obj_pos$32, _sign$31, _game$3);
                                                var $486 = $487;
                                            } else {
                                                var $488 = _game$3;
                                                var $486 = $488;
                                            };
                                            var $485 = $486;
                                        } else {
                                            var $489 = _game$3;
                                            var $485 = $489;
                                        };
                                        var $483 = $485;
                                        break;
                                    case 'Mons.Kind.inter.MOVE':
                                        var _movable_obj_pos$30 = Mons$Object$get_adjacent_pos$(_hero_pos$5, $473, _map$14);
                                        var self = Mons$Object$can_move_forward$(_movable_obj_pos$30, $473, _game$3);
                                        if (self) {
                                            var _obj$31 = Mons$Kind$new_interactive_tool$(_kind$1, Bool$true, Mons$Kind$inter_lever_eff);
                                            var _new_pos$32 = Mons$Object$get_adjacent_pos$(_movable_obj_pos$30, $473, _map$14);
                                            var _game$33 = Mons$Game$map_del$(_movable_obj_pos$30, _obj_idx$18, _game$3);
                                            var $491 = Mons$Game$map_push$(_new_pos$32, _obj$31, _game$33);
                                            var $490 = $491;
                                        } else {
                                            var $492 = _game$3;
                                            var $490 = $492;
                                        };
                                        var $483 = $490;
                                        break;
                                    case 'Mons.Kind.inter.HEAL':
                                        var self = _on$2;
                                        if (self) {
                                            var $494 = _game$3;
                                            var $493 = $494;
                                        } else {
                                            var _hero_obj$30 = Mons$Object$heal_all_mons$(_hero_obj$16);
                                            var $495 = Mons$Game$map_set$(_hero_pos$5, _hero_idx$17, _hero_obj$30, _game$3);
                                            var $493 = $495;
                                        };
                                        var $483 = $493;
                                        break;
                                };
                                var $471 = $483;
                                break;
                        };
                        var $465 = $471;
                        break;
                };
                var $462 = $465;
                break;
        };
        return $462;
    };
    const Mons$Kind$inter_lever_eff = x0 => x1 => x2 => Mons$Kind$inter_lever_eff$(x0, x1, x2);

    function Mons$Kind$inter$LEVER$(_id$1) {
        var $496 = ({
            _: 'Mons.Kind.inter.LEVER',
            'id': _id$1
        });
        return $496;
    };
    const Mons$Kind$inter$LEVER = x0 => Mons$Kind$inter$LEVER$(x0);
    const Mons$Kind$terrain$GRASS_PLANT = ({
        _: 'Mons.Kind.terrain.GRASS_PLANT'
    });
    const Mons$Kind$terrain$PLANT_0 = ({
        _: 'Mons.Kind.terrain.PLANT_0'
    });

    function Mons$Map$code_to_tile$(_code$1, _dim$2) {
        var self = (_dim$2 === 0);
        if (self) {
            var _path_brick$3 = Mons$Kind$new_terrain$(Mons$Kind$terrain$FLOOR$(0, 0));
            var _lvl0$4 = 0;
            var _path_blocker$5 = Mons$Kind$new_terrain$(Mons$Kind$terrain$PATH_BLOCKER$(_lvl0$4, 0));
            var $498 = Mons$Map$code_to_tile$aux$(_code$1, List$cons$(Pair$new$("mg", Mons$Kind$new_mons$(Mons$Kind$mons$MAGE, Mons$Type$normal, 2)), List$cons$(Pair$new$("ct", List$cons$(Mons$Kind$new_const$(Mons$Kind$const$CRYSTAL), List$nil)), List$cons$(Pair$new$("ft", List$cons$(Mons$Kind$new_const$(Mons$Kind$const$FOUNTAIN$(_lvl0$4, 0)), List$cons$(_path_brick$3, List$nil))), List$cons$(Pair$new$("pt", List$cons$(Mons$Kind$new_const$(Mons$Kind$const$PORTAL), List$nil)), List$cons$(Pair$new$(".g", List$cons$(_path_brick$3, List$nil)), List$cons$(Pair$new$("bb", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$VOID_BLACK), List$nil)), List$cons$(Pair$new$("xx", List$cons$(_path_blocker$5, List$nil)), List$cons$(Pair$new$("c1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(0, 1)), List$nil)), List$cons$(Pair$new$("c2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(0, 2)), List$nil)), List$cons$(Pair$new$("c3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(0, 3)), List$nil)), List$cons$(Pair$new$("c4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(0, 4)), List$nil)), List$cons$(Pair$new$("c5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(0, 5)), List$nil)), List$cons$(Pair$new$("d1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(1, 1)), List$nil)), List$cons$(Pair$new$("d2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(1, 2)), List$nil)), List$cons$(Pair$new$("d3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(1, 3)), List$nil)), List$cons$(Pair$new$("d4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(1, 4)), List$nil)), List$cons$(Pair$new$("d5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(1, 5)), List$nil)), List$cons$(Pair$new$("e1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(2, 1)), List$nil)), List$cons$(Pair$new$("e2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(2, 2)), List$nil)), List$cons$(Pair$new$("e3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(2, 3)), List$nil)), List$cons$(Pair$new$("e4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(2, 4)), List$nil)), List$cons$(Pair$new$("e5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(2, 5)), List$nil)), List$cons$(Pair$new$("f1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(3, 1)), List$nil)), List$cons$(Pair$new$("f2", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(3, 2)), List$nil))), List$cons$(Pair$new$("f3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(3, 3)), List$nil)), List$cons$(Pair$new$("f4", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(3, 4)), List$nil))), List$cons$(Pair$new$("f5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(3, 5)), List$nil)), List$cons$(Pair$new$("g1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(4, 1)), List$nil)), List$cons$(Pair$new$("g2", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(4, 2)), List$nil))), List$cons$(Pair$new$("g3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(4, 3)), List$nil)), List$cons$(Pair$new$("g4", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(4, 4)), List$nil))), List$cons$(Pair$new$("g5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(4, 5)), List$nil)), List$cons$(Pair$new$("a1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(5, 1)), List$nil)), List$cons$(Pair$new$("a2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(5, 2)), List$nil)), List$cons$(Pair$new$("a3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(5, 3)), List$nil)), List$cons$(Pair$new$("a4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(5, 4)), List$nil)), List$cons$(Pair$new$("a5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(5, 5)), List$nil)), List$cons$(Pair$new$("b1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(6, 1)), List$nil)), List$cons$(Pair$new$("b2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(6, 2)), List$nil)), List$cons$(Pair$new$("b3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(6, 3)), List$nil)), List$cons$(Pair$new$("b4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(6, 4)), List$nil)), List$cons$(Pair$new$("b5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(6, 5)), List$nil)), List$cons$(Pair$new$("h1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(7, 1)), List$nil)), List$cons$(Pair$new$("h2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(7, 2)), List$nil)), List$cons$(Pair$new$("h3", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(7, 3)), List$nil))), List$cons$(Pair$new$("h4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(7, 4)), List$nil)), List$cons$(Pair$new$("h5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(7, 5)), List$nil)), List$cons$(Pair$new$("i1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(8, 1)), List$nil)), List$cons$(Pair$new$("i2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(8, 2)), List$nil)), List$cons$(Pair$new$("i3", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(8, 3)), List$cons$(Mons$Kind$new_const$(Mons$Kind$const$FOUNTAIN$(_lvl0$4, 0)), List$nil)))), List$cons$(Pair$new$("i4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(8, 4)), List$nil)), List$cons$(Pair$new$("i5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(8, 5)), List$nil)), List$cons$(Pair$new$("j1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(9, 1)), List$nil)), List$cons$(Pair$new$("j2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(9, 2)), List$nil)), List$cons$(Pair$new$("j3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(9, 3)), List$nil)), List$cons$(Pair$new$("j4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(9, 4)), List$nil)), List$cons$(Pair$new$("j5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(9, 5)), List$nil)), List$cons$(Pair$new$("k1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(10, 1)), List$nil)), List$cons$(Pair$new$("k2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(10, 2)), List$nil)), List$cons$(Pair$new$("k3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(10, 3)), List$nil)), List$cons$(Pair$new$("k4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(10, 4)), List$nil)), List$cons$(Pair$new$("k5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(10, 5)), List$nil)), List$cons$(Pair$new$("l1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(11, 1)), List$nil)), List$cons$(Pair$new$("l2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(11, 2)), List$nil)), List$cons$(Pair$new$("l3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(11, 3)), List$nil)), List$cons$(Pair$new$("l4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(11, 4)), List$nil)), List$cons$(Pair$new$("l5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(11, 5)), List$nil)), List$cons$(Pair$new$("m1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(12, 1)), List$nil)), List$cons$(Pair$new$("m2", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(12, 2)), List$nil))), List$cons$(Pair$new$("m3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(12, 3)), List$nil)), List$cons$(Pair$new$("m4", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(12, 4)), List$nil))), List$cons$(Pair$new$("m5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(12, 5)), List$nil)), List$cons$(Pair$new$("n1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(13, 1)), List$nil)), List$cons$(Pair$new$("n2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(13, 2)), List$nil)), List$cons$(Pair$new$("n3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(13, 3)), List$nil)), List$cons$(Pair$new$("n4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(13, 4)), List$nil)), List$cons$(Pair$new$("n5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(13, 5)), List$nil)), List$cons$(Pair$new$("o1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(14, 1)), List$nil)), List$cons$(Pair$new$("o2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(14, 2)), List$nil)), List$cons$(Pair$new$("o3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(14, 3)), List$nil)), List$cons$(Pair$new$("o4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(14, 4)), List$nil)), List$cons$(Pair$new$("o5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(14, 5)), List$nil)), List$cons$(Pair$new$("p1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(15, 1)), List$nil)), List$cons$(Pair$new$("p2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(15, 2)), List$nil)), List$cons$(Pair$new$("p3", List$cons$(_path_blocker$5, List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(15, 3)), List$nil))), List$cons$(Pair$new$("p4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(15, 4)), List$nil)), List$cons$(Pair$new$("p5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(15, 5)), List$nil)), List$cons$(Pair$new$("q1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(16, 1)), List$nil)), List$cons$(Pair$new$("q2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(16, 2)), List$nil)), List$cons$(Pair$new$("q3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(16, 3)), List$nil)), List$cons$(Pair$new$("q4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(16, 4)), List$nil)), List$cons$(Pair$new$("q5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(16, 5)), List$nil)), List$cons$(Pair$new$("r1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(17, 1)), List$nil)), List$cons$(Pair$new$("r2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(17, 2)), List$nil)), List$cons$(Pair$new$("r3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(17, 3)), List$nil)), List$cons$(Pair$new$("r4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(17, 4)), List$nil)), List$cons$(Pair$new$("r5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(17, 5)), List$nil)), List$cons$(Pair$new$("s1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(18, 1)), List$nil)), List$cons$(Pair$new$("s2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(18, 2)), List$nil)), List$cons$(Pair$new$("s3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(18, 3)), List$nil)), List$cons$(Pair$new$("s4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(18, 4)), List$nil)), List$cons$(Pair$new$("s5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(18, 5)), List$nil)), List$cons$(Pair$new$("t1", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(19, 1)), List$nil)), List$cons$(Pair$new$("t2", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(19, 2)), List$nil)), List$cons$(Pair$new$("t3", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(19, 3)), List$nil)), List$cons$(Pair$new$("t4", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(19, 4)), List$nil)), List$cons$(Pair$new$("t5", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$MID_CITY$(19, 5)), List$nil)), List$cons$(Pair$new$("fg", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(0, 0)), List$nil)), List$cons$(Pair$new$("mc", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(38, 0)), List$nil)), List$cons$(Pair$new$("mf", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(38, 1)), List$nil)), List$cons$(Pair$new$("lc", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(37, 0)), List$nil)), List$cons$(Pair$new$("lf", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(37, 1)), List$nil)), List$cons$(Pair$new$("kc", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(36, 0)), List$nil)), List$cons$(Pair$new$("kf", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(36, 1)), List$nil)), List$cons$(Pair$new$("jc", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(35, 0)), List$nil)), List$cons$(Pair$new$("jf", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(35, 1)), List$nil)), List$cons$(Pair$new$("ic", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(34, 0)), List$nil)), List$cons$(Pair$new$("if", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$STAIRS$(34, 1)), List$nil)), List$nil)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
            var $497 = $498;
        } else {
            var self = (_dim$2 === 1);
            if (self) {
                var _floor$3 = Mons$Kind$new_terrain$(Mons$Kind$terrain$FLOOR$(1, 0));
                var $500 = Mons$Map$code_to_tile$aux$(_code$1, List$cons$(Pair$new$("ft", List$cons$(Mons$Kind$new_const$(Mons$Kind$const$FOUNTAIN$(1, 0)), List$nil)), List$cons$(Pair$new$("pt", List$cons$(Mons$Kind$new_const$(Mons$Kind$const$PORTAL), List$nil)), List$cons$(Pair$new$("hl", List$cons$(Mons$Kind$new_interactive_tool$(Mons$Kind$inter$HEAL, Bool$false, Mons$Kind$inter_lever_eff), List$cons$(_floor$3, List$nil))), List$cons$(Pair$new$("al", List$cons$(Mons$Kind$new_interactive_tool$(Mons$Kind$inter$LEVER$(0), Bool$false, Mons$Kind$inter_lever_eff), List$nil)), List$cons$(Pair$new$(".g", List$cons$(_floor$3, List$nil)), List$cons$(Pair$new$(".d", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$GRASS_PLANT), List$nil)), List$cons$(Pair$new$("xx", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$PATH_BLOCKER$(1, 0)), List$nil)), List$cons$(Pair$new$("pg", List$cons$(Mons$Kind$new_terrain$(Mons$Kind$terrain$PLANT_0), List$cons$(_floor$3, List$nil))), List$nil)))))))));
                var $499 = $500;
            } else {
                var self = (_dim$2 === 2);
                if (self) {
                    var _floor$3 = Mons$Kind$new_terrain$(Mons$Kind$terrain$FLOOR$(2, 0));
                    var $502 = Mons$Map$code_to_tile$aux$(_code$1, List$cons$(Pair$new$(".g", List$cons$(_floor$3, List$nil)), List$cons$(Pair$new$("pt", List$cons$(Mons$Kind$new_const$(Mons$Kind$const$PORTAL), List$nil)), List$nil)));
                    var $501 = $502;
                } else {
                    var _path_brick$3 = Mons$Kind$new_terrain$(Mons$Kind$terrain$FLOOR$(1, 0));
                    var $503 = Mons$Map$code_to_tile$aux$(_code$1, List$cons$(Pair$new$(".g", List$cons$(_path_brick$3, List$nil)), List$nil));
                    var $501 = $503;
                };
                var $499 = $501;
            };
            var $497 = $499;
        };
        return $497;
    };
    const Mons$Map$code_to_tile = x0 => x1 => Mons$Map$code_to_tile$(x0, x1);

    function Mons$Map$build$(_code$1) {
        var $504 = List$ifor_u32$(_code$1, Mons$Map$new, (_z$2 => _plane$3 => _map$4 => {
            var _size$5 = List$length_u32$(_plane$3);
            var $505 = List$ifor_u32$(_plane$3, _map$4, (_j$6 => _row$7 => _map$8 => {
                var _map$9 = (() => {
                    var $507 = _map$8;
                    var $508 = 0;
                    var $509 = _size$5;
                    let _map$10 = $507;
                    for (let _i$9 = $508; _i$9 < $509; ++_i$9) {
                        var _t_x$11 = (((Math.max(2048 - ((_size$5 / 2) >>> 0), 0)) + _i$9) >>> 0);
                        var _t_y$12 = (((Math.max(2048 - ((_size$5 / 2) >>> 0), 0)) + _j$6) >>> 0);
                        var _t_z$13 = _z$2;
                        var _pos$14 = ((0 | _t_x$11 | (_t_y$12 << 12) | (_t_z$13 << 24)));
                        var _ini$15 = U32$to_nat$(((_i$9 * 2) >>> 0));
                        var _end$16 = U32$to_nat$(((((_i$9 * 2) >>> 0) + 2) >>> 0));
                        var _sli$17 = String$slice$(_ini$15, _end$16, _row$7);
                        var $507 = Mons$Map$set_list$(_pos$14, Mons$Map$code_to_tile$(_sli$17, _z$2), _map$10);
                        _map$10 = $507;
                    };
                    return _map$10;
                })();
                var $506 = _map$9;
                return $506;
            }));
            return $505;
        }));
        return $504;
    };
    const Mons$Map$build = x0 => Mons$Map$build$(x0);
    const Mons$map_source = List$cons$(List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbptbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbecbbxx.g.gfg.g.gxxbbefbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfcbbxx.g.gfg.g.gxxbbffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbgcbbxx.g.gfg.g.gxxbbgfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbhcxx.g.gfg.g.gxxhfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbicxx.g.gfg.g.gxxifbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbjcxx.g.gfg.g.gxxjfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbkcxx.g.gfg.g.gxxkfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblcxx.g.gfg.g.gxxlfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbmcxx.g.gfg.g.gxxmfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc0bbbbbbbbc1bbbbbbbbc2bbxx.g.gc3.g.gxxbbc4bbbbbbbbc5bbbbbbbbc6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd0bbbbbbbbd1bbbbbbbbd2bbxx.g.gd3.g.gxxbbd4bbbbbbbbd5bbbbbbbbd6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbe0bbbbbbbbe1bbbbbbbbe2bbxx.g.ge3.g.gxxbbe4bbbbbbbbe5bbbbbbbbe6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbf0bbbbbbbbf1bbbbbbxxf2xx.g.g.gf3.g.g.gxxf4xxbbbbbbf5bbbbbbbbf6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg0bbbbbbbbg1bbbbbbxxg2.g.g.g.gg3.g.g.g.gg4xxbbbbbbg5bbbbbbbbg6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbba0bbbbbbbba1bbbbbbxxa2.g.g.g.ga3.g.g.g.ga4xxbbbbbba5bbbbbbbba6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0bbbbbbbbb1bbbbbbxxb2.g.g.g.gb3.g.g.g.gb4xxbbbbbbb5bbbbbbbbb6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbh0bbbbbbbbh1bbbbbbxxh2.g.g.g.gh3.g.g.g.gh4xxbbbbbbh5bbbbbbbbh6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbi0bbbbbbbbi1bbbbbbxxi2.g.g.gxxi3xx.g.g.gi4xxbbbbbbi5bbbbbbbbi6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbj0bbbbbbbbj1bbbbbbxxj2.g.g.g.gj3mg.g.g.gj4xxbbbbbbj5bbbbbbbbj6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbk0bbbbbbbbk1bbbbbbxxk2.g.g.g.gk3.g.g.g.gk4xxbbbbbbk5bbbbbbbbk6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbl0bbbbbbbbl1bbbbbbxxl2.g.g.g.gl3.g.g.g.gl4xxbbbbbbl5bbbbbbbbl6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbm0bbbbbbbbm1bbbbbbxxm2.g.g.g.gm3.g.gxxxxm4xxbbbbbbm5bbbbbbbbm6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbn0bbbbbbbbn1bbbbbbbbn2xx.g.g.gn3.g.gxxxxn4bbbbbbbbn5bbbbbbbbn6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbo0bbbbbbbbo1bbbbbbbbo2xx.g.g.go3.g.gxxbbo4bbbbbbbbo5bbbbbbbbo6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbp0bbbbbbbbp1bbbbbbbbp2xxxxxxxxp3xxxxxxbbp4bbbbbbbbp4bbbbbbbbp6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbq0bbbbbbbbq1bbbbbbbbq2xxbbbbbbq3bbbbxxbbq4bbbbbbbbq5bbbbbbbbq6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbr0bbbbbbbbr1bbbbbbbbr2bbxxbbbbr3bbbbxxbbr4bbbbbbbbr5bbbbbbbbr6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbs1bbbbbbbbs2bbxxbbbbs3bbbbxxbbs4bbbbbbbbs5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbt1bbbbbbbbt2bbxxbbbbt3bbbbxxbbt4bbbbbbbbt5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbu1bbbbbbbbu2bbxxbbbbu3bbbbxxbbu4bbbbbbbbu5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbv1bbbbbbbbv2bbxxbbbbv3bbbbxxbbv4bbbbbbbbv5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw1bbbbbbbbw2bbxxxxxxw3xxxxxxbbw4bbbbbbbbw5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbx1bbbbbbbbx2bbbbbbbbx3bbbbbbbbx4bbbbbbbbx5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbby1bbbbbbbby2bbbbbbbby3bbbbbbbby4bbbbbbbby5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbz1bbbbbbbbz2bbbbbbbbz3bbbbbbbbz4bbbbbbbbz5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbacbbbbbbbbadbbbbbbbbaebbbbbbbbafbbbbbbbbagbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbdbbbbbbbbbebbbbbbbbbfbbbbbbbbbgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbcdbbbbbbbbcebbbbbbbbcfbbbbbbbbcgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdcbbbbbbbbddbbbbbbbbdebbbbbbbbdfbbbbbbbbdgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbegbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbggbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbhgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbigbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbjgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbkgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbblgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbmgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$nil)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))), List$cons$(List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpg.g.g.g.gpgpgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbpgpg.g.gpt.g.g.gpgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.gpgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpg.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.ghl.g.g.g.g.g.gpgpgpg.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gpgpg.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gpgpg.g.g.g.g.g.g.g.g.g.g.gpgpg.g.g.g.g.gpgpg.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.gpgbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbpg.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgpgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.gpopopopopopopo.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.gpopopopopopopo.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.gpopopopopopopo.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbememememememem.g.g.g.g.g.gpgpgbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.gpopopopopopopo.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbpgememememememem.g.g.g.g.g.gpgpgpgbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbpgpgpgpgpgpopopopopopopopgpgpgpgpgbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbpgememememememem.g.g.g.g.g.g.gpgpgbbbbbbbbbbbb.g.g.gmimimimimimimi.g.g.gpg.g.gbbbbbbpgpgpgpgpgpopopopopopopopgpgpgpgpgbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbpgpgememememememem.g.g.g.g.g.g.g.g.g.gbbbbbbbbbb.g.g.gmimimimimimimi.g.g.g.g.g.gbbbbbb.g.g.g.g.gpopopopopopopo.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbpgpgememememememem.g.g.g.g.g.g.g.g.g.g.ghl.g.g.g.g.g.gmimimimimimimi.g.g.g.g.g.gbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbpgpgemememememememenenenenenenen.g.g.g.g.g.g.g.g.g.g.gmimimimimimimi.g.g.gpgpg.gbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbpgpgemememememememenenenenenenen.g.g.g.g.g.g.g.g.g.g.gmimimimimimimi.g.g.gpgpg.gbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbpgpg.g.g.g.g.g.g.genenenenenenen.g.g.gbbbbbbbbbb.g.g.gmimimimimimimi.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbpgpgpgpg.g.g.g.g.genenenenenenenpgpgbbbbbbbbbbbb.g.g.gmimimimimimimi.g.g.gpgpg.gbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbpgpgpgpg.g.g.g.genenenenenenenpgpgbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.gpgpg.gbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbpgpgpgpgpg.g.g.genenenenenenenpgbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.gpg.g.g.g.g.gbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgpg.g.g.genenenenenenenbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgpgpgpgpg.gpgpgpgpgpgpgpgpgpgpgpg.g.g.g.gpgpgbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpg.g.g.g.g.g.gbbbbbbbbpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpg.g.g.g.gpgpgbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgtrtrtrtrtrtrtr.gbbbbbb.gpgpgpgpgpgpgpgpgpgpgpg.gpgpgpgazazazazazazaz.gbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgtrtrtrtrtrtrtr.gbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gazazazazazazaz.gbbbbbbbbbbbb.g.gmimimimimimimi.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gtrtrtrtrtrtrtr.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gazazazazazazaz.gbbbbbbbbbbbb.g.g.gpg.g.g.gpg.g.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gtrtrtrtrtrtrtr.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gazazazazazazaz.gbbbbbbbbbbbb.g.g.gpg.g.g.gpg.g.g.gbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gtrtrtrtrtrtrtr.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gazazazazazazaz.gbbbbbbbbbbbbbb.g.gpg.g.g.gpg.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gtrtrtrtrtrtrtr.gbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gazazazazazazaz.gbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gtrtrtrtrtrtrtrpgbbbbbb.g.g.g.gpgpgpgpgpg.gpgpgpgpgpgpgazazazazazazaz.gbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.gpgpgpgbbbbbb.gpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpg.g.g.g.g.gbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.gpgpgbbbbbbbbpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpgpg.g.gpgpgpgbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbpgpgpgpg.gpgpgpgpgpgpgpg.g.g.gpgpgpg.g.g.gpgpgpgbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgcycycycycycycy.gbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgpgcycycycycycycy.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbpgpg.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpg.gcycycycycycycy.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbpgpg.gzozozozozozozobbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gcycycycycycycy.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gzozozozozozozo.gbbbbbbbbbbbbbbbbbbbbbbbb.g.g.gcycycycycycycy.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gzozozozozozozo.g.g.g.gpgpgpg.g.g.g.ghl.g.g.g.gcycycycycycycy.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gzozozozozozozo.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gcycycycycycycy.g.gbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbpg.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbpgpg.gzozozozozozozo.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpgpg.g.g.g.g.g.g.gbbbbbbbbbbbbbbbb.g.g.gzozozozozozozopgpgbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbpgpg.g.g.g.g.g.gbbbbbbbbbbbbbbbbbb.g.g.gzozozozozozozo.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.gpg.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.gpg.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gpg.g.g.g.gpg.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.gpg.g.g.g.g.g.g.g.gpg.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.gpg.g.g.g.g.g.g.g.gpg.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gpg.g.g.g.gpg.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$cons$("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.g.g.g.g.g.gbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", List$nil)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))), List$cons$(List$cons$("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", List$cons$("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", List$cons$("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", List$cons$("xxxxxxxxxxxxxx.g.g.g.g.g.gxxxxxxxxxxxxxx", List$cons$("xxxxxxxxxx.g.g.g.g.g.g.g.g.g.gxxxxxxxxxx", List$cons$("xxxxxxxx.g.g.g.g.g.g.g.g.g.g.g.gxxxxxxxx", List$cons$("xxxxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxxxx", List$cons$("xxxxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxxxx", List$cons$("xxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxx", List$cons$("xxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxx", List$cons$("xxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxx", List$cons$("xxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxx", List$cons$("xxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxx", List$cons$("xxxxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxxxx", List$cons$("xxxxxx.g.g.g.g.g.g.g.g.g.g.g.g.g.gxxxxxx", List$cons$("xxxxxxxx.g.g.g.g.g.g.g.g.g.g.g.gxxxxxxxx", List$cons$("xxxxxxxxxx.g.g.g.g.g.g.g.g.g.gxxxxxxxxxx", List$cons$("xxxxxxxxxxxxxx.g.g.g.g.g.gxxxxxxxxxxxxxx", List$cons$("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", List$cons$("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", List$nil)))))))))))))))))))), List$nil)));

    function Mons$Screen$welcome$(_idx$1) {
        var $510 = ({
            _: 'Mons.Screen.welcome',
            'idx': _idx$1
        });
        return $510;
    };
    const Mons$Screen$welcome = x0 => Mons$Screen$welcome$(x0);

    function App$Render$pix$(_pixs$1) {
        var $511 = ({
            _: 'App.Render.pix',
            'pixs': _pixs$1
        });
        return $511;
    };
    const App$Render$pix = x0 => App$Render$pix$(x0);

    function Image3D$set_length$(_length$1, _img$2) {
        var self = _img$2;
        switch (self._) {
            case 'Image3D.new':
                var $513 = self.length;
                var $514 = self.capacity;
                var $515 = self.buffer;
                var $516 = Image3D$new$(_length$1, $514, $515);
                var $512 = $516;
                break;
        };
        return $512;
    };
    const Image3D$set_length = x0 => x1 => Image3D$set_length$(x0, x1);

    function Image3D$clear$(_img$1) {
        var $517 = Image3D$set_length$(0, _img$1);
        return $517;
    };
    const Image3D$clear = x0 => Image3D$clear$(x0);

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
                        var $518 = Maybe$none;
                        return $518;
                    case 'List.cons':
                        var $519 = self.head;
                        var $520 = self.tail;
                        var self = _index$2;
                        if (self === 0n) {
                            var $522 = Maybe$some$($519);
                            var $521 = $522;
                        } else {
                            var $523 = (self - 1n);
                            var $524 = List$at$($523, $520);
                            var $521 = $524;
                        };
                        return $521;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$at = x0 => x1 => List$at$(x0, x1);

    function Mons$Map$get$(_pos$1, _idx$2, _map$3) {
        var _list$4 = Mons$Map$get_list$(_pos$1, _map$3);
        var self = List$at$(U32$to_nat$(_idx$2), _list$4);
        switch (self._) {
            case 'Maybe.none':
                var $526 = Mons$Object$void;
                var $525 = $526;
                break;
            case 'Maybe.some':
                var $527 = self.value;
                var $528 = $527;
                var $525 = $528;
                break;
        };
        return $525;
    };
    const Mons$Map$get = x0 => x1 => x2 => Mons$Map$get$(x0, x1, x2);

    function Mons$Game$dim$(_game$1) {
        var self = Mons$Game$get_hero_pos$(_game$1);
        switch (self._) {
            case 'Maybe.none':
                var $530 = 0;
                var $529 = $530;
                break;
            case 'Maybe.some':
                var $531 = self.value;
                var $532 = (($531 >>> 24));
                var $529 = $532;
                break;
        };
        return $529;
    };
    const Mons$Game$dim = x0 => Mons$Game$dim$(x0);

    function Mons$Object$get_current_mon$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $534 = self.kin;
                var $535 = self.dir;
                var $536 = self.pad;
                var $537 = self.ani;
                var $538 = self.dmg;
                var $539 = self.bag;
                var $540 = self.mon;
                var $541 = self.bos;
                var $542 = self.cap;
                var $543 = self.idl;
                var $544 = self.eff;
                var _idx$13 = U32$to_nat$($540);
                var self = List$at$(_idx$13, $539);
                switch (self._) {
                    case 'Maybe.none':
                        var $546 = _obj$1;
                        var $545 = $546;
                        break;
                    case 'Maybe.some':
                        var $547 = self.value;
                        var $548 = $547;
                        var $545 = $548;
                        break;
                };
                var $533 = $545;
                break;
        };
        return $533;
    };
    const Mons$Object$get_current_mon = x0 => Mons$Object$get_current_mon$(x0);

    function Mons$Attr$new$(_blocks$1, _mhp$2, _atk$3, _name$4, _wlk$5, _idl$6, _pic$7, _battle_spr$8, _skills$9, _pos$10) {
        var $549 = ({
            _: 'Mons.Attr.new',
            'blocks': _blocks$1,
            'mhp': _mhp$2,
            'atk': _atk$3,
            'name': _name$4,
            'wlk': _wlk$5,
            'idl': _idl$6,
            'pic': _pic$7,
            'battle_spr': _battle_spr$8,
            'skills': _skills$9,
            'pos': _pos$10
        });
        return $549;
    };
    const Mons$Attr$new = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => x8 => x9 => Mons$Attr$new$(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

    function Mons$Kind$set_static_sprites$(_spr$1, _x$2, _y$3, _obj_ani$4, _obj_dir$5) {
        var $550 = _spr$1;
        return $550;
    };
    const Mons$Kind$set_static_sprites = x0 => x1 => x2 => x3 => x4 => Mons$Kind$set_static_sprites$(x0, x1, x2, x3, x4);
    const Image3D$empty = Image3D$alloc_capacity$(100);

    function Mons$Kind$set_pic$(_spr$1) {
        var self = _spr$1;
        switch (self._) {
            case 'List.nil':
                var $552 = Image3D$empty;
                var $551 = $552;
                break;
            case 'List.cons':
                var $553 = self.head;
                var $554 = self.tail;
                var $555 = $553;
                var $551 = $555;
                break;
        };
        return $551;
    };
    const Mons$Kind$set_pic = x0 => Mons$Kind$set_pic$(x0);

    function Mons$Kind$set_default_battle_spr$(_is_up$1) {
        var $556 = Image3D$empty;
        return $556;
    };
    const Mons$Kind$set_default_battle_spr = x0 => Mons$Kind$set_default_battle_spr$(x0);
    const Mons$global_scr_mid = ((0 | 2048 | (2048 << 12) | (0 << 24)));

    function Mons$Attr$new_neutral$(_spr$1) {
        var $557 = Mons$Attr$new$(Bool$false, 0, 0, "", Mons$Kind$set_static_sprites(_spr$1), _spr$1, Mons$Kind$set_pic$(_spr$1), Mons$Kind$set_default_battle_spr, List$nil, Mons$global_scr_mid);
        return $557;
    };
    const Mons$Attr$new_neutral = x0 => Mons$Attr$new_neutral$(x0);

    function Mons$Kind$attr$(_kin$1) {
        var $558 = Mons$Attr$new_neutral$(List$cons$(Image3D$empty, List$nil));
        return $558;
    };
    const Mons$Kind$attr = x0 => Mons$Kind$attr$(x0);

    function Mons$Object$get_ani$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $560 = self.kin;
                var $561 = self.dir;
                var $562 = self.pad;
                var $563 = self.ani;
                var $564 = self.dmg;
                var $565 = self.bag;
                var $566 = self.mon;
                var $567 = self.bos;
                var $568 = self.cap;
                var $569 = self.idl;
                var $570 = self.eff;
                var $571 = $563;
                var $559 = $571;
                break;
        };
        return $559;
    };
    const Mons$Object$get_ani = x0 => Mons$Object$get_ani$(x0);

    function Mons$Object$is_standing$(_obj$1) {
        var $572 = (Mons$Object$get_ani$(_obj$1) === 0);
        return $572;
    };
    const Mons$Object$is_standing = x0 => Mons$Object$is_standing$(x0);
    const U32$length = a0 => (a0.length);
    const U32$slice = a0 => a1 => a2 => (a2.slice(a0, a1));
    const U32$read_base = a0 => a1 => (parseInt(a1, a0));

    function Image3D$parse_byte$(_idx$1, _voxdata$2) {
        var _chr$3 = (_voxdata$2.slice(((_idx$1 * 2) >>> 0), ((((_idx$1 * 2) >>> 0) + 2) >>> 0)));
        var $573 = (parseInt(_chr$3, 16));
        return $573;
    };
    const Image3D$parse_byte = x0 => x1 => Image3D$parse_byte$(x0, x1);
    const Col32$new = a0 => a1 => a2 => a3 => ((0 | a0 | (a1 << 8) | (a2 << 16) | (a3 << 24)));

    function Word$trim$(_new_size$2, _word$3) {
        var self = _new_size$2;
        if (self === 0n) {
            var $575 = Word$e;
            var $574 = $575;
        } else {
            var $576 = (self - 1n);
            var self = _word$3;
            switch (self._) {
                case 'Word.e':
                    var $578 = Word$o$(Word$trim$($576, Word$e));
                    var $577 = $578;
                    break;
                case 'Word.o':
                    var $579 = self.pred;
                    var $580 = Word$o$(Word$trim$($576, $579));
                    var $577 = $580;
                    break;
                case 'Word.i':
                    var $581 = self.pred;
                    var $582 = Word$i$(Word$trim$($576, $581));
                    var $577 = $582;
                    break;
            };
            var $574 = $577;
        };
        return $574;
    };
    const Word$trim = x0 => x1 => Word$trim$(x0, x1);
    const Unit$new = 1;

    function Array$extract_tip$(_arr$2) {
        var self = _arr$2;
        switch (self._) {
            case 'Array.tip':
                var $584 = self.value;
                var $585 = $584;
                var $583 = $585;
                break;
            case 'Array.tie':
                var $586 = self.lft;
                var $587 = self.rgt;
                var $588 = Unit$new;
                var $583 = $588;
                break;
        };
        return $583;
    };
    const Array$extract_tip = x0 => Array$extract_tip$(x0);

    function Array$extract_tie$(_arr$3) {
        var self = _arr$3;
        switch (self._) {
            case 'Array.tip':
                var $590 = self.value;
                var $591 = Unit$new;
                var $589 = $591;
                break;
            case 'Array.tie':
                var $592 = self.lft;
                var $593 = self.rgt;
                var $594 = Pair$new$($592, $593);
                var $589 = $594;
                break;
        };
        return $589;
    };
    const Array$extract_tie = x0 => Array$extract_tie$(x0);

    function Word$foldl$(_nil$3, _w0$4, _w1$5, _word$6) {
        var Word$foldl$ = (_nil$3, _w0$4, _w1$5, _word$6) => ({
            ctr: 'TCO',
            arg: [_nil$3, _w0$4, _w1$5, _word$6]
        });
        var Word$foldl = _nil$3 => _w0$4 => _w1$5 => _word$6 => Word$foldl$(_nil$3, _w0$4, _w1$5, _word$6);
        var arg = [_nil$3, _w0$4, _w1$5, _word$6];
        while (true) {
            let [_nil$3, _w0$4, _w1$5, _word$6] = arg;
            var R = (() => {
                var self = _word$6;
                switch (self._) {
                    case 'Word.e':
                        var $595 = _nil$3;
                        return $595;
                    case 'Word.o':
                        var $596 = self.pred;
                        var $597 = Word$foldl$(_w0$4(_nil$3), _w0$4, _w1$5, $596);
                        return $597;
                    case 'Word.i':
                        var $598 = self.pred;
                        var $599 = Word$foldl$(_w1$5(_nil$3), _w0$4, _w1$5, $598);
                        return $599;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Word$foldl = x0 => x1 => x2 => x3 => Word$foldl$(x0, x1, x2, x3);

    function Array$mut$(_idx$3, _f$4, _arr$5) {
        var $600 = Word$foldl$((_arr$6 => {
            var $601 = Array$tip$(_f$4(Array$extract_tip$(_arr$6)));
            return $601;
        }), (_rec$7 => _arr$8 => {
            var self = Array$extract_tie$(_arr$8);
            switch (self._) {
                case 'Pair.new':
                    var $603 = self.fst;
                    var $604 = self.snd;
                    var $605 = Array$tie$(_rec$7($603), $604);
                    var $602 = $605;
                    break;
            };
            return $602;
        }), (_rec$7 => _arr$8 => {
            var self = Array$extract_tie$(_arr$8);
            switch (self._) {
                case 'Pair.new':
                    var $607 = self.fst;
                    var $608 = self.snd;
                    var $609 = Array$tie$($607, _rec$7($608));
                    var $606 = $609;
                    break;
            };
            return $606;
        }), _idx$3)(_arr$5);
        return $600;
    };
    const Array$mut = x0 => x1 => x2 => Array$mut$(x0, x1, x2);

    function Array$set$(_idx$3, _val$4, _arr$5) {
        var $610 = Array$mut$(_idx$3, (_x$6 => {
            var $611 = _val$4;
            return $611;
        }), _arr$5);
        return $610;
    };
    const Array$set = x0 => x1 => x2 => Array$set$(x0, x1, x2);
    const Buffer32$set = a0 => a1 => a2 => ((a2[a0] = a1, a2));
    const Image3D$set_pos = a0 => a1 => a2 => ((a2.buffer[a0 * 2] = a1, a2));
    const Image3D$set_col = a0 => a1 => a2 => ((a2.buffer[a0 * 2 + 1] = a1, a2));
    const Image3D$push = a0 => a1 => a2 => ((a2.buffer[a2.length * 2] = a0, a2.buffer[a2.length * 2 + 1] = a1, a2.length++, a2));

    function Image3D$parse$(_voxdata$1) {
        var _siz$2 = (((_voxdata$1.length) / 12) >>> 0);
        var _img$3 = Image3D$alloc_capacity$(_siz$2);
        var $612 = (() => {
            var $613 = _img$3;
            var $614 = 0;
            var $615 = _siz$2;
            let _img$5 = $613;
            for (let _i$4 = $614; _i$4 < $615; ++_i$4) {
                var _x$6 = Image3D$parse_byte$(((((_i$4 * 6) >>> 0) + 0) >>> 0), _voxdata$1);
                var _y$7 = Image3D$parse_byte$(((((_i$4 * 6) >>> 0) + 1) >>> 0), _voxdata$1);
                var _z$8 = Image3D$parse_byte$(((((_i$4 * 6) >>> 0) + 2) >>> 0), _voxdata$1);
                var _r$9 = Image3D$parse_byte$(((((_i$4 * 6) >>> 0) + 3) >>> 0), _voxdata$1);
                var _g$10 = Image3D$parse_byte$(((((_i$4 * 6) >>> 0) + 4) >>> 0), _voxdata$1);
                var _b$11 = Image3D$parse_byte$(((((_i$4 * 6) >>> 0) + 5) >>> 0), _voxdata$1);
                var _pos$12 = ((0 | _x$6 | (_y$7 << 12) | (_z$8 << 24)));
                var _col$13 = ((0 | _r$9 | (_g$10 << 8) | (_b$11 << 16) | (255 << 24)));
                var _img$14 = ((_img$5.buffer[_img$5.length * 2] = _pos$12, _img$5.buffer[_img$5.length * 2 + 1] = _col$13, _img$5.length++, _img$5));
                var $613 = _img$14;
                _img$5 = $613;
            };
            return _img$5;
        })();
        return $612;
    };
    const Image3D$parse = x0 => Image3D$parse$(x0);
    const Mons$Char_black$103 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff818428ffffff7e8528ffffff7f8528ffffff808528ffffff");

    function Image3D$get_length$(_img$1) {
        var self = _img$1;
        switch (self._) {
            case 'Image3D.new':
                var $617 = self.length;
                var $618 = self.capacity;
                var $619 = self.buffer;
                var $620 = $617;
                var $616 = $620;
                break;
        };
        return $616;
    };
    const Image3D$get_length = x0 => Image3D$get_length$(x0);

    function Array$get$(_idx$3, _arr$4) {
        var $621 = Word$foldl$(Array$extract_tip, (_rec$6 => _arr$7 => {
            var _arr_l$8 = Array$extract_tie$(_arr$7);
            var self = _arr_l$8;
            switch (self._) {
                case 'Pair.new':
                    var $623 = self.fst;
                    var $624 = self.snd;
                    var $625 = _rec$6($623);
                    var $622 = $625;
                    break;
            };
            return $622;
        }), (_rec$6 => _arr$7 => {
            var _arr_r$8 = Array$extract_tie$(_arr$7);
            var self = _arr_r$8;
            switch (self._) {
                case 'Pair.new':
                    var $627 = self.fst;
                    var $628 = self.snd;
                    var $629 = _rec$6($628);
                    var $626 = $629;
                    break;
            };
            return $626;
        }), _idx$3)(_arr$4);
        return $621;
    };
    const Array$get = x0 => x1 => Array$get$(x0, x1);
    const Buffer32$get = a0 => a1 => ((a1[a0]));
    const Image3D$get_pos = a0 => a1 => ((a1.buffer[a0 * 2]));
    const Image3D$get_col = a0 => a1 => ((a1.buffer[a0 * 2 + 1]));

    function Pos32$sub$(_a$1, _b$2) {
        var _a_x$3 = ((_a$1 & 0xFFF));
        var _a_y$4 = (((_a$1 >>> 12) & 0xFFF));
        var _a_z$5 = ((_a$1 >>> 24));
        var _b_x$6 = ((_b$2 & 0xFFF));
        var _b_y$7 = (((_b$2 >>> 12) & 0xFFF));
        var _b_z$8 = ((_b$2 >>> 24));
        var _c_x$9 = (Math.max(_a_x$3 - _b_x$6, 0));
        var _c_y$10 = (Math.max(_a_y$4 - _b_y$7, 0));
        var _c_z$11 = (Math.max(_a_z$5 - _b_z$8, 0));
        var $630 = ((0 | _c_x$9 | (_c_y$10 << 12) | (_c_z$11 << 24)));
        return $630;
    };
    const Pos32$sub = x0 => x1 => Pos32$sub$(x0, x1);

    function Pos32$add$(_a$1, _b$2) {
        var _a_x$3 = ((_a$1 & 0xFFF));
        var _a_y$4 = (((_a$1 >>> 12) & 0xFFF));
        var _a_z$5 = ((_a$1 >>> 24));
        var _b_x$6 = ((_b$2 & 0xFFF));
        var _b_y$7 = (((_b$2 >>> 12) & 0xFFF));
        var _b_z$8 = ((_b$2 >>> 24));
        var _c_x$9 = ((_a_x$3 + _b_x$6) >>> 0);
        var _c_y$10 = ((_a_y$4 + _b_y$7) >>> 0);
        var _c_z$11 = ((_a_z$5 + _b_z$8) >>> 0);
        var $631 = ((0 | _c_x$9 | (_c_y$10 << 12) | (_c_z$11 << 24)));
        return $631;
    };
    const Pos32$add = x0 => x1 => Pos32$add$(x0, x1);
    const Mons$vox_mid = ((0 | 128 | (128 << 12) | (0 << 24)));

    function Mons$draw$image$(_img$1, _pos$2, _scr$3) {
        var _len$4 = Image3D$get_length$(_img$1);
        var _scr$5 = (() => {
            var $633 = _scr$3;
            var $634 = 0;
            var $635 = _len$4;
            let _scr$6 = $633;
            for (let _i$5 = $634; _i$5 < $635; ++_i$5) {
                var _pix_pos$7 = ((_img$1.buffer[_i$5 * 2]));
                var _pix_col$8 = ((_img$1.buffer[_i$5 * 2 + 1]));
                var _pix_pos$9 = Pos32$sub$(Pos32$add$(_pos$2, _pix_pos$7), Mons$vox_mid);
                var $633 = ((_scr$6.buffer[_scr$6.length * 2] = _pix_pos$9, _scr$6.buffer[_scr$6.length * 2 + 1] = _pix_col$8, _scr$6.length++, _scr$6));
                _scr$6 = $633;
            };
            return _scr$6;
        })();
        var $632 = _scr$5;
        return $632;
    };
    const Mons$draw$image = x0 => x1 => x2 => Mons$draw$image$(x0, x1, x2);
    const List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));

    function List$imap$(_f$3, _xs$4) {
        var self = _xs$4;
        switch (self._) {
            case 'List.nil':
                var $637 = List$nil;
                var $636 = $637;
                break;
            case 'List.cons':
                var $638 = self.head;
                var $639 = self.tail;
                var $640 = List$cons$(_f$3(0n)($638), List$imap$((_n$7 => {
                    var $641 = _f$3(Nat$succ$(_n$7));
                    return $641;
                }), $639));
                var $636 = $640;
                break;
        };
        return $636;
    };
    const List$imap = x0 => x1 => List$imap$(x0, x1);

    function List$indices$u32$(_xs$2) {
        var $642 = List$imap$((_i$3 => _x$4 => {
            var $643 = Pair$new$((Number(_i$3)), _x$4);
            return $643;
        }), _xs$2);
        return $642;
    };
    const List$indices$u32 = x0 => List$indices$u32$(x0);

    function String$to_list$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $645 = List$nil;
            var $644 = $645;
        } else {
            var $646 = self.charCodeAt(0);
            var $647 = self.slice(1);
            var $648 = List$cons$($646, String$to_list$($647));
            var $644 = $648;
        };
        return $644;
    };
    const String$to_list = x0 => String$to_list$(x0);
    const U16$to_bits = a0 => (u16_to_bits(a0));

    function Mons$font$get_img$(_char$1, _map$2) {
        var self = Map$get$((u16_to_bits(_char$1)), _map$2);
        switch (self._) {
            case 'Maybe.none':
                var $650 = Maybe$none;
                var $649 = $650;
                break;
            case 'Maybe.some':
                var $651 = self.value;
                var $652 = Maybe$some$($651);
                var $649 = $652;
                break;
        };
        return $649;
    };
    const Mons$font$get_img = x0 => x1 => Mons$font$get_img$(x0, x1);

    function Mons$draw$char$(_chr$1, _font_map$2, _chr_pos$3, _scr$4) {
        var self = Mons$font$get_img$(_chr$1, _font_map$2);
        switch (self._) {
            case 'Maybe.none':
                var $654 = _scr$4;
                var $653 = $654;
                break;
            case 'Maybe.some':
                var $655 = self.value;
                var _img$6 = $655;
                var _img_len$7 = Image3D$get_length$(_img$6);
                var _scr$8 = (() => {
                    var $657 = _scr$4;
                    var $658 = 0;
                    var $659 = _img_len$7;
                    let _scr$9 = $657;
                    for (let _i$8 = $658; _i$8 < $659; ++_i$8) {
                        var _vox_pos$10 = ((_img$6.buffer[_i$8 * 2]));
                        var _pos$11 = Pos32$sub$(Pos32$add$(_chr_pos$3, _vox_pos$10), Mons$vox_mid);
                        var _col$12 = ((_img$6.buffer[_i$8 * 2 + 1]));
                        var $657 = ((_scr$9.buffer[_scr$9.length * 2] = _pos$11, _scr$9.buffer[_scr$9.length * 2 + 1] = _col$12, _scr$9.length++, _scr$9));
                        _scr$9 = $657;
                    };
                    return _scr$9;
                })();
                var $656 = _scr$8;
                var $653 = $656;
                break;
        };
        return $653;
    };
    const Mons$draw$char = x0 => x1 => x2 => x3 => Mons$draw$char$(x0, x1, x2, x3);

    function Mons$draw$text$(_txt$1, _font_map$2, _chr_pos$3, _scr$4) {
        var _scr$5 = (() => {
            var $662 = _scr$4;
            var $663 = List$indices$u32$(String$to_list$(_txt$1));
            let _scr$6 = $662;
            let _pair$5;
            while ($663._ === 'List.cons') {
                _pair$5 = $663.head;
                var self = _pair$5;
                switch (self._) {
                    case 'Pair.new':
                        var $664 = self.fst;
                        var $665 = self.snd;
                        var _add_pos$9 = ((0 | (($664 * 6) >>> 0) | (0 << 12) | (0 << 24)));
                        var $666 = Mons$draw$char$($665, _font_map$2, Pos32$add$(_chr_pos$3, _add_pos$9), _scr$6);
                        var $662 = $666;
                        break;
                };
                _scr$6 = $662;
                $663 = $663.tail;
            }
            return _scr$6;
        })();
        var $660 = _scr$5;
        return $660;
    };
    const Mons$draw$text = x0 => x1 => x2 => x3 => Mons$draw$text$(x0, x1, x2, x3);

    function Mons$draw$list$go$(_texts$1, _horizontal$2, _spacing$3, _font_map$4, _pos$5, _scr$6, _idx$7) {
        var Mons$draw$list$go$ = (_texts$1, _horizontal$2, _spacing$3, _font_map$4, _pos$5, _scr$6, _idx$7) => ({
            ctr: 'TCO',
            arg: [_texts$1, _horizontal$2, _spacing$3, _font_map$4, _pos$5, _scr$6, _idx$7]
        });
        var Mons$draw$list$go = _texts$1 => _horizontal$2 => _spacing$3 => _font_map$4 => _pos$5 => _scr$6 => _idx$7 => Mons$draw$list$go$(_texts$1, _horizontal$2, _spacing$3, _font_map$4, _pos$5, _scr$6, _idx$7);
        var arg = [_texts$1, _horizontal$2, _spacing$3, _font_map$4, _pos$5, _scr$6, _idx$7];
        while (true) {
            let [_texts$1, _horizontal$2, _spacing$3, _font_map$4, _pos$5, _scr$6, _idx$7] = arg;
            var R = (() => {
                var _x$8 = ((_pos$5 & 0xFFF));
                var _y$9 = (((_pos$5 >>> 12) & 0xFFF));
                var self = _horizontal$2;
                if (self) {
                    var $668 = ((0 | ((((_spacing$3 + _idx$7) >>> 0) + _x$8) >>> 0) | (_y$9 << 12) | (0 << 24)));
                    var _pos$10 = $668;
                } else {
                    var $669 = ((0 | _x$8 | (((((_spacing$3 + _idx$7) >>> 0) + _y$9) >>> 0) << 12) | (0 << 24)));
                    var _pos$10 = $669;
                };
                var self = _texts$1;
                switch (self._) {
                    case 'List.nil':
                        var $670 = _scr$6;
                        var $667 = $670;
                        break;
                    case 'List.cons':
                        var $671 = self.head;
                        var $672 = self.tail;
                        var _scr$13 = Mons$draw$text$($671, _font_map$4, _pos$10, _scr$6);
                        var $673 = Mons$draw$list$go$($672, _horizontal$2, _spacing$3, _font_map$4, _pos$10, _scr$13, ((_idx$7 + 1) >>> 0));
                        var $667 = $673;
                        break;
                };
                return $667;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Mons$draw$list$go = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Mons$draw$list$go$(x0, x1, x2, x3, x4, x5, x6);

    function Mons$draw$list$(_texts$1, _horizontal$2, _spacing$3, _font_map$4, _start_pos$5, _scr$6) {
        var _qtd$7 = (Number((list_length(_texts$1))));
        var $674 = Mons$draw$list$go$(_texts$1, _horizontal$2, _spacing$3, _font_map$4, _start_pos$5, _scr$6, 0);
        return $674;
    };
    const Mons$draw$list = x0 => x1 => x2 => x3 => x4 => x5 => Mons$draw$list$(x0, x1, x2, x3, x4, x5);

    function Mons$font$set_img$(_char$1, _img$2, _map$3) {
        var $675 = Map$set$((u16_to_bits(_char$1)), _img$2, _map$3);
        return $675;
    };
    const Mons$font$set_img = x0 => x1 => x2 => Mons$font$set_img$(x0, x1, x2);

    function U16$new$(_value$1) {
        var $676 = word_to_u16(_value$1);
        return $676;
    };
    const U16$new = x0 => U16$new$(x0);

    function U16$inc$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $678 = u16_to_word(self);
                var $679 = U16$new$(Word$inc$($678));
                var $677 = $679;
                break;
        };
        return $677;
    };
    const U16$inc = x0 => U16$inc$(x0);
    const U16$zero = U16$new$(Word$zero$(16n));
    const Nat$to_u16 = a0 => (Number(a0));
    const Mons$Char_black$100 = Image3D$parse$("817c28ffffff817d28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$101 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff7e8028ffffff7f8028ffffff808028ffffff818028ffffff7d8128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$102 = Image3D$parse$("7f7c28ffffff807c28ffffff817c28ffffff7e7d28ffffff7e7e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff817f28ffffff7e8028ffffff7e8128ffffff7e8228ffffff7e8328ffffff");
    const Mons$Char_black$104 = Image3D$parse$("7d7c28ffffff7d7d28ffffff7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$105 = Image3D$parse$("7f7d28ffffff7e7f28ffffff7f7f28ffffff7f8028ffffff7f8128ffffff7f8228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$106 = Image3D$parse$("817d28ffffff7f7f28ffffff807f28ffffff817f28ffffff818028ffffff818128ffffff818228ffffff818328ffffff818428ffffff7e8528ffffff7f8528ffffff808528ffffff");
    const Mons$Char_black$107 = Image3D$parse$("7d7c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff807f28ffffff7d8028ffffff7e8028ffffff7f8028ffffff7d8128ffffff808128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$108 = Image3D$parse$("7e7c28ffffff7f7c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff7f8028ffffff7f8128ffffff7f8228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$109 = Image3D$parse$("7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff7f7f28ffffff817f28ffffff7d8028ffffff7f8028ffffff818028ffffff7d8128ffffff7f8128ffffff818128ffffff7d8228ffffff7f8228ffffff818228ffffff7d8328ffffff7f8328ffffff818328ffffff");
    const Mons$Char_black$110 = Image3D$parse$("7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$111 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$112 = Image3D$parse$("7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff7d8428ffffff7d8528ffffff");
    const Mons$Char_black$113 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff818428ffffff818528ffffff");
    const Mons$Char_black$114 = Image3D$parse$("7d7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff7f7f28ffffff7d8028ffffff7e8028ffffff7d8128ffffff7d8228ffffff7d8328ffffff");
    const Mons$Char_black$115 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff7e8028ffffff7f8028ffffff808028ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$116 = Image3D$parse$("7e7c28ffffff7e7d28ffffff7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff7e7f28ffffff7e8028ffffff7e8128ffffff7e8228ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$117 = Image3D$parse$("7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$118 = Image3D$parse$("7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7e8228ffffff808228ffffff7f8328ffffff");
    const Mons$Char_black$119 = Image3D$parse$("7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff7f8128ffffff818128ffffff7d8228ffffff7f8228ffffff818228ffffff7e8328ffffff808328ffffff");
    const Mons$Char_black$120 = Image3D$parse$("7d7e28ffffff817e28ffffff7e7f28ffffff807f28ffffff7f8028ffffff7f8128ffffff7e8228ffffff808228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$121 = Image3D$parse$("7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff808428ffffff7d8528ffffff7e8528ffffff7f8528ffffff");
    const Mons$Char_black$122 = Image3D$parse$("7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff817e28ffffff817f28ffffff7f8028ffffff808028ffffff7e8128ffffff7d8228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$123 = Image3D$parse$("807c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff7e8028ffffff7f8128ffffff7f8228ffffff808328ffffff");
    const Mons$Char_black$124 = Image3D$parse$("7f7c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff7f8028ffffff7f8128ffffff7f8228ffffff7f8328ffffff");
    const Mons$Char_black$125 = Image3D$parse$("7e7c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff808028ffffff7f8128ffffff7f8228ffffff7e8328ffffff");
    const Mons$Char_black$126 = Image3D$parse$("7e7b28ffffff817b28ffffff7d7c28ffffff7f7c28ffffff817c28ffffff7d7d28ffffff807d28ffffff");
    const Mons$Char_black$32 = Image3D$parse$("");
    const Mons$Char_black$33 = Image3D$parse$("7f7c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff7f8028ffffff7f8128ffffff7f8328ffffff");
    const Mons$Char_black$34 = Image3D$parse$("7e7c28ffffff807c28ffffff7e7d28ffffff807d28ffffff");
    const Mons$Char_black$35 = Image3D$parse$("7e7c28ffffff807c28ffffff7e7d28ffffff807d28ffffff7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff817e28ffffff7e7f28ffffff807f28ffffff7e8028ffffff808028ffffff7d8128ffffff7e8128ffffff7f8128ffffff808128ffffff818128ffffff7e8228ffffff808228ffffff7e8328ffffff808328ffffff");
    const Mons$Char_black$36 = Image3D$parse$("7f7b28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff7e7f28ffffff7f8028ffffff808028ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff7f8428ffffff");
    const Mons$Char_black$37 = Image3D$parse$("7e7b28ffffff7d7c28ffffff7f7c28ffffff7e7d28ffffff817d28ffffff807e28ffffff7f7f28ffffff7e8028ffffff7d8128ffffff808128ffffff7f8228ffffff818228ffffff808328ffffff");
    const Mons$Char_black$38 = Image3D$parse$("7e7c28ffffff7f7c28ffffff7d7d28ffffff807d28ffffff7d7e28ffffff807e28ffffff7e7f28ffffff7f7f28ffffff7d8028ffffff7d8128ffffff7f8128ffffff808128ffffff818128ffffff7d8228ffffff808228ffffff7e8328ffffff7f8328ffffff818328ffffff");
    const Mons$Char_black$39 = Image3D$parse$("7f7c28ffffff7f7d28ffffff");
    const Mons$Char_black$40 = Image3D$parse$("807c28ffffff7f7d28ffffff7e7e28ffffff7e7f28ffffff7e8028ffffff7e8128ffffff7f8228ffffff808328ffffff");
    const Mons$Char_black$41 = Image3D$parse$("7e7c28ffffff7f7d28ffffff807e28ffffff807f28ffffff808028ffffff808128ffffff7f8228ffffff7e8328ffffff");
    const Mons$Char_black$42 = Image3D$parse$("7e7d28ffffff807d28ffffff7f7e28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff7f8028ffffff7e8128ffffff808128ffffff");
    const Mons$Char_black$43 = Image3D$parse$("7f7d28ffffff7f7e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff817f28ffffff7f8028ffffff7f8128ffffff");
    const Mons$Char_black$44 = Image3D$parse$("7f8228ffffff808228ffffff7f8328ffffff808328ffffff808428ffffff7f8528ffffff");
    const Mons$Char_black$45 = Image3D$parse$("7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff817f28ffffff");
    const Mons$Char_black$46 = Image3D$parse$("808328ffffff818328ffffff");
    const Mons$Char_black$47 = Image3D$parse$("817c28ffffff807d28ffffff807e28ffffff7f7f28ffffff7f8028ffffff7e8128ffffff7e8228ffffff7d8328ffffff");
    const Mons$Char_black$48 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff7f7f28ffffff817f28ffffff7d8028ffffff7f8028ffffff818028ffffff7d8128ffffff7e8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$49 = Image3D$parse$("807c28ffffff7f7d28ffffff807d28ffffff7e7e28ffffff807e28ffffff7d7f28ffffff807f28ffffff808028ffffff808128ffffff808228ffffff808328ffffff");
    const Mons$Char_black$50 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff807f28ffffff7f8028ffffff7e8128ffffff7d8228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$51 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff817e28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff818028ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$52 = Image3D$parse$("7e7c28ffffff7e7d28ffffff7e7e28ffffff807e28ffffff7e7f28ffffff807f28ffffff7d8028ffffff808028ffffff7d8128ffffff7e8128ffffff7f8128ffffff808128ffffff818128ffffff808228ffffff808328ffffff");
    const Mons$Char_black$53 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff817c28ffffff7d7d28ffffff7d7e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff818028ffffff818128ffffff818228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$54 = Image3D$parse$("807c28ffffff7f7d28ffffff7e7e28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$55 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff817c28ffffff817d28ffffff807e28ffffff7f7f28ffffff7e8028ffffff7e8128ffffff7e8228ffffff7e8328ffffff");
    const Mons$Char_black$56 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$57 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7e8028ffffff7f8028ffffff808028ffffff808128ffffff7f8228ffffff7e8328ffffff");
    const Mons$Char_black$58 = Image3D$parse$("7f7f28ffffff807f28ffffff7f8228ffffff808228ffffff");
    const Mons$Char_black$59 = Image3D$parse$("7f7f28ffffff807f28ffffff7f8228ffffff808228ffffff7f8328ffffff808328ffffff808428ffffff7f8528ffffff");
    const Mons$Char_black$60 = Image3D$parse$("807c28ffffff7f7d28ffffff7e7e28ffffff7d7f28ffffff7d8028ffffff7e8128ffffff7f8228ffffff808328ffffff");
    const Mons$Char_black$61 = Image3D$parse$("7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff817f28ffffff7d8128ffffff7e8128ffffff7f8128ffffff808128ffffff818128ffffff");
    const Mons$Char_black$62 = Image3D$parse$("7e7c28ffffff7f7d28ffffff807e28ffffff817f28ffffff818028ffffff808128ffffff7f8228ffffff7e8328ffffff");
    const Mons$Char_black$63 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff807f28ffffff7f8028ffffff7f8128ffffff7f8328ffffff");
    const Mons$Char_black$64 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff807e28ffffff817e28ffffff7d7f28ffffff7f7f28ffffff817f28ffffff7d8028ffffff7f8028ffffff818028ffffff7d8128ffffff808128ffffff818128ffffff7d8228ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$65 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff7e8128ffffff7f8128ffffff808128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$66 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$67 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff7d7f28ffffff7d8028ffffff7d8128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$68 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$69 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff817c28ffffff7d7d28ffffff7d7e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff817f28ffffff7d8028ffffff7d8128ffffff7d8228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$70 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff817c28ffffff7d7d28ffffff7d7e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff7d8028ffffff7d8128ffffff7d8228ffffff7d8328ffffff");
    const Mons$Char_black$71 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff7d7f28ffffff7d8028ffffff7d8128ffffff808128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$72 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff7e7f28ffffff7f7f28ffffff807f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$73 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff7f8028ffffff7f8128ffffff7f8228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$74 = Image3D$parse$("817c28ffffff817d28ffffff817e28ffffff817f28ffffff818028ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$75 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff807d28ffffff7d7e28ffffff7f7e28ffffff7d7f28ffffff7e7f28ffffff7d8028ffffff7f8028ffffff7d8128ffffff808128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$76 = Image3D$parse$("7d7c28ffffff7d7d28ffffff7d7e28ffffff7d7f28ffffff7d8028ffffff7d8128ffffff7d8228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$77 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff7e7d28ffffff807d28ffffff817d28ffffff7d7e28ffffff7f7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$78 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff7e7d28ffffff817d28ffffff7d7e28ffffff7f7e28ffffff817e28ffffff7d7f28ffffff807f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$79 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$80 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff7e8028ffffff7f8028ffffff808028ffffff7d8128ffffff7d8228ffffff7d8328ffffff");
    const Mons$Char_black$81 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff808428ffffff818428ffffff");
    const Mons$Char_black$82 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff7e8028ffffff7f8028ffffff808028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$83 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff7e7f28ffffff7f7f28ffffff808028ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$84 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff817c28ffffff7f7d28ffffff7f7e28ffffff7f7f28ffffff7f8028ffffff7f8128ffffff7f8228ffffff7f8328ffffff");
    const Mons$Char_black$85 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$86 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7e8228ffffff808228ffffff7f8328ffffff");
    const Mons$Char_black$87 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff7f8128ffffff818128ffffff7d8228ffffff7e8228ffffff808228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$88 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff817d28ffffff7e7e28ffffff807e28ffffff7f7f28ffffff7f8028ffffff7e8128ffffff808128ffffff7d8228ffffff818228ffffff7d8328ffffff818328ffffff");
    const Mons$Char_black$89 = Image3D$parse$("7d7c28ffffff817c28ffffff7d7d28ffffff817d28ffffff7d7e28ffffff817e28ffffff7e7f28ffffff807f28ffffff7f8028ffffff7f8128ffffff7f8228ffffff7f8328ffffff");
    const Mons$Char_black$90 = Image3D$parse$("7d7c28ffffff7e7c28ffffff7f7c28ffffff807c28ffffff817c28ffffff817d28ffffff807e28ffffff7f7f28ffffff7e8028ffffff7e8128ffffff7d8228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$91 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff7e7d28ffffff7e7e28ffffff7e7f28ffffff7e8028ffffff7e8128ffffff7e8228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$92 = Image3D$parse$("7d7c28ffffff7e7d28ffffff7e7e28ffffff7f7f28ffffff7f8028ffffff808128ffffff808228ffffff818328ffffff");
    const Mons$Char_black$93 = Image3D$parse$("7e7c28ffffff7f7c28ffffff807c28ffffff807d28ffffff807e28ffffff807f28ffffff808028ffffff808128ffffff808228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$94 = Image3D$parse$("7f7b28ffffff7e7c28ffffff807c28ffffff7d7d28ffffff817d28ffffff");
    const Mons$Char_black$95 = Image3D$parse$("7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$96 = Image3D$parse$("7e7b28ffffff7f7c28ffffff807d28ffffff");
    const Mons$Char_black$97 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff817f28ffffff7e8028ffffff7f8028ffffff808028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff818328ffffff");
    const Mons$Char_black$98 = Image3D$parse$("7d7c28ffffff7d7d28ffffff7d7e28ffffff7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff818028ffffff7d8128ffffff818128ffffff7d8228ffffff818228ffffff7d8328ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$99 = Image3D$parse$("7e7e28ffffff7f7e28ffffff807e28ffffff7d7f28ffffff817f28ffffff7d8028ffffff7d8128ffffff7d8228ffffff818228ffffff7e8328ffffff7f8328ffffff808328ffffff");
    const Mons$Char_black$normal = Image3D$parse$("7e7e28544b487f7e28544b48807e28544b487d7f28544b487e7f28e7dcc17f7f28cab89d807f28bba38a817f28544b487d8028544b487e8028cab89d7f8028bba38a808028bba38a818028544b487d8128544b487e8128bba38a7f8128bba38a808128a5876e818128544b487e8228544b487f8228544b48808228544b48");
    const Mons$Char_black$earth = Image3D$parse$("7d7e285f35387e7e285f35387f7e285f3538807e285f3538817e285f35387d7f285f35387e7f289f5b447f7f289f5b44807f289f5b44817f285f35387d80284b2a357e8028884e3f7f8028884e3f808028884e3f8180284b2a357e81284b2a357f81286f403b8081284b2a357e82284b2a357f82284b2a358082284b2a35");
    const Mons$Char_black$fire = Image3D$parse$("7e7d28a432347f7d28a432347e7e28a432347f7e28fbe896807e28a432347d7f2898202e7e7f28e7cb557f7f28e7cb55807f28e7cb55817f2898202e7d802898202e7e8028efa93f7f8028efa93f808028efa93f81802898202e7d812877262f7e8128d3783c7f8128d3783c808128d3783c81812877262f7e822877262f7f822877262f80822877262f");
    const Mons$Char_black$water = Image3D$parse$("7e7d282f37707f7d282f37707e7e282f37707f7e28f0e8cc807e282f37707d7f282f37707e7f2863a9a47f7f2882c8ac807f28f0e8cc817f282f37707d80282729607e802863a9a47f8028799cd380802882c8ac8180282729607d81282729607e8128428a9b7f812863a9a480812863a9a48181282729607e82283421637f8228342163808228342163");
    const Mons$Char_black$grass = Image3D$parse$("807d28375839817d28477e3d7f7e28375839807e2885ca77817e283758397e7f283758397f7f2885ca77807f2864af69817f283758397d80282a56517e802885ca777f8028287f4e80802864af698180283758397d81282a56517e8128287f4e7f812864af6980812885ca778181283758397e82282a56517f82282a5651808228375839");
    const Mons$Char_black$electric = Image3D$parse$("7f7d28d3783c807d28d3783c7e7e28c766437f7e28e7cb55807e28d3783c7d7f28b64c3b7e7f28dab04d7f7f28c766437e8028c766437f8028dab04d808028b64c3b7d8128c766437e8128e7cb557f8128c766437d8228d3783c7e8228c76643");
    const Mons$Char_black$psychic = Image3D$parse$("7e7e286420737f7e28642073807e286420737d7f286420737e7f28c757a67f7f28ac4999807f28f0e8cc817f286420737d80284a2b717e8028fa83a97f8028342163808028ac49998180284a2b717d81283421637e8128fa83a97f8128fa83a9808128c757a68181283421637e82283421637f8228342163808228342163");
    const Mons$Char_black$ice = Image3D$parse$("7e7e2882c8ac7f7e284662a1807e2882c8ac7d7f2882c8ac7e7f2863a9a47f7f28394c87807f2863a9a4817f2882c8ac7d80284662a17e8028394c877f802863a9a4808028394c878180284662a17d812882c8ac7e812863a9a47f8128394c8780812863a9a481812882c8ac7e822882c8ac7f82284662a180822882c8ac");
    const Mons$Char_black$light = Image3D$parse$("7e7e28d296437f7e28dab04d807e28d296437d7f28d296437e7f28fbe8967f7f28e7cb55807f28fbe896817f28d296437d8028dab04d7e8028e7cb557f8028fbe896808028e7cb55818028dab04d7d8128d296437e8128fbe8967f8128e7cb55808128fbe896818128d296437e8228d296437f8228dab04d808228d29643");
    const Mons$Char_black$darkness = Image3D$parse$("7e7e284a2b717f7e282c333d807e284a2b717d7f284a2b717e7f286a3a867f7f28353b48807f286a3a86817f284a2b717d80282c333d7e8028353b487f80282c333d808028353b488180282c333d7d81284a2b717e81286a3a867f8128353b488081286a3a868181284a2b717e82284a2b717f82282c333d8082284a2b71");
    const Mons$Char_black$s_72 = Image3D$parse$("7d7d28212128807d282121287d7e28212128807e282121287d7f282121287e7f282121287f7f28212128807f282121287d80282121288080282121287d8128212128808128212128");
    const Mons$Char_black$s_80 = Image3D$parse$("7d7d282121287e7d282121287f7d28212128807d282121287d7e28212128807e282121287d7f282121287e7f282121287f7f282121287d80282121287d8128212128");
    const Mons$Char_black$burn = Image3D$parse$("7d7d1e4b2a357e7d1e4b2a357f7d1e4b2a357d7e1e4b2a357e7e1efa642f7f7e1efa642f807e1e4b2a357e7f1e4b2a357f7f1eefa93f807f1efa642f817f1e4b2a357d801e4b2a357e801eefa93f7f801efbe89680801efbe89681801e4b2a357d811e4b2a357e811efa642f7f811eefa93f80811efbe89681811e4b2a357d821e4b2a357e821efa642f7f821efa642f80821eefa93f81821e4b2a357e831e4b2a357f831e4b2a3580831e4b2a35");
    const Mons$Char_black$hit = Image3D$parse$("7f7d1e3758397e7e1e3758397f7e1ec7c85c807e1e3758397e7f1e3758397f7f1ec7c85c807f1e3758397d801e3758397e801e6b91477f801e6b914780801ec7c85c81801e3758397d811e3758397e811e477e3d7f811e477e3d80811ec7c85c81811e3758397d821e3758397e821e477e3d7f821e477e3d80821e6b914781821e3758397e831e3758397f831e37583980831e375839");
    const Mons$Char_black$invulnerable = Image3D$parse$("7d7d1e4b2a357e7d1e4b2a35817d1e4b2a357d7e1e4b2a357e7e1edab04d7f7e1e4b2a35807e1e4b2a35817e1ef0e8cc7e7f1e4b2a357f7f1ef0e8cc807f1ee7cb55817f1e4b2a357e801e4b2a357f801ee7cb5580801edab04d81801e4b2a357d811e4b2a357e811ee7cb557f811edab04d80811ed3783c81811e4b2a357d821edab04d7e821e4b2a357f821e4b2a3580821e4b2a3581821edab04d7d831e4b2a3581831e4b2a35");
    const Mons$Char_black$minimize = Image3D$parse$("7d7d1e2c333d7e7d1e2c333d7f7d1e2c333d807d1e2c333d817d1e2c333d7d7e1e2c333d7e7e1e656c7f7f7e1eabaeb2807e1eabaeb2817e1e2c333d7d7f1e2c333d7e7f1e656c7f7f7f1e656c7f807f1e656c7f817f1e2c333d7d801e2c333d7e801e565d6e7f801e565d6e80801e656c7f81801e2c333d7d811e2c333d7e811e565d6e7f811e565d6e80811e656c7f81811e2c333d7e821e2c333d7f821e565d6e80821e2c333d7f831e2c333d");
    const Mons$Char_black$poison = Image3D$parse$("7f7d1e5f19347e7e1e5f19347f7e1edf3e46807e1e5f19347e7f1e5f19347f7f1edf3e46807f1e5f19347d801e5f19347e801ea2242c7f801ea2242c80801edf3e4681801e5f19347d811e5f19347e811e8c0b2c7f811e8c0b2c80811edf3e4681811e5f19347d821e5f19347e821e8c0b2c7f821e8c0b2c80821ea2242c81821e5f19347e831e5f19347f831e5f193480831e5f1934");
    const Mons$Char_black$protect = Image3D$parse$("7d7d1e4b2a357e7d1e4b2a357f7d1e4b2a35807d1e4b2a35817d1e4b2a357d7e1e4b2a357e7e1ecc833c7f7e1edab04d807e1edab04d817e1e4b2a357d7f1e4b2a357e7f1ecc833c7f7f1ecc833c807f1ecc833c817f1e4b2a357d801e4b2a357e801eb96b337f801eb96b3380801ecc833c81801e4b2a357d811e4b2a357e811eb96b337f811eb96b3380811ecc833c81811e4b2a357e821e4b2a357f821eb96b3380821e4b2a357f831e4b2a35");
    const Mons$Char_black$sleep = Image3D$parse$("7d7d1e2729607e7d1e2729607f7d1e272960807d1e272960817d1e2729607d7e1e2729607e7e1e799cd37f7e1e799cd3807e1e799cd3817e1e2729607e7f1e2729607f7f1e272960807f1e799cd3817f1e2729607e801e2729607f801e5176b880801e2729607d811e2729607e811e4662a17f811e27296080811e2729607d821e2729607e821e4662a17f821e4662a180821e4662a181821e2729607d831e2729607e831e2729607f831e27296080831e27296081831e272960");
    const Mons$Char_black$font = (() => {
        var _map$1 = Map$new;
        var _map$2 = Mons$font$set_img$(100, Mons$Char_black$100, _map$1);
        var _map$3 = Mons$font$set_img$(101, Mons$Char_black$101, _map$2);
        var _map$4 = Mons$font$set_img$(102, Mons$Char_black$102, _map$3);
        var _map$5 = Mons$font$set_img$(103, Mons$Char_black$103, _map$4);
        var _map$6 = Mons$font$set_img$(104, Mons$Char_black$104, _map$5);
        var _map$7 = Mons$font$set_img$(105, Mons$Char_black$105, _map$6);
        var _map$8 = Mons$font$set_img$(106, Mons$Char_black$106, _map$7);
        var _map$9 = Mons$font$set_img$(107, Mons$Char_black$107, _map$8);
        var _map$10 = Mons$font$set_img$(108, Mons$Char_black$108, _map$9);
        var _map$11 = Mons$font$set_img$(109, Mons$Char_black$109, _map$10);
        var _map$12 = Mons$font$set_img$(110, Mons$Char_black$110, _map$11);
        var _map$13 = Mons$font$set_img$(111, Mons$Char_black$111, _map$12);
        var _map$14 = Mons$font$set_img$(112, Mons$Char_black$112, _map$13);
        var _map$15 = Mons$font$set_img$(113, Mons$Char_black$113, _map$14);
        var _map$16 = Mons$font$set_img$(114, Mons$Char_black$114, _map$15);
        var _map$17 = Mons$font$set_img$(115, Mons$Char_black$115, _map$16);
        var _map$18 = Mons$font$set_img$(116, Mons$Char_black$116, _map$17);
        var _map$19 = Mons$font$set_img$(117, Mons$Char_black$117, _map$18);
        var _map$20 = Mons$font$set_img$(118, Mons$Char_black$118, _map$19);
        var _map$21 = Mons$font$set_img$(119, Mons$Char_black$119, _map$20);
        var _map$22 = Mons$font$set_img$(120, Mons$Char_black$120, _map$21);
        var _map$23 = Mons$font$set_img$(121, Mons$Char_black$121, _map$22);
        var _map$24 = Mons$font$set_img$(122, Mons$Char_black$122, _map$23);
        var _map$25 = Mons$font$set_img$(123, Mons$Char_black$123, _map$24);
        var _map$26 = Mons$font$set_img$(124, Mons$Char_black$124, _map$25);
        var _map$27 = Mons$font$set_img$(125, Mons$Char_black$125, _map$26);
        var _map$28 = Mons$font$set_img$(126, Mons$Char_black$126, _map$27);
        var _map$29 = Mons$font$set_img$(32, Mons$Char_black$32, _map$28);
        var _map$30 = Mons$font$set_img$(33, Mons$Char_black$33, _map$29);
        var _map$31 = Mons$font$set_img$(34, Mons$Char_black$34, _map$30);
        var _map$32 = Mons$font$set_img$(35, Mons$Char_black$35, _map$31);
        var _map$33 = Mons$font$set_img$(36, Mons$Char_black$36, _map$32);
        var _map$34 = Mons$font$set_img$(37, Mons$Char_black$37, _map$33);
        var _map$35 = Mons$font$set_img$(38, Mons$Char_black$38, _map$34);
        var _map$36 = Mons$font$set_img$(39, Mons$Char_black$39, _map$35);
        var _map$37 = Mons$font$set_img$(40, Mons$Char_black$40, _map$36);
        var _map$38 = Mons$font$set_img$(41, Mons$Char_black$41, _map$37);
        var _map$39 = Mons$font$set_img$(42, Mons$Char_black$42, _map$38);
        var _map$40 = Mons$font$set_img$(43, Mons$Char_black$43, _map$39);
        var _map$41 = Mons$font$set_img$(44, Mons$Char_black$44, _map$40);
        var _map$42 = Mons$font$set_img$(45, Mons$Char_black$45, _map$41);
        var _map$43 = Mons$font$set_img$(46, Mons$Char_black$46, _map$42);
        var _map$44 = Mons$font$set_img$(47, Mons$Char_black$47, _map$43);
        var _map$45 = Mons$font$set_img$(48, Mons$Char_black$48, _map$44);
        var _map$46 = Mons$font$set_img$(49, Mons$Char_black$49, _map$45);
        var _map$47 = Mons$font$set_img$(50, Mons$Char_black$50, _map$46);
        var _map$48 = Mons$font$set_img$(51, Mons$Char_black$51, _map$47);
        var _map$49 = Mons$font$set_img$(52, Mons$Char_black$52, _map$48);
        var _map$50 = Mons$font$set_img$(53, Mons$Char_black$53, _map$49);
        var _map$51 = Mons$font$set_img$(54, Mons$Char_black$54, _map$50);
        var _map$52 = Mons$font$set_img$(55, Mons$Char_black$55, _map$51);
        var _map$53 = Mons$font$set_img$(56, Mons$Char_black$56, _map$52);
        var _map$54 = Mons$font$set_img$(57, Mons$Char_black$57, _map$53);
        var _map$55 = Mons$font$set_img$(58, Mons$Char_black$58, _map$54);
        var _map$56 = Mons$font$set_img$(59, Mons$Char_black$59, _map$55);
        var _map$57 = Mons$font$set_img$(60, Mons$Char_black$60, _map$56);
        var _map$58 = Mons$font$set_img$(61, Mons$Char_black$61, _map$57);
        var _map$59 = Mons$font$set_img$(62, Mons$Char_black$62, _map$58);
        var _map$60 = Mons$font$set_img$(63, Mons$Char_black$63, _map$59);
        var _map$61 = Mons$font$set_img$(64, Mons$Char_black$64, _map$60);
        var _map$62 = Mons$font$set_img$(65, Mons$Char_black$65, _map$61);
        var _map$63 = Mons$font$set_img$(66, Mons$Char_black$66, _map$62);
        var _map$64 = Mons$font$set_img$(67, Mons$Char_black$67, _map$63);
        var _map$65 = Mons$font$set_img$(68, Mons$Char_black$68, _map$64);
        var _map$66 = Mons$font$set_img$(69, Mons$Char_black$69, _map$65);
        var _map$67 = Mons$font$set_img$(70, Mons$Char_black$70, _map$66);
        var _map$68 = Mons$font$set_img$(71, Mons$Char_black$71, _map$67);
        var _map$69 = Mons$font$set_img$(72, Mons$Char_black$72, _map$68);
        var _map$70 = Mons$font$set_img$(73, Mons$Char_black$73, _map$69);
        var _map$71 = Mons$font$set_img$(74, Mons$Char_black$74, _map$70);
        var _map$72 = Mons$font$set_img$(75, Mons$Char_black$75, _map$71);
        var _map$73 = Mons$font$set_img$(76, Mons$Char_black$76, _map$72);
        var _map$74 = Mons$font$set_img$(77, Mons$Char_black$77, _map$73);
        var _map$75 = Mons$font$set_img$(78, Mons$Char_black$78, _map$74);
        var _map$76 = Mons$font$set_img$(79, Mons$Char_black$79, _map$75);
        var _map$77 = Mons$font$set_img$(80, Mons$Char_black$80, _map$76);
        var _map$78 = Mons$font$set_img$(81, Mons$Char_black$81, _map$77);
        var _map$79 = Mons$font$set_img$(82, Mons$Char_black$82, _map$78);
        var _map$80 = Mons$font$set_img$(83, Mons$Char_black$83, _map$79);
        var _map$81 = Mons$font$set_img$(84, Mons$Char_black$84, _map$80);
        var _map$82 = Mons$font$set_img$(85, Mons$Char_black$85, _map$81);
        var _map$83 = Mons$font$set_img$(86, Mons$Char_black$86, _map$82);
        var _map$84 = Mons$font$set_img$(87, Mons$Char_black$87, _map$83);
        var _map$85 = Mons$font$set_img$(88, Mons$Char_black$88, _map$84);
        var _map$86 = Mons$font$set_img$(89, Mons$Char_black$89, _map$85);
        var _map$87 = Mons$font$set_img$(90, Mons$Char_black$90, _map$86);
        var _map$88 = Mons$font$set_img$(91, Mons$Char_black$91, _map$87);
        var _map$89 = Mons$font$set_img$(92, Mons$Char_black$92, _map$88);
        var _map$90 = Mons$font$set_img$(93, Mons$Char_black$93, _map$89);
        var _map$91 = Mons$font$set_img$(94, Mons$Char_black$94, _map$90);
        var _map$92 = Mons$font$set_img$(95, Mons$Char_black$95, _map$91);
        var _map$93 = Mons$font$set_img$(96, Mons$Char_black$96, _map$92);
        var _map$94 = Mons$font$set_img$(97, Mons$Char_black$97, _map$93);
        var _map$95 = Mons$font$set_img$(98, Mons$Char_black$98, _map$94);
        var _map$96 = Mons$font$set_img$(99, Mons$Char_black$99, _map$95);
        var _map$97 = Mons$font$set_img$(9312, Mons$Char_black$normal, _map$96);
        var _map$98 = Mons$font$set_img$(9313, Mons$Char_black$earth, _map$97);
        var _map$99 = Mons$font$set_img$(9314, Mons$Char_black$fire, _map$98);
        var _map$100 = Mons$font$set_img$(9315, Mons$Char_black$water, _map$99);
        var _map$101 = Mons$font$set_img$(9316, Mons$Char_black$grass, _map$100);
        var _map$102 = Mons$font$set_img$(9317, Mons$Char_black$electric, _map$101);
        var _map$103 = Mons$font$set_img$(9318, Mons$Char_black$psychic, _map$102);
        var _map$104 = Mons$font$set_img$(9319, Mons$Char_black$ice, _map$103);
        var _map$105 = Mons$font$set_img$(9320, Mons$Char_black$light, _map$104);
        var _map$106 = Mons$font$set_img$(9321, Mons$Char_black$darkness, _map$105);
        var _map$107 = Mons$font$set_img$(405, Mons$Char_black$s_72, _map$106);
        var _map$108 = Mons$font$set_img$(421, Mons$Char_black$s_80, _map$107);
        var _map$109 = Mons$font$set_img$(9398, Mons$Char_black$burn, _map$108);
        var _map$110 = Mons$font$set_img$(9399, Mons$Char_black$hit, _map$109);
        var _map$111 = Mons$font$set_img$(9400, Mons$Char_black$invulnerable, _map$110);
        var _map$112 = Mons$font$set_img$(9401, Mons$Char_black$minimize, _map$111);
        var _map$113 = Mons$font$set_img$(9402, Mons$Char_black$poison, _map$112);
        var _map$114 = Mons$font$set_img$(9403, Mons$Char_black$protect, _map$113);
        var _map$115 = Mons$font$set_img$(9404, Mons$Char_black$sleep, _map$114);
        var $680 = _map$115;
        return $680;
    })();

    function Mons$draw$list_selector$(_idx$1, _horizontal$2, _spacing$3, _font_map$4, _start_pos$5, _scr$6) {
        var _x$7 = ((_start_pos$5 & 0xFFF));
        var _y$8 = (((_start_pos$5 >>> 12) & 0xFFF));
        var _idx$9 = ((_idx$1 + 1) >>> 0);
        var self = _horizontal$2;
        if (self) {
            var $682 = ((0 | ((((_spacing$3 * _idx$9) >>> 0) + _x$7) >>> 0) | (_y$8 << 12) | (0 << 24)));
            var _pos$10 = $682;
        } else {
            var $683 = ((0 | _x$7 | (((((_spacing$3 * _idx$9) >>> 0) + _y$8) >>> 0) << 12) | (0 << 24)));
            var _pos$10 = $683;
        };
        var $681 = Mons$draw$text$("> ", _font_map$4, _pos$10, _scr$6);
        return $681;
    };
    const Mons$draw$list_selector = x0 => x1 => x2 => x3 => x4 => x5 => Mons$draw$list_selector$(x0, x1, x2, x3, x4, x5);
    const Mons$Char_white$100 = Image3D$parse$("817c1effffff817d1effffff7e7e1effffff7f7e1effffff807e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$101 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff7e801effffff7f801effffff80801effffff81801effffff7d811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$102 = Image3D$parse$("7f7c1effffff807c1effffff817c1effffff7e7d1effffff7e7e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff817f1effffff7e801effffff7e811effffff7e821effffff7e831effffff");
    const Mons$Char_white$103 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff81831effffff81841effffff7e851effffff7f851effffff80851effffff");
    const Mons$Char_white$104 = Image3D$parse$("7d7c1effffff7d7d1effffff7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$105 = Image3D$parse$("7f7d1effffff7e7f1effffff7f7f1effffff7f801effffff7f811effffff7f821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$106 = Image3D$parse$("817d1effffff7f7f1effffff807f1effffff817f1effffff81801effffff81811effffff81821effffff81831effffff81841effffff7e851effffff7f851effffff80851effffff");
    const Mons$Char_white$107 = Image3D$parse$("7d7c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff807f1effffff7d801effffff7e801effffff7f801effffff7d811effffff80811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$108 = Image3D$parse$("7e7c1effffff7f7c1effffff7f7d1effffff7f7e1effffff7f7f1effffff7f801effffff7f811effffff7f821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$109 = Image3D$parse$("7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff7f7f1effffff817f1effffff7d801effffff7f801effffff81801effffff7d811effffff7f811effffff81811effffff7d821effffff7f821effffff81821effffff7d831effffff7f831effffff81831effffff");
    const Mons$Char_white$110 = Image3D$parse$("7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$111 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$112 = Image3D$parse$("7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff7e831effffff7f831effffff80831effffff7d841effffff7d851effffff");
    const Mons$Char_white$113 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff81831effffff81841effffff81851effffff");
    const Mons$Char_white$114 = Image3D$parse$("7d7e1effffff807e1effffff817e1effffff7d7f1effffff7f7f1effffff7d801effffff7e801effffff7d811effffff7d821effffff7d831effffff");
    const Mons$Char_white$115 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff817e1effffff7d7f1effffff7e801effffff7f801effffff80801effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$116 = Image3D$parse$("7e7c1effffff7e7d1effffff7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff7e7f1effffff7e801effffff7e811effffff7e821effffff7f831effffff80831effffff");
    const Mons$Char_white$117 = Image3D$parse$("7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$118 = Image3D$parse$("7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7e821effffff80821effffff7f831effffff");
    const Mons$Char_white$119 = Image3D$parse$("7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff7f811effffff81811effffff7d821effffff7f821effffff81821effffff7e831effffff80831effffff");
    const Mons$Char_white$120 = Image3D$parse$("7d7e1effffff817e1effffff7e7f1effffff807f1effffff7f801effffff7f811effffff7e821effffff80821effffff7d831effffff81831effffff");
    const Mons$Char_white$121 = Image3D$parse$("7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff80841effffff7d851effffff7e851effffff7f851effffff");
    const Mons$Char_white$122 = Image3D$parse$("7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff817e1effffff817f1effffff7f801effffff80801effffff7e811effffff7d821effffff7d831effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$123 = Image3D$parse$("807c1effffff7f7d1effffff7f7e1effffff7f7f1effffff7e801effffff7f811effffff7f821effffff80831effffff");
    const Mons$Char_white$124 = Image3D$parse$("7f7c1effffff7f7d1effffff7f7e1effffff7f7f1effffff7f801effffff7f811effffff7f821effffff7f831effffff");
    const Mons$Char_white$125 = Image3D$parse$("7e7c1effffff7f7d1effffff7f7e1effffff7f7f1effffff80801effffff7f811effffff7f821effffff7e831effffff");
    const Mons$Char_white$126 = Image3D$parse$("7e7b1effffff817b1effffff7d7c1effffff7f7c1effffff817c1effffff7d7d1effffff807d1effffff");
    const Mons$Char_white$32 = Image3D$parse$("");
    const Mons$Char_white$33 = Image3D$parse$("7f7c1effffff7f7d1effffff7f7e1effffff7f7f1effffff7f801effffff7f811effffff7f831effffff");
    const Mons$Char_white$34 = Image3D$parse$("7e7c1effffff807c1effffff7e7d1effffff807d1effffff");
    const Mons$Char_white$35 = Image3D$parse$("7e7c1effffff807c1effffff7e7d1effffff807d1effffff7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff817e1effffff7e7f1effffff807f1effffff7e801effffff80801effffff7d811effffff7e811effffff7f811effffff80811effffff81811effffff7e821effffff80821effffff7e831effffff80831effffff");
    const Mons$Char_white$36 = Image3D$parse$("7f7b1effffff7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff7e7f1effffff7f801effffff80801effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff7f841effffff");
    const Mons$Char_white$37 = Image3D$parse$("7e7b1effffff7d7c1effffff7f7c1effffff7e7d1effffff817d1effffff807e1effffff7f7f1effffff7e801effffff7d811effffff80811effffff7f821effffff81821effffff80831effffff");
    const Mons$Char_white$38 = Image3D$parse$("7e7c1effffff7f7c1effffff7d7d1effffff807d1effffff7d7e1effffff807e1effffff7e7f1effffff7f7f1effffff7d801effffff7d811effffff7f811effffff80811effffff81811effffff7d821effffff80821effffff7e831effffff7f831effffff81831effffff");
    const Mons$Char_white$39 = Image3D$parse$("7f7c1effffff7f7d1effffff");
    const Mons$Char_white$40 = Image3D$parse$("807c1effffff7f7d1effffff7e7e1effffff7e7f1effffff7e801effffff7e811effffff7f821effffff80831effffff");
    const Mons$Char_white$41 = Image3D$parse$("7e7c1effffff7f7d1effffff807e1effffff807f1effffff80801effffff80811effffff7f821effffff7e831effffff");
    const Mons$Char_white$42 = Image3D$parse$("7e7d1effffff807d1effffff7f7e1effffff7e7f1effffff7f7f1effffff807f1effffff7f801effffff7e811effffff80811effffff");
    const Mons$Char_white$43 = Image3D$parse$("7f7d1effffff7f7e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff817f1effffff7f801effffff7f811effffff");
    const Mons$Char_white$44 = Image3D$parse$("7f821effffff80821effffff7f831effffff80831effffff80841effffff7f851effffff");
    const Mons$Char_white$45 = Image3D$parse$("7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff817f1effffff");
    const Mons$Char_white$46 = Image3D$parse$("80831effffff81831effffff");
    const Mons$Char_white$47 = Image3D$parse$("817c1effffff807d1effffff807e1effffff7f7f1effffff7f801effffff7e811effffff7e821effffff7d831effffff");
    const Mons$Char_white$48 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff807e1effffff817e1effffff7d7f1effffff7f7f1effffff817f1effffff7d801effffff7f801effffff81801effffff7d811effffff7e811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$49 = Image3D$parse$("807c1effffff7f7d1effffff807d1effffff7e7e1effffff807e1effffff7d7f1effffff807f1effffff80801effffff80811effffff80821effffff80831effffff");
    const Mons$Char_white$50 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff807f1effffff7f801effffff7e811effffff7d821effffff7d831effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$51 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff817e1effffff7e7f1effffff7f7f1effffff807f1effffff81801effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$52 = Image3D$parse$("7e7c1effffff7e7d1effffff7e7e1effffff807e1effffff7e7f1effffff807f1effffff7d801effffff80801effffff7d811effffff7e811effffff7f811effffff80811effffff81811effffff80821effffff80831effffff");
    const Mons$Char_white$53 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff817c1effffff7d7d1effffff7d7e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff81801effffff81811effffff81821effffff7d831effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$54 = Image3D$parse$("807c1effffff7f7d1effffff7e7e1effffff7e7f1effffff7f7f1effffff807f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$55 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff817c1effffff817d1effffff807e1effffff7f7f1effffff7e801effffff7e811effffff7e821effffff7e831effffff");
    const Mons$Char_white$56 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7e7f1effffff7f7f1effffff807f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$57 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7e801effffff7f801effffff80801effffff80811effffff7f821effffff7e831effffff");
    const Mons$Char_white$58 = Image3D$parse$("7f7f1effffff807f1effffff7f821effffff80821effffff");
    const Mons$Char_white$59 = Image3D$parse$("7f7f1effffff807f1effffff7f821effffff80821effffff7f831effffff80831effffff80841effffff7f851effffff");
    const Mons$Char_white$60 = Image3D$parse$("807c1effffff7f7d1effffff7e7e1effffff7d7f1effffff7d801effffff7e811effffff7f821effffff80831effffff");
    const Mons$Char_white$61 = Image3D$parse$("7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff817f1effffff7d811effffff7e811effffff7f811effffff80811effffff81811effffff");
    const Mons$Char_white$62 = Image3D$parse$("7e7c1effffff7f7d1effffff807e1effffff817f1effffff81801effffff80811effffff7f821effffff7e831effffff");
    const Mons$Char_white$63 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff807f1effffff7f801effffff7f811effffff7f831effffff");
    const Mons$Char_white$64 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff807e1effffff817e1effffff7d7f1effffff7f7f1effffff817f1effffff7d801effffff7f801effffff81801effffff7d811effffff80811effffff81811effffff7d821effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$65 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff7e811effffff7f811effffff80811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$66 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$67 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff7d7f1effffff7d801effffff7d811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$68 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$69 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff817c1effffff7d7d1effffff7d7e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff817f1effffff7d801effffff7d811effffff7d821effffff7d831effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$70 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff817c1effffff7d7d1effffff7d7e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff7d801effffff7d811effffff7d821effffff7d831effffff");
    const Mons$Char_white$71 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff7d7f1effffff7d801effffff7d811effffff80811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$72 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff7e7f1effffff7f7f1effffff807f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$73 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7f7d1effffff7f7e1effffff7f7f1effffff7f801effffff7f811effffff7f821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$74 = Image3D$parse$("817c1effffff817d1effffff817e1effffff817f1effffff81801effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$75 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff807d1effffff7d7e1effffff7f7e1effffff7d7f1effffff7e7f1effffff7d801effffff7f801effffff7d811effffff80811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$76 = Image3D$parse$("7d7c1effffff7d7d1effffff7d7e1effffff7d7f1effffff7d801effffff7d811effffff7d821effffff7d831effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$77 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff7e7d1effffff807d1effffff817d1effffff7d7e1effffff7f7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$78 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff7e7d1effffff817d1effffff7d7e1effffff7f7e1effffff817e1effffff7d7f1effffff807f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$79 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$80 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff7e801effffff7f801effffff80801effffff7d811effffff7d821effffff7d831effffff");
    const Mons$Char_white$81 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff80841effffff81841effffff");
    const Mons$Char_white$82 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff7e801effffff7f801effffff80801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$83 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7d7d1effffff817d1effffff7d7e1effffff7e7f1effffff7f7f1effffff80801effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$84 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff817c1effffff7f7d1effffff7f7e1effffff7f7f1effffff7f801effffff7f811effffff7f821effffff7f831effffff");
    const Mons$Char_white$85 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$86 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7e821effffff80821effffff7f831effffff");
    const Mons$Char_white$87 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff7f811effffff81811effffff7d821effffff7e821effffff80821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$88 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff817d1effffff7e7e1effffff807e1effffff7f7f1effffff7f801effffff7e811effffff80811effffff7d821effffff81821effffff7d831effffff81831effffff");
    const Mons$Char_white$89 = Image3D$parse$("7d7c1effffff817c1effffff7d7d1effffff817d1effffff7d7e1effffff817e1effffff7e7f1effffff807f1effffff7f801effffff7f811effffff7f821effffff7f831effffff");
    const Mons$Char_white$90 = Image3D$parse$("7d7c1effffff7e7c1effffff7f7c1effffff807c1effffff817c1effffff817d1effffff807e1effffff7f7f1effffff7e801effffff7e811effffff7d821effffff7d831effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$91 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff7e7d1effffff7e7e1effffff7e7f1effffff7e801effffff7e811effffff7e821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$92 = Image3D$parse$("7d7c1effffff7e7d1effffff7e7e1effffff7f7f1effffff7f801effffff80811effffff80821effffff81831effffff");
    const Mons$Char_white$93 = Image3D$parse$("7e7c1effffff7f7c1effffff807c1effffff807d1effffff807e1effffff807f1effffff80801effffff80811effffff80821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$94 = Image3D$parse$("7f7b1effffff7e7c1effffff807c1effffff7d7d1effffff817d1effffff");
    const Mons$Char_white$95 = Image3D$parse$("7d831effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$96 = Image3D$parse$("7e7b1effffff7f7c1effffff807d1effffff");
    const Mons$Char_white$97 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff817f1effffff7e801effffff7f801effffff80801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff81831effffff");
    const Mons$Char_white$98 = Image3D$parse$("7d7c1effffff7d7d1effffff7d7e1effffff7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff81801effffff7d811effffff81811effffff7d821effffff81821effffff7d831effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$99 = Image3D$parse$("7e7e1effffff7f7e1effffff807e1effffff7d7f1effffff817f1effffff7d801effffff7d811effffff7d821effffff81821effffff7e831effffff7f831effffff80831effffff");
    const Mons$Char_white$font = (() => {
        var _map$1 = Map$new;
        var _map$2 = Mons$font$set_img$(100, Mons$Char_white$100, _map$1);
        var _map$3 = Mons$font$set_img$(101, Mons$Char_white$101, _map$2);
        var _map$4 = Mons$font$set_img$(102, Mons$Char_white$102, _map$3);
        var _map$5 = Mons$font$set_img$(103, Mons$Char_white$103, _map$4);
        var _map$6 = Mons$font$set_img$(104, Mons$Char_white$104, _map$5);
        var _map$7 = Mons$font$set_img$(105, Mons$Char_white$105, _map$6);
        var _map$8 = Mons$font$set_img$(106, Mons$Char_white$106, _map$7);
        var _map$9 = Mons$font$set_img$(107, Mons$Char_white$107, _map$8);
        var _map$10 = Mons$font$set_img$(108, Mons$Char_white$108, _map$9);
        var _map$11 = Mons$font$set_img$(109, Mons$Char_white$109, _map$10);
        var _map$12 = Mons$font$set_img$(110, Mons$Char_white$110, _map$11);
        var _map$13 = Mons$font$set_img$(111, Mons$Char_white$111, _map$12);
        var _map$14 = Mons$font$set_img$(112, Mons$Char_white$112, _map$13);
        var _map$15 = Mons$font$set_img$(113, Mons$Char_white$113, _map$14);
        var _map$16 = Mons$font$set_img$(114, Mons$Char_white$114, _map$15);
        var _map$17 = Mons$font$set_img$(115, Mons$Char_white$115, _map$16);
        var _map$18 = Mons$font$set_img$(116, Mons$Char_white$116, _map$17);
        var _map$19 = Mons$font$set_img$(117, Mons$Char_white$117, _map$18);
        var _map$20 = Mons$font$set_img$(118, Mons$Char_white$118, _map$19);
        var _map$21 = Mons$font$set_img$(119, Mons$Char_white$119, _map$20);
        var _map$22 = Mons$font$set_img$(120, Mons$Char_white$120, _map$21);
        var _map$23 = Mons$font$set_img$(121, Mons$Char_white$121, _map$22);
        var _map$24 = Mons$font$set_img$(122, Mons$Char_white$122, _map$23);
        var _map$25 = Mons$font$set_img$(123, Mons$Char_white$123, _map$24);
        var _map$26 = Mons$font$set_img$(124, Mons$Char_white$124, _map$25);
        var _map$27 = Mons$font$set_img$(125, Mons$Char_white$125, _map$26);
        var _map$28 = Mons$font$set_img$(126, Mons$Char_white$126, _map$27);
        var _map$29 = Mons$font$set_img$(32, Mons$Char_white$32, _map$28);
        var _map$30 = Mons$font$set_img$(33, Mons$Char_white$33, _map$29);
        var _map$31 = Mons$font$set_img$(34, Mons$Char_white$34, _map$30);
        var _map$32 = Mons$font$set_img$(35, Mons$Char_white$35, _map$31);
        var _map$33 = Mons$font$set_img$(36, Mons$Char_white$36, _map$32);
        var _map$34 = Mons$font$set_img$(37, Mons$Char_white$37, _map$33);
        var _map$35 = Mons$font$set_img$(38, Mons$Char_white$38, _map$34);
        var _map$36 = Mons$font$set_img$(39, Mons$Char_white$39, _map$35);
        var _map$37 = Mons$font$set_img$(40, Mons$Char_white$40, _map$36);
        var _map$38 = Mons$font$set_img$(41, Mons$Char_white$41, _map$37);
        var _map$39 = Mons$font$set_img$(42, Mons$Char_white$42, _map$38);
        var _map$40 = Mons$font$set_img$(43, Mons$Char_white$43, _map$39);
        var _map$41 = Mons$font$set_img$(44, Mons$Char_white$44, _map$40);
        var _map$42 = Mons$font$set_img$(45, Mons$Char_white$45, _map$41);
        var _map$43 = Mons$font$set_img$(46, Mons$Char_white$46, _map$42);
        var _map$44 = Mons$font$set_img$(47, Mons$Char_white$47, _map$43);
        var _map$45 = Mons$font$set_img$(48, Mons$Char_white$48, _map$44);
        var _map$46 = Mons$font$set_img$(49, Mons$Char_white$49, _map$45);
        var _map$47 = Mons$font$set_img$(50, Mons$Char_white$50, _map$46);
        var _map$48 = Mons$font$set_img$(51, Mons$Char_white$51, _map$47);
        var _map$49 = Mons$font$set_img$(52, Mons$Char_white$52, _map$48);
        var _map$50 = Mons$font$set_img$(53, Mons$Char_white$53, _map$49);
        var _map$51 = Mons$font$set_img$(54, Mons$Char_white$54, _map$50);
        var _map$52 = Mons$font$set_img$(55, Mons$Char_white$55, _map$51);
        var _map$53 = Mons$font$set_img$(56, Mons$Char_white$56, _map$52);
        var _map$54 = Mons$font$set_img$(57, Mons$Char_white$57, _map$53);
        var _map$55 = Mons$font$set_img$(58, Mons$Char_white$58, _map$54);
        var _map$56 = Mons$font$set_img$(59, Mons$Char_white$59, _map$55);
        var _map$57 = Mons$font$set_img$(60, Mons$Char_white$60, _map$56);
        var _map$58 = Mons$font$set_img$(61, Mons$Char_white$61, _map$57);
        var _map$59 = Mons$font$set_img$(62, Mons$Char_white$62, _map$58);
        var _map$60 = Mons$font$set_img$(63, Mons$Char_white$63, _map$59);
        var _map$61 = Mons$font$set_img$(64, Mons$Char_white$64, _map$60);
        var _map$62 = Mons$font$set_img$(65, Mons$Char_white$65, _map$61);
        var _map$63 = Mons$font$set_img$(66, Mons$Char_white$66, _map$62);
        var _map$64 = Mons$font$set_img$(67, Mons$Char_white$67, _map$63);
        var _map$65 = Mons$font$set_img$(68, Mons$Char_white$68, _map$64);
        var _map$66 = Mons$font$set_img$(69, Mons$Char_white$69, _map$65);
        var _map$67 = Mons$font$set_img$(70, Mons$Char_white$70, _map$66);
        var _map$68 = Mons$font$set_img$(71, Mons$Char_white$71, _map$67);
        var _map$69 = Mons$font$set_img$(72, Mons$Char_white$72, _map$68);
        var _map$70 = Mons$font$set_img$(73, Mons$Char_white$73, _map$69);
        var _map$71 = Mons$font$set_img$(74, Mons$Char_white$74, _map$70);
        var _map$72 = Mons$font$set_img$(75, Mons$Char_white$75, _map$71);
        var _map$73 = Mons$font$set_img$(76, Mons$Char_white$76, _map$72);
        var _map$74 = Mons$font$set_img$(77, Mons$Char_white$77, _map$73);
        var _map$75 = Mons$font$set_img$(78, Mons$Char_white$78, _map$74);
        var _map$76 = Mons$font$set_img$(79, Mons$Char_white$79, _map$75);
        var _map$77 = Mons$font$set_img$(80, Mons$Char_white$80, _map$76);
        var _map$78 = Mons$font$set_img$(81, Mons$Char_white$81, _map$77);
        var _map$79 = Mons$font$set_img$(82, Mons$Char_white$82, _map$78);
        var _map$80 = Mons$font$set_img$(83, Mons$Char_white$83, _map$79);
        var _map$81 = Mons$font$set_img$(84, Mons$Char_white$84, _map$80);
        var _map$82 = Mons$font$set_img$(85, Mons$Char_white$85, _map$81);
        var _map$83 = Mons$font$set_img$(86, Mons$Char_white$86, _map$82);
        var _map$84 = Mons$font$set_img$(87, Mons$Char_white$87, _map$83);
        var _map$85 = Mons$font$set_img$(88, Mons$Char_white$88, _map$84);
        var _map$86 = Mons$font$set_img$(89, Mons$Char_white$89, _map$85);
        var _map$87 = Mons$font$set_img$(90, Mons$Char_white$90, _map$86);
        var _map$88 = Mons$font$set_img$(91, Mons$Char_white$91, _map$87);
        var _map$89 = Mons$font$set_img$(92, Mons$Char_white$92, _map$88);
        var _map$90 = Mons$font$set_img$(93, Mons$Char_white$93, _map$89);
        var _map$91 = Mons$font$set_img$(94, Mons$Char_white$94, _map$90);
        var _map$92 = Mons$font$set_img$(95, Mons$Char_white$95, _map$91);
        var _map$93 = Mons$font$set_img$(96, Mons$Char_white$96, _map$92);
        var _map$94 = Mons$font$set_img$(97, Mons$Char_white$97, _map$93);
        var _map$95 = Mons$font$set_img$(98, Mons$Char_white$98, _map$94);
        var _map$96 = Mons$font$set_img$(99, Mons$Char_white$99, _map$95);
        var _map$97 = Mons$font$set_img$(9312, Mons$Char_black$normal, _map$96);
        var _map$98 = Mons$font$set_img$(9313, Mons$Char_black$earth, _map$97);
        var _map$99 = Mons$font$set_img$(9314, Mons$Char_black$fire, _map$98);
        var _map$100 = Mons$font$set_img$(9315, Mons$Char_black$water, _map$99);
        var _map$101 = Mons$font$set_img$(9316, Mons$Char_black$grass, _map$100);
        var _map$102 = Mons$font$set_img$(9317, Mons$Char_black$electric, _map$101);
        var _map$103 = Mons$font$set_img$(9318, Mons$Char_black$psychic, _map$102);
        var _map$104 = Mons$font$set_img$(9319, Mons$Char_black$ice, _map$103);
        var _map$105 = Mons$font$set_img$(9320, Mons$Char_black$light, _map$104);
        var _map$106 = Mons$font$set_img$(9321, Mons$Char_black$darkness, _map$105);
        var $684 = _map$106;
        return $684;
    })();

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
                        var $685 = _res$3;
                        return $685;
                    case 'List.cons':
                        var $686 = self.head;
                        var $687 = self.tail;
                        var $688 = List$reverse$go$($687, List$cons$($686, _res$3));
                        return $688;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$reverse$go = x0 => x1 => List$reverse$go$(x0, x1);

    function List$reverse$(_xs$2) {
        var $689 = List$reverse$go$(_xs$2, List$nil);
        return $689;
    };
    const List$reverse = x0 => List$reverse$(x0);

    function Mons$Object$get_dir$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $691 = self.kin;
                var $692 = self.dir;
                var $693 = self.pad;
                var $694 = self.ani;
                var $695 = self.dmg;
                var $696 = self.bag;
                var $697 = self.mon;
                var $698 = self.bos;
                var $699 = self.cap;
                var $700 = self.idl;
                var $701 = self.eff;
                var $702 = $692;
                var $690 = $702;
                break;
        };
        return $690;
    };
    const Mons$Object$get_dir = x0 => Mons$Object$get_dir$(x0);

    function Mons$draw$global_xy$(_t_x$1, _t_y$2, _obj$3) {
        var self = _obj$3;
        switch (self._) {
            case 'Mons.Object.new':
                var $704 = self.kin;
                var $705 = self.dir;
                var $706 = self.pad;
                var $707 = self.ani;
                var $708 = self.dmg;
                var $709 = self.bag;
                var $710 = self.mon;
                var $711 = self.bos;
                var $712 = self.cap;
                var $713 = self.idl;
                var $714 = self.eff;
                var _ani$15 = Mons$Object$get_ani$(_obj$3);
                var _dir$16 = Mons$Object$get_dir$(_obj$3);
                var _g_x$17 = ((_t_x$1 * 16) >>> 0);
                var _g_y$18 = ((_t_y$2 * 16) >>> 0);
                var self = _dir$16;
                switch (self._) {
                    case 'Mons.Dir.right':
                        var $716 = (Math.max(_g_x$17 - _ani$15, 0));
                        var _g_x$19 = $716;
                        break;
                    case 'Mons.Dir.up':
                        var $717 = _g_x$17;
                        var _g_x$19 = $717;
                        break;
                    case 'Mons.Dir.left':
                        var $718 = ((_g_x$17 + _ani$15) >>> 0);
                        var _g_x$19 = $718;
                        break;
                    case 'Mons.Dir.down':
                        var $719 = _g_x$17;
                        var _g_x$19 = $719;
                        break;
                };
                var self = _dir$16;
                switch (self._) {
                    case 'Mons.Dir.right':
                        var $720 = _g_y$18;
                        var _g_y$20 = $720;
                        break;
                    case 'Mons.Dir.up':
                        var $721 = ((_g_y$18 + _ani$15) >>> 0);
                        var _g_y$20 = $721;
                        break;
                    case 'Mons.Dir.left':
                        var $722 = _g_y$18;
                        var _g_y$20 = $722;
                        break;
                    case 'Mons.Dir.down':
                        var $723 = (Math.max(_g_y$18 - _ani$15, 0));
                        var _g_y$20 = $723;
                        break;
                };
                var $715 = Pair$new$(_g_x$19, _g_y$20);
                var $703 = $715;
                break;
        };
        return $703;
    };
    const Mons$draw$global_xy = x0 => x1 => x2 => Mons$draw$global_xy$(x0, x1, x2);

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
                    var $724 = Nat$mod$go$(_n$1, _r$3, _m$2);
                    return $724;
                } else {
                    var $725 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $727 = _r$3;
                        var $726 = $727;
                    } else {
                        var $728 = (self - 1n);
                        var $729 = Nat$mod$go$($728, $725, Nat$succ$(_r$3));
                        var $726 = $729;
                    };
                    return $726;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$mod$go = x0 => x1 => x2 => Nat$mod$go$(x0, x1, x2);

    function Nat$mod$(_n$1, _m$2) {
        var $730 = Nat$mod$go$(_n$1, _m$2, 0n);
        return $730;
    };
    const Nat$mod = x0 => x1 => Nat$mod$(x0, x1);

    function Either$(_A$1, _B$2) {
        var $731 = null;
        return $731;
    };
    const Either = x0 => x1 => Either$(x0, x1);

    function Either$left$(_value$3) {
        var $732 = ({
            _: 'Either.left',
            'value': _value$3
        });
        return $732;
    };
    const Either$left = x0 => Either$left$(x0);

    function Either$right$(_value$3) {
        var $733 = ({
            _: 'Either.right',
            'value': _value$3
        });
        return $733;
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
                    var $734 = Either$left$(_n$1);
                    return $734;
                } else {
                    var $735 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $737 = Either$right$(Nat$succ$($735));
                        var $736 = $737;
                    } else {
                        var $738 = (self - 1n);
                        var $739 = Nat$sub_rem$($738, $735);
                        var $736 = $739;
                    };
                    return $736;
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
                        var $740 = self.value;
                        var $741 = Nat$div_mod$go$($740, _m$2, Nat$succ$(_d$3));
                        return $741;
                    case 'Either.right':
                        var $742 = self.value;
                        var $743 = Pair$new$(_d$3, _n$1);
                        return $743;
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
    const Nat$div = a0 => a1 => (a0 / a1);

    function Mons$draw$cur_sprite$(_idl$1, _sprites$2) {
        var _len_sprite$3 = (list_length(_sprites$2));
        var _idl_nat$4 = U32$to_nat$((Math.max(_idl$1 - 1, 0)));
        var _idx$5 = Nat$mod$((_idl_nat$4 / 4n), _len_sprite$3);
        var self = List$at$(_idx$5, _sprites$2);
        switch (self._) {
            case 'Maybe.none':
                var $745 = Image3D$empty;
                var $744 = $745;
                break;
            case 'Maybe.some':
                var $746 = self.value;
                var $747 = $746;
                var $744 = $747;
                break;
        };
        return $744;
    };
    const Mons$draw$cur_sprite = x0 => x1 => Mons$draw$cur_sprite$(x0, x1);

    function Mons$Sprite$new$(_x$1, _y$2, _z$3, _img$4) {
        var $748 = ({
            _: 'Mons.Sprite.new',
            'x': _x$1,
            'y': _y$2,
            'z': _z$3,
            'img': _img$4
        });
        return $748;
    };
    const Mons$Sprite$new = x0 => x1 => x2 => x3 => Mons$Sprite$new$(x0, x1, x2, x3);

    function Mons$game_sprites$(_game$1) {
        var self = _game$1;
        switch (self._) {
            case 'Mons.Game.new':
                var $750 = self.usr;
                var $751 = self.pos;
                var $752 = self.map;
                var $753 = self.stt;
                var $754 = self.tik;
                var _sprs$7 = List$nil;
                var self = Mons$Game$get_hero_pos$(_game$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $756 = List$nil;
                        var $755 = $756;
                        break;
                    case 'Maybe.some':
                        var $757 = self.value;
                        var _c_x$9 = (($757 & 0xFFF));
                        var _c_y$10 = ((($757 >>> 12) & 0xFFF));
                        var _c_z$11 = (($757 >>> 24));
                        var _sprs$12 = (() => {
                            var $759 = _sprs$7;
                            var $760 = 0;
                            var $761 = 17;
                            let _sprs$13 = $759;
                            for (let _x$12 = $760; _x$12 < $761; ++_x$12) {
                                var _sprs$14 = (() => {
                                    var $762 = _sprs$13;
                                    var $763 = 0;
                                    var $764 = 13;
                                    let _sprs$15 = $762;
                                    for (let _y$14 = $763; _y$14 < $764; ++_y$14) {
                                        var _t_x$16 = (((Math.max(_c_x$9 - 8, 0)) + _x$12) >>> 0);
                                        var _t_y$17 = (((Math.max(_c_y$10 - 6, 0)) + _y$14) >>> 0);
                                        var _t_z$18 = _c_z$11;
                                        var _pos$19 = ((0 | _t_x$16 | (_t_y$17 << 12) | (_t_z$18 << 24)));
                                        var _got$20 = Map$get$(U32$to_bits$(_pos$19), $752);
                                        var self = _got$20;
                                        switch (self._) {
                                            case 'Maybe.none':
                                                var $765 = List$cons$(Mons$Object$void, List$nil);
                                                var _objs$21 = $765;
                                                break;
                                            case 'Maybe.some':
                                                var $766 = self.value;
                                                var $767 = List$reverse$($766);
                                                var _objs$21 = $767;
                                                break;
                                        };
                                        var _sprs$22 = (() => {
                                            var $769 = _sprs$15;
                                            var $770 = _objs$21;
                                            let _sprs$23 = $769;
                                            let _obj$22;
                                            while ($770._ === 'List.cons') {
                                                _obj$22 = $770.head;
                                                var self = _obj$22;
                                                switch (self._) {
                                                    case 'Mons.Object.new':
                                                        var $771 = self.kin;
                                                        var $772 = self.dir;
                                                        var $773 = self.pad;
                                                        var $774 = self.ani;
                                                        var $775 = self.dmg;
                                                        var $776 = self.bag;
                                                        var $777 = self.mon;
                                                        var $778 = self.bos;
                                                        var $779 = self.cap;
                                                        var $780 = self.idl;
                                                        var $781 = self.eff;
                                                        var self = Mons$Kind$attr$($771);
                                                        switch (self._) {
                                                            case 'Mons.Attr.new':
                                                                var $783 = self.blocks;
                                                                var $784 = self.mhp;
                                                                var $785 = self.atk;
                                                                var $786 = self.name;
                                                                var $787 = self.wlk;
                                                                var $788 = self.idl;
                                                                var $789 = self.pic;
                                                                var $790 = self.battle_spr;
                                                                var $791 = self.skills;
                                                                var $792 = self.pos;
                                                                var _sprites$45 = $787(_t_x$16)(_t_y$17)($774)($772);
                                                                var self = Mons$draw$global_xy$(_t_x$16, _t_y$17, _obj$22);
                                                                switch (self._) {
                                                                    case 'Pair.new':
                                                                        var $794 = self.fst;
                                                                        var $795 = self.snd;
                                                                        var _s_z$48 = _t_z$18;
                                                                        var self = Mons$Object$is_standing$(_obj$22);
                                                                        if (self) {
                                                                            var _cur_spr$49 = Mons$draw$cur_sprite$($754, _sprites$45);
                                                                            var _spr$50 = Mons$Sprite$new$($794, $795, _s_z$48, _cur_spr$49);
                                                                            var $797 = List$cons$(_spr$50, _sprs$23);
                                                                            var $796 = $797;
                                                                        } else {
                                                                            var _sprs$49 = (() => {
                                                                                var $800 = _sprs$23;
                                                                                var $801 = _sprites$45;
                                                                                let _sprs$50 = $800;
                                                                                let _img$49;
                                                                                while ($801._ === 'List.cons') {
                                                                                    _img$49 = $801.head;
                                                                                    var _ani$51 = Mons$Object$get_ani$(_obj$22);
                                                                                    var _dir$52 = Mons$Object$get_dir$(_obj$22);
                                                                                    var _spr$53 = Mons$Sprite$new$($794, $795, _s_z$48, _img$49);
                                                                                    var $800 = List$cons$(_spr$53, _sprs$50);
                                                                                    _sprs$50 = $800;
                                                                                    $801 = $801.tail;
                                                                                }
                                                                                return _sprs$50;
                                                                            })();
                                                                            var $798 = _sprs$49;
                                                                            var $796 = $798;
                                                                        };
                                                                        var $793 = $796;
                                                                        break;
                                                                };
                                                                var $782 = $793;
                                                                break;
                                                        };
                                                        var $769 = $782;
                                                        break;
                                                };
                                                _sprs$23 = $769;
                                                $770 = $770.tail;
                                            }
                                            return _sprs$23;
                                        })();
                                        var $762 = _sprs$22;
                                        _sprs$15 = $762;
                                    };
                                    return _sprs$15;
                                })();
                                var $759 = _sprs$14;
                                _sprs$13 = $759;
                            };
                            return _sprs$13;
                        })();
                        var $758 = _sprs$12;
                        var $755 = $758;
                        break;
                };
                var $749 = $755;
                break;
        };
        return $749;
    };
    const Mons$game_sprites = x0 => Mons$game_sprites$(x0);
    const Mons$scr_mid = ((0 | 120 | (80 << 12) | (0 << 24)));

    function Cmp$as_lte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $803 = Bool$true;
                var $802 = $803;
                break;
            case 'Cmp.eql':
                var $804 = Bool$true;
                var $802 = $804;
                break;
            case 'Cmp.gtn':
                var $805 = Bool$false;
                var $802 = $805;
                break;
        };
        return $802;
    };
    const Cmp$as_lte = x0 => Cmp$as_lte$(x0);

    function Word$lte$(_a$2, _b$3) {
        var $806 = Cmp$as_lte$(Word$cmp$(_a$2, _b$3));
        return $806;
    };
    const Word$lte = x0 => x1 => Word$lte$(x0, x1);
    const U32$lte = a0 => a1 => (a0 <= a1);

    function Cmp$as_ltn$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $808 = Bool$true;
                var $807 = $808;
                break;
            case 'Cmp.eql':
                var $809 = Bool$false;
                var $807 = $809;
                break;
            case 'Cmp.gtn':
                var $810 = Bool$false;
                var $807 = $810;
                break;
        };
        return $807;
    };
    const Cmp$as_ltn = x0 => Cmp$as_ltn$(x0);

    function Word$ltn$(_a$2, _b$3) {
        var $811 = Cmp$as_ltn$(Word$cmp$(_a$2, _b$3));
        return $811;
    };
    const Word$ltn = x0 => x1 => Word$ltn$(x0, x1);
    const U32$ltn = a0 => a1 => (a0 < a1);
    const Bool$if = a0 => a1 => a2 => (a0 ? a1 : a2);

    function Mons$Map$build_sprites$(_game$1, _scr$2, _hero_pos$3, _hero_obj$4) {
        var _sprs$5 = Mons$game_sprites$(_game$1);
        var _scr$6 = (() => {
            var $814 = _scr$2;
            var $815 = _sprs$5;
            let _scr$7 = $814;
            let _spr$6;
            while ($815._ === 'List.cons') {
                _spr$6 = $815.head;
                var self = _spr$6;
                switch (self._) {
                    case 'Mons.Sprite.new':
                        var $816 = self.x;
                        var $817 = self.y;
                        var $818 = self.z;
                        var $819 = self.img;
                        var _len$12 = Image3D$get_length$($819);
                        var _scr$13 = (() => {
                            var $821 = _scr$7;
                            var $822 = 0;
                            var $823 = _len$12;
                            let _scr$14 = $821;
                            for (let _i$13 = $822; _i$13 < $823; ++_i$13) {
                                var _s_w$15 = ((Mons$scr_mid & 0xFFF));
                                var _s_h$16 = (((Mons$scr_mid >>> 12) & 0xFFF));
                                var _h_x$17 = ((_hero_pos$3 & 0xFFF));
                                var _h_y$18 = (((_hero_pos$3 >>> 12) & 0xFFF));
                                var self = Mons$draw$global_xy$(_h_x$17, _h_y$18, _hero_obj$4);
                                switch (self._) {
                                    case 'Pair.new':
                                        var $824 = self.fst;
                                        var $825 = self.snd;
                                        var _s_x$21 = $816;
                                        var _s_y$22 = $817;
                                        var _s_z$23 = $818;
                                        var _xyz$24 = (($819.buffer[_i$13 * 2]));
                                        var _v_x$25 = (Math.max(((((_xyz$24 & 0xFFF)) + _s_x$21) >>> 0) - ((Mons$vox_mid & 0xFFF)), 0));
                                        var _v_y$26 = (Math.max((((((_xyz$24 >>> 12) & 0xFFF)) + _s_y$22) >>> 0) - (((Mons$vox_mid >>> 12) & 0xFFF)), 0));
                                        var _v_z$27 = ((_xyz$24 >>> 24));
                                        var _ok0$28 = ((Math.max($824 - _s_w$15, 0)) <= _v_x$25);
                                        var _ok1$29 = (_v_x$25 < (($824 + _s_w$15) >>> 0));
                                        var _ok2$30 = ((Math.max($825 - _s_h$16, 0)) <= _v_y$26);
                                        var _ok3$31 = (_v_y$26 < (($825 + _s_h$16) >>> 0));
                                        var _ok$32 = (_ok0$28 && (_ok1$29 && (_ok2$30 && _ok3$31)));
                                        var _c_x$33 = (Math.max(((_v_x$25 + ((Mons$scr_mid & 0xFFF))) >>> 0) - $824, 0));
                                        var _c_y$34 = (Math.max(((_v_y$26 + (((Mons$scr_mid >>> 12) & 0xFFF))) >>> 0) - $825, 0));
                                        var _c_z$35 = (_ok$32 ? _v_z$27 : 0);
                                        var _pos$36 = ((0 | _c_x$33 | (_c_y$34 << 12) | (_c_z$35 << 24)));
                                        var _col$37 = (($819.buffer[_i$13 * 2 + 1]));
                                        var $826 = ((_scr$14.buffer[_scr$14.length * 2] = _pos$36, _scr$14.buffer[_scr$14.length * 2 + 1] = _col$37, _scr$14.length++, _scr$14));
                                        var $821 = $826;
                                        break;
                                };
                                _scr$14 = $821;
                            };
                            return _scr$14;
                        })();
                        var $820 = _scr$13;
                        var $814 = $820;
                        break;
                };
                _scr$7 = $814;
                $815 = $815.tail;
            }
            return _scr$7;
        })();
        var $812 = _scr$6;
        return $812;
    };
    const Mons$Map$build_sprites = x0 => x1 => x2 => x3 => Mons$Map$build_sprites$(x0, x1, x2, x3);
    const Mons$draw$text_screen_bg = Image3D$empty;
    const Mons$draw$msg_screen$line_0 = ((0 | 16 | (128 << 12) | (0 << 24)));
    const Mons$draw$msg_screen$line_1 = ((0 | 16 | (144 << 12) | (0 << 24)));

    function Mons$draw$mage_talk$(_text_0$1, _text_1$2, _scr$3) {
        var _battle_boy_u$4 = Image3D$empty;
        var _battle_mage_d$5 = Image3D$empty;
        var _scr$6 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$3);
        var _scr$7 = Mons$draw$text$(_text_0$1, Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$6);
        var _scr$8 = Mons$draw$text$(_text_1$2, Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$7);
        var _scr$9 = Mons$draw$image$(_battle_boy_u$4, ((0 | 75 | (85 << 12) | (0 << 24))), _scr$8);
        var _scr$10 = Mons$draw$image$(_battle_mage_d$5, ((0 | 180 | (80 << 12) | (0 << 24))), _scr$9);
        var $827 = _scr$10;
        return $827;
    };
    const Mons$draw$mage_talk = x0 => x1 => x2 => Mons$draw$mage_talk$(x0, x1, x2);

    function Mons$Object$get_images$(_bag$1) {
        var _images$2 = List$nil;
        var _images$3 = (() => {
            var $830 = _images$2;
            var $831 = _bag$1;
            let _images$4 = $830;
            let _mon$3;
            while ($831._ === 'List.cons') {
                _mon$3 = $831.head;
                var self = _mon$3;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $832 = self.kin;
                        var $833 = self.dir;
                        var $834 = self.pad;
                        var $835 = self.ani;
                        var $836 = self.dmg;
                        var $837 = self.bag;
                        var $838 = self.mon;
                        var $839 = self.bos;
                        var $840 = self.cap;
                        var $841 = self.idl;
                        var $842 = self.eff;
                        var self = Mons$Kind$attr$($832);
                        switch (self._) {
                            case 'Mons.Attr.new':
                                var $844 = self.blocks;
                                var $845 = self.mhp;
                                var $846 = self.atk;
                                var $847 = self.name;
                                var $848 = self.wlk;
                                var $849 = self.idl;
                                var $850 = self.pic;
                                var $851 = self.battle_spr;
                                var $852 = self.skills;
                                var $853 = self.pos;
                                var $854 = List$cons$($850, _images$4);
                                var $843 = $854;
                                break;
                        };
                        var $830 = $843;
                        break;
                };
                _images$4 = $830;
                $831 = $831.tail;
            }
            return _images$4;
        })();
        var $828 = _images$3;
        return $828;
    };
    const Mons$Object$get_images = x0 => Mons$Object$get_images$(x0);

    function Mons$Kind$get_name$(_kind$1) {
        var self = Mons$Kind$attr$(_kind$1);
        switch (self._) {
            case 'Mons.Attr.new':
                var $856 = self.blocks;
                var $857 = self.mhp;
                var $858 = self.atk;
                var $859 = self.name;
                var $860 = self.wlk;
                var $861 = self.idl;
                var $862 = self.pic;
                var $863 = self.battle_spr;
                var $864 = self.skills;
                var $865 = self.pos;
                var $866 = $859;
                var $855 = $866;
                break;
        };
        return $855;
    };
    const Mons$Kind$get_name = x0 => Mons$Kind$get_name$(x0);

    function Mons$Object$get_names$(_bag$1) {
        var _names$2 = List$nil;
        var _names$3 = (() => {
            var $869 = _names$2;
            var $870 = _bag$1;
            let _names$4 = $869;
            let _mon$3;
            while ($870._ === 'List.cons') {
                _mon$3 = $870.head;
                var self = _mon$3;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $871 = self.kin;
                        var $872 = self.dir;
                        var $873 = self.pad;
                        var $874 = self.ani;
                        var $875 = self.dmg;
                        var $876 = self.bag;
                        var $877 = self.mon;
                        var $878 = self.bos;
                        var $879 = self.cap;
                        var $880 = self.idl;
                        var $881 = self.eff;
                        var _name$16 = Mons$Kind$get_name$($871);
                        var $882 = List$cons$(_name$16, _names$4);
                        var $869 = $882;
                        break;
                };
                _names$4 = $869;
                $870 = $870.tail;
            }
            return _names$4;
        })();
        var $867 = _names$3;
        return $867;
    };
    const Mons$Object$get_names = x0 => Mons$Object$get_names$(x0);

    function Mons$draw$list_image$go$(_images$1, _horizontal$2, _spacing$3, _pos$4, _scr$5, _idx$6) {
        var Mons$draw$list_image$go$ = (_images$1, _horizontal$2, _spacing$3, _pos$4, _scr$5, _idx$6) => ({
            ctr: 'TCO',
            arg: [_images$1, _horizontal$2, _spacing$3, _pos$4, _scr$5, _idx$6]
        });
        var Mons$draw$list_image$go = _images$1 => _horizontal$2 => _spacing$3 => _pos$4 => _scr$5 => _idx$6 => Mons$draw$list_image$go$(_images$1, _horizontal$2, _spacing$3, _pos$4, _scr$5, _idx$6);
        var arg = [_images$1, _horizontal$2, _spacing$3, _pos$4, _scr$5, _idx$6];
        while (true) {
            let [_images$1, _horizontal$2, _spacing$3, _pos$4, _scr$5, _idx$6] = arg;
            var R = (() => {
                var _x$7 = ((_pos$4 & 0xFFF));
                var _y$8 = (((_pos$4 >>> 12) & 0xFFF));
                var self = _images$1;
                switch (self._) {
                    case 'List.nil':
                        var $884 = _scr$5;
                        var $883 = $884;
                        break;
                    case 'List.cons':
                        var $885 = self.head;
                        var $886 = self.tail;
                        var _inventory_mon_selection$11 = Image3D$empty;
                        var _scr$12 = Mons$draw$image$(_inventory_mon_selection$11, _pos$4, _scr$5);
                        var _scr$13 = Mons$draw$image$($885, _pos$4, _scr$12);
                        var self = _horizontal$2;
                        if (self) {
                            var $888 = ((0 | ((_x$7 + _spacing$3) >>> 0) | (_y$8 << 12) | (0 << 24)));
                            var _pos$14 = $888;
                        } else {
                            var $889 = ((0 | _x$7 | (((_y$8 + _spacing$3) >>> 0) << 12) | (0 << 24)));
                            var _pos$14 = $889;
                        };
                        var $887 = Mons$draw$list_image$go$($886, _horizontal$2, _spacing$3, _pos$14, _scr$13, ((_idx$6 + 1) >>> 0));
                        var $883 = $887;
                        break;
                };
                return $883;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Mons$draw$list_image$go = x0 => x1 => x2 => x3 => x4 => x5 => Mons$draw$list_image$go$(x0, x1, x2, x3, x4, x5);

    function Mons$draw$list_image$(_images$1, _horizontal$2, _spacing$3, _start_pos$4, _scr$5) {
        var _qtd$6 = (Number((list_length(_images$1))));
        var $890 = Mons$draw$list_image$go$(_images$1, _horizontal$2, _spacing$3, _start_pos$4, _scr$5, 0);
        return $890;
    };
    const Mons$draw$list_image = x0 => x1 => x2 => x3 => x4 => Mons$draw$list_image$(x0, x1, x2, x3, x4);

    function Mons$draw$mon_img_selected$(_mon_idx$1, _qtd$2, _horizontal$3, _spacing$4, _pos$5, _scr$6) {
        var _x_pos$7 = ((_pos$5 & 0xFFF));
        var _y_pos$8 = (((_pos$5 >>> 12) & 0xFFF));
        var self = (_mon_idx$1 === 0);
        if (self) {
            var $892 = ((0 | _x_pos$7 | (_y_pos$8 << 12) | (0 << 24)));
            var _pos$9 = $892;
        } else {
            var self = _horizontal$3;
            if (self) {
                var $894 = ((0 | ((_x_pos$7 + ((_spacing$4 * _mon_idx$1) >>> 0)) >>> 0) | (_y_pos$8 << 12) | (0 << 24)));
                var $893 = $894;
            } else {
                var $895 = ((0 | _x_pos$7 | (((_y_pos$8 + ((_spacing$4 * _mon_idx$1) >>> 0)) >>> 0) << 12) | (0 << 24)));
                var $893 = $895;
            };
            var _pos$9 = $893;
        };
        var self = (_qtd$2 === 0);
        if (self) {
            var $896 = _scr$6;
            var $891 = $896;
        } else {
            var _inventory_mon_selected$10 = Image3D$empty;
            var $897 = Mons$draw$image$(_inventory_mon_selected$10, _pos$9, _scr$6);
            var $891 = $897;
        };
        return $891;
    };
    const Mons$draw$mon_img_selected = x0 => x1 => x2 => x3 => x4 => x5 => Mons$draw$mon_img_selected$(x0, x1, x2, x3, x4, x5);

    function Mons$draw$initial_mons$(_obj$1, _scr$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $899 = self.kin;
                var $900 = self.dir;
                var $901 = self.pad;
                var $902 = self.ani;
                var $903 = self.dmg;
                var $904 = self.bag;
                var $905 = self.mon;
                var $906 = self.bos;
                var $907 = self.cap;
                var $908 = self.idl;
                var $909 = self.eff;
                var _qtd$14 = (Number((list_length($904))));
                var self = (_qtd$14 === 0);
                if (self) {
                    var $911 = Mons$draw$text$("nothing to show", Mons$Char_white$font, ((0 | 60 | (50 << 12) | (0 << 24))), _scr$2);
                    var $910 = $911;
                } else {
                    var _scr$15 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (90 << 12) | (0 << 24))), _scr$2);
                    var _mons_images$16 = List$reverse$(Mons$Object$get_images$($904));
                    var _mons_names$17 = List$reverse$(Mons$Object$get_names$($904));
                    var _scr$18 = Mons$draw$list$(_mons_names$17, Bool$false, 34, Mons$Char_white$font, ((0 | 70 | (0 << 12) | (0 << 24))), _scr$15);
                    var _scr$19 = Mons$draw$list_image$(_mons_images$16, Bool$false, 34, ((0 | 40 | (30 << 12) | (0 << 24))), _scr$18);
                    var _scr$20 = Mons$draw$mon_img_selected$($905, _qtd$14, Bool$false, 34, ((0 | 40 | (30 << 12) | (0 << 24))), _scr$19);
                    var _scr$21 = Mons$draw$text$("Choose a Mon to start with and ", Mons$Char_black$font, ((0 | 16 | (134 << 12) | (0 << 24))), _scr$20);
                    var _scr$22 = Mons$draw$text$("run to the tower. [c]", Mons$Char_black$font, ((0 | 16 | (148 << 12) | (0 << 24))), _scr$21);
                    var $912 = _scr$22;
                    var $910 = $912;
                };
                var $898 = $910;
                break;
        };
        return $898;
    };
    const Mons$draw$initial_mons = x0 => x1 => Mons$draw$initial_mons$(x0, x1);
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
                        var $913 = _res$2;
                        return $913;
                    case 'List.cons':
                        var $914 = self.head;
                        var $915 = self.tail;
                        var $916 = String$flatten$go$($915, (_res$2 + $914));
                        return $916;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$flatten$go = x0 => x1 => String$flatten$go$(x0, x1);

    function String$flatten$(_xs$1) {
        var $917 = String$flatten$go$(_xs$1, "");
        return $917;
    };
    const String$flatten = x0 => String$flatten$(x0);

    function Mons$draw$img_type$(_kind$1) {
        var self = _kind$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $919 = self.ele;
                var $920 = self.boss;
                var $921 = self.pri_type;
                var $922 = self.agi;
                var self = $921;
                switch (self._) {
                    case 'Mons.Type.normal':
                        var $924 = "\u{2460}";
                        var $923 = $924;
                        break;
                    case 'Mons.Type.earth':
                        var $925 = "\u{2461}";
                        var $923 = $925;
                        break;
                    case 'Mons.Type.fire':
                        var $926 = "\u{2462}";
                        var $923 = $926;
                        break;
                    case 'Mons.Type.water':
                        var $927 = "\u{2463}";
                        var $923 = $927;
                        break;
                    case 'Mons.Type.grass':
                        var $928 = "\u{2464}";
                        var $923 = $928;
                        break;
                    case 'Mons.Type.electric':
                        var $929 = "\u{2465}";
                        var $923 = $929;
                        break;
                    case 'Mons.Type.psychic':
                        var $930 = "\u{2466}";
                        var $923 = $930;
                        break;
                    case 'Mons.Type.ice':
                        var $931 = "\u{2467}";
                        var $923 = $931;
                        break;
                    case 'Mons.Type.light':
                        var $932 = "\u{2468}";
                        var $923 = $932;
                        break;
                    case 'Mons.Type.darkness':
                        var $933 = "\u{2469}";
                        var $923 = $933;
                        break;
                };
                var $918 = $923;
                break;
            case 'Mons.Kind.Const':
                var $934 = self.ele;
                var $935 = "";
                var $918 = $935;
                break;
            case 'Mons.Kind.Terrain':
                var $936 = self.ele;
                var $937 = "";
                var $918 = $937;
                break;
            case 'Mons.Kind.Interactive':
                var $938 = self.ele;
                var $939 = self.on;
                var $940 = self.eff;
                var $941 = "";
                var $918 = $941;
                break;
        };
        return $918;
    };
    const Mons$draw$img_type = x0 => Mons$draw$img_type$(x0);
    const Mons$draw$small_HP = "\u{195}\u{1a5}";

    function List$fold$(_list$2, _nil$4, _cons$5) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $943 = _nil$4;
                var $942 = $943;
                break;
            case 'List.cons':
                var $944 = self.head;
                var $945 = self.tail;
                var $946 = _cons$5($944)(List$fold$($945, _nil$4, _cons$5));
                var $942 = $946;
                break;
        };
        return $942;
    };
    const List$fold = x0 => x1 => x2 => List$fold$(x0, x1, x2);

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
                        var $947 = self.fst;
                        var $948 = self.snd;
                        var self = $947;
                        if (self === 0n) {
                            var $950 = List$cons$($948, _res$3);
                            var $949 = $950;
                        } else {
                            var $951 = (self - 1n);
                            var $952 = Nat$to_base$go$(_base$1, $947, List$cons$($948, _res$3));
                            var $949 = $952;
                        };
                        return $949;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$to_base$go = x0 => x1 => x2 => Nat$to_base$go$(x0, x1, x2);

    function Nat$to_base$(_base$1, _nat$2) {
        var $953 = Nat$to_base$go$(_base$1, _nat$2, List$nil);
        return $953;
    };
    const Nat$to_base = x0 => x1 => Nat$to_base$(x0, x1);
    const Nat$gtn = a0 => a1 => (a0 > a1);
    const Nat$lte = a0 => a1 => (a0 <= a1);

    function Nat$show_digit$(_base$1, _n$2) {
        var _m$3 = Nat$mod$(_n$2, _base$1);
        var _base64$4 = List$cons$(48, List$cons$(49, List$cons$(50, List$cons$(51, List$cons$(52, List$cons$(53, List$cons$(54, List$cons$(55, List$cons$(56, List$cons$(57, List$cons$(65, List$cons$(66, List$cons$(67, List$cons$(68, List$cons$(69, List$cons$(70, List$cons$(71, List$cons$(72, List$cons$(73, List$cons$(74, List$cons$(75, List$cons$(76, List$cons$(77, List$cons$(78, List$cons$(79, List$cons$(80, List$cons$(81, List$cons$(82, List$cons$(83, List$cons$(84, List$cons$(85, List$cons$(86, List$cons$(87, List$cons$(88, List$cons$(89, List$cons$(90, List$cons$(97, List$cons$(98, List$cons$(99, List$cons$(100, List$cons$(101, List$cons$(102, List$cons$(103, List$cons$(104, List$cons$(105, List$cons$(106, List$cons$(107, List$cons$(108, List$cons$(109, List$cons$(110, List$cons$(111, List$cons$(112, List$cons$(113, List$cons$(114, List$cons$(115, List$cons$(116, List$cons$(117, List$cons$(118, List$cons$(119, List$cons$(120, List$cons$(121, List$cons$(122, List$cons$(43, List$cons$(47, List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
        var self = ((_base$1 > 0n) && (_base$1 <= 64n));
        if (self) {
            var self = List$at$(_m$3, _base64$4);
            switch (self._) {
                case 'Maybe.none':
                    var $956 = 35;
                    var $955 = $956;
                    break;
                case 'Maybe.some':
                    var $957 = self.value;
                    var $958 = $957;
                    var $955 = $958;
                    break;
            };
            var $954 = $955;
        } else {
            var $959 = 35;
            var $954 = $959;
        };
        return $954;
    };
    const Nat$show_digit = x0 => x1 => Nat$show_digit$(x0, x1);

    function Nat$to_string_base$(_base$1, _nat$2) {
        var $960 = List$fold$(Nat$to_base$(_base$1, _nat$2), String$nil, (_n$3 => _str$4 => {
            var $961 = String$cons$(Nat$show_digit$(_base$1, _n$3), _str$4);
            return $961;
        }));
        return $960;
    };
    const Nat$to_string_base = x0 => x1 => Nat$to_string_base$(x0, x1);

    function U32$to_string$(_n$1) {
        var $962 = Nat$to_string_base$(10n, U32$to_nat$(_n$1));
        return $962;
    };
    const U32$to_string = x0 => U32$to_string$(x0);
    const Bool$not = a0 => (!a0);

    function Mons$Object$remaining_hp$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $964 = self.kin;
                var $965 = self.dir;
                var $966 = self.pad;
                var $967 = self.ani;
                var $968 = self.dmg;
                var $969 = self.bag;
                var $970 = self.mon;
                var $971 = self.bos;
                var $972 = self.cap;
                var $973 = self.idl;
                var $974 = self.eff;
                var self = $964;
                switch (self._) {
                    case 'Mons.Kind.Mons':
                        var $976 = self.ele;
                        var $977 = self.boss;
                        var $978 = self.pri_type;
                        var $979 = self.agi;
                        var self = Mons$Kind$attr$($964);
                        switch (self._) {
                            case 'Mons.Attr.new':
                                var $981 = self.blocks;
                                var $982 = self.mhp;
                                var $983 = self.atk;
                                var $984 = self.name;
                                var $985 = self.wlk;
                                var $986 = self.idl;
                                var $987 = self.pic;
                                var $988 = self.battle_spr;
                                var $989 = self.skills;
                                var $990 = self.pos;
                                var $991 = (Math.max($982 - $968, 0));
                                var $980 = $991;
                                break;
                        };
                        var $975 = $980;
                        break;
                    case 'Mons.Kind.Const':
                        var $992 = self.ele;
                        var $993 = $968;
                        var $975 = $993;
                        break;
                    case 'Mons.Kind.Terrain':
                        var $994 = self.ele;
                        var $995 = $968;
                        var $975 = $995;
                        break;
                    case 'Mons.Kind.Interactive':
                        var $996 = self.ele;
                        var $997 = self.on;
                        var $998 = self.eff;
                        var $999 = $968;
                        var $975 = $999;
                        break;
                };
                var $963 = $975;
                break;
        };
        return $963;
    };
    const Mons$Object$remaining_hp = x0 => Mons$Object$remaining_hp$(x0);

    function Mons$Object$is_obj_defeated$(_obj$1) {
        var $1000 = (Mons$Object$remaining_hp$(_obj$1) === 0);
        return $1000;
    };
    const Mons$Object$is_obj_defeated = x0 => Mons$Object$is_obj_defeated$(x0);

    function Mons$Object$is_battling$(_adve$1, _hero_or_mon$2) {
        var _is_adve_alive$3 = (!Mons$Object$is_obj_defeated$(_adve$1));
        var _is_hero_alive$4 = (!Mons$Object$is_obj_defeated$(_hero_or_mon$2));
        var $1001 = (_is_adve_alive$3 && _is_hero_alive$4);
        return $1001;
    };
    const Mons$Object$is_battling = x0 => x1 => Mons$Object$is_battling$(x0, x1);

    function Mons$draw$background$(_idx$1) {
        var self = (_idx$1 === 1);
        if (self) {
            var $1003 = Pair$new$(Image3D$empty, Image3D$empty);
            var $1002 = $1003;
        } else {
            var self = (_idx$1 === 2);
            if (self) {
                var $1005 = Pair$new$(Image3D$empty, Image3D$empty);
                var $1004 = $1005;
            } else {
                var $1006 = Pair$new$(Image3D$empty, Image3D$empty);
                var $1004 = $1006;
            };
            var $1002 = $1004;
        };
        return $1002;
    };
    const Mons$draw$background = x0 => Mons$draw$background$(x0);

    function Mons$draw$get_battle_bg$(_idx$1) {
        var $1007 = Pair$fst$(Mons$draw$background$(_idx$1));
        return $1007;
    };
    const Mons$draw$get_battle_bg = x0 => Mons$draw$get_battle_bg$(x0);

    function Mons$draw$battle_bg$(_adve_kind$1, _is_boss$2, _idx$3, _scr$4) {
        var _screen$battle_default$5 = Image3D$empty;
        var _screen$battle_boss$6 = Image3D$empty;
        var _scr$7 = Mons$draw$image$(Mons$draw$get_battle_bg$(_idx$3), ((0 | 120 | (80 << 12) | (0 << 24))), _scr$4);
        var self = _is_boss$2;
        if (self) {
            var $1009 = Mons$draw$image$(_screen$battle_boss$6, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$7);
            var _scr$8 = $1009;
        } else {
            var $1010 = Mons$draw$image$(_screen$battle_default$5, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$7);
            var _scr$8 = $1010;
        };
        var $1008 = _scr$8;
        return $1008;
    };
    const Mons$draw$battle_bg = x0 => x1 => x2 => x3 => Mons$draw$battle_bg$(x0, x1, x2, x3);

    function Mons$draw$hero_hp$(_chp$1, _mhp$2, _name$3, _hero_hp$4, _scr$5) {
        var _battle_hp$6 = Image3D$empty;
        var _p_hp$7 = ((((_chp$1 * 70) >>> 0) / _mhp$2) >>> 0);
        var _pos_chp$8 = ((0 | ((100 + _p_hp$7) >>> 0) | (82 << 12) | (0 << 24)));
        var _pos_name$9 = ((0 | 139 | (82 << 12) | (0 << 24)));
        var _scr$10 = Mons$draw$image$(_battle_hp$6, _pos_chp$8, _scr$5);
        var _scr$11 = Mons$draw$text$(_name$3, Mons$Char_white$font, _pos_name$9, _scr$10);
        var _scr$12 = Mons$draw$text$(_hero_hp$4, Mons$Char_black$font, ((0 | 139 | (97 << 12) | (0 << 24))), _scr$11);
        var $1011 = _scr$12;
        return $1011;
    };
    const Mons$draw$hero_hp = x0 => x1 => x2 => x3 => x4 => Mons$draw$hero_hp$(x0, x1, x2, x3, x4);

    function Mons$draw$adve_hp$(_chp$1, _mhp$2, _name$3, _adve_hp$4, _scr$5) {
        var _battle_hp$6 = Image3D$empty;
        var _p_hp$7 = ((((_chp$1 * 70) >>> 0) / _mhp$2) >>> 0);
        var _pos_chp$8 = ((0 | _p_hp$7 | (21 << 12) | (0 << 24)));
        var _pos_name$9 = ((0 | 38 | (21 << 12) | (0 << 24)));
        var _scr$10 = Mons$draw$image$(_battle_hp$6, _pos_chp$8, _scr$5);
        var _scr$11 = Mons$draw$text$(_name$3, Mons$Char_white$font, _pos_name$9, _scr$10);
        var _scr$12 = Mons$draw$text$(_adve_hp$4, Mons$Char_black$font, ((0 | 38 | (36 << 12) | (0 << 24))), _scr$11);
        var $1012 = _scr$12;
        return $1012;
    };
    const Mons$draw$adve_hp = x0 => x1 => x2 => x3 => x4 => Mons$draw$adve_hp$(x0, x1, x2, x3, x4);

    function Mons$draw$effect$(_eff$1, _pos$2, _scr$3) {
        var $1013 = _scr$3;
        return $1013;
    };
    const Mons$draw$effect = x0 => x1 => x2 => Mons$draw$effect$(x0, x1, x2);

    function Mons$draw$effects$(_hero_eff$1, _adve_eff$2, _scr$3) {
        var _scr$4 = Mons$draw$effect$(_hero_eff$1, ((0 | 140 | (105 << 12) | (0 << 24))), _scr$3);
        var _scr$5 = Mons$draw$effect$(_adve_eff$2, ((0 | 38 | (45 << 12) | (0 << 24))), _scr$4);
        var $1014 = _scr$5;
        return $1014;
    };
    const Mons$draw$effects = x0 => x1 => x2 => Mons$draw$effects$(x0, x1, x2);

    function Cmp$as_gtn$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $1016 = Bool$false;
                var $1015 = $1016;
                break;
            case 'Cmp.eql':
                var $1017 = Bool$false;
                var $1015 = $1017;
                break;
            case 'Cmp.gtn':
                var $1018 = Bool$true;
                var $1015 = $1018;
                break;
        };
        return $1015;
    };
    const Cmp$as_gtn = x0 => Cmp$as_gtn$(x0);

    function Word$gtn$(_a$2, _b$3) {
        var $1019 = Cmp$as_gtn$(Word$cmp$(_a$2, _b$3));
        return $1019;
    };
    const Word$gtn = x0 => x1 => Word$gtn$(x0, x1);
    const U32$gtn = a0 => a1 => (a0 > a1);

    function Mons$Turn$is_active$(_turn$1) {
        var self = _turn$1;
        switch (self._) {
            case 'Mons.Turn.new':
                var $1021 = self.exec_hero;
                var $1022 = self.hero_skill;
                var $1023 = self.adve_skill;
                var $1024 = self.play;
                var $1025 = ($1024 > 0);
                var $1020 = $1025;
                break;
        };
        return $1020;
    };
    const Mons$Turn$is_active = x0 => Mons$Turn$is_active$(x0);

    function Mons$Turn$hero_turn$(_turn$1) {
        var self = _turn$1;
        switch (self._) {
            case 'Mons.Turn.new':
                var $1027 = self.exec_hero;
                var $1028 = self.hero_skill;
                var $1029 = self.adve_skill;
                var $1030 = self.play;
                var $1031 = $1027;
                var $1026 = $1031;
                break;
        };
        return $1026;
    };
    const Mons$Turn$hero_turn = x0 => Mons$Turn$hero_turn$(x0);

    function Mons$Skill$get_name$(_skill$1) {
        var self = _skill$1;
        switch (self._) {
            case 'Mons.Skill.hit_4':
                var $1033 = "hit 4";
                var $1032 = $1033;
                break;
            case 'Mons.Skill.hit_2':
                var $1034 = "hit 2";
                var $1032 = $1034;
                break;
            case 'Mons.Skill.heal':
                var $1035 = "heal";
                var $1032 = $1035;
                break;
            case 'Mons.Skill.none':
                var $1036 = "none";
                var $1032 = $1036;
                break;
            case 'Mons.Skill.run':
                var $1037 = "Run";
                var $1032 = $1037;
                break;
            case 'Mons.Skill.dig':
                var $1038 = "Dig";
                var $1032 = $1038;
                break;
            case 'Mons.Skill.sand_tomb':
                var $1039 = "Sand bomb";
                var $1032 = $1039;
                break;
            case 'Mons.Skill.protect':
                var $1040 = "Protect";
                var $1032 = $1040;
                break;
            case 'Mons.Skill.slam':
                var $1041 = "Slam";
                var $1032 = $1041;
                break;
            case 'Mons.Skill.counter':
                var $1042 = "Counter";
                var $1032 = $1042;
                break;
            case 'Mons.Skill.recover':
                var $1043 = "Recover";
                var $1032 = $1043;
                break;
            case 'Mons.Skill.rock_smash':
                var $1044 = "Rock Smash";
                var $1032 = $1044;
                break;
            case 'Mons.Skill.crunch':
                var $1045 = "Crunch";
                var $1032 = $1045;
                break;
            case 'Mons.Skill.sludge_bomb':
                var $1046 = "Sludge bomb";
                var $1032 = $1046;
                break;
            case 'Mons.Skill.gyro_ball':
                var $1047 = "Gyro Ball";
                var $1032 = $1047;
                break;
            case 'Mons.Skill.iron_defense':
                var $1048 = "Iron Defense";
                var $1032 = $1048;
                break;
            case 'Mons.Skill.super_fang':
                var $1049 = "Super Fang";
                var $1032 = $1049;
                break;
            case 'Mons.Skill.hypnosis':
                var $1050 = "Hypnosis";
                var $1032 = $1050;
                break;
            case 'Mons.Skill.dream_eater':
                var $1051 = "Dream Eater";
                var $1032 = $1051;
                break;
            case 'Mons.Skill.wing_attack':
                var $1052 = "Wing Attack";
                var $1032 = $1052;
                break;
            case 'Mons.Skill.moonlight':
                var $1053 = "Moonlight";
                var $1032 = $1053;
                break;
            case 'Mons.Skill.play_rough':
                var $1054 = "Play Rough";
                var $1032 = $1054;
                break;
            case 'Mons.Skill.psychic':
                var $1055 = "Psychic";
                var $1032 = $1055;
                break;
            case 'Mons.Skill.ancient_power':
                var $1056 = "Ancient Power";
                var $1032 = $1056;
                break;
            case 'Mons.Skill.thunder_wave':
                var $1057 = "Thunder Wave";
                var $1032 = $1057;
                break;
            case 'Mons.Skill.charge':
                var $1058 = "Charge";
                var $1032 = $1058;
                break;
            case 'Mons.Skill.agility':
                var $1059 = "Agility";
                var $1032 = $1059;
                break;
            case 'Mons.Skill.hero_kill':
                var $1060 = "ONE PUNCH";
                var $1032 = $1060;
                break;
            case 'Mons.Skill.nightmare':
                var $1061 = "Nightmare";
                var $1032 = $1061;
                break;
        };
        return $1032;
    };
    const Mons$Skill$get_name = x0 => Mons$Skill$get_name$(x0);

    function Mons$Skill$short_description$(_skill$1) {
        var self = _skill$1;
        switch (self._) {
            case 'Mons.Skill.hit_4':
                var $1063 = "damage 4";
                var $1062 = $1063;
                break;
            case 'Mons.Skill.hit_2':
                var $1064 = "damage 2";
                var $1062 = $1064;
                break;
            case 'Mons.Skill.heal':
                var $1065 = "heal 3";
                var $1062 = $1065;
                break;
            case 'Mons.Skill.none':
                var $1066 = "does nothing";
                var $1062 = $1066;
                break;
            case 'Mons.Skill.run':
                var $1067 = "Run from battle";
                var $1062 = $1067;
                break;
            case 'Mons.Skill.dig':
                var $1068 = "Add hit next turn, add invul";
                var $1062 = $1068;
                break;
            case 'Mons.Skill.sand_tomb':
                var $1069 = "Dmg this turn + burn(5)";
                var $1062 = $1069;
                break;
            case 'Mons.Skill.protect':
                var $1070 = "-50% dmg next turn";
                var $1062 = $1070;
                break;
            case 'Mons.Skill.slam':
                var $1071 = "Hit 6hp";
                var $1062 = $1071;
                break;
            case 'Mons.Skill.counter':
                var $1072 = "Burn for 5 turns and heal 3hp";
                var $1062 = $1072;
                break;
            case 'Mons.Skill.recover':
                var $1073 = "Restore 25% hp, add poison";
                var $1062 = $1073;
                break;
            case 'Mons.Skill.rock_smash':
                var $1074 = "Hit 2hp + 50% of critical";
                var $1062 = $1074;
                break;
            case 'Mons.Skill.crunch':
                var $1075 = "Hit 4hp + 25% of critical";
                var $1062 = $1075;
                break;
            case 'Mons.Skill.sludge_bomb':
                var $1076 = "Hit 2hp + 30% of poisoning";
                var $1062 = $1076;
                break;
            case 'Mons.Skill.gyro_ball':
                var $1077 = "Hit 4. If more agility + 50% dmg";
                var $1062 = $1077;
                break;
            case 'Mons.Skill.iron_defense':
                var $1078 = "-25% dmg for this and next turn";
                var $1062 = $1078;
                break;
            case 'Mons.Skill.super_fang':
                var $1079 = "Hit 50% hp + loses 25% of hp";
                var $1062 = $1079;
                break;
            case 'Mons.Skill.hypnosis':
                var $1080 = "50% of sleep if can";
                var $1062 = $1080;
                break;
            case 'Mons.Skill.dream_eater':
                var $1081 = "If sleep, hit 6 and heal 4";
                var $1062 = $1081;
                break;
            case 'Mons.Skill.wing_attack':
                var $1082 = "Hit 6hp";
                var $1062 = $1082;
                break;
            case 'Mons.Skill.moonlight':
                var $1083 = "Hit 4 + 20% of sleep";
                var $1062 = $1083;
                break;
            case 'Mons.Skill.play_rough':
                var $1084 = "Hit 4 + 20% of critical";
                var $1062 = $1084;
                break;
            case 'Mons.Skill.psychic':
                var $1085 = "Hit 2hp + 10% sleep and hit";
                var $1062 = $1085;
                break;
            case 'Mons.Skill.ancient_power':
                var $1086 = "Hit 4hp + 10% adve miss the attack";
                var $1062 = $1086;
                break;
            case 'Mons.Skill.thunder_wave':
                var $1087 = "Hit 6";
                var $1062 = $1087;
                break;
            case 'Mons.Skill.charge':
                var $1088 = "Hit4, if adve has minimize, hit8";
                var $1062 = $1088;
                break;
            case 'Mons.Skill.agility':
                var $1089 = "Invert Mon\'s agitity value";
                var $1062 = $1089;
                break;
            case 'Mons.Skill.hero_kill':
                var $1090 = "Herro atk";
                var $1062 = $1090;
                break;
            case 'Mons.Skill.nightmare':
                var $1091 = "If sleep damage hit 20% hp";
                var $1062 = $1091;
                break;
        };
        return $1062;
    };
    const Mons$Skill$short_description = x0 => Mons$Skill$short_description$(x0);

    function Mons$draw$turn$(_name$1, _skill$2, _scr$3) {
        var _msg$4 = String$flatten$(List$cons$(_name$1, List$cons$(" used ", List$cons$(Mons$Skill$get_name$(_skill$2), List$cons$(".", List$nil)))));
        var _scr$5 = Mons$draw$text$(_msg$4, Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$3);
        var _desc$6 = Mons$Skill$short_description$(_skill$2);
        var $1092 = Mons$draw$text$(String$flatten$(List$cons$(_desc$6, List$cons$("  [c]", List$nil))), Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$5);
        return $1092;
    };
    const Mons$draw$turn = x0 => x1 => x2 => Mons$draw$turn$(x0, x1, x2);

    function Mons$Kind$get_skills$(_kind$1) {
        var self = Mons$Kind$attr$(_kind$1);
        switch (self._) {
            case 'Mons.Attr.new':
                var $1094 = self.blocks;
                var $1095 = self.mhp;
                var $1096 = self.atk;
                var $1097 = self.name;
                var $1098 = self.wlk;
                var $1099 = self.idl;
                var $1100 = self.pic;
                var $1101 = self.battle_spr;
                var $1102 = self.skills;
                var $1103 = self.pos;
                var $1104 = $1102;
                var $1093 = $1104;
                break;
        };
        return $1093;
    };
    const Mons$Kind$get_skills = x0 => Mons$Kind$get_skills$(x0);
    const Mons$Skill$none = ({
        _: 'Mons.Skill.none'
    });

    function Mons$Game$get_skills_at$(_idx$1, _obj$2) {
        var self = _obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $1106 = self.kin;
                var $1107 = self.dir;
                var $1108 = self.pad;
                var $1109 = self.ani;
                var $1110 = self.dmg;
                var $1111 = self.bag;
                var $1112 = self.mon;
                var $1113 = self.bos;
                var $1114 = self.cap;
                var $1115 = self.idl;
                var $1116 = self.eff;
                var _skills$14 = Mons$Kind$get_skills$($1106);
                var self = List$at$(_idx$1, _skills$14);
                switch (self._) {
                    case 'Maybe.none':
                        var $1118 = Mons$Skill$none;
                        var $1117 = $1118;
                        break;
                    case 'Maybe.some':
                        var $1119 = self.value;
                        var $1120 = $1119;
                        var $1117 = $1120;
                        break;
                };
                var $1105 = $1117;
                break;
        };
        return $1105;
    };
    const Mons$Game$get_skills_at = x0 => x1 => Mons$Game$get_skills_at$(x0, x1);

    function Mons$draw$battle_skills$(_hero_obj$1, _scr$2) {
        var _u$3 = Mons$Skill$get_name$(Mons$Game$get_skills_at$(0n, _hero_obj$1));
        var _i$4 = Mons$Skill$get_name$(Mons$Game$get_skills_at$(1n, _hero_obj$1));
        var _j$5 = Mons$Skill$get_name$(Mons$Game$get_skills_at$(2n, _hero_obj$1));
        var _k$6 = Mons$Skill$get_name$(Mons$Game$get_skills_at$(3n, _hero_obj$1));
        var _scr$7 = Mons$draw$text$(String$flatten$(List$cons$("[u] ", List$cons$(_u$3, List$cons$("   [i] ", List$cons$(_i$4, List$nil))))), Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$2);
        var $1121 = Mons$draw$text$(String$flatten$(List$cons$("[j] ", List$cons$(_j$5, List$cons$("   [k] ", List$cons$(_k$6, List$nil))))), Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$7);
        return $1121;
    };
    const Mons$draw$battle_skills = x0 => x1 => Mons$draw$battle_skills$(x0, x1);

    function Mons$draw$get_full_bg$(_idx$1) {
        var $1122 = Pair$snd$(Mons$draw$background$(_idx$1));
        return $1122;
    };
    const Mons$draw$get_full_bg = x0 => Mons$draw$get_full_bg$(x0);

    function Mons$draw$capture_bg$(_adve_kind$1, _idx$2, _scr$3) {
        var _scr$4 = Mons$draw$image$(Mons$draw$get_full_bg$(_idx$2), ((0 | 120 | (80 << 12) | (0 << 24))), _scr$3);
        var _sct$5 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$4);
        var $1123 = _scr$4;
        return $1123;
    };
    const Mons$draw$capture_bg = x0 => x1 => x2 => Mons$draw$capture_bg$(x0, x1, x2);

    function Mons$draw$battle_win_bg$(_adve_kind$1, _idx$2, _scr$3) {
        var _battle_win$4 = Image3D$empty;
        var _scr$5 = Mons$draw$image$(Mons$draw$get_full_bg$(_idx$2), ((0 | 120 | (80 << 12) | (0 << 24))), _scr$3);
        var _scr$6 = Mons$draw$image$(_battle_win$4, ((0 | 70 | (90 << 12) | (0 << 24))), _scr$5);
        var _scr$7 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$6);
        var $1124 = _scr$7;
        return $1124;
    };
    const Mons$draw$battle_win_bg = x0 => x1 => x2 => Mons$draw$battle_win_bg$(x0, x1, x2);

    function Mons$Kind$is_portal$(_adve_kin$1) {
        var self = _adve_kin$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $1126 = self.ele;
                var $1127 = self.boss;
                var $1128 = self.pri_type;
                var $1129 = self.agi;
                var $1130 = Bool$false;
                var $1125 = $1130;
                break;
            case 'Mons.Kind.Const':
                var $1131 = self.ele;
                var self = $1131;
                switch (self._) {
                    case 'Mons.Kind.const.FOUNTAIN':
                        var $1133 = self.model;
                        var $1134 = self.slice;
                        var $1135 = Bool$false;
                        var $1132 = $1135;
                        break;
                    case 'Mons.Kind.const.CHEST':
                        var $1136 = Bool$false;
                        var $1132 = $1136;
                        break;
                    case 'Mons.Kind.const.CRYSTAL':
                        var $1137 = Bool$false;
                        var $1132 = $1137;
                        break;
                    case 'Mons.Kind.const.PORTAL':
                        var $1138 = Bool$true;
                        var $1132 = $1138;
                        break;
                };
                var $1125 = $1132;
                break;
            case 'Mons.Kind.Terrain':
                var $1139 = self.ele;
                var $1140 = Bool$false;
                var $1125 = $1140;
                break;
            case 'Mons.Kind.Interactive':
                var $1141 = self.ele;
                var $1142 = self.on;
                var $1143 = self.eff;
                var $1144 = Bool$false;
                var $1125 = $1144;
                break;
        };
        return $1125;
    };
    const Mons$Kind$is_portal = x0 => Mons$Kind$is_portal$(x0);
    const Bool$or = a0 => a1 => (a0 || a1);

    function Mons$Game$defeated_lvl_mons$(_qtd_defeated$1, _dim$2) {
        var self = (_dim$2 === 0);
        if (self) {
            var $1146 = Bool$true;
            var $1145 = $1146;
        } else {
            var self = (_dim$2 === 1);
            if (self) {
                var $1148 = Bool$true;
                var $1147 = $1148;
            } else {
                var $1149 = Bool$false;
                var $1147 = $1149;
            };
            var $1145 = $1147;
        };
        return $1145;
    };
    const Mons$Game$defeated_lvl_mons = x0 => x1 => Mons$Game$defeated_lvl_mons$(x0, x1);
    const Mons$Assets$void = Image3D$parse$("7878021012167978021012167a78021012167b78021012167c78021012167d78021012167e78021012167f78021012168078021012168178021012168278021012168378021012168478021012168578021012168678021012168778021012167879021012167979021012167a79021012167b79021012167c79021012167d79021012167e79021012167f7902101216807902101216817902101216827902101216837902101216847902101216857902101216867902101216877902101216787a02101216797a021012167a7a021012167b7a021012167c7a021012167d7a021012167e7a021012167f7a02101216807a02101216817a02101216827a02101216837a02101216847a02101216857a02101216867a02101216877a02101216787b02101216797b021012167a7b021012167b7b021012167c7b021012167d7b021012167e7b021012167f7b02101216807b02101216817b02101216827b02101216837b02101216847b02101216857b02101216867b02101216877b02101216787c02101216797c021012167a7c021012167b7c021012167c7c021012167d7c021012167e7c021012167f7c02101216807c02101216817c02101216827c02101216837c02101216847c02101216857c02101216867c02101216877c02101216787d02101216797d021012167a7d021012167b7d021012167c7d021012167d7d021012167e7d021012167f7d02101216807d02101216817d02101216827d02101216837d02101216847d02101216857d02101216867d02101216877d02101216787e02101216797e021012167a7e021012167b7e021012167c7e021012167d7e021012167e7e021012167f7e02101216807e02101216817e02101216827e02101216837e02101216847e02101216857e02101216867e02101216877e02101216787f02101216797f021012167a7f021012167b7f021012167c7f021012167d7f021012167e7f021012167f7f02101216807f02101216817f02101216827f02101216837f02101216847f02101216857f02101216867f02101216877f021012167880021012167980021012167a80021012167b80021012167c80021012167d80021012167e80021012167f80021012168080021012168180021012168280021012168380021012168480021012168580021012168680021012168780021012167881021012167981021012167a81021012167b81021012167c81021012167d81021012167e81021012167f81021012168081021012168181021012168281021012168381021012168481021012168581021012168681021012168781021012167882021012167982021012167a82021012167b82021012167c82021012167d82021012167e82021012167f82021012168082021012168182021012168282021012168382021012168482021012168582021012168682021012168782021012167883021012167983021012167a83021012167b83021012167c83021012167d83021012167e83021012167f83021012168083021012168183021012168283021012168383021012168483021012168583021012168683021012168783021012167884021012167984021012167a84021012167b84021012167c84021012167d84021012167e84021012167f84021012168084021012168184021012168284021012168384021012168484021012168584021012168684021012168784021012167885021012167985021012167a85021012167b85021012167c85021012167d85021012167e85021012167f85021012168085021012168185021012168285021012168385021012168485021012168585021012168685021012168785021012167886021012167986021012167a86021012167b86021012167c86021012167d86021012167e86021012167f86021012168086021012168186021012168286021012168386021012168486021012168586021012168686021012168786021012167887021012167987021012167a87021012167b87021012167c87021012167d87021012167e87021012167f8702101216808702101216818702101216828702101216838702101216848702101216858702101216868702101216878702101216");

    function Mons$Object$qtd_mons_defeated$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1151 = self.kin;
                var $1152 = self.dir;
                var $1153 = self.pad;
                var $1154 = self.ani;
                var $1155 = self.dmg;
                var $1156 = self.bag;
                var $1157 = self.mon;
                var $1158 = self.bos;
                var $1159 = self.cap;
                var $1160 = self.idl;
                var $1161 = self.eff;
                var $1162 = (Number((list_length(Pair$snd$($1159)))));
                var $1150 = $1162;
                break;
        };
        return $1150;
    };
    const Mons$Object$qtd_mons_defeated = x0 => Mons$Object$qtd_mons_defeated$(x0);

    function Mons$draw$bag_select$(_mon_idx$1, _qtd$2, _scr$3) {
        var _def_y$4 = 42;
        var self = (_mon_idx$1 === 0);
        if (self) {
            var $1164 = ((0 | 160 | (_def_y$4 << 12) | (0 << 24)));
            var _pos$5 = $1164;
        } else {
            var $1165 = ((0 | 160 | (((_def_y$4 + ((16 * _mon_idx$1) >>> 0)) >>> 0) << 12) | (0 << 24)));
            var _pos$5 = $1165;
        };
        var self = (_qtd$2 === 0);
        if (self) {
            var $1166 = _scr$3;
            var $1163 = $1166;
        } else {
            var _inventory_row_mon_selected$6 = Image3D$empty;
            var $1167 = Mons$draw$image$(_inventory_row_mon_selected$6, _pos$5, _scr$3);
            var $1163 = $1167;
        };
        return $1163;
    };
    const Mons$draw$bag_select = x0 => x1 => x2 => Mons$draw$bag_select$(x0, x1, x2);

    function Mons$draw$bag$(_obj$1, _idx$2, _scr$3) {
        var _inventory$4 = Mons$Assets$void;
        var _scr$5 = Mons$draw$image$(_inventory$4, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$3);
        var _scr$6 = Mons$draw$image$(Mons$draw$get_full_bg$(_idx$2), ((0 | 120 | (80 << 12) | (0 << 24))), _scr$5);
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1169 = self.kin;
                var $1170 = self.dir;
                var $1171 = self.pad;
                var $1172 = self.ani;
                var $1173 = self.dmg;
                var $1174 = self.bag;
                var $1175 = self.mon;
                var $1176 = self.bos;
                var $1177 = self.cap;
                var $1178 = self.idl;
                var $1179 = self.eff;
                var _boss_def$18 = U32$to_string$((Number((list_length($1176)))));
                var _qtd$19 = (Number((list_length($1174))));
                var self = (_qtd$19 === 0);
                if (self) {
                    var $1181 = "Nothing to show for now";
                    var _qtd_field$20 = $1181;
                } else {
                    var _qtd_mons_game$20 = U32$to_string$(Pair$fst$($1177));
                    var _qtd_defeated$21 = U32$to_string$(Mons$Object$qtd_mons_defeated$(_obj$1));
                    var $1182 = String$flatten$(List$cons$("Captured: ", List$cons$(_qtd_defeated$21, List$cons$("/", List$cons$(_qtd_mons_game$20, List$nil)))));
                    var _qtd_field$20 = $1182;
                };
                var _scr$21 = Mons$draw$text$(_qtd_field$20, Mons$Char_black$font, ((0 | 95 | (25 << 12) | (0 << 24))), _scr$6);
                var _scr$22 = Mons$draw$bag_select$($1175, _qtd$19, _scr$21);
                var _scr$23 = Mons$draw$mon_img_selected$($1175, _qtd$19, Bool$false, 34, ((0 | 40 | (50 << 12) | (0 << 24))), _scr$22);
                var _mons_names$24 = List$reverse$(Mons$Object$get_names$($1174));
                var _mons_images$25 = List$reverse$(Mons$Object$get_images$($1174));
                var _scr$26 = Mons$draw$list_image$(_mons_images$25, Bool$false, 34, ((0 | 40 | (50 << 12) | (0 << 24))), _scr$23);
                var _scr$27 = Mons$draw$list$(_mons_names$24, Bool$false, 14, Mons$Char_black$font, ((0 | 95 | (29 << 12) | (0 << 24))), _scr$26);
                var $1180 = _scr$27;
                var $1168 = $1180;
                break;
        };
        return $1168;
    };
    const Mons$draw$bag = x0 => x1 => x2 => Mons$draw$bag$(x0, x1, x2);

    function Mons$draw$full_bag$(_obj$1, _adve_obj$2, _idx$3, _scr$4) {
        var _inventory_mon_selection$5 = Image3D$empty;
        var _inventory_replace$6 = Image3D$empty;
        var _scr$7 = Mons$draw$image$(Mons$draw$get_full_bg$(_idx$3), ((0 | 120 | (80 << 12) | (0 << 24))), _scr$4);
        var _scr$8 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$7);
        var _scr$9 = Mons$draw$image$(_inventory_replace$6, ((0 | 65 | (60 << 12) | (0 << 24))), _scr$8);
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1184 = self.kin;
                var $1185 = self.dir;
                var $1186 = self.pad;
                var $1187 = self.ani;
                var $1188 = self.dmg;
                var $1189 = self.bag;
                var $1190 = self.mon;
                var $1191 = self.bos;
                var $1192 = self.cap;
                var $1193 = self.idl;
                var $1194 = self.eff;
                var self = _adve_obj$2;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $1196 = self.kin;
                        var $1197 = self.dir;
                        var $1198 = self.pad;
                        var $1199 = self.ani;
                        var $1200 = self.dmg;
                        var $1201 = self.bag;
                        var $1202 = self.mon;
                        var $1203 = self.bos;
                        var $1204 = self.cap;
                        var $1205 = self.idl;
                        var $1206 = self.eff;
                        var self = Mons$Kind$attr$($1196);
                        switch (self._) {
                            case 'Mons.Attr.new':
                                var $1208 = self.blocks;
                                var $1209 = self.mhp;
                                var $1210 = self.atk;
                                var $1211 = self.name;
                                var $1212 = self.wlk;
                                var $1213 = self.idl;
                                var $1214 = self.pic;
                                var $1215 = self.battle_spr;
                                var $1216 = self.skills;
                                var $1217 = self.pos;
                                var _scr$42 = Mons$draw$image$($1215(Bool$false), ((0 | 180 | (40 << 12) | (0 << 24))), _scr$9);
                                var _scr$43 = Mons$draw$image$($1214, ((0 | 180 | (90 << 12) | (0 << 24))), _scr$42);
                                var _scr$44 = Mons$draw$image$(_inventory_mon_selection$5, ((0 | 180 | (90 << 12) | (0 << 24))), _scr$43);
                                var _qtd$45 = (Number((list_length($1189))));
                                var _mons_images$46 = List$reverse$(Mons$Object$get_images$($1189));
                                var _scr$47 = Mons$draw$list_image$(_mons_images$46, Bool$true, 35, ((0 | 30 | (90 << 12) | (0 << 24))), _scr$44);
                                var _scr$48 = Mons$draw$mon_img_selected$($1190, _qtd$45, Bool$true, 35, ((0 | 30 | (90 << 12) | (0 << 24))), _scr$47);
                                var _scr$49 = Mons$draw$text$("Select a mon to replace or skip", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$48);
                                var _scr$50 = Mons$draw$text$("[c] Replace  | [z] Skip     ", Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$49);
                                var $1218 = _scr$50;
                                var $1207 = $1218;
                                break;
                        };
                        var $1195 = $1207;
                        break;
                };
                var $1183 = $1195;
                break;
        };
        return $1183;
    };
    const Mons$draw$full_bag = x0 => x1 => x2 => x3 => Mons$draw$full_bag$(x0, x1, x2, x3);

    function Mons$draw$(_game$1, _scr$2) {
        var self = _game$1;
        switch (self._) {
            case 'Mons.Game.new':
                var $1220 = self.usr;
                var $1221 = self.pos;
                var $1222 = self.map;
                var $1223 = self.stt;
                var $1224 = self.tik;
                var _hero_pos$8 = Mons$Game$get_hero_pos$(_game$1);
                var _scr$9 = Image3D$clear$(_scr$2);
                var self = _hero_pos$8;
                switch (self._) {
                    case 'Maybe.none':
                        var $1226 = _scr$9;
                        var $1225 = $1226;
                        break;
                    case 'Maybe.some':
                        var $1227 = self.value;
                        var _hero_pair$11 = Mons$Map$get_hero$($1227, $1222);
                        var _hero_obj$12 = Pair$fst$(_hero_pair$11);
                        var _hero_idx$13 = Pair$snd$(_hero_pair$11);
                        var _adve_obj$14 = Mons$Map$get$($1227, ((_hero_idx$13 + 1) >>> 0), $1222);
                        var _dim$15 = Mons$Game$dim$(_game$1);
                        var self = _hero_obj$12;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $1229 = self.kin;
                                var $1230 = self.dir;
                                var $1231 = self.pad;
                                var $1232 = self.ani;
                                var $1233 = self.dmg;
                                var $1234 = self.bag;
                                var $1235 = self.mon;
                                var $1236 = self.bos;
                                var $1237 = self.cap;
                                var $1238 = self.idl;
                                var $1239 = self.eff;
                                var self = _adve_obj$14;
                                switch (self._) {
                                    case 'Mons.Object.new':
                                        var $1241 = self.kin;
                                        var $1242 = self.dir;
                                        var $1243 = self.pad;
                                        var $1244 = self.ani;
                                        var $1245 = self.dmg;
                                        var $1246 = self.bag;
                                        var $1247 = self.mon;
                                        var $1248 = self.bos;
                                        var $1249 = self.cap;
                                        var $1250 = self.idl;
                                        var $1251 = self.eff;
                                        var _hero_mon_obj$38 = Mons$Object$get_current_mon$(_hero_obj$12);
                                        var self = _hero_mon_obj$38;
                                        switch (self._) {
                                            case 'Mons.Object.new':
                                                var $1253 = self.kin;
                                                var $1254 = self.dir;
                                                var $1255 = self.pad;
                                                var $1256 = self.ani;
                                                var $1257 = self.dmg;
                                                var $1258 = self.bag;
                                                var $1259 = self.mon;
                                                var $1260 = self.bos;
                                                var $1261 = self.cap;
                                                var $1262 = self.idl;
                                                var $1263 = self.eff;
                                                var self = Mons$Kind$attr$($1241);
                                                switch (self._) {
                                                    case 'Mons.Attr.new':
                                                        var $1265 = self.blocks;
                                                        var $1266 = self.mhp;
                                                        var $1267 = self.atk;
                                                        var $1268 = self.name;
                                                        var $1269 = self.wlk;
                                                        var $1270 = self.idl;
                                                        var $1271 = self.pic;
                                                        var $1272 = self.battle_spr;
                                                        var $1273 = self.skills;
                                                        var $1274 = self.pos;
                                                        var _is_standing$60 = Mons$Object$is_standing$(_hero_obj$12);
                                                        var self = $1223;
                                                        switch (self._) {
                                                            case 'Mons.Screen.welcome':
                                                                var $1276 = self.idx;
                                                                var _logo$62 = Mons$Char_black$103;
                                                                var _scr$63 = Mons$draw$image$(_logo$62, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$9);
                                                                var _scr$64 = Mons$draw$list$(List$cons$("Play", List$cons$("Credits", List$nil)), Bool$false, 25, Mons$Char_black$font, ((0 | 40 | (50 << 12) | (0 << 24))), _scr$63);
                                                                var _scr$65 = Mons$draw$list_selector$($1276, Bool$false, 25, Mons$Char_black$font, ((0 | 30 | (50 << 12) | (0 << 24))), _scr$64);
                                                                var _scr$66 = Mons$draw$text$("[c] Select", Mons$Char_black$font, ((0 | 40 | (128 << 12) | (0 << 24))), _scr$65);
                                                                var $1277 = _scr$66;
                                                                var $1275 = $1277;
                                                                break;
                                                            case 'Mons.Screen.credits':
                                                                var _battle_normal_bg_full$61 = Image3D$empty;
                                                                var _scr$62 = Mons$draw$image$(_battle_normal_bg_full$61, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$9);
                                                                var _artists0$63 = List$cons$("Alexandre Avila", List$cons$("Caio Carvalho", List$cons$("Johnny Azevedo", List$cons$("Lucca Tuelher", List$cons$("Maisa Milena", List$cons$("Marcio Maia", List$cons$("Marcos Medeiros", List$nil)))))));
                                                                var _artists1$64 = List$cons$("Marcos Motta", List$cons$("Nathan Danjo", List$cons$("Paulo Reis", List$cons$("Pedro Taka", List$cons$("Rodrigo Rodrigues", List$cons$("Victor Maia", List$cons$("Yuri Carvalho", List$nil)))))));
                                                                var _scr$65 = Mons$draw$text$("[z] Back", Mons$Char_white$font, ((0 | 20 | (15 << 12) | (0 << 24))), _scr$62);
                                                                var _scr$66 = Mons$draw$list$(_artists0$63, Bool$false, 15, Mons$Char_white$font, ((0 | 20 | (20 << 12) | (0 << 24))), _scr$65);
                                                                var _scr$67 = Mons$draw$list$(_artists1$64, Bool$false, 15, Mons$Char_white$font, ((0 | 125 | (20 << 12) | (0 << 24))), _scr$66);
                                                                var $1278 = _scr$67;
                                                                var $1275 = $1278;
                                                                break;
                                                            case 'Mons.Screen.introduction':
                                                                var $1279 = self.step;
                                                                var self = (($1268 === "MAGE") && _is_standing$60);
                                                                if (self) {
                                                                    var self = ($1279 === 0);
                                                                    if (self) {
                                                                        var _game$62 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                        var $1282 = Mons$draw$mage_talk$("Oh! So you really exist... the", "young man of the prophecy. [c]", _scr$9);
                                                                        var $1281 = $1282;
                                                                    } else {
                                                                        var self = ($1279 === 1);
                                                                        if (self) {
                                                                            var _game$62 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                            var $1284 = Mons$draw$mage_talk$("I\'m in a hurry and can\'t explain", "now, but... we depend on you. [c]", _scr$9);
                                                                            var $1283 = $1284;
                                                                        } else {
                                                                            var self = ($1279 === 2);
                                                                            if (self) {
                                                                                var _game$62 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                var $1286 = Mons$draw$mage_talk$("Great choice! You can press", "[e] to check it on the bag. [c]", _scr$9);
                                                                                var $1285 = $1286;
                                                                            } else {
                                                                                var $1287 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                var $1285 = $1287;
                                                                            };
                                                                            var $1283 = $1285;
                                                                        };
                                                                        var $1281 = $1283;
                                                                    };
                                                                    var $1280 = $1281;
                                                                } else {
                                                                    var $1288 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                    var $1280 = $1288;
                                                                };
                                                                var $1275 = $1280;
                                                                break;
                                                            case 'Mons.Screen.intro_select':
                                                                var $1289 = self.idx;
                                                                var _game$62 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                var $1290 = Mons$draw$initial_mons$(_hero_obj$12, _scr$9);
                                                                var $1275 = $1290;
                                                                break;
                                                            case 'Mons.Screen.game':
                                                                var $1291 = self.cmd;
                                                                var $1292 = self.turn;
                                                                var _hero_mon_attr$63 = Mons$Kind$attr$($1253);
                                                                var self = _hero_mon_attr$63;
                                                                switch (self._) {
                                                                    case 'Mons.Attr.new':
                                                                        var $1294 = self.blocks;
                                                                        var $1295 = self.mhp;
                                                                        var $1296 = self.atk;
                                                                        var $1297 = self.name;
                                                                        var $1298 = self.wlk;
                                                                        var $1299 = self.idl;
                                                                        var $1300 = self.pic;
                                                                        var $1301 = self.battle_spr;
                                                                        var $1302 = self.skills;
                                                                        var $1303 = self.pos;
                                                                        var self = $1241;
                                                                        switch (self._) {
                                                                            case 'Mons.Kind.Mons':
                                                                                var $1305 = self.ele;
                                                                                var $1306 = self.boss;
                                                                                var $1307 = self.pri_type;
                                                                                var $1308 = self.agi;
                                                                                var _hero_chp$78 = (Math.max($1295 - $1257, 0));
                                                                                var _hero_btl_img$79 = $1301(Bool$true);
                                                                                var _hero_txt$80 = String$flatten$(List$cons$($1297, List$cons$(" ", List$cons$(Mons$draw$img_type$($1253), List$nil))));
                                                                                var _hero_hp$81 = String$flatten$(List$cons$(Mons$draw$small_HP, List$cons$(" ", List$cons$(U32$to_string$(_hero_chp$78), List$cons$("/", List$cons$(U32$to_string$($1295), List$nil))))));
                                                                                var _adve_chp$82 = (Math.max($1266 - $1245, 0));
                                                                                var _adve_btl_img$83 = $1272(Bool$false);
                                                                                var _adve_txt$84 = String$flatten$(List$cons$($1268, List$cons$(" ", List$cons$(Mons$draw$img_type$($1241), List$nil))));
                                                                                var _adve_hp$85 = String$flatten$(List$cons$(Mons$draw$small_HP, List$cons$(" ", List$cons$(U32$to_string$(_adve_chp$82), List$cons$("/", List$cons$(U32$to_string$($1266), List$nil))))));
                                                                                var self = _is_standing$60;
                                                                                if (self) {
                                                                                    var self = Mons$Object$is_battling$(_adve_obj$14, _hero_mon_obj$38);
                                                                                    if (self) {
                                                                                        var _scr$86 = Mons$draw$battle_bg$($1305, $1306, _dim$15, _scr$9);
                                                                                        var _scr$87 = Mons$draw$hero_hp$(_hero_chp$78, $1295, _hero_txt$80, _hero_hp$81, _scr$86);
                                                                                        var _scr$88 = Mons$draw$adve_hp$(_adve_chp$82, $1266, _adve_txt$84, _adve_hp$85, _scr$87);
                                                                                        var _scr$89 = Mons$draw$image$(_hero_btl_img$79, ((0 | 75 | (80 << 12) | (0 << 24))), _scr$88);
                                                                                        var _scr$90 = Mons$draw$image$(_adve_btl_img$83, ((0 | 180 | (40 << 12) | (0 << 24))), _scr$89);
                                                                                        var self = $1292;
                                                                                        switch (self._) {
                                                                                            case 'Mons.Turn.new':
                                                                                                var $1312 = self.exec_hero;
                                                                                                var $1313 = self.hero_skill;
                                                                                                var $1314 = self.adve_skill;
                                                                                                var $1315 = self.play;
                                                                                                var _scr$95 = Mons$draw$effects$($1263, $1251, _scr$90);
                                                                                                var self = Mons$Turn$is_active$($1292);
                                                                                                if (self) {
                                                                                                    var self = Mons$Turn$hero_turn$($1292);
                                                                                                    if (self) {
                                                                                                        var $1318 = Mons$draw$turn$($1297, $1313, _scr$95);
                                                                                                        var $1317 = $1318;
                                                                                                    } else {
                                                                                                        var $1319 = Mons$draw$turn$($1268, $1314, _scr$95);
                                                                                                        var $1317 = $1319;
                                                                                                    };
                                                                                                    var $1316 = $1317;
                                                                                                } else {
                                                                                                    var $1320 = Mons$draw$battle_skills$(_hero_mon_obj$38, _scr$95);
                                                                                                    var $1316 = $1320;
                                                                                                };
                                                                                                var $1311 = $1316;
                                                                                                break;
                                                                                        };
                                                                                        var $1310 = $1311;
                                                                                    } else {
                                                                                        var _scr$86 = Mons$draw$capture_bg$($1305, _dim$15, _scr$9);
                                                                                        var self = Mons$Object$is_obj_defeated$(_adve_obj$14);
                                                                                        if (self) {
                                                                                            var self = $1306;
                                                                                            if (self) {
                                                                                                var _scr$87 = Mons$draw$battle_win_bg$($1305, _dim$15, _scr$86);
                                                                                                var _scr$88 = Mons$draw$text$("You unlocked the next level.", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$87);
                                                                                                var _scr$89 = Mons$draw$text$("[c] I\'m ready!", Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$88);
                                                                                                var $1323 = Mons$draw$image$(_adve_btl_img$83, ((0 | 180 | (40 << 12) | (0 << 24))), _scr$89);
                                                                                                var $1322 = $1323;
                                                                                            } else {
                                                                                                var _scr$87 = Mons$draw$battle_win_bg$($1305, _dim$15, _scr$86);
                                                                                                var _scr$88 = Mons$draw$text$("[c] Capture", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$87);
                                                                                                var _scr$89 = Mons$draw$text$("[z] Free", Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$88);
                                                                                                var $1324 = Mons$draw$image$(_adve_btl_img$83, ((0 | 180 | (40 << 12) | (0 << 24))), _scr$89);
                                                                                                var $1322 = $1324;
                                                                                            };
                                                                                            var _scr$87 = $1322;
                                                                                        } else {
                                                                                            var self = Mons$Object$is_obj_defeated$(_hero_mon_obj$38);
                                                                                            if (self) {
                                                                                                var _scr$87 = Mons$draw$text$("You lost the battle and your Mon.", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$86);
                                                                                                var _scr$88 = Mons$draw$text$("[c] I\'ll do better next time", Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$87);
                                                                                                var $1326 = Mons$draw$image$(_hero_btl_img$79, ((0 | 75 | (80 << 12) | (0 << 24))), _scr$88);
                                                                                                var $1325 = $1326;
                                                                                            } else {
                                                                                                var $1327 = _scr$86;
                                                                                                var $1325 = $1327;
                                                                                            };
                                                                                            var _scr$87 = $1325;
                                                                                        };
                                                                                        var $1321 = _scr$87;
                                                                                        var $1310 = $1321;
                                                                                    };
                                                                                    var $1309 = $1310;
                                                                                } else {
                                                                                    var $1328 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                    var $1309 = $1328;
                                                                                };
                                                                                var $1304 = $1309;
                                                                                break;
                                                                            case 'Mons.Kind.Const':
                                                                                var $1329 = self.ele;
                                                                                var self = (_is_standing$60 && Mons$Kind$is_portal$($1241));
                                                                                if (self) {
                                                                                    var _game$75 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                    var self = (Mons$Game$defeated_lvl_mons$(Pair$fst$($1237), _dim$15) || ((Number((list_length($1236)))) === ((_dim$15 / 2) >>> 0)));
                                                                                    if (self) {
                                                                                        var _scr$76 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$9);
                                                                                        var $1332 = Mons$draw$text$("Press [c] to access next level", Mons$Char_black$font, ((0 | 30 | (135 << 12) | (0 << 24))), _scr$76);
                                                                                        var $1331 = $1332;
                                                                                    } else {
                                                                                        var _scr$76 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$9);
                                                                                        var _scr$77 = Mons$draw$text$("To access the next level you must", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$76);
                                                                                        var $1333 = Mons$draw$text$("first defeat all enemies.", Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$77);
                                                                                        var $1331 = $1333;
                                                                                    };
                                                                                    var $1330 = $1331;
                                                                                } else {
                                                                                    var $1334 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                    var $1330 = $1334;
                                                                                };
                                                                                var $1304 = $1330;
                                                                                break;
                                                                            case 'Mons.Kind.Terrain':
                                                                                var $1335 = self.ele;
                                                                                var $1336 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                var $1304 = $1336;
                                                                                break;
                                                                            case 'Mons.Kind.Interactive':
                                                                                var $1337 = self.ele;
                                                                                var $1338 = self.on;
                                                                                var $1339 = self.eff;
                                                                                var self = $1337;
                                                                                switch (self._) {
                                                                                    case 'Mons.Kind.inter.LEVER':
                                                                                        var $1341 = self.id;
                                                                                        var $1342 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                        var $1340 = $1342;
                                                                                        break;
                                                                                    case 'Mons.Kind.inter.MOVE':
                                                                                        var $1343 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                        var $1340 = $1343;
                                                                                        break;
                                                                                    case 'Mons.Kind.inter.HEAL':
                                                                                        var self = $1338;
                                                                                        if (self) {
                                                                                            var _scr$77 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                            var _scr$78 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$77);
                                                                                            var $1345 = Mons$draw$text$("You already used the heal.", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$78);
                                                                                            var $1344 = $1345;
                                                                                        } else {
                                                                                            var _scr$77 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                                            var _scr$78 = Mons$draw$image$(Mons$draw$text_screen_bg, ((0 | 120 | (80 << 12) | (0 << 24))), _scr$77);
                                                                                            var _scr$79 = Mons$draw$text$("Press [c] to heal 15HP on all of", Mons$Char_black$font, Mons$draw$msg_screen$line_0, _scr$78);
                                                                                            var $1346 = Mons$draw$text$("your Mons", Mons$Char_black$font, Mons$draw$msg_screen$line_1, _scr$79);
                                                                                            var $1344 = $1346;
                                                                                        };
                                                                                        var $1340 = $1344;
                                                                                        break;
                                                                                };
                                                                                var $1304 = $1340;
                                                                                break;
                                                                        };
                                                                        var $1293 = $1304;
                                                                        break;
                                                                };
                                                                var $1275 = $1293;
                                                                break;
                                                            case 'Mons.Screen.inventory':
                                                                var $1347 = self.idx;
                                                                var $1348 = Mons$draw$bag$(_hero_obj$12, _dim$15, _scr$9);
                                                                var $1275 = $1348;
                                                                break;
                                                            case 'Mons.Screen.capture_mon':
                                                                var $1349 = self.idx;
                                                                var $1350 = self.full_bag;
                                                                var self = $1350;
                                                                if (self) {
                                                                    var $1352 = Mons$draw$full_bag$(_hero_obj$12, _adve_obj$14, _dim$15, _scr$9);
                                                                    var $1351 = $1352;
                                                                } else {
                                                                    var $1353 = Mons$Map$build_sprites$(_game$1, _scr$9, $1227, _hero_obj$12);
                                                                    var $1351 = $1353;
                                                                };
                                                                var $1275 = $1351;
                                                                break;
                                                            case 'Mons.Screen.game_over':
                                                                var $1354 = Mons$draw$text$("GAME OVER", Mons$Char_white$font, ((0 | 90 | (80 << 12) | (0 << 24))), _scr$9);
                                                                var $1275 = $1354;
                                                                break;
                                                        };
                                                        var $1264 = $1275;
                                                        break;
                                                };
                                                var $1252 = $1264;
                                                break;
                                        };
                                        var $1240 = $1252;
                                        break;
                                };
                                var $1228 = $1240;
                                break;
                        };
                        var $1225 = $1228;
                        break;
                };
                var $1219 = $1225;
                break;
        };
        return $1219;
    };
    const Mons$draw = x0 => x1 => Mons$draw$(x0, x1);

    function App$Action$(_S$1) {
        var $1355 = null;
        return $1355;
    };
    const App$Action = x0 => App$Action$(x0);

    function App$Action$print$(_text$2) {
        var $1356 = ({
            _: 'App.Action.print',
            'text': _text$2
        });
        return $1356;
    };
    const App$Action$print = x0 => App$Action$print$(x0);

    function App$Action$resize$(_width$2, _height$3) {
        var $1357 = ({
            _: 'App.Action.resize',
            'width': _width$2,
            'height': _height$3
        });
        return $1357;
    };
    const App$Action$resize = x0 => x1 => App$Action$resize$(x0, x1);
    const Mons$scr_w = ((((Mons$scr_mid & 0xFFF)) * 2) >>> 0);
    const Mons$scr_h = (((((Mons$scr_mid >>> 12) & 0xFFF)) * 2) >>> 0);

    function App$Action$state$(_value$2) {
        var $1358 = ({
            _: 'App.Action.state',
            'value': _value$2
        });
        return $1358;
    };
    const App$Action$state = x0 => App$Action$state$(x0);

    function Mons$Game$set_usr$(_usr$1, _game$2) {
        var self = _game$2;
        switch (self._) {
            case 'Mons.Game.new':
                var $1360 = self.usr;
                var $1361 = self.pos;
                var $1362 = self.map;
                var $1363 = self.stt;
                var $1364 = self.tik;
                var $1365 = Mons$Game$new$(_usr$1, $1361, $1362, $1363, $1364);
                var $1359 = $1365;
                break;
        };
        return $1359;
    };
    const Mons$Game$set_usr = x0 => x1 => Mons$Game$set_usr$(x0, x1);

    function App$Action$watch$(_room$2) {
        var $1366 = ({
            _: 'App.Action.watch',
            'room': _room$2
        });
        return $1366;
    };
    const App$Action$watch = x0 => App$Action$watch$(x0);

    function Word$from_bits$(_size$1, _bits$2) {
        var self = _size$1;
        if (self === 0n) {
            var $1368 = Word$e;
            var $1367 = $1368;
        } else {
            var $1369 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $1371 = Word$o$(Word$from_bits$($1369, Bits$e));
                    var $1370 = $1371;
                    break;
                case 'o':
                    var $1372 = self.slice(0, -1);
                    var $1373 = Word$o$(Word$from_bits$($1369, $1372));
                    var $1370 = $1373;
                    break;
                case 'i':
                    var $1374 = self.slice(0, -1);
                    var $1375 = Word$i$(Word$from_bits$($1369, $1374));
                    var $1370 = $1375;
                    break;
            };
            var $1367 = $1370;
        };
        return $1367;
    };
    const Word$from_bits = x0 => x1 => Word$from_bits$(x0, x1);
    const Bits$concat = a0 => a1 => (a1 + a0);

    function String$to_bits$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $1377 = Bits$e;
            var $1376 = $1377;
        } else {
            var $1378 = self.charCodeAt(0);
            var $1379 = self.slice(1);
            var $1380 = (String$to_bits$($1379) + (u16_to_bits($1378)));
            var $1376 = $1380;
        };
        return $1376;
    };
    const String$to_bits = x0 => String$to_bits$(x0);
    const Mons$App$room = Word$from_bits$(48n, String$to_bits$("MON"));

    function Cmp$as_gte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $1382 = Bool$false;
                var $1381 = $1382;
                break;
            case 'Cmp.eql':
                var $1383 = Bool$true;
                var $1381 = $1383;
                break;
            case 'Cmp.gtn':
                var $1384 = Bool$true;
                var $1381 = $1384;
                break;
        };
        return $1381;
    };
    const Cmp$as_gte = x0 => Cmp$as_gte$(x0);

    function Word$gte$(_a$2, _b$3) {
        var $1385 = Cmp$as_gte$(Word$cmp$(_a$2, _b$3));
        return $1385;
    };
    const Word$gte = x0 => x1 => Word$gte$(x0, x1);
    const U16$gte = a0 => a1 => (a0 >= a1);
    const U16$lte = a0 => a1 => (a0 <= a1);
    const U16$sub = a0 => a1 => (Math.max(a0 - a1, 0));

    function Char$to_upper$(_char$1) {
        var self = ((_char$1 >= 97) && (_char$1 <= 122));
        if (self) {
            var $1387 = (Math.max(_char$1 - 32, 0));
            var $1386 = $1387;
        } else {
            var $1388 = _char$1;
            var $1386 = $1388;
        };
        return $1386;
    };
    const Char$to_upper = x0 => Char$to_upper$(x0);
    const U16$add = a0 => a1 => ((a0 + a1) & 0xFFFF);

    function Char$to_lower$(_char$1) {
        var self = ((_char$1 >= 65) && (_char$1 <= 90));
        if (self) {
            var $1390 = ((_char$1 + 32) & 0xFFFF);
            var $1389 = $1390;
        } else {
            var $1391 = _char$1;
            var $1389 = $1391;
        };
        return $1389;
    };
    const Char$to_lower = x0 => Char$to_lower$(x0);

    function Mons$Input$char$(_down$1, _code$2) {
        var self = _down$1;
        if (self) {
            var $1393 = Char$to_upper$(_code$2);
            var $1392 = $1393;
        } else {
            var $1394 = Char$to_lower$(_code$2);
            var $1392 = $1394;
        };
        return $1392;
    };
    const Mons$Input$char = x0 => x1 => Mons$Input$char$(x0, x1);
    const Mons$Input$list = (() => {
        var _b0$1 = Bits$o;
        var _b1$2 = Bits$i;
        var _bn$3 = Bits$e;
        var $1395 = List$cons$(Pair$new$(68, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(87, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(65, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(83, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(85, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(73, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(74, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(75, _b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(100, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(119, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(97, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b1$2(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(115, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(117, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b0$1(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(105, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b0$1(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(106, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b1$2(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(107, _b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(101, _b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b0$1(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(69, _b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b0$1(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(99, _b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(67, _b0$1(_b0$1(_b0$1(_b1$2(_b0$1(_b1$2(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(122, _b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b1$2(_b1$2(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(90, _b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b0$1(_b0$1(_b0$1(_bn$3))))))))), List$cons$(Pair$new$(82, _b0$1(_b0$1(_b1$2(_b0$1(_b0$1(_b0$1(_b0$1(_b1$2(_bn$3))))))))), List$cons$(Pair$new$(114, _b0$1(_b0$1(_b0$1(_b1$2(_b1$2(_b1$2(_b1$2(_b1$2(_bn$3))))))))), List$nil))))))))))))))))))))))));
        return $1395;
    })();
    const Mons$Input$char_to_code_map = (() => {
        var _map$1 = Map$new;
        var _map$2 = (() => {
            var $1398 = _map$1;
            var $1399 = Mons$Input$list;
            let _map$3 = $1398;
            let _char_code$2;
            while ($1399._ === 'List.cons') {
                _char_code$2 = $1399.head;
                var self = _char_code$2;
                switch (self._) {
                    case 'Pair.new':
                        var $1400 = self.fst;
                        var $1401 = self.snd;
                        var $1402 = Map$set$((u16_to_bits($1400)), $1401, _map$3);
                        var $1398 = $1402;
                        break;
                };
                _map$3 = $1398;
                $1399 = $1399.tail;
            }
            return _map$3;
        })();
        var $1396 = _map$2;
        return $1396;
    })();

    function Mons$Input$serialize$(_char$1) {
        var self = Map$get$((u16_to_bits(_char$1)), Mons$Input$char_to_code_map);
        switch (self._) {
            case 'Maybe.none':
                var $1404 = Maybe$none;
                var $1403 = $1404;
                break;
            case 'Maybe.some':
                var $1405 = self.value;
                var $1406 = Maybe$some$(Word$from_bits$(256n, $1405));
                var $1403 = $1406;
                break;
        };
        return $1403;
    };
    const Mons$Input$serialize = x0 => Mons$Input$serialize$(x0);

    function App$Action$post$(_room$2, _data$3) {
        var $1407 = ({
            _: 'App.Action.post',
            'room': _room$2,
            'data': _data$3
        });
        return $1407;
    };
    const App$Action$post = x0 => x1 => App$Action$post$(x0, x1);

    function Mons$Object$set_ani$(_obj$1, _ani$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1409 = self.kin;
                var $1410 = self.dir;
                var $1411 = self.pad;
                var $1412 = self.ani;
                var $1413 = self.dmg;
                var $1414 = self.bag;
                var $1415 = self.mon;
                var $1416 = self.bos;
                var $1417 = self.cap;
                var $1418 = self.idl;
                var $1419 = self.eff;
                var $1420 = Mons$Object$new$($1409, $1410, $1411, _ani$2, $1413, $1414, $1415, $1416, $1417, $1418, $1419);
                var $1408 = $1420;
                break;
        };
        return $1408;
    };
    const Mons$Object$set_ani = x0 => x1 => Mons$Object$set_ani$(x0, x1);

    function Mons$Object$set_dir$(_obj$1, _dir$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1422 = self.kin;
                var $1423 = self.dir;
                var $1424 = self.pad;
                var $1425 = self.ani;
                var $1426 = self.dmg;
                var $1427 = self.bag;
                var $1428 = self.mon;
                var $1429 = self.bos;
                var $1430 = self.cap;
                var $1431 = self.idl;
                var $1432 = self.eff;
                var $1433 = Mons$Object$new$($1422, _dir$2, $1424, $1425, $1426, $1427, $1428, $1429, $1430, $1431, $1432);
                var $1421 = $1433;
                break;
        };
        return $1421;
    };
    const Mons$Object$set_dir = x0 => x1 => Mons$Object$set_dir$(x0, x1);

    function Mons$Object$is_free_to_move$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1435 = self.kin;
                var $1436 = self.dir;
                var $1437 = self.pad;
                var $1438 = self.ani;
                var $1439 = self.dmg;
                var $1440 = self.bag;
                var $1441 = self.mon;
                var $1442 = self.bos;
                var $1443 = self.cap;
                var $1444 = self.idl;
                var $1445 = self.eff;
                var $1446 = ($1438 === 0);
                var $1434 = $1446;
                break;
        };
        return $1434;
    };
    const Mons$Object$is_free_to_move = x0 => Mons$Object$is_free_to_move$(x0);
    const Mons$Dir$up = ({
        _: 'Mons.Dir.up'
    });
    const Mons$Dir$left = ({
        _: 'Mons.Dir.left'
    });
    const Mons$Dir$right = ({
        _: 'Mons.Dir.right'
    });

    function Mons$Object$tick$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1448 = self.kin;
                var $1449 = self.dir;
                var $1450 = self.pad;
                var $1451 = self.ani;
                var $1452 = self.dmg;
                var $1453 = self.bag;
                var $1454 = self.mon;
                var $1455 = self.bos;
                var $1456 = self.cap;
                var $1457 = self.idl;
                var $1458 = self.eff;
                var _obj$13 = Mons$Object$set_ani$(_obj$1, (() => {
                    var self = ($1451 > 0);
                    if (self) {
                        var $1460 = (Math.max($1451 - 2, 0));
                        return $1460;
                    } else {
                        var $1461 = $1451;
                        return $1461;
                    };
                })());
                var _obj$14 = Mons$Object$set_dir$(_obj$13, (() => {
                    var self = Mons$Object$is_free_to_move$(_obj$13);
                    if (self) {
                        var self = $1450;
                        switch (self._) {
                            case 'Mons.Pad.new':
                                var $1463 = self.r;
                                var $1464 = self.u;
                                var $1465 = self.l;
                                var $1466 = self.d;
                                var self = $1464;
                                if (self) {
                                    var $1468 = Mons$Dir$up;
                                    var $1467 = $1468;
                                } else {
                                    var self = $1465;
                                    if (self) {
                                        var $1470 = Mons$Dir$left;
                                        var $1469 = $1470;
                                    } else {
                                        var self = $1466;
                                        if (self) {
                                            var $1472 = Mons$Dir$down;
                                            var $1471 = $1472;
                                        } else {
                                            var self = $1463;
                                            if (self) {
                                                var $1474 = Mons$Dir$right;
                                                var $1473 = $1474;
                                            } else {
                                                var $1475 = $1449;
                                                var $1473 = $1475;
                                            };
                                            var $1471 = $1473;
                                        };
                                        var $1469 = $1471;
                                    };
                                    var $1467 = $1469;
                                };
                                var $1462 = $1467;
                                break;
                        };
                        return $1462;
                    } else {
                        var $1476 = $1449;
                        return $1476;
                    };
                })());
                var $1459 = _obj$14;
                var $1447 = $1459;
                break;
        };
        return $1447;
    };
    const Mons$Object$tick = x0 => Mons$Object$tick$(x0);

    function Mons$Dir$move$(_dir$1, _pos$2) {
        var self = _dir$1;
        switch (self._) {
            case 'Mons.Dir.right':
                var $1478 = Pos32$add$(_pos$2, ((0 | 1 | (0 << 12) | (0 << 24))));
                var $1477 = $1478;
                break;
            case 'Mons.Dir.up':
                var $1479 = Pos32$sub$(_pos$2, ((0 | 0 | (1 << 12) | (0 << 24))));
                var $1477 = $1479;
                break;
            case 'Mons.Dir.left':
                var $1480 = Pos32$sub$(_pos$2, ((0 | 1 | (0 << 12) | (0 << 24))));
                var $1477 = $1480;
                break;
            case 'Mons.Dir.down':
                var $1481 = Pos32$add$(_pos$2, ((0 | 0 | (1 << 12) | (0 << 24))));
                var $1477 = $1481;
                break;
        };
        return $1477;
    };
    const Mons$Dir$move = x0 => x1 => Mons$Dir$move$(x0, x1);

    function Mons$Map$pop$(_pos$1, _map$2) {
        var _objs$3 = Mons$Map$get_list$(_pos$1, _map$2);
        var self = _objs$3;
        switch (self._) {
            case 'List.nil':
                var $1483 = Pair$new$(_map$2, Mons$Object$void);
                var $1482 = $1483;
                break;
            case 'List.cons':
                var $1484 = self.head;
                var $1485 = self.tail;
                var _map$6 = Mons$Map$set_list$(_pos$1, $1485, _map$2);
                var $1486 = Pair$new$(_map$6, $1484);
                var $1482 = $1486;
                break;
        };
        return $1482;
    };
    const Mons$Map$pop = x0 => x1 => Mons$Map$pop$(x0, x1);

    function Mons$Map$get_top$(_pos$1, _map$2) {
        var $1487 = Pair$snd$(Mons$Map$pop$(_pos$1, _map$2));
        return $1487;
    };
    const Mons$Map$get_top = x0 => x1 => Mons$Map$get_top$(x0, x1);

    function Mons$Object$is_walking$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1489 = self.kin;
                var $1490 = self.dir;
                var $1491 = self.pad;
                var $1492 = self.ani;
                var $1493 = self.dmg;
                var $1494 = self.bag;
                var $1495 = self.mon;
                var $1496 = self.bos;
                var $1497 = self.cap;
                var $1498 = self.idl;
                var $1499 = self.eff;
                var self = $1491;
                switch (self._) {
                    case 'Mons.Pad.new':
                        var $1501 = self.r;
                        var $1502 = self.u;
                        var $1503 = self.l;
                        var $1504 = self.d;
                        var _is_walking_x$17 = ($1502 || $1504);
                        var _is_walking_y$18 = ($1503 || $1501);
                        var $1505 = (_is_walking_x$17 || _is_walking_y$18);
                        var $1500 = $1505;
                        break;
                };
                var $1488 = $1500;
                break;
        };
        return $1488;
    };
    const Mons$Object$is_walking = x0 => Mons$Object$is_walking$(x0);

    function Mons$Kind$get_blocks$(_kind$1) {
        var self = Mons$Kind$attr$(_kind$1);
        switch (self._) {
            case 'Mons.Attr.new':
                var $1507 = self.blocks;
                var $1508 = self.mhp;
                var $1509 = self.atk;
                var $1510 = self.name;
                var $1511 = self.wlk;
                var $1512 = self.idl;
                var $1513 = self.pic;
                var $1514 = self.battle_spr;
                var $1515 = self.skills;
                var $1516 = self.pos;
                var $1517 = $1507;
                var $1506 = $1517;
                break;
        };
        return $1506;
    };
    const Mons$Kind$get_blocks = x0 => Mons$Kind$get_blocks$(x0);

    function Mons$Game$move_obj$(_from$1, _idx$2, _to$3, _obj$4, _game$5) {
        var _game$6 = Mons$Game$map_del$(_from$1, _idx$2, _game$5);
        var _game$7 = Mons$Game$map_push$(_to$3, _obj$4, _game$6);
        var $1518 = _game$7;
        return $1518;
    };
    const Mons$Game$move_obj = x0 => x1 => x2 => x3 => x4 => Mons$Game$move_obj$(x0, x1, x2, x3, x4);

    function Mons$Game$set_user_pos$(_user$1, _pos$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $1520 = self.usr;
                var $1521 = self.pos;
                var $1522 = self.map;
                var $1523 = self.stt;
                var $1524 = self.tik;
                var $1525 = Mons$Game$new$($1520, Map$set$(Word$to_bits$(_user$1), _pos$2, $1521), $1522, $1523, $1524);
                var $1519 = $1525;
                break;
        };
        return $1519;
    };
    const Mons$Game$set_user_pos = x0 => x1 => x2 => Mons$Game$set_user_pos$(x0, x1, x2);

    function Mons$Game$tick_user$(_user$1, _pos$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $1527 = self.usr;
                var $1528 = self.pos;
                var $1529 = self.map;
                var $1530 = self.stt;
                var $1531 = self.tik;
                var _map$9 = $1529;
                var _obj_idx$10 = Mons$Map$get_hero$(_pos$2, _map$9);
                var _obj$11 = Pair$fst$(_obj_idx$10);
                var _idx$12 = Pair$snd$(_obj_idx$10);
                var _obj$13 = Mons$Object$tick$(_obj$11);
                var self = _obj$13;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $1533 = self.kin;
                        var $1534 = self.dir;
                        var $1535 = self.pad;
                        var $1536 = self.ani;
                        var $1537 = self.dmg;
                        var $1538 = self.bag;
                        var $1539 = self.mon;
                        var $1540 = self.bos;
                        var $1541 = self.cap;
                        var $1542 = self.idl;
                        var $1543 = self.eff;
                        var _old_pos$25 = _pos$2;
                        var _new_pos$26 = Mons$Dir$move$($1534, _pos$2);
                        var _trg$27 = Mons$Map$get_top$(_new_pos$26, _map$9);
                        var self = _trg$27;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $1545 = self.kin;
                                var $1546 = self.dir;
                                var $1547 = self.pad;
                                var $1548 = self.ani;
                                var $1549 = self.dmg;
                                var $1550 = self.bag;
                                var $1551 = self.mon;
                                var $1552 = self.bos;
                                var $1553 = self.cap;
                                var $1554 = self.idl;
                                var $1555 = self.eff;
                                var _is_walking$39 = Mons$Object$is_walking$(_obj$13);
                                var _is_movfree$40 = Mons$Object$is_free_to_move$(_obj$13);
                                var _is_blocked$41 = Mons$Kind$get_blocks$($1545);
                                var self = (_is_walking$39 && (_is_movfree$40 && (!_is_blocked$41)));
                                if (self) {
                                    var _obj$42 = Mons$Object$set_ani$(_obj$13, 16);
                                    var _game$43 = Mons$Game$move_obj$(_old_pos$25, _idx$12, _new_pos$26, _obj$42, _game$3);
                                    var _game$44 = Mons$Game$set_user_pos$(_user$1, _new_pos$26, _game$43);
                                    var $1557 = _game$44;
                                    var $1556 = $1557;
                                } else {
                                    var $1558 = Mons$Game$map_set$(_pos$2, _idx$12, _obj$13, _game$3);
                                    var $1556 = $1558;
                                };
                                var $1544 = $1556;
                                break;
                        };
                        var $1532 = $1544;
                        break;
                };
                var $1526 = $1532;
                break;
        };
        return $1526;
    };
    const Mons$Game$tick_user = x0 => x1 => x2 => Mons$Game$tick_user$(x0, x1, x2);

    function Mons$Game$set_tik$(_tik$1, _game$2) {
        var self = _game$2;
        switch (self._) {
            case 'Mons.Game.new':
                var $1560 = self.usr;
                var $1561 = self.pos;
                var $1562 = self.map;
                var $1563 = self.stt;
                var $1564 = self.tik;
                var $1565 = Mons$Game$new$($1560, $1561, $1562, $1563, _tik$1);
                var $1559 = $1565;
                break;
        };
        return $1559;
    };
    const Mons$Game$set_tik = x0 => x1 => Mons$Game$set_tik$(x0, x1);

    function Mons$Game$tick_game$(_game$1) {
        var self = _game$1;
        switch (self._) {
            case 'Mons.Game.new':
                var $1567 = self.usr;
                var $1568 = self.pos;
                var $1569 = self.map;
                var $1570 = self.stt;
                var $1571 = self.tik;
                var $1572 = Mons$Game$set_tik$((($1571 + 1) >>> 0), _game$1);
                var $1566 = $1572;
                break;
        };
        return $1566;
    };
    const Mons$Game$tick_game = x0 => Mons$Game$tick_game$(x0);

    function Mons$Game$tick$(_game$1, _time$2) {
        var self = _game$1;
        switch (self._) {
            case 'Mons.Game.new':
                var $1574 = self.usr;
                var $1575 = self.pos;
                var $1576 = self.map;
                var $1577 = self.stt;
                var $1578 = self.tik;
                var self = Mons$Game$get_user_pos$($1574, _game$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1580 = Mons$scr_mid;
                        var _pos$8 = $1580;
                        break;
                    case 'Maybe.some':
                        var $1581 = self.value;
                        var $1582 = $1581;
                        var _pos$8 = $1582;
                        break;
                };
                var _game$9 = Mons$Game$tick_user$($1574, _pos$8, _game$1);
                var _game$10 = Mons$Game$tick_game$(_game$9);
                var $1579 = _game$10;
                var $1573 = $1579;
                break;
        };
        return $1573;
    };
    const Mons$Game$tick = x0 => x1 => Mons$Game$tick$(x0, x1);

    function Bits$slice$(_len$1, _bits$2) {
        var self = _len$1;
        if (self === 0n) {
            var $1584 = Bits$e;
            var $1583 = $1584;
        } else {
            var $1585 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $1587 = Bits$e;
                    var $1586 = $1587;
                    break;
                case 'o':
                    var $1588 = self.slice(0, -1);
                    var $1589 = (Bits$slice$($1585, $1588) + '0');
                    var $1586 = $1589;
                    break;
                case 'i':
                    var $1590 = self.slice(0, -1);
                    var $1591 = (Bits$slice$($1585, $1590) + '1');
                    var $1586 = $1591;
                    break;
            };
            var $1583 = $1586;
        };
        return $1583;
    };
    const Bits$slice = x0 => x1 => Bits$slice$(x0, x1);
    const Mons$Input$code_to_char_map = (() => {
        var _map$1 = Map$new;
        var _map$2 = (() => {
            var $1594 = _map$1;
            var $1595 = Mons$Input$list;
            let _map$3 = $1594;
            let _char_code$2;
            while ($1595._ === 'List.cons') {
                _char_code$2 = $1595.head;
                var self = _char_code$2;
                switch (self._) {
                    case 'Pair.new':
                        var $1596 = self.fst;
                        var $1597 = self.snd;
                        var $1598 = Map$set$($1597, $1596, _map$3);
                        var $1594 = $1598;
                        break;
                };
                _map$3 = $1594;
                $1595 = $1595.tail;
            }
            return _map$3;
        })();
        var $1592 = _map$2;
        return $1592;
    })();

    function Mons$Input$deserialize$(_code$1) {
        var $1599 = Map$get$(Bits$slice$(8n, Word$to_bits$(_code$1)), Mons$Input$code_to_char_map);
        return $1599;
    };
    const Mons$Input$deserialize = x0 => Mons$Input$deserialize$(x0);

    function Mons$Game$set_stt$(_stt$1, _game$2) {
        var self = _game$2;
        switch (self._) {
            case 'Mons.Game.new':
                var $1601 = self.usr;
                var $1602 = self.pos;
                var $1603 = self.map;
                var $1604 = self.stt;
                var $1605 = self.tik;
                var $1606 = Mons$Game$new$($1601, $1602, $1603, _stt$1, $1605);
                var $1600 = $1606;
                break;
        };
        return $1600;
    };
    const Mons$Game$set_stt = x0 => x1 => Mons$Game$set_stt$(x0, x1);

    function Mons$Screen$game$(_cmd$1, _turn$2) {
        var $1607 = ({
            _: 'Mons.Screen.game',
            'cmd': _cmd$1,
            'turn': _turn$2
        });
        return $1607;
    };
    const Mons$Screen$game = x0 => x1 => Mons$Screen$game$(x0, x1);

    function Mons$Turn$new$(_exec_hero$1, _hero_skill$2, _adve_skill$3, _play$4) {
        var $1608 = ({
            _: 'Mons.Turn.new',
            'exec_hero': _exec_hero$1,
            'hero_skill': _hero_skill$2,
            'adve_skill': _adve_skill$3,
            'play': _play$4
        });
        return $1608;
    };
    const Mons$Turn$new = x0 => x1 => x2 => x3 => Mons$Turn$new$(x0, x1, x2, x3);
    const Mons$Turn$empty = Mons$Turn$new$(Bool$false, Mons$Skill$none, Mons$Skill$none, 0);
    const Mons$Kind$mons$HERO = ({
        _: 'Mons.Kind.mons.HERO'
    });
    const Mons$Type$fire = ({
        _: 'Mons.Type.fire'
    });
    const Mons$Object$hero = Mons$Object$new_of_kind$(Mons$Kind$Mons$(Mons$Kind$mons$HERO, Bool$false, Mons$Type$fire, 1));

    function Mons$Object$ended_battle$(_adve$1, _hero$2) {
        var self = _adve$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1610 = self.kin;
                var $1611 = self.dir;
                var $1612 = self.pad;
                var $1613 = self.ani;
                var $1614 = self.dmg;
                var $1615 = self.bag;
                var $1616 = self.mon;
                var $1617 = self.bos;
                var $1618 = self.cap;
                var $1619 = self.idl;
                var $1620 = self.eff;
                var self = _hero$2;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $1622 = self.kin;
                        var $1623 = self.dir;
                        var $1624 = self.pad;
                        var $1625 = self.ani;
                        var $1626 = self.dmg;
                        var $1627 = self.bag;
                        var $1628 = self.mon;
                        var $1629 = self.bos;
                        var $1630 = self.cap;
                        var $1631 = self.idl;
                        var $1632 = self.eff;
                        var self = $1610;
                        switch (self._) {
                            case 'Mons.Kind.Mons':
                                var $1634 = self.ele;
                                var $1635 = self.boss;
                                var $1636 = self.pri_type;
                                var $1637 = self.agi;
                                var _adve_kin$29 = Mons$Kind$attr$($1610);
                                var _hero_kin$30 = Mons$Kind$attr$($1622);
                                var self = _adve_kin$29;
                                switch (self._) {
                                    case 'Mons.Attr.new':
                                        var $1639 = self.blocks;
                                        var $1640 = self.mhp;
                                        var $1641 = self.atk;
                                        var $1642 = self.name;
                                        var $1643 = self.wlk;
                                        var $1644 = self.idl;
                                        var $1645 = self.pic;
                                        var $1646 = self.battle_spr;
                                        var $1647 = self.skills;
                                        var $1648 = self.pos;
                                        var self = _hero_kin$30;
                                        switch (self._) {
                                            case 'Mons.Attr.new':
                                                var $1650 = self.blocks;
                                                var $1651 = self.mhp;
                                                var $1652 = self.atk;
                                                var $1653 = self.name;
                                                var $1654 = self.wlk;
                                                var $1655 = self.idl;
                                                var $1656 = self.pic;
                                                var $1657 = self.battle_spr;
                                                var $1658 = self.skills;
                                                var $1659 = self.pos;
                                                var _adve_status$51 = Mons$Object$is_obj_defeated$(_adve$1);
                                                var _hero_status$52 = Mons$Object$is_obj_defeated$(_hero$2);
                                                var $1660 = (_adve_status$51 || _hero_status$52);
                                                var $1649 = $1660;
                                                break;
                                        };
                                        var $1638 = $1649;
                                        break;
                                };
                                var $1633 = $1638;
                                break;
                            case 'Mons.Kind.Const':
                                var $1661 = self.ele;
                                var $1662 = Bool$false;
                                var $1633 = $1662;
                                break;
                            case 'Mons.Kind.Terrain':
                                var $1663 = self.ele;
                                var $1664 = Bool$false;
                                var $1633 = $1664;
                                break;
                            case 'Mons.Kind.Interactive':
                                var $1665 = self.ele;
                                var $1666 = self.on;
                                var $1667 = self.eff;
                                var $1668 = Bool$false;
                                var $1633 = $1668;
                                break;
                        };
                        var $1621 = $1633;
                        break;
                };
                var $1609 = $1621;
                break;
        };
        return $1609;
    };
    const Mons$Object$ended_battle = x0 => x1 => Mons$Object$ended_battle$(x0, x1);

    function Mons$Screen$introduction$(_step$1) {
        var $1669 = ({
            _: 'Mons.Screen.introduction',
            'step': _step$1
        });
        return $1669;
    };
    const Mons$Screen$introduction = x0 => Mons$Screen$introduction$(x0);
    const Mons$Screen$credits = ({
        _: 'Mons.Screen.credits'
    });

    function List$elem$(_p$2, _a$3, _as$4) {
        var List$elem$ = (_p$2, _a$3, _as$4) => ({
            ctr: 'TCO',
            arg: [_p$2, _a$3, _as$4]
        });
        var List$elem = _p$2 => _a$3 => _as$4 => List$elem$(_p$2, _a$3, _as$4);
        var arg = [_p$2, _a$3, _as$4];
        while (true) {
            let [_p$2, _a$3, _as$4] = arg;
            var R = (() => {
                var self = _as$4;
                switch (self._) {
                    case 'List.nil':
                        var $1670 = Bool$false;
                        return $1670;
                    case 'List.cons':
                        var $1671 = self.head;
                        var $1672 = self.tail;
                        var self = _p$2(_a$3)($1671);
                        if (self) {
                            var $1674 = Bool$true;
                            var $1673 = $1674;
                        } else {
                            var $1675 = List$elem$(_p$2, _a$3, $1672);
                            var $1673 = $1675;
                        };
                        return $1673;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$elem = x0 => x1 => x2 => List$elem$(x0, x1, x2);

    function Char$eql$(_a$1, _b$2) {
        var $1676 = (_a$1 === _b$2);
        return $1676;
    };
    const Char$eql = x0 => x1 => Char$eql$(x0, x1);

    function Mons$is_walk_cmd$(_cmd$1) {
        var $1677 = List$elem$(Char$eql, _cmd$1, List$cons$(87, List$cons$(65, List$cons$(83, List$cons$(68, List$cons$(119, List$cons$(97, List$cons$(115, List$cons$(100, List$nil)))))))));
        return $1677;
    };
    const Mons$is_walk_cmd = x0 => Mons$is_walk_cmd$(x0);

    function Mons$key_to_dir$(_key_code$1) {
        var self = ((_key_code$1 === 65) || (_key_code$1 === 97));
        if (self) {
            var $1679 = Maybe$some$(Mons$Dir$left);
            var $1678 = $1679;
        } else {
            var self = ((_key_code$1 === 68) || (_key_code$1 === 100));
            if (self) {
                var $1681 = Maybe$some$(Mons$Dir$right);
                var $1680 = $1681;
            } else {
                var self = ((_key_code$1 === 87) || (_key_code$1 === 119));
                if (self) {
                    var $1683 = Maybe$some$(Mons$Dir$up);
                    var $1682 = $1683;
                } else {
                    var self = ((_key_code$1 === 83) || (_key_code$1 === 115));
                    if (self) {
                        var $1685 = Maybe$some$(Mons$Dir$down);
                        var $1684 = $1685;
                    } else {
                        var $1686 = Maybe$none;
                        var $1684 = $1686;
                    };
                    var $1682 = $1684;
                };
                var $1680 = $1682;
            };
            var $1678 = $1680;
        };
        return $1678;
    };
    const Mons$key_to_dir = x0 => Mons$key_to_dir$(x0);

    function Mons$Object$set_pad$(_obj$1, _pad$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1688 = self.kin;
                var $1689 = self.dir;
                var $1690 = self.pad;
                var $1691 = self.ani;
                var $1692 = self.dmg;
                var $1693 = self.bag;
                var $1694 = self.mon;
                var $1695 = self.bos;
                var $1696 = self.cap;
                var $1697 = self.idl;
                var $1698 = self.eff;
                var $1699 = Mons$Object$new$($1688, $1689, _pad$2, $1691, $1692, $1693, $1694, $1695, $1696, $1697, $1698);
                var $1687 = $1699;
                break;
        };
        return $1687;
    };
    const Mons$Object$set_pad = x0 => x1 => Mons$Object$set_pad$(x0, x1);

    function Mons$Pad$set_r$(_pad$1, _val$2) {
        var self = _pad$1;
        switch (self._) {
            case 'Mons.Pad.new':
                var $1701 = self.r;
                var $1702 = self.u;
                var $1703 = self.l;
                var $1704 = self.d;
                var $1705 = Mons$Pad$new$(_val$2, $1702, $1703, $1704);
                var $1700 = $1705;
                break;
        };
        return $1700;
    };
    const Mons$Pad$set_r = x0 => x1 => Mons$Pad$set_r$(x0, x1);

    function Mons$Object$set_pad_r$(_obj$1, _val$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1707 = self.kin;
                var $1708 = self.dir;
                var $1709 = self.pad;
                var $1710 = self.ani;
                var $1711 = self.dmg;
                var $1712 = self.bag;
                var $1713 = self.mon;
                var $1714 = self.bos;
                var $1715 = self.cap;
                var $1716 = self.idl;
                var $1717 = self.eff;
                var $1718 = Mons$Object$set_pad$(_obj$1, Mons$Pad$set_r$($1709, _val$2));
                var $1706 = $1718;
                break;
        };
        return $1706;
    };
    const Mons$Object$set_pad_r = x0 => x1 => Mons$Object$set_pad_r$(x0, x1);

    function Mons$Pad$set_u$(_pad$1, _val$2) {
        var self = _pad$1;
        switch (self._) {
            case 'Mons.Pad.new':
                var $1720 = self.r;
                var $1721 = self.u;
                var $1722 = self.l;
                var $1723 = self.d;
                var $1724 = Mons$Pad$new$($1720, _val$2, $1722, $1723);
                var $1719 = $1724;
                break;
        };
        return $1719;
    };
    const Mons$Pad$set_u = x0 => x1 => Mons$Pad$set_u$(x0, x1);

    function Mons$Object$set_pad_u$(_obj$1, _val$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1726 = self.kin;
                var $1727 = self.dir;
                var $1728 = self.pad;
                var $1729 = self.ani;
                var $1730 = self.dmg;
                var $1731 = self.bag;
                var $1732 = self.mon;
                var $1733 = self.bos;
                var $1734 = self.cap;
                var $1735 = self.idl;
                var $1736 = self.eff;
                var $1737 = Mons$Object$set_pad$(_obj$1, Mons$Pad$set_u$($1728, _val$2));
                var $1725 = $1737;
                break;
        };
        return $1725;
    };
    const Mons$Object$set_pad_u = x0 => x1 => Mons$Object$set_pad_u$(x0, x1);

    function Mons$Pad$set_l$(_pad$1, _val$2) {
        var self = _pad$1;
        switch (self._) {
            case 'Mons.Pad.new':
                var $1739 = self.r;
                var $1740 = self.u;
                var $1741 = self.l;
                var $1742 = self.d;
                var $1743 = Mons$Pad$new$($1739, $1740, _val$2, $1742);
                var $1738 = $1743;
                break;
        };
        return $1738;
    };
    const Mons$Pad$set_l = x0 => x1 => Mons$Pad$set_l$(x0, x1);

    function Mons$Object$set_pad_l$(_obj$1, _val$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1745 = self.kin;
                var $1746 = self.dir;
                var $1747 = self.pad;
                var $1748 = self.ani;
                var $1749 = self.dmg;
                var $1750 = self.bag;
                var $1751 = self.mon;
                var $1752 = self.bos;
                var $1753 = self.cap;
                var $1754 = self.idl;
                var $1755 = self.eff;
                var $1756 = Mons$Object$set_pad$(_obj$1, Mons$Pad$set_l$($1747, _val$2));
                var $1744 = $1756;
                break;
        };
        return $1744;
    };
    const Mons$Object$set_pad_l = x0 => x1 => Mons$Object$set_pad_l$(x0, x1);

    function Mons$Pad$set_d$(_pad$1, _val$2) {
        var self = _pad$1;
        switch (self._) {
            case 'Mons.Pad.new':
                var $1758 = self.r;
                var $1759 = self.u;
                var $1760 = self.l;
                var $1761 = self.d;
                var $1762 = Mons$Pad$new$($1758, $1759, $1760, _val$2);
                var $1757 = $1762;
                break;
        };
        return $1757;
    };
    const Mons$Pad$set_d = x0 => x1 => Mons$Pad$set_d$(x0, x1);

    function Mons$Object$set_pad_d$(_obj$1, _val$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1764 = self.kin;
                var $1765 = self.dir;
                var $1766 = self.pad;
                var $1767 = self.ani;
                var $1768 = self.dmg;
                var $1769 = self.bag;
                var $1770 = self.mon;
                var $1771 = self.bos;
                var $1772 = self.cap;
                var $1773 = self.idl;
                var $1774 = self.eff;
                var $1775 = Mons$Object$set_pad$(_obj$1, Mons$Pad$set_d$($1766, _val$2));
                var $1763 = $1775;
                break;
        };
        return $1763;
    };
    const Mons$Object$set_pad_d = x0 => x1 => Mons$Object$set_pad_d$(x0, x1);

    function Mons$dir_to_set_pad$(_dir$1) {
        var self = _dir$1;
        switch (self._) {
            case 'Mons.Dir.right':
                var $1777 = Mons$Object$set_pad_r;
                var $1776 = $1777;
                break;
            case 'Mons.Dir.up':
                var $1778 = Mons$Object$set_pad_u;
                var $1776 = $1778;
                break;
            case 'Mons.Dir.left':
                var $1779 = Mons$Object$set_pad_l;
                var $1776 = $1779;
                break;
            case 'Mons.Dir.down':
                var $1780 = Mons$Object$set_pad_d;
                var $1776 = $1780;
                break;
        };
        return $1776;
    };
    const Mons$dir_to_set_pad = x0 => Mons$dir_to_set_pad$(x0);

    function Char$is_upper$(_char$1) {
        var $1781 = ((_char$1 >= 65) && (_char$1 <= 90));
        return $1781;
    };
    const Char$is_upper = x0 => Char$is_upper$(x0);

    function Mons$Game$update$(_fn$1, _pos$2, _idx$3, _game$4) {
        var self = _game$4;
        switch (self._) {
            case 'Mons.Game.new':
                var $1783 = self.usr;
                var $1784 = self.pos;
                var $1785 = self.map;
                var $1786 = self.stt;
                var $1787 = self.tik;
                var _obj$10 = _fn$1(Mons$Map$get$(_pos$2, _idx$3, $1785));
                var _map$11 = Mons$Map$set$(_pos$2, _idx$3, _obj$10, $1785);
                var $1788 = Mons$Game$set_map$(_map$11, _game$4);
                var $1782 = $1788;
                break;
        };
        return $1782;
    };
    const Mons$Game$update = x0 => x1 => x2 => x3 => Mons$Game$update$(x0, x1, x2, x3);

    function Mons$Game$walk$(_cmd$1, _pos$2, _idx$3, _game$4) {
        var self = _game$4;
        switch (self._) {
            case 'Mons.Game.new':
                var $1790 = self.usr;
                var $1791 = self.pos;
                var $1792 = self.map;
                var $1793 = self.stt;
                var $1794 = self.tik;
                var self = Mons$key_to_dir$(_cmd$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1796 = _game$4;
                        var $1795 = $1796;
                        break;
                    case 'Maybe.some':
                        var $1797 = self.value;
                        var _dir$11 = $1797;
                        var _set_pad$12 = Mons$dir_to_set_pad$(_dir$11);
                        var _flag$13 = Char$is_upper$(_cmd$1);
                        var $1798 = Mons$Game$update$((_obj$14 => {
                            var $1799 = _set_pad$12(_obj$14)(_flag$13);
                            return $1799;
                        }), _pos$2, _idx$3, _game$4);
                        var $1795 = $1798;
                        break;
                };
                var $1789 = $1795;
                break;
        };
        return $1789;
    };
    const Mons$Game$walk = x0 => x1 => x2 => x3 => Mons$Game$walk$(x0, x1, x2, x3);

    function Mons$Kind$is_mage$(_kind$1) {
        var self = _kind$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $1801 = self.ele;
                var $1802 = self.boss;
                var $1803 = self.pri_type;
                var $1804 = self.agi;
                var self = $1801;
                switch (self._) {
                    case 'Mons.Kind.mons.HERO':
                        var $1806 = Bool$false;
                        var $1805 = $1806;
                        break;
                    case 'Mons.Kind.mons.MAGE':
                        var $1807 = Bool$true;
                        var $1805 = $1807;
                        break;
                    case 'Mons.Kind.mons.BEHOLDER':
                        var $1808 = Bool$false;
                        var $1805 = $1808;
                        break;
                    case 'Mons.Kind.mons.ZOIO':
                        var $1809 = Bool$false;
                        var $1805 = $1809;
                        break;
                    case 'Mons.Kind.mons.CYCLOPE':
                        var $1810 = Bool$false;
                        var $1805 = $1810;
                        break;
                    case 'Mons.Kind.mons.POISOLICK':
                        var $1811 = Bool$false;
                        var $1805 = $1811;
                        break;
                    case 'Mons.Kind.mons.TROWL':
                        var $1812 = Bool$false;
                        var $1805 = $1812;
                        break;
                    case 'Mons.Kind.mons.MIMIC':
                        var $1813 = Bool$false;
                        var $1805 = $1813;
                        break;
                    case 'Mons.Kind.mons.MIMIC2':
                        var $1814 = Bool$false;
                        var $1805 = $1814;
                        break;
                    case 'Mons.Kind.mons.AZULA':
                        var $1815 = Bool$false;
                        var $1805 = $1815;
                        break;
                    case 'Mons.Kind.mons.EMERELDER':
                        var $1816 = Bool$false;
                        var $1805 = $1816;
                        break;
                    case 'Mons.Kind.mons.EMERELDER2':
                        var $1817 = Bool$false;
                        var $1805 = $1817;
                        break;
                };
                var $1800 = $1805;
                break;
            case 'Mons.Kind.Const':
                var $1818 = self.ele;
                var $1819 = Bool$false;
                var $1800 = $1819;
                break;
            case 'Mons.Kind.Terrain':
                var $1820 = self.ele;
                var $1821 = Bool$false;
                var $1800 = $1821;
                break;
            case 'Mons.Kind.Interactive':
                var $1822 = self.ele;
                var $1823 = self.on;
                var $1824 = self.eff;
                var $1825 = Bool$false;
                var $1800 = $1825;
                break;
        };
        return $1800;
    };
    const Mons$Kind$is_mage = x0 => Mons$Kind$is_mage$(x0);

    function Mons$Object$set_bag$(_bag$1, _obj$2) {
        var self = _obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $1827 = self.kin;
                var $1828 = self.dir;
                var $1829 = self.pad;
                var $1830 = self.ani;
                var $1831 = self.dmg;
                var $1832 = self.bag;
                var $1833 = self.mon;
                var $1834 = self.bos;
                var $1835 = self.cap;
                var $1836 = self.idl;
                var $1837 = self.eff;
                var $1838 = Mons$Object$new$($1827, $1828, $1829, $1830, $1831, _bag$1, $1833, $1834, $1835, $1836, $1837);
                var $1826 = $1838;
                break;
        };
        return $1826;
    };
    const Mons$Object$set_bag = x0 => x1 => Mons$Object$set_bag$(x0, x1);
    const Mons$Kind$mons$POISOLICK = ({
        _: 'Mons.Kind.mons.POISOLICK'
    });
    const Mons$Kind$mons$AZULA = ({
        _: 'Mons.Kind.mons.AZULA'
    });
    const Mons$Kind$mons$EMERELDER = ({
        _: 'Mons.Kind.mons.EMERELDER'
    });

    function Mons$Object$set_dmg$(_obj$1, _dmg$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1840 = self.kin;
                var $1841 = self.dir;
                var $1842 = self.pad;
                var $1843 = self.ani;
                var $1844 = self.dmg;
                var $1845 = self.bag;
                var $1846 = self.mon;
                var $1847 = self.bos;
                var $1848 = self.cap;
                var $1849 = self.idl;
                var $1850 = self.eff;
                var $1851 = Mons$Object$new$($1840, $1841, $1842, $1843, _dmg$2, $1845, $1846, $1847, $1848, $1849, $1850);
                var $1839 = $1851;
                break;
        };
        return $1839;
    };
    const Mons$Object$set_dmg = x0 => x1 => Mons$Object$set_dmg$(x0, x1);
    const Nat$ltn = a0 => a1 => (a0 < a1);

    function List$pure$(_x$2) {
        var $1852 = List$cons$(_x$2, List$nil);
        return $1852;
    };
    const List$pure = x0 => List$pure$(x0);

    function List$append$(_as$2, _a$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $1854 = List$pure$(_a$3);
                var $1853 = $1854;
                break;
            case 'List.cons':
                var $1855 = self.head;
                var $1856 = self.tail;
                var $1857 = List$cons$($1855, List$append$($1856, _a$3));
                var $1853 = $1857;
                break;
        };
        return $1853;
    };
    const List$append = x0 => x1 => List$append$(x0, x1);

    function Mons$Object$push_to_bag$(_obj$1, _hero$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1859 = self.kin;
                var $1860 = self.dir;
                var $1861 = self.pad;
                var $1862 = self.ani;
                var $1863 = self.dmg;
                var $1864 = self.bag;
                var $1865 = self.mon;
                var $1866 = self.bos;
                var $1867 = self.cap;
                var $1868 = self.idl;
                var $1869 = self.eff;
                var self = _hero$2;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $1871 = self.kin;
                        var $1872 = self.dir;
                        var $1873 = self.pad;
                        var $1874 = self.ani;
                        var $1875 = self.dmg;
                        var $1876 = self.bag;
                        var $1877 = self.mon;
                        var $1878 = self.bos;
                        var $1879 = self.cap;
                        var $1880 = self.idl;
                        var $1881 = self.eff;
                        var _qtd$25 = (list_length($1876));
                        var self = $1859;
                        switch (self._) {
                            case 'Mons.Kind.Mons':
                                var $1883 = self.ele;
                                var $1884 = self.boss;
                                var $1885 = self.pri_type;
                                var $1886 = self.agi;
                                var _obj$30 = Mons$Object$set_dmg$(_obj$1, 0);
                                var self = (_qtd$25 < 3n);
                                if (self) {
                                    var _new_bag$31 = List$append$($1876, _obj$30);
                                    var $1888 = Mons$Object$set_bag$(_new_bag$31, _hero$2);
                                    var $1887 = $1888;
                                } else {
                                    var $1889 = _hero$2;
                                    var $1887 = $1889;
                                };
                                var $1882 = $1887;
                                break;
                            case 'Mons.Kind.Const':
                                var $1890 = self.ele;
                                var $1891 = _hero$2;
                                var $1882 = $1891;
                                break;
                            case 'Mons.Kind.Terrain':
                                var $1892 = self.ele;
                                var $1893 = _hero$2;
                                var $1882 = $1893;
                                break;
                            case 'Mons.Kind.Interactive':
                                var $1894 = self.ele;
                                var $1895 = self.on;
                                var $1896 = self.eff;
                                var $1897 = _hero$2;
                                var $1882 = $1897;
                                break;
                        };
                        var $1870 = $1882;
                        break;
                };
                var $1858 = $1870;
                break;
        };
        return $1858;
    };
    const Mons$Object$push_to_bag = x0 => x1 => Mons$Object$push_to_bag$(x0, x1);

    function Mons$initial_mons$(_hero_obj$1, _pos$2, _hero_idx$3, _game$4) {
        var self = _hero_obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1899 = self.kin;
                var $1900 = self.dir;
                var $1901 = self.pad;
                var $1902 = self.ani;
                var $1903 = self.dmg;
                var $1904 = self.bag;
                var $1905 = self.mon;
                var $1906 = self.bos;
                var $1907 = self.cap;
                var $1908 = self.idl;
                var $1909 = self.eff;
                var _hero_obj$16 = Mons$Object$set_bag$(List$nil, _hero_obj$1);
                var _mon0_bag$17 = Mons$Object$new_of_kind$(Mons$Kind$Mons$(Mons$Kind$mons$POISOLICK, Bool$false, Mons$Type$normal, 2));
                var _mon1_bag$18 = Mons$Object$new_of_kind$(Mons$Kind$Mons$(Mons$Kind$mons$AZULA, Bool$false, Mons$Type$normal, 2));
                var _mon2_bag$19 = Mons$Object$new_of_kind$(Mons$Kind$Mons$(Mons$Kind$mons$EMERELDER, Bool$false, Mons$Type$normal, 2));
                var _hero_obj$20 = Mons$Object$push_to_bag$(_mon0_bag$17, _hero_obj$16);
                var _hero_obj$21 = Mons$Object$push_to_bag$(_mon1_bag$18, _hero_obj$20);
                var _hero_obj$22 = Mons$Object$push_to_bag$(_mon2_bag$19, _hero_obj$21);
                var $1910 = Mons$Game$map_set$(_pos$2, _hero_idx$3, _hero_obj$22, _game$4);
                var $1898 = $1910;
                break;
        };
        return $1898;
    };
    const Mons$initial_mons = x0 => x1 => x2 => x3 => Mons$initial_mons$(x0, x1, x2, x3);

    function Mons$Screen$intro_select$(_idx$1) {
        var $1911 = ({
            _: 'Mons.Screen.intro_select',
            'idx': _idx$1
        });
        return $1911;
    };
    const Mons$Screen$intro_select = x0 => Mons$Screen$intro_select$(x0);
    const Mons$Type$earth = ({
        _: 'Mons.Type.earth'
    });

    function Mons$Object$set_mon$(_idx$1, _obj$2) {
        var self = _obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $1913 = self.kin;
                var $1914 = self.dir;
                var $1915 = self.pad;
                var $1916 = self.ani;
                var $1917 = self.dmg;
                var $1918 = self.bag;
                var $1919 = self.mon;
                var $1920 = self.bos;
                var $1921 = self.cap;
                var $1922 = self.idl;
                var $1923 = self.eff;
                var $1924 = Mons$Object$new$($1913, $1914, $1915, $1916, $1917, $1918, _idx$1, $1920, $1921, $1922, $1923);
                var $1912 = $1924;
                break;
        };
        return $1912;
    };
    const Mons$Object$set_mon = x0 => x1 => Mons$Object$set_mon$(x0, x1);

    function Mons$Object$delete_init_mons$(_hero_obj$1) {
        var self = _hero_obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $1926 = self.kin;
                var $1927 = self.dir;
                var $1928 = self.pad;
                var $1929 = self.ani;
                var $1930 = self.dmg;
                var $1931 = self.bag;
                var $1932 = self.mon;
                var $1933 = self.bos;
                var $1934 = self.cap;
                var $1935 = self.idl;
                var $1936 = self.eff;
                var _get_mon$13 = List$at$(U32$to_nat$($1932), $1931);
                var self = _get_mon$13;
                switch (self._) {
                    case 'Maybe.none':
                        var $1938 = Mons$Object$new_of_kind$(Mons$Kind$Mons$(Mons$Kind$mons$HERO, Bool$false, Mons$Type$earth, 2));
                        var _cur_mon$14 = $1938;
                        break;
                    case 'Maybe.some':
                        var $1939 = self.value;
                        var $1940 = $1939;
                        var _cur_mon$14 = $1940;
                        break;
                };
                var _hero_obj$15 = Mons$Object$set_bag$(List$nil, _hero_obj$1);
                var _hero_obj$16 = Mons$Object$push_to_bag$(_cur_mon$14, _hero_obj$15);
                var _hero_obj$17 = Mons$Object$set_mon$(0, _hero_obj$16);
                var $1937 = _hero_obj$17;
                var $1925 = $1937;
                break;
        };
        return $1925;
    };
    const Mons$Object$delete_init_mons = x0 => Mons$Object$delete_init_mons$(x0);
    const U32$gte = a0 => a1 => (a0 >= a1);

    function Word$mod$(_a$2, _b$3) {
        var Word$mod$ = (_a$2, _b$3) => ({
            ctr: 'TCO',
            arg: [_a$2, _b$3]
        });
        var Word$mod = _a$2 => _b$3 => Word$mod$(_a$2, _b$3);
        var arg = [_a$2, _b$3];
        while (true) {
            let [_a$2, _b$3] = arg;
            var R = Word$mod$(_a$2, _b$3);
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Word$mod = x0 => x1 => Word$mod$(x0, x1);
    const U32$mod = a0 => a1 => (a0 % a1);

    function Mons$Game$adve_turn$(_hero_obj$1, _adve_obj$2, _game$3) {
        var self = _game$3;
        switch (self._) {
            case 'Mons.Game.new':
                var $1942 = self.usr;
                var $1943 = self.pos;
                var $1944 = self.map;
                var $1945 = self.stt;
                var $1946 = self.tik;
                var self = _hero_obj$1;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $1948 = self.kin;
                        var $1949 = self.dir;
                        var $1950 = self.pad;
                        var $1951 = self.ani;
                        var $1952 = self.dmg;
                        var $1953 = self.bag;
                        var $1954 = self.mon;
                        var $1955 = self.bos;
                        var $1956 = self.cap;
                        var $1957 = self.idl;
                        var $1958 = self.eff;
                        var self = _adve_obj$2;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $1960 = self.kin;
                                var $1961 = self.dir;
                                var $1962 = self.pad;
                                var $1963 = self.ani;
                                var $1964 = self.dmg;
                                var $1965 = self.bag;
                                var $1966 = self.mon;
                                var $1967 = self.bos;
                                var $1968 = self.cap;
                                var $1969 = self.idl;
                                var $1970 = self.eff;
                                var _adve_hp$31 = Mons$Object$remaining_hp$(_adve_obj$2);
                                var _hero_hp$32 = Mons$Object$remaining_hp$(_hero_obj$1);
                                var _qtd_mon_bag$33 = (Number((list_length($1953))));
                                var _hero_pos$34 = Mons$Game$get_hero_pos$(_game$3);
                                var self = _hero_pos$34;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $1972 = 80;
                                        var _pos_x$35 = $1972;
                                        break;
                                    case 'Maybe.some':
                                        var $1973 = self.value;
                                        var $1974 = (($1973 & 0xFFF));
                                        var _pos_x$35 = $1974;
                                        break;
                                };
                                var self = ((Math.max(_hero_hp$32 - _adve_hp$31, 0)) > 15);
                                if (self) {
                                    var $1975 = 2n;
                                    var $1971 = $1975;
                                } else {
                                    var self = ((_hero_hp$32 > 30) && (_hero_hp$32 < 25));
                                    if (self) {
                                        var $1977 = 2n;
                                        var $1976 = $1977;
                                    } else {
                                        var self = ((Math.max(_adve_hp$31 - _hero_hp$32, 0)) >= 8);
                                        if (self) {
                                            var $1979 = 1n;
                                            var $1978 = $1979;
                                        } else {
                                            var self = ((_qtd_mon_bag$33 > 1) && (_hero_hp$32 > 30));
                                            if (self) {
                                                var $1981 = 1n;
                                                var $1980 = $1981;
                                            } else {
                                                var self = (_hero_hp$32 === _adve_hp$31);
                                                if (self) {
                                                    var $1983 = 3n;
                                                    var $1982 = $1983;
                                                } else {
                                                    var self = ((!((_pos_x$35 % 2) === 0)) && (_hero_hp$32 < 15));
                                                    if (self) {
                                                        var $1985 = 1n;
                                                        var $1984 = $1985;
                                                    } else {
                                                        var self = ((Math.max(_adve_hp$31 - _hero_hp$32, 0)) > 15);
                                                        if (self) {
                                                            var $1987 = 0n;
                                                            var $1986 = $1987;
                                                        } else {
                                                            var self = ((_adve_hp$31 > _hero_hp$32) && (_hero_hp$32 > 30));
                                                            if (self) {
                                                                var $1989 = 0n;
                                                                var $1988 = $1989;
                                                            } else {
                                                                var self = (_hero_hp$32 > 20);
                                                                if (self) {
                                                                    var $1991 = 1n;
                                                                    var $1990 = $1991;
                                                                } else {
                                                                    var self = (((_pos_x$35 % 2) === 0) && (_hero_hp$32 < 15));
                                                                    if (self) {
                                                                        var $1993 = 1n;
                                                                        var $1992 = $1993;
                                                                    } else {
                                                                        var self = (_hero_hp$32 < 5);
                                                                        if (self) {
                                                                            var $1995 = 0n;
                                                                            var $1994 = $1995;
                                                                        } else {
                                                                            var $1996 = 0n;
                                                                            var $1994 = $1996;
                                                                        };
                                                                        var $1992 = $1994;
                                                                    };
                                                                    var $1990 = $1992;
                                                                };
                                                                var $1988 = $1990;
                                                            };
                                                            var $1986 = $1988;
                                                        };
                                                        var $1984 = $1986;
                                                    };
                                                    var $1982 = $1984;
                                                };
                                                var $1980 = $1982;
                                            };
                                            var $1978 = $1980;
                                        };
                                        var $1976 = $1978;
                                    };
                                    var $1971 = $1976;
                                };
                                var $1959 = $1971;
                                break;
                        };
                        var $1947 = $1959;
                        break;
                };
                var $1941 = $1947;
                break;
        };
        return $1941;
    };
    const Mons$Game$adve_turn = x0 => x1 => x2 => Mons$Game$adve_turn$(x0, x1, x2);

    function Mons$Effect$upd_initial_eff$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $1998 = self.sleep;
                var $1999 = self.burn;
                var $2000 = self.protect;
                var $2001 = self.minimize;
                var $2002 = self.invulnerable;
                var $2003 = self.hit;
                var $2004 = self.poison;
                var $2005 = self.swap_agi;
                var $2006 = Mons$Effect$new$($1998, (Math.max($1999 - 1, 0)), $2000, $2001, $2002, 0, $2004, Bool$false);
                var $1997 = $2006;
                break;
        };
        return $1997;
    };
    const Mons$Effect$upd_initial_eff = x0 => Mons$Effect$upd_initial_eff$(x0);

    function Mons$Object$set_eff$(_eff$1, _obj$2) {
        var self = _obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $2008 = self.kin;
                var $2009 = self.dir;
                var $2010 = self.pad;
                var $2011 = self.ani;
                var $2012 = self.dmg;
                var $2013 = self.bag;
                var $2014 = self.mon;
                var $2015 = self.bos;
                var $2016 = self.cap;
                var $2017 = self.idl;
                var $2018 = self.eff;
                var $2019 = Mons$Object$new$($2008, $2009, $2010, $2011, $2012, $2013, $2014, $2015, $2016, $2017, _eff$1);
                var $2007 = $2019;
                break;
        };
        return $2007;
    };
    const Mons$Object$set_eff = x0 => x1 => Mons$Object$set_eff$(x0, x1);

    function Mons$Skill$update_mon_obj$(_hero_obj$1, _obj_updated$2, _pos$3, _idx$4, _game$5) {
        var self = _hero_obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2021 = self.kin;
                var $2022 = self.dir;
                var $2023 = self.pad;
                var $2024 = self.ani;
                var $2025 = self.dmg;
                var $2026 = self.bag;
                var $2027 = self.mon;
                var $2028 = self.bos;
                var $2029 = self.cap;
                var $2030 = self.idl;
                var $2031 = self.eff;
                var _qtd$17 = (list_length($2026));
                var self = (_qtd$17 === 0n);
                if (self) {
                    var $2033 = Mons$Game$map_set$(_pos$3, _idx$4, _obj_updated$2, _game$5);
                    var $2032 = $2033;
                } else {
                    var _idx_nat$18 = U32$to_nat$($2027);
                    var _new_bag$19 = List$update_at$(_idx_nat$18, (_a$19 => {
                        var $2035 = _obj_updated$2;
                        return $2035;
                    }), $2026);
                    var _hero_obj$20 = Mons$Object$set_bag$(_new_bag$19, _hero_obj$1);
                    var $2034 = Mons$Game$map_set$(_pos$3, _idx$4, _hero_obj$20, _game$5);
                    var $2032 = $2034;
                };
                var $2020 = $2032;
                break;
        };
        return $2020;
    };
    const Mons$Skill$update_mon_obj = x0 => x1 => x2 => x3 => x4 => Mons$Skill$update_mon_obj$(x0, x1, x2, x3, x4);

    function Mons$Effect$has_invulnerable$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2037 = self.sleep;
                var $2038 = self.burn;
                var $2039 = self.protect;
                var $2040 = self.minimize;
                var $2041 = self.invulnerable;
                var $2042 = self.hit;
                var $2043 = self.poison;
                var $2044 = self.swap_agi;
                var self = $2041;
                switch (self._) {
                    case 'Pair.new':
                        var $2046 = self.fst;
                        var $2047 = self.snd;
                        var $2048 = $2046;
                        var $2045 = $2048;
                        break;
                };
                var $2036 = $2045;
                break;
        };
        return $2036;
    };
    const Mons$Effect$has_invulnerable = x0 => Mons$Effect$has_invulnerable$(x0);

    function Mons$Effect$has_burn$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2050 = self.sleep;
                var $2051 = self.burn;
                var $2052 = self.protect;
                var $2053 = self.minimize;
                var $2054 = self.invulnerable;
                var $2055 = self.hit;
                var $2056 = self.poison;
                var $2057 = self.swap_agi;
                var $2058 = ($2051 > 0);
                var $2049 = $2058;
                break;
        };
        return $2049;
    };
    const Mons$Effect$has_burn = x0 => Mons$Effect$has_burn$(x0);

    function Mons$Effect$has_hit$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2060 = self.sleep;
                var $2061 = self.burn;
                var $2062 = self.protect;
                var $2063 = self.minimize;
                var $2064 = self.invulnerable;
                var $2065 = self.hit;
                var $2066 = self.poison;
                var $2067 = self.swap_agi;
                var $2068 = ($2065 > 0);
                var $2059 = $2068;
                break;
        };
        return $2059;
    };
    const Mons$Effect$has_hit = x0 => Mons$Effect$has_hit$(x0);

    function Mons$Effect$has_poison$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2070 = self.sleep;
                var $2071 = self.burn;
                var $2072 = self.protect;
                var $2073 = self.minimize;
                var $2074 = self.invulnerable;
                var $2075 = self.hit;
                var $2076 = self.poison;
                var $2077 = self.swap_agi;
                var $2078 = $2076;
                var $2069 = $2078;
                break;
        };
        return $2069;
    };
    const Mons$Effect$has_poison = x0 => Mons$Effect$has_poison$(x0);

    function Mons$Skill$apply_inital_eff_dmg$(_eff$1, _mhp$2, _idx$3) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2080 = self.sleep;
                var $2081 = self.burn;
                var $2082 = self.protect;
                var $2083 = self.minimize;
                var $2084 = self.invulnerable;
                var $2085 = self.hit;
                var $2086 = self.poison;
                var $2087 = self.swap_agi;
                var self = (_idx$3 === 1);
                if (self) {
                    var $2089 = "adve ";
                    var _player$12 = $2089;
                } else {
                    var $2090 = "hero ";
                    var _player$12 = $2090;
                };
                var self = Mons$Effect$has_invulnerable$(_eff$1);
                if (self) {
                    var $2091 = 0;
                    var $2088 = $2091;
                } else {
                    var self = Mons$Effect$has_burn$(_eff$1);
                    if (self) {
                        var $2093 = ((_mhp$2 / 16) >>> 0);
                        var _dmg_burn$13 = $2093;
                    } else {
                        var $2094 = 0;
                        var _dmg_burn$13 = $2094;
                    };
                    var self = Mons$Effect$has_hit$(_eff$1);
                    if (self) {
                        var $2095 = $2085;
                        var _dmg_hit$14 = $2095;
                    } else {
                        var $2096 = 0;
                        var _dmg_hit$14 = $2096;
                    };
                    var self = Mons$Effect$has_poison$(_eff$1);
                    if (self) {
                        var $2097 = ((_mhp$2 / 16) >>> 0);
                        var _dmg_poison$15 = $2097;
                    } else {
                        var $2098 = 0;
                        var _dmg_poison$15 = $2098;
                    };
                    var _dmg$16 = ((_dmg_poison$15 + ((_dmg_burn$13 + _dmg_hit$14) >>> 0)) >>> 0);
                    var $2092 = _dmg$16;
                    var $2088 = $2092;
                };
                var $2079 = $2088;
                break;
        };
        return $2079;
    };
    const Mons$Skill$apply_inital_eff_dmg = x0 => x1 => x2 => Mons$Skill$apply_inital_eff_dmg$(x0, x1, x2);

    function Mons$Effect$has_protect$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2100 = self.sleep;
                var $2101 = self.burn;
                var $2102 = self.protect;
                var $2103 = self.minimize;
                var $2104 = self.invulnerable;
                var $2105 = self.hit;
                var $2106 = self.poison;
                var $2107 = self.swap_agi;
                var _turn$10 = Pair$fst$($2102);
                var $2108 = (_turn$10 === 1);
                var $2099 = $2108;
                break;
        };
        return $2099;
    };
    const Mons$Effect$has_protect = x0 => Mons$Effect$has_protect$(x0);

    function Mons$Effect$has_minimize$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2110 = self.sleep;
                var $2111 = self.burn;
                var $2112 = self.protect;
                var $2113 = self.minimize;
                var $2114 = self.invulnerable;
                var $2115 = self.hit;
                var $2116 = self.poison;
                var $2117 = self.swap_agi;
                var self = $2113;
                switch (self._) {
                    case 'Pair.new':
                        var $2119 = self.fst;
                        var $2120 = self.snd;
                        var $2121 = ($2119 > 0);
                        var $2118 = $2121;
                        break;
                };
                var $2109 = $2118;
                break;
        };
        return $2109;
    };
    const Mons$Effect$has_minimize = x0 => Mons$Effect$has_minimize$(x0);

    function Mons$Object$get_dmg$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2123 = self.kin;
                var $2124 = self.dir;
                var $2125 = self.pad;
                var $2126 = self.ani;
                var $2127 = self.dmg;
                var $2128 = self.bag;
                var $2129 = self.mon;
                var $2130 = self.bos;
                var $2131 = self.cap;
                var $2132 = self.idl;
                var $2133 = self.eff;
                var $2134 = $2127;
                var $2122 = $2134;
                break;
        };
        return $2122;
    };
    const Mons$Object$get_dmg = x0 => Mons$Object$get_dmg$(x0);

    function Mons$Object$hit$(_obj$1, _dmg$2) {
        var $2135 = Mons$Object$set_dmg$(_obj$1, ((Mons$Object$get_dmg$(_obj$1) + _dmg$2) >>> 0));
        return $2135;
    };
    const Mons$Object$hit = x0 => x1 => Mons$Object$hit$(x0, x1);

    function Mons$Skill$damage_eff$(_obj$1, _pos$2, _idx$3, _dmg$4, _game$5) {
        var _obj_mon$6 = Mons$Object$get_current_mon$(_obj$1);
        var self = _obj_mon$6;
        switch (self._) {
            case 'Mons.Object.new':
                var $2137 = self.kin;
                var $2138 = self.dir;
                var $2139 = self.pad;
                var $2140 = self.ani;
                var $2141 = self.dmg;
                var $2142 = self.bag;
                var $2143 = self.mon;
                var $2144 = self.bos;
                var $2145 = self.cap;
                var $2146 = self.idl;
                var $2147 = self.eff;
                var self = Mons$Effect$has_invulnerable$($2147);
                if (self) {
                    var $2149 = _game$5;
                    var $2148 = $2149;
                } else {
                    var self = (_idx$3 === 1);
                    if (self) {
                        var $2151 = "adve ";
                        var _player$18 = $2151;
                    } else {
                        var $2152 = "hero ";
                        var _player$18 = $2152;
                    };
                    var self = Mons$Effect$has_protect$($2147);
                    if (self) {
                        var $2153 = ((_dmg$4 / 2) >>> 0);
                        var _dmg$19 = $2153;
                    } else {
                        var $2154 = _dmg$4;
                        var _dmg$19 = $2154;
                    };
                    var self = Mons$Effect$has_minimize$($2147);
                    if (self) {
                        var $2155 = (Math.max(_dmg$19 - ((_dmg$19 / 4) >>> 0), 0));
                        var _dmg$20 = $2155;
                    } else {
                        var $2156 = _dmg$19;
                        var _dmg$20 = $2156;
                    };
                    var _obj_mon$21 = Mons$Object$hit$(_obj_mon$6, _dmg$20);
                    var $2150 = Mons$Skill$update_mon_obj$(_obj$1, _obj_mon$21, _pos$2, _idx$3, _game$5);
                    var $2148 = $2150;
                };
                var $2136 = $2148;
                break;
        };
        return $2136;
    };
    const Mons$Skill$damage_eff = x0 => x1 => x2 => x3 => x4 => Mons$Skill$damage_eff$(x0, x1, x2, x3, x4);

    function Mons$Skill$apply_inital_eff$(_hero_idx$1, _adve_idx$2, _pos$3, _game$4) {
        var self = _game$4;
        switch (self._) {
            case 'Mons.Game.new':
                var $2158 = self.usr;
                var $2159 = self.pos;
                var $2160 = self.map;
                var $2161 = self.stt;
                var $2162 = self.tik;
                var _hero_obj$10 = Mons$Map$get$(_pos$3, _hero_idx$1, $2160);
                var _hero_mon_obj$11 = Mons$Object$get_current_mon$(_hero_obj$10);
                var self = _hero_mon_obj$11;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $2164 = self.kin;
                        var $2165 = self.dir;
                        var $2166 = self.pad;
                        var $2167 = self.ani;
                        var $2168 = self.dmg;
                        var $2169 = self.bag;
                        var $2170 = self.mon;
                        var $2171 = self.bos;
                        var $2172 = self.cap;
                        var $2173 = self.idl;
                        var $2174 = self.eff;
                        var self = Mons$Kind$attr$($2164);
                        switch (self._) {
                            case 'Mons.Attr.new':
                                var $2176 = self.blocks;
                                var $2177 = self.mhp;
                                var $2178 = self.atk;
                                var $2179 = self.name;
                                var $2180 = self.wlk;
                                var $2181 = self.idl;
                                var $2182 = self.pic;
                                var $2183 = self.battle_spr;
                                var $2184 = self.skills;
                                var $2185 = self.pos;
                                var _upd_effect$33 = Mons$Effect$upd_initial_eff$($2174);
                                var _hero_mon_obj$34 = Mons$Object$set_eff$(_upd_effect$33, _hero_mon_obj$11);
                                var _game$35 = Mons$Skill$update_mon_obj$(_hero_obj$10, _hero_mon_obj$34, _pos$3, _hero_idx$1, _game$4);
                                var _hero_dmg$36 = Mons$Skill$apply_inital_eff_dmg$($2174, $2177, _hero_idx$1);
                                var _game$37 = Mons$Skill$damage_eff$(_hero_obj$10, _pos$3, _hero_idx$1, _hero_dmg$36, _game$35);
                                var _adve_obj$38 = Mons$Map$get$(_pos$3, _adve_idx$2, $2160);
                                var self = _adve_obj$38;
                                switch (self._) {
                                    case 'Mons.Object.new':
                                        var $2187 = self.kin;
                                        var $2188 = self.dir;
                                        var $2189 = self.pad;
                                        var $2190 = self.ani;
                                        var $2191 = self.dmg;
                                        var $2192 = self.bag;
                                        var $2193 = self.mon;
                                        var $2194 = self.bos;
                                        var $2195 = self.cap;
                                        var $2196 = self.idl;
                                        var $2197 = self.eff;
                                        var self = Mons$Kind$attr$($2187);
                                        switch (self._) {
                                            case 'Mons.Attr.new':
                                                var $2199 = self.blocks;
                                                var $2200 = self.mhp;
                                                var $2201 = self.atk;
                                                var $2202 = self.name;
                                                var $2203 = self.wlk;
                                                var $2204 = self.idl;
                                                var $2205 = self.pic;
                                                var $2206 = self.battle_spr;
                                                var $2207 = self.skills;
                                                var $2208 = self.pos;
                                                var _upd_effect$60 = Mons$Effect$upd_initial_eff$($2197);
                                                var _adve_obj$61 = Mons$Object$set_eff$(_upd_effect$60, _adve_obj$38);
                                                var _adve_dmg$62 = Mons$Skill$apply_inital_eff_dmg$($2197, $2200, _adve_idx$2);
                                                var _game$63 = Mons$Skill$damage_eff$(_adve_obj$61, _pos$3, _adve_idx$2, _adve_dmg$62, _game$37);
                                                var $2209 = _game$63;
                                                var $2198 = $2209;
                                                break;
                                        };
                                        var $2186 = $2198;
                                        break;
                                };
                                var $2175 = $2186;
                                break;
                        };
                        var $2163 = $2175;
                        break;
                };
                var $2157 = $2163;
                break;
        };
        return $2157;
    };
    const Mons$Skill$apply_inital_eff = x0 => x1 => x2 => x3 => Mons$Skill$apply_inital_eff$(x0, x1, x2, x3);

    function Mons$Effect$has_sleep$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2211 = self.sleep;
                var $2212 = self.burn;
                var $2213 = self.protect;
                var $2214 = self.minimize;
                var $2215 = self.invulnerable;
                var $2216 = self.hit;
                var $2217 = self.poison;
                var $2218 = self.swap_agi;
                var _turn$10 = Pair$fst$($2211);
                var $2219 = (_turn$10 === 1);
                var $2210 = $2219;
                break;
        };
        return $2210;
    };
    const Mons$Effect$has_sleep = x0 => Mons$Effect$has_sleep$(x0);

    function Mons$Type$skill_n_type$(_val$1, _source_obj$2, _target_obj$3) {
        var $2220 = 1;
        return $2220;
    };
    const Mons$Type$skill_n_type = x0 => x1 => x2 => Mons$Type$skill_n_type$(x0, x1, x2);

    function Mons$Object$heal$(_obj$1, _val$2) {
        var $2221 = Mons$Object$set_dmg$(_obj$1, (Math.max(Mons$Object$get_dmg$(_obj$1) - _val$2, 0)));
        return $2221;
    };
    const Mons$Object$heal = x0 => x1 => Mons$Object$heal$(x0, x1);

    function Mons$Skill$heal_eff$(_obj$1, _pos$2, _idx$3, _val$4, _game$5) {
        var _obj_updated$6 = Mons$Object$heal$(Mons$Object$get_current_mon$(_obj$1), _val$4);
        var self = Mons$Object$is_obj_defeated$(_obj_updated$6);
        if (self) {
            var $2223 = _game$5;
            var $2222 = $2223;
        } else {
            var $2224 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$6, _pos$2, _idx$3, _game$5);
            var $2222 = $2224;
        };
        return $2222;
    };
    const Mons$Skill$heal_eff = x0 => x1 => x2 => x3 => x4 => Mons$Skill$heal_eff$(x0, x1, x2, x3, x4);

    function Mons$Effect$set_invulnerable$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2226 = self.kin;
                var $2227 = self.dir;
                var $2228 = self.pad;
                var $2229 = self.ani;
                var $2230 = self.dmg;
                var $2231 = self.bag;
                var $2232 = self.mon;
                var $2233 = self.bos;
                var $2234 = self.cap;
                var $2235 = self.idl;
                var $2236 = self.eff;
                var self = $2236;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2238 = self.sleep;
                        var $2239 = self.burn;
                        var $2240 = self.protect;
                        var $2241 = self.minimize;
                        var $2242 = self.invulnerable;
                        var $2243 = self.hit;
                        var $2244 = self.poison;
                        var $2245 = self.swap_agi;
                        var self = $2242;
                        switch (self._) {
                            case 'Pair.new':
                                var $2247 = self.fst;
                                var $2248 = self.snd;
                                var _new_eff$23 = Mons$Effect$new$($2238, $2239, $2240, $2241, Pair$new$(Bool$true, Bool$true), $2243, $2244, $2245);
                                var $2249 = Mons$Object$set_eff$(_new_eff$23, _obj$1);
                                var $2246 = $2249;
                                break;
                        };
                        var $2237 = $2246;
                        break;
                };
                var $2225 = $2237;
                break;
        };
        return $2225;
    };
    const Mons$Effect$set_invulnerable = x0 => Mons$Effect$set_invulnerable$(x0);

    function Mons$Skill$invulnerable_eff$(_obj$1, _pos$2, _idx$3, _game$4) {
        var _obj_updated$5 = Mons$Effect$set_invulnerable$(Mons$Object$get_current_mon$(_obj$1));
        var $2250 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$5, _pos$2, _idx$3, _game$4);
        return $2250;
    };
    const Mons$Skill$invulnerable_eff = x0 => x1 => x2 => x3 => Mons$Skill$invulnerable_eff$(x0, x1, x2, x3);

    function Mons$Effect$set_hit$(_obj$1, _val$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2252 = self.kin;
                var $2253 = self.dir;
                var $2254 = self.pad;
                var $2255 = self.ani;
                var $2256 = self.dmg;
                var $2257 = self.bag;
                var $2258 = self.mon;
                var $2259 = self.bos;
                var $2260 = self.cap;
                var $2261 = self.idl;
                var $2262 = self.eff;
                var self = $2262;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2264 = self.sleep;
                        var $2265 = self.burn;
                        var $2266 = self.protect;
                        var $2267 = self.minimize;
                        var $2268 = self.invulnerable;
                        var $2269 = self.hit;
                        var $2270 = self.poison;
                        var $2271 = self.swap_agi;
                        var _new_eff$22 = Mons$Effect$new$($2264, $2265, $2266, $2267, $2268, _val$2, $2270, $2271);
                        var $2272 = Mons$Object$set_eff$(_new_eff$22, _obj$1);
                        var $2263 = $2272;
                        break;
                };
                var $2251 = $2263;
                break;
        };
        return $2251;
    };
    const Mons$Effect$set_hit = x0 => x1 => Mons$Effect$set_hit$(x0, x1);

    function Mons$Skill$hit_next_eff$(_obj$1, _val$2, _pos$3, _idx$4, _game$5) {
        var _obj_updated$6 = Mons$Effect$set_hit$(Mons$Object$get_current_mon$(_obj$1), _val$2);
        var $2273 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$6, _pos$3, _idx$4, _game$5);
        return $2273;
    };
    const Mons$Skill$hit_next_eff = x0 => x1 => x2 => x3 => x4 => Mons$Skill$hit_next_eff$(x0, x1, x2, x3, x4);

    function Mons$Effect$set_burn$(_obj$1, _turns$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2275 = self.kin;
                var $2276 = self.dir;
                var $2277 = self.pad;
                var $2278 = self.ani;
                var $2279 = self.dmg;
                var $2280 = self.bag;
                var $2281 = self.mon;
                var $2282 = self.bos;
                var $2283 = self.cap;
                var $2284 = self.idl;
                var $2285 = self.eff;
                var self = $2285;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2287 = self.sleep;
                        var $2288 = self.burn;
                        var $2289 = self.protect;
                        var $2290 = self.minimize;
                        var $2291 = self.invulnerable;
                        var $2292 = self.hit;
                        var $2293 = self.poison;
                        var $2294 = self.swap_agi;
                        var _new_eff$22 = Mons$Effect$new$($2287, _turns$2, $2289, $2290, $2291, $2292, $2293, $2294);
                        var $2295 = Mons$Object$set_eff$(_new_eff$22, _obj$1);
                        var $2286 = $2295;
                        break;
                };
                var $2274 = $2286;
                break;
        };
        return $2274;
    };
    const Mons$Effect$set_burn = x0 => x1 => Mons$Effect$set_burn$(x0, x1);

    function Mons$Skill$burn_eff$(_obj$1, _pos$2, _idx$3, _turns$4, _game$5) {
        var _obj_updated$6 = Mons$Effect$set_burn$(Mons$Object$get_current_mon$(_obj$1), _turns$4);
        var $2296 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$6, _pos$2, _idx$3, _game$5);
        return $2296;
    };
    const Mons$Skill$burn_eff = x0 => x1 => x2 => x3 => x4 => Mons$Skill$burn_eff$(x0, x1, x2, x3, x4);

    function Mons$Effect$set_protect$(_obj$1, _turn$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2298 = self.kin;
                var $2299 = self.dir;
                var $2300 = self.pad;
                var $2301 = self.ani;
                var $2302 = self.dmg;
                var $2303 = self.bag;
                var $2304 = self.mon;
                var $2305 = self.bos;
                var $2306 = self.cap;
                var $2307 = self.idl;
                var $2308 = self.eff;
                var self = $2308;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2310 = self.sleep;
                        var $2311 = self.burn;
                        var $2312 = self.protect;
                        var $2313 = self.minimize;
                        var $2314 = self.invulnerable;
                        var $2315 = self.hit;
                        var $2316 = self.poison;
                        var $2317 = self.swap_agi;
                        var _new_eff$22 = Mons$Effect$new$($2310, $2311, Pair$new$(_turn$2, Bool$true), $2313, $2314, $2315, $2316, $2317);
                        var $2318 = Mons$Object$set_eff$(_new_eff$22, _obj$1);
                        var $2309 = $2318;
                        break;
                };
                var $2297 = $2309;
                break;
        };
        return $2297;
    };
    const Mons$Effect$set_protect = x0 => x1 => Mons$Effect$set_protect$(x0, x1);

    function Mons$Skill$protect_eff$(_obj$1, _pos$2, _idx$3, _turn$4, _game$5) {
        var _obj_updated$6 = Mons$Effect$set_protect$(Mons$Object$get_current_mon$(_obj$1), _turn$4);
        var $2319 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$6, _pos$2, _idx$3, _game$5);
        return $2319;
    };
    const Mons$Skill$protect_eff = x0 => x1 => x2 => x3 => x4 => Mons$Skill$protect_eff$(x0, x1, x2, x3, x4);

    function Mons$Effect$set_poison$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2321 = self.kin;
                var $2322 = self.dir;
                var $2323 = self.pad;
                var $2324 = self.ani;
                var $2325 = self.dmg;
                var $2326 = self.bag;
                var $2327 = self.mon;
                var $2328 = self.bos;
                var $2329 = self.cap;
                var $2330 = self.idl;
                var $2331 = self.eff;
                var self = $2331;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2333 = self.sleep;
                        var $2334 = self.burn;
                        var $2335 = self.protect;
                        var $2336 = self.minimize;
                        var $2337 = self.invulnerable;
                        var $2338 = self.hit;
                        var $2339 = self.poison;
                        var $2340 = self.swap_agi;
                        var _new_eff$21 = Mons$Effect$new$($2333, $2334, $2335, $2336, $2337, $2338, Bool$true, $2340);
                        var $2341 = Mons$Object$set_eff$(_new_eff$21, _obj$1);
                        var $2332 = $2341;
                        break;
                };
                var $2320 = $2332;
                break;
        };
        return $2320;
    };
    const Mons$Effect$set_poison = x0 => Mons$Effect$set_poison$(x0);

    function Mons$Skill$poison_eff$(_obj$1, _pos$2, _idx$3, _game$4) {
        var $2342 = Mons$Skill$update_mon_obj$(_obj$1, Mons$Effect$set_poison$(Mons$Object$get_current_mon$(_obj$1)), _pos$2, _idx$3, _game$4);
        return $2342;
    };
    const Mons$Skill$poison_eff = x0 => x1 => x2 => x3 => Mons$Skill$poison_eff$(x0, x1, x2, x3);

    function Mons$Skill$critical_hit$(_mhp$1, _hit_val$2, _perc$3, _tik$4) {
        var self = ((_tik$4 % _perc$3) === 0);
        if (self) {
            var $2344 = ((((_mhp$1 / 16) >>> 0) + _hit_val$2) >>> 0);
            var $2343 = $2344;
        } else {
            var $2345 = _hit_val$2;
            var $2343 = $2345;
        };
        return $2343;
    };
    const Mons$Skill$critical_hit = x0 => x1 => x2 => x3 => Mons$Skill$critical_hit$(x0, x1, x2, x3);

    function Mons$Skill$is_critical$(_perc$1, _tik$2) {
        var $2346 = ((_tik$2 % _perc$1) === 0);
        return $2346;
    };
    const Mons$Skill$is_critical = x0 => x1 => Mons$Skill$is_critical$(x0, x1);

    function Mons$Kind$get_agi$(_kind$1) {
        var self = _kind$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $2348 = self.ele;
                var $2349 = self.boss;
                var $2350 = self.pri_type;
                var $2351 = self.agi;
                var $2352 = $2351;
                var $2347 = $2352;
                break;
            case 'Mons.Kind.Const':
                var $2353 = self.ele;
                var $2354 = 3;
                var $2347 = $2354;
                break;
            case 'Mons.Kind.Terrain':
                var $2355 = self.ele;
                var $2356 = 3;
                var $2347 = $2356;
                break;
            case 'Mons.Kind.Interactive':
                var $2357 = self.ele;
                var $2358 = self.on;
                var $2359 = self.eff;
                var $2360 = 3;
                var $2347 = $2360;
                break;
        };
        return $2347;
    };
    const Mons$Kind$get_agi = x0 => Mons$Kind$get_agi$(x0);

    function Mons$Effect$set_minimize$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2362 = self.kin;
                var $2363 = self.dir;
                var $2364 = self.pad;
                var $2365 = self.ani;
                var $2366 = self.dmg;
                var $2367 = self.bag;
                var $2368 = self.mon;
                var $2369 = self.bos;
                var $2370 = self.cap;
                var $2371 = self.idl;
                var $2372 = self.eff;
                var self = $2372;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2374 = self.sleep;
                        var $2375 = self.burn;
                        var $2376 = self.protect;
                        var $2377 = self.minimize;
                        var $2378 = self.invulnerable;
                        var $2379 = self.hit;
                        var $2380 = self.poison;
                        var $2381 = self.swap_agi;
                        var _new_eff$21 = Mons$Effect$new$($2374, $2375, $2376, Pair$new$(2, Bool$true), $2378, $2379, $2380, $2381);
                        var $2382 = Mons$Object$set_eff$(_new_eff$21, _obj$1);
                        var $2373 = $2382;
                        break;
                };
                var $2361 = $2373;
                break;
        };
        return $2361;
    };
    const Mons$Effect$set_minimize = x0 => Mons$Effect$set_minimize$(x0);

    function Mons$Skill$minimize_eff$(_obj$1, _pos$2, _idx$3, _game$4) {
        var _obj_updated$5 = Mons$Effect$set_minimize$(Mons$Object$get_current_mon$(_obj$1));
        var $2383 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$5, _pos$2, _idx$3, _game$4);
        return $2383;
    };
    const Mons$Skill$minimize_eff = x0 => x1 => x2 => x3 => Mons$Skill$minimize_eff$(x0, x1, x2, x3);

    function Mons$Effect$set_sleep$(_obj$1, _turn$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2385 = self.kin;
                var $2386 = self.dir;
                var $2387 = self.pad;
                var $2388 = self.ani;
                var $2389 = self.dmg;
                var $2390 = self.bag;
                var $2391 = self.mon;
                var $2392 = self.bos;
                var $2393 = self.cap;
                var $2394 = self.idl;
                var $2395 = self.eff;
                var self = $2395;
                switch (self._) {
                    case 'Mons.Effect.new':
                        var $2397 = self.sleep;
                        var $2398 = self.burn;
                        var $2399 = self.protect;
                        var $2400 = self.minimize;
                        var $2401 = self.invulnerable;
                        var $2402 = self.hit;
                        var $2403 = self.poison;
                        var $2404 = self.swap_agi;
                        var _new_eff$22 = Mons$Effect$new$(Pair$new$(_turn$2, Bool$true), $2398, $2399, $2400, $2401, $2402, $2403, $2404);
                        var $2405 = Mons$Object$set_eff$(_new_eff$22, _obj$1);
                        var $2396 = $2405;
                        break;
                };
                var $2384 = $2396;
                break;
        };
        return $2384;
    };
    const Mons$Effect$set_sleep = x0 => x1 => Mons$Effect$set_sleep$(x0, x1);

    function Mons$Skill$sleep_eff$(_obj$1, _pos$2, _idx$3, _turn$4, _game$5) {
        var _obj_updated$6 = Mons$Effect$set_sleep$(Mons$Object$get_current_mon$(_obj$1), _turn$4);
        var $2406 = Mons$Skill$update_mon_obj$(_obj$1, _obj_updated$6, _pos$2, _idx$3, _game$5);
        return $2406;
    };
    const Mons$Skill$sleep_eff = x0 => x1 => x2 => x3 => x4 => Mons$Skill$sleep_eff$(x0, x1, x2, x3, x4);

    function Mons$Skill$cast$(_pos$1, _source$2, _target$3, _skill$4, _game$5) {
        var self = _game$5;
        switch (self._) {
            case 'Mons.Game.new':
                var $2408 = self.usr;
                var $2409 = self.pos;
                var $2410 = self.map;
                var $2411 = self.stt;
                var $2412 = self.tik;
                var _source_obj$11 = Mons$Map$get$(_pos$1, _source$2, $2410);
                var _source_mon$12 = Mons$Object$get_current_mon$(_source_obj$11);
                var _target_obj$13 = Mons$Map$get$(_pos$1, _target$3, $2410);
                var _target_mon$14 = Mons$Object$get_current_mon$(_target_obj$13);
                var self = _source_mon$12;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $2414 = self.kin;
                        var $2415 = self.dir;
                        var $2416 = self.pad;
                        var $2417 = self.ani;
                        var $2418 = self.dmg;
                        var $2419 = self.bag;
                        var $2420 = self.mon;
                        var $2421 = self.bos;
                        var $2422 = self.cap;
                        var $2423 = self.idl;
                        var $2424 = self.eff;
                        var self = $2424;
                        switch (self._) {
                            case 'Mons.Effect.new':
                                var $2426 = self.sleep;
                                var $2427 = self.burn;
                                var $2428 = self.protect;
                                var $2429 = self.minimize;
                                var $2430 = self.invulnerable;
                                var $2431 = self.hit;
                                var $2432 = self.poison;
                                var $2433 = self.swap_agi;
                                var self = _target_mon$14;
                                switch (self._) {
                                    case 'Mons.Object.new':
                                        var $2435 = self.kin;
                                        var $2436 = self.dir;
                                        var $2437 = self.pad;
                                        var $2438 = self.ani;
                                        var $2439 = self.dmg;
                                        var $2440 = self.bag;
                                        var $2441 = self.mon;
                                        var $2442 = self.bos;
                                        var $2443 = self.cap;
                                        var $2444 = self.idl;
                                        var $2445 = self.eff;
                                        var self = $2445;
                                        switch (self._) {
                                            case 'Mons.Effect.new':
                                                var $2447 = self.sleep;
                                                var $2448 = self.burn;
                                                var $2449 = self.protect;
                                                var $2450 = self.minimize;
                                                var $2451 = self.invulnerable;
                                                var $2452 = self.hit;
                                                var $2453 = self.poison;
                                                var $2454 = self.swap_agi;
                                                var self = Mons$Kind$attr$($2414);
                                                switch (self._) {
                                                    case 'Mons.Attr.new':
                                                        var $2456 = self.blocks;
                                                        var $2457 = self.mhp;
                                                        var $2458 = self.atk;
                                                        var $2459 = self.name;
                                                        var $2460 = self.wlk;
                                                        var $2461 = self.idl;
                                                        var $2462 = self.pic;
                                                        var $2463 = self.battle_spr;
                                                        var $2464 = self.skills;
                                                        var $2465 = self.pos;
                                                        var self = Mons$Kind$attr$($2435);
                                                        switch (self._) {
                                                            case 'Mons.Attr.new':
                                                                var $2467 = self.blocks;
                                                                var $2468 = self.mhp;
                                                                var $2469 = self.atk;
                                                                var $2470 = self.name;
                                                                var $2471 = self.wlk;
                                                                var $2472 = self.idl;
                                                                var $2473 = self.pic;
                                                                var $2474 = self.battle_spr;
                                                                var $2475 = self.skills;
                                                                var $2476 = self.pos;
                                                                var _light_val$73 = 2;
                                                                var _medium_val$74 = 4;
                                                                var _high_val$75 = 6;
                                                                var _can_attack$76 = (!Mons$Effect$has_sleep$($2424));
                                                                var self = _can_attack$76;
                                                                if (self) {
                                                                    var self = _skill$4;
                                                                    switch (self._) {
                                                                        case 'Mons.Skill.hit_4':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_medium_val$74, _source_mon$12, _target_mon$14);
                                                                            var $2479 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2478 = $2479;
                                                                            break;
                                                                        case 'Mons.Skill.hit_2':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_light_val$73, _source_mon$12, _target_mon$14);
                                                                            var $2480 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2478 = $2480;
                                                                            break;
                                                                        case 'Mons.Skill.heal':
                                                                            var $2481 = Mons$Skill$heal_eff$(_source_obj$11, _pos$1, _source$2, 3, _game$5);
                                                                            var $2478 = $2481;
                                                                            break;
                                                                        case 'Mons.Skill.none':
                                                                            var $2482 = _game$5;
                                                                            var $2478 = $2482;
                                                                            break;
                                                                        case 'Mons.Skill.run':
                                                                            var $2483 = _game$5;
                                                                            var $2478 = $2483;
                                                                            break;
                                                                        case 'Mons.Skill.dig':
                                                                            var _game$77 = Mons$Skill$invulnerable_eff$(_source_obj$11, _pos$1, _source$2, _game$5);
                                                                            var _game$78 = Mons$Skill$hit_next_eff$(_target_obj$13, 3, _pos$1, _target$3, _game$77);
                                                                            var $2484 = _game$78;
                                                                            var $2478 = $2484;
                                                                            break;
                                                                        case 'Mons.Skill.sand_tomb':
                                                                            var _game$77 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, Mons$Type$skill_n_type$(_light_val$73, _source_mon$12, _target_mon$14), _game$5);
                                                                            var _game$78 = Mons$Skill$burn_eff$(_target_obj$13, _pos$1, _target$3, 5, _game$77);
                                                                            var $2485 = _game$78;
                                                                            var $2478 = $2485;
                                                                            break;
                                                                        case 'Mons.Skill.protect':
                                                                            var self = Pair$snd$($2428);
                                                                            if (self) {
                                                                                var $2487 = _game$5;
                                                                                var $2486 = $2487;
                                                                            } else {
                                                                                var $2488 = Mons$Skill$protect_eff$(_source_obj$11, _pos$1, _source$2, 2, _game$5);
                                                                                var $2486 = $2488;
                                                                            };
                                                                            var $2478 = $2486;
                                                                            break;
                                                                        case 'Mons.Skill.slam':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_high_val$75, _source_mon$12, _target_mon$14);
                                                                            var $2489 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2478 = $2489;
                                                                            break;
                                                                        case 'Mons.Skill.counter':
                                                                            var _game$77 = Mons$Skill$heal_eff$(_source_obj$11, _pos$1, _source$2, _light_val$73, _game$5);
                                                                            var $2490 = Mons$Skill$burn_eff$(_target_obj$13, _pos$1, _target$3, 5, _game$77);
                                                                            var $2478 = $2490;
                                                                            break;
                                                                        case 'Mons.Skill.recover':
                                                                            var _val$77 = ((Mons$Object$remaining_hp$(_source_mon$12) / 4) >>> 0);
                                                                            var _game$78 = Mons$Skill$poison_eff$(_source_obj$11, _pos$1, _source$2, _game$5);
                                                                            var $2491 = Mons$Skill$heal_eff$(_source_obj$11, _pos$1, _source$2, _val$77, _game$78);
                                                                            var $2478 = $2491;
                                                                            break;
                                                                        case 'Mons.Skill.rock_smash':
                                                                            var _val$77 = Mons$Skill$critical_hit$($2468, _light_val$73, 2, $2412);
                                                                            var _game$78 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2492 = _game$78;
                                                                            var $2478 = $2492;
                                                                            break;
                                                                        case 'Mons.Skill.crunch':
                                                                            var _val$77 = Mons$Skill$critical_hit$($2468, _medium_val$74, 4, $2412);
                                                                            var _game$78 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2493 = _game$78;
                                                                            var $2478 = $2493;
                                                                            break;
                                                                        case 'Mons.Skill.sludge_bomb':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_light_val$73, _source_mon$12, _target_mon$14);
                                                                            var _game$78 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var self = Mons$Skill$is_critical$(3, $2412);
                                                                            if (self) {
                                                                                var $2495 = Mons$Skill$poison_eff$(_target_obj$13, _pos$1, _target$3, _game$78);
                                                                                var $2494 = $2495;
                                                                            } else {
                                                                                var $2496 = _game$78;
                                                                                var $2494 = $2496;
                                                                            };
                                                                            var $2478 = $2494;
                                                                            break;
                                                                        case 'Mons.Skill.gyro_ball':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_medium_val$74, _source_mon$12, _target_mon$14);
                                                                            var self = (Mons$Kind$get_agi$($2435) > Mons$Kind$get_agi$($2414));
                                                                            if (self) {
                                                                                var $2498 = ((((_val$77 / 2) >>> 0) + _val$77) >>> 0);
                                                                                var _val$78 = $2498;
                                                                            } else {
                                                                                var $2499 = _val$77;
                                                                                var _val$78 = $2499;
                                                                            };
                                                                            var _game$79 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$78, _game$5);
                                                                            var $2497 = _game$79;
                                                                            var $2478 = $2497;
                                                                            break;
                                                                        case 'Mons.Skill.iron_defense':
                                                                            var $2500 = Mons$Skill$minimize_eff$(_source_obj$11, _pos$1, _source$2, _game$5);
                                                                            var $2478 = $2500;
                                                                            break;
                                                                        case 'Mons.Skill.super_fang':
                                                                            var _adve_dmg$77 = ((Mons$Object$remaining_hp$(_source_mon$12) / 4) >>> 0);
                                                                            var _game$78 = Mons$Skill$burn_eff$(_source_obj$11, _pos$1, _target$3, 2, _game$5);
                                                                            var _game$79 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _adve_dmg$77, _game$78);
                                                                            var $2501 = _game$79;
                                                                            var $2478 = $2501;
                                                                            break;
                                                                        case 'Mons.Skill.hypnosis':
                                                                            var self = (Mons$Skill$is_critical$(2, $2412) && Mons$Effect$has_sleep$($2445));
                                                                            if (self) {
                                                                                var $2503 = Mons$Skill$sleep_eff$(_target_obj$13, _pos$1, _target$3, 2, _game$5);
                                                                                var $2502 = $2503;
                                                                            } else {
                                                                                var $2504 = _game$5;
                                                                                var $2502 = $2504;
                                                                            };
                                                                            var $2478 = $2502;
                                                                            break;
                                                                        case 'Mons.Skill.dream_eater':
                                                                            var self = Mons$Effect$has_sleep$($2445);
                                                                            if (self) {
                                                                                var _val$77 = Mons$Type$skill_n_type$(_high_val$75, _source_mon$12, _target_mon$14);
                                                                                var _game$78 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                                var $2506 = Mons$Skill$heal_eff$(_source_obj$11, _pos$1, _source$2, _val$77, _game$78);
                                                                                var $2505 = $2506;
                                                                            } else {
                                                                                var $2507 = _game$5;
                                                                                var $2505 = $2507;
                                                                            };
                                                                            var $2478 = $2505;
                                                                            break;
                                                                        case 'Mons.Skill.wing_attack':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_high_val$75, _source_mon$12, _target_mon$14);
                                                                            var $2508 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2478 = $2508;
                                                                            break;
                                                                        case 'Mons.Skill.moonlight':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_medium_val$74, _source_mon$12, _target_mon$14);
                                                                            var self = Mons$Skill$is_critical$(5, $2412);
                                                                            if (self) {
                                                                                var _game$78 = Mons$Skill$sleep_eff$(_target_obj$13, _pos$1, _target$3, 2, _game$5);
                                                                                var $2510 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$78);
                                                                                var $2509 = $2510;
                                                                            } else {
                                                                                var $2511 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                                var $2509 = $2511;
                                                                            };
                                                                            var $2478 = $2509;
                                                                            break;
                                                                        case 'Mons.Skill.play_rough':
                                                                            var _val$77 = Mons$Skill$critical_hit$($2468, _medium_val$74, 5, $2412);
                                                                            var $2512 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2478 = $2512;
                                                                            break;
                                                                        case 'Mons.Skill.psychic':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_light_val$73, _source_mon$12, _target_mon$14);
                                                                            var self = Mons$Skill$is_critical$(10, $2412);
                                                                            if (self) {
                                                                                var _game$78 = Mons$Skill$sleep_eff$(_target_obj$13, _pos$1, _target$3, 1, _game$5);
                                                                                var _game$79 = Mons$Skill$hit_next_eff$(_target_obj$13, 3, _pos$1, _target$3, _game$78);
                                                                                var $2514 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$79);
                                                                                var $2513 = $2514;
                                                                            } else {
                                                                                var $2515 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                                var $2513 = $2515;
                                                                            };
                                                                            var $2478 = $2513;
                                                                            break;
                                                                        case 'Mons.Skill.ancient_power':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_medium_val$74, _source_mon$12, _target_mon$14);
                                                                            var self = Mons$Skill$is_critical$(10, $2412);
                                                                            if (self) {
                                                                                var _game$78 = Mons$Skill$sleep_eff$(_target_obj$13, _pos$1, _target$3, 1, _game$5);
                                                                                var $2517 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$78);
                                                                                var $2516 = $2517;
                                                                            } else {
                                                                                var $2518 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                                var $2516 = $2518;
                                                                            };
                                                                            var $2478 = $2516;
                                                                            break;
                                                                        case 'Mons.Skill.thunder_wave':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_high_val$75, _source_mon$12, _target_mon$14);
                                                                            var $2519 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                            var $2478 = $2519;
                                                                            break;
                                                                        case 'Mons.Skill.charge':
                                                                            var _val$77 = Mons$Type$skill_n_type$(_medium_val$74, _source_mon$12, _target_mon$14);
                                                                            var self = Mons$Effect$has_minimize$($2445);
                                                                            if (self) {
                                                                                var $2521 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, ((_val$77 * 2) >>> 0), _game$5);
                                                                                var $2520 = $2521;
                                                                            } else {
                                                                                var $2522 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, _val$77, _game$5);
                                                                                var $2520 = $2522;
                                                                            };
                                                                            var $2478 = $2520;
                                                                            break;
                                                                        case 'Mons.Skill.agility':
                                                                            var $2523 = _game$5;
                                                                            var $2478 = $2523;
                                                                            break;
                                                                        case 'Mons.Skill.hero_kill':
                                                                            var $2524 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, 40, _game$5);
                                                                            var $2478 = $2524;
                                                                            break;
                                                                        case 'Mons.Skill.nightmare':
                                                                            var self = Mons$Effect$has_sleep$($2445);
                                                                            if (self) {
                                                                                var _hp$77 = Mons$Object$remaining_hp$(_target_mon$14);
                                                                                var $2526 = Mons$Skill$damage_eff$(_target_obj$13, _pos$1, _target$3, ((_hp$77 / 5) >>> 0), _game$5);
                                                                                var $2525 = $2526;
                                                                            } else {
                                                                                var $2527 = _game$5;
                                                                                var $2525 = $2527;
                                                                            };
                                                                            var $2478 = $2525;
                                                                            break;
                                                                    };
                                                                    var $2477 = $2478;
                                                                } else {
                                                                    var $2528 = _game$5;
                                                                    var $2477 = $2528;
                                                                };
                                                                var $2466 = $2477;
                                                                break;
                                                        };
                                                        var $2455 = $2466;
                                                        break;
                                                };
                                                var $2446 = $2455;
                                                break;
                                        };
                                        var $2434 = $2446;
                                        break;
                                };
                                var $2425 = $2434;
                                break;
                        };
                        var $2413 = $2425;
                        break;
                };
                var $2407 = $2413;
                break;
        };
        return $2407;
    };
    const Mons$Skill$cast = x0 => x1 => x2 => x3 => x4 => Mons$Skill$cast$(x0, x1, x2, x3, x4);
    const Mons$Skill$run = ({
        _: 'Mons.Skill.run'
    });

    function Mons$Game$hero_start_attacking$(_hero_kin$1, _adve_kin$2) {
        var _hero_agi$3 = Mons$Kind$get_agi$(_hero_kin$1);
        var _adve_agi$4 = Mons$Kind$get_agi$(_adve_kin$2);
        var $2529 = ((_hero_agi$3 < _adve_agi$4) || (_hero_agi$3 === _adve_agi$4));
        return $2529;
    };
    const Mons$Game$hero_start_attacking = x0 => x1 => Mons$Game$hero_start_attacking$(x0, x1);

    function Mons$Game$exec_turn$(_hero_obj$1, _adve_obj$2, _pos$3, _hero_idx$4, _adve_idx$5, _code_skill$6, _turn$7, _game$8) {
        var self = _game$8;
        switch (self._) {
            case 'Mons.Game.new':
                var $2531 = self.usr;
                var $2532 = self.pos;
                var $2533 = self.map;
                var $2534 = self.stt;
                var $2535 = self.tik;
                var _hero_mon_obj$14 = Mons$Object$get_current_mon$(_hero_obj$1);
                var self = _hero_mon_obj$14;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $2537 = self.kin;
                        var $2538 = self.dir;
                        var $2539 = self.pad;
                        var $2540 = self.ani;
                        var $2541 = self.dmg;
                        var $2542 = self.bag;
                        var $2543 = self.mon;
                        var $2544 = self.bos;
                        var $2545 = self.cap;
                        var $2546 = self.idl;
                        var $2547 = self.eff;
                        var self = _adve_obj$2;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $2549 = self.kin;
                                var $2550 = self.dir;
                                var $2551 = self.pad;
                                var $2552 = self.ani;
                                var $2553 = self.dmg;
                                var $2554 = self.bag;
                                var $2555 = self.mon;
                                var $2556 = self.bos;
                                var $2557 = self.cap;
                                var $2558 = self.idl;
                                var $2559 = self.eff;
                                var _hero_skill$37 = Mons$Game$get_skills_at$(_code_skill$6, _hero_mon_obj$14);
                                var _adve_skill_code$38 = Mons$Game$adve_turn$(_hero_obj$1, _adve_obj$2, _game$8);
                                var _adve_skill$39 = Mons$Game$get_skills_at$(_adve_skill_code$38, _adve_obj$2);
                                var self = (!Mons$Turn$is_active$(_turn$7));
                                if (self) {
                                    var _game$40 = Mons$Skill$apply_inital_eff$(_hero_idx$4, _adve_idx$5, _pos$3, _game$8);
                                    var self = (_code_skill$6 === 4n);
                                    if (self) {
                                        var _game$41 = Mons$Skill$cast$(_pos$3, _adve_idx$5, _hero_idx$4, _adve_skill$39, _game$40);
                                        var _game$42 = Mons$Skill$cast$(_pos$3, _hero_idx$4, _adve_idx$5, Mons$Skill$run, _game$41);
                                        var _turn$43 = Mons$Turn$new$(Bool$true, Mons$Skill$run, _adve_skill$39, 5);
                                        var $2562 = Mons$Game$set_stt$(Mons$Screen$game$(46, _turn$43), _game$42);
                                        var $2561 = $2562;
                                    } else {
                                        var self = Mons$Game$hero_start_attacking$($2537, $2549);
                                        if (self) {
                                            var _game$41 = Mons$Skill$cast$(_pos$3, _hero_idx$4, _adve_idx$5, _hero_skill$37, _game$40);
                                            var _game$42 = Mons$Skill$cast$(_pos$3, _adve_idx$5, _hero_idx$4, _adve_skill$39, _game$41);
                                            var _turn$43 = Mons$Turn$new$(Bool$true, _hero_skill$37, _adve_skill$39, 2);
                                            var $2564 = Mons$Game$set_stt$(Mons$Screen$game$(46, _turn$43), _game$42);
                                            var $2563 = $2564;
                                        } else {
                                            var _game$41 = Mons$Skill$cast$(_pos$3, _adve_idx$5, _hero_idx$4, _adve_skill$39, _game$40);
                                            var _game$42 = Mons$Skill$cast$(_pos$3, _hero_idx$4, _adve_idx$5, _hero_skill$37, _game$41);
                                            var _turn$43 = Mons$Turn$new$(Bool$false, _hero_skill$37, _adve_skill$39, 2);
                                            var $2565 = Mons$Game$set_stt$(Mons$Screen$game$(46, _turn$43), _game$42);
                                            var $2563 = $2565;
                                        };
                                        var $2561 = $2563;
                                    };
                                    var $2560 = $2561;
                                } else {
                                    var $2566 = _game$8;
                                    var $2560 = $2566;
                                };
                                var $2548 = $2560;
                                break;
                        };
                        var $2536 = $2548;
                        break;
                };
                var $2530 = $2536;
                break;
        };
        return $2530;
    };
    const Mons$Game$exec_turn = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Mons$Game$exec_turn$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Mons$Kind$is_mon_area$(_adve_kin$1) {
        var self = _adve_kin$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $2568 = self.ele;
                var $2569 = self.boss;
                var $2570 = self.pri_type;
                var $2571 = self.agi;
                var $2572 = Bool$false;
                var $2567 = $2572;
                break;
            case 'Mons.Kind.Const':
                var $2573 = self.ele;
                var $2574 = Bool$false;
                var $2567 = $2574;
                break;
            case 'Mons.Kind.Terrain':
                var $2575 = self.ele;
                var self = $2575;
                switch (self._) {
                    case 'Mons.Kind.terrain.VOID':
                        var $2577 = Bool$false;
                        var $2576 = $2577;
                        break;
                    case 'Mons.Kind.terrain.VOID_BLACK':
                        var $2578 = Bool$false;
                        var $2576 = $2578;
                        break;
                    case 'Mons.Kind.terrain.FLOOR':
                        var $2579 = self.lvl;
                        var $2580 = self.model;
                        var $2581 = Bool$false;
                        var $2576 = $2581;
                        break;
                    case 'Mons.Kind.terrain.GRASS_PLANT':
                        var $2582 = Bool$false;
                        var $2576 = $2582;
                        break;
                    case 'Mons.Kind.terrain.BUSH':
                        var $2583 = self.model;
                        var $2584 = Bool$false;
                        var $2576 = $2584;
                        break;
                    case 'Mons.Kind.terrain.PLANT_0':
                        var $2585 = Bool$false;
                        var $2576 = $2585;
                        break;
                    case 'Mons.Kind.terrain.SAND_0':
                        var $2586 = Bool$false;
                        var $2576 = $2586;
                        break;
                    case 'Mons.Kind.terrain.PATH_BLOCKER':
                        var $2587 = self.lvl;
                        var $2588 = self.model;
                        var $2589 = Bool$false;
                        var $2576 = $2589;
                        break;
                    case 'Mons.Kind.terrain.MID_CITY':
                        var $2590 = self.row;
                        var $2591 = self.column;
                        var $2592 = Bool$false;
                        var $2576 = $2592;
                        break;
                    case 'Mons.Kind.terrain.STAIRS':
                        var $2593 = self.row;
                        var $2594 = self.column;
                        var $2595 = Bool$false;
                        var $2576 = $2595;
                        break;
                    case 'Mons.Kind.terrain.MON_AREA':
                        var $2596 = self.pos_mon;
                        var $2597 = Bool$true;
                        var $2576 = $2597;
                        break;
                };
                var $2567 = $2576;
                break;
            case 'Mons.Kind.Interactive':
                var $2598 = self.ele;
                var $2599 = self.on;
                var $2600 = self.eff;
                var $2601 = Bool$false;
                var $2567 = $2601;
                break;
        };
        return $2567;
    };
    const Mons$Kind$is_mon_area = x0 => Mons$Kind$is_mon_area$(x0);

    function Mons$Kind$area_mon_pos$(_adve_kin$1, _hero_pos$2) {
        var self = _adve_kin$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $2603 = self.ele;
                var $2604 = self.boss;
                var $2605 = self.pri_type;
                var $2606 = self.agi;
                var $2607 = _hero_pos$2;
                var $2602 = $2607;
                break;
            case 'Mons.Kind.Const':
                var $2608 = self.ele;
                var $2609 = _hero_pos$2;
                var $2602 = $2609;
                break;
            case 'Mons.Kind.Terrain':
                var $2610 = self.ele;
                var self = $2610;
                switch (self._) {
                    case 'Mons.Kind.terrain.VOID':
                        var $2612 = _hero_pos$2;
                        var $2611 = $2612;
                        break;
                    case 'Mons.Kind.terrain.VOID_BLACK':
                        var $2613 = _hero_pos$2;
                        var $2611 = $2613;
                        break;
                    case 'Mons.Kind.terrain.FLOOR':
                        var $2614 = self.lvl;
                        var $2615 = self.model;
                        var $2616 = _hero_pos$2;
                        var $2611 = $2616;
                        break;
                    case 'Mons.Kind.terrain.GRASS_PLANT':
                        var $2617 = _hero_pos$2;
                        var $2611 = $2617;
                        break;
                    case 'Mons.Kind.terrain.BUSH':
                        var $2618 = self.model;
                        var $2619 = _hero_pos$2;
                        var $2611 = $2619;
                        break;
                    case 'Mons.Kind.terrain.PLANT_0':
                        var $2620 = _hero_pos$2;
                        var $2611 = $2620;
                        break;
                    case 'Mons.Kind.terrain.SAND_0':
                        var $2621 = _hero_pos$2;
                        var $2611 = $2621;
                        break;
                    case 'Mons.Kind.terrain.PATH_BLOCKER':
                        var $2622 = self.lvl;
                        var $2623 = self.model;
                        var $2624 = _hero_pos$2;
                        var $2611 = $2624;
                        break;
                    case 'Mons.Kind.terrain.MID_CITY':
                        var $2625 = self.row;
                        var $2626 = self.column;
                        var $2627 = _hero_pos$2;
                        var $2611 = $2627;
                        break;
                    case 'Mons.Kind.terrain.STAIRS':
                        var $2628 = self.row;
                        var $2629 = self.column;
                        var $2630 = _hero_pos$2;
                        var $2611 = $2630;
                        break;
                    case 'Mons.Kind.terrain.MON_AREA':
                        var $2631 = self.pos_mon;
                        var $2632 = $2631;
                        var $2611 = $2632;
                        break;
                };
                var $2602 = $2611;
                break;
            case 'Mons.Kind.Interactive':
                var $2633 = self.ele;
                var $2634 = self.on;
                var $2635 = self.eff;
                var $2636 = _hero_pos$2;
                var $2602 = $2636;
                break;
        };
        return $2602;
    };
    const Mons$Kind$area_mon_pos = x0 => x1 => Mons$Kind$area_mon_pos$(x0, x1);

    function Mons$Screen$inventory$(_idx$1) {
        var $2637 = ({
            _: 'Mons.Screen.inventory',
            'idx': _idx$1
        });
        return $2637;
    };
    const Mons$Screen$inventory = x0 => Mons$Screen$inventory$(x0);

    function Mons$Skill$clear_after_battle$(_hero_idx$1, _adve_idx$2, _pos$3, _game$4) {
        var self = _game$4;
        switch (self._) {
            case 'Mons.Game.new':
                var $2639 = self.usr;
                var $2640 = self.pos;
                var $2641 = self.map;
                var $2642 = self.stt;
                var $2643 = self.tik;
                var _hero_obj$10 = Mons$Map$get$(_pos$3, _hero_idx$1, $2641);
                var _hero_mon_obj$11 = Mons$Object$get_current_mon$(_hero_obj$10);
                var _adve_obj$12 = Mons$Map$get$(_pos$3, _adve_idx$2, $2641);
                var _hero_mon_obj$13 = Mons$Object$set_eff$(Mons$Effect$clear, _hero_mon_obj$11);
                var _game$14 = Mons$Skill$update_mon_obj$(_hero_obj$10, _hero_mon_obj$13, _pos$3, _hero_idx$1, _game$4);
                var _adve_obj$15 = Mons$Object$set_eff$(Mons$Effect$clear, _adve_obj$12);
                var _game$16 = Mons$Skill$update_mon_obj$(_adve_obj$15, _adve_obj$15, _pos$3, _adve_idx$2, _game$14);
                var $2644 = _game$16;
                var $2638 = $2644;
                break;
        };
        return $2638;
    };
    const Mons$Skill$clear_after_battle = x0 => x1 => x2 => x3 => Mons$Skill$clear_after_battle$(x0, x1, x2, x3);

    function Mons$Object$set_cap$(_cap$1, _obj$2) {
        var self = _obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $2646 = self.kin;
                var $2647 = self.dir;
                var $2648 = self.pad;
                var $2649 = self.ani;
                var $2650 = self.dmg;
                var $2651 = self.bag;
                var $2652 = self.mon;
                var $2653 = self.bos;
                var $2654 = self.cap;
                var $2655 = self.idl;
                var $2656 = self.eff;
                var $2657 = Mons$Object$new$($2646, $2647, $2648, $2649, $2650, $2651, $2652, $2653, _cap$1, $2655, $2656);
                var $2645 = $2657;
                break;
        };
        return $2645;
    };
    const Mons$Object$set_cap = x0 => x1 => Mons$Object$set_cap$(x0, x1);

    function Mons$Object$add_defeated_mon$(_obj$1, _hero$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2659 = self.kin;
                var $2660 = self.dir;
                var $2661 = self.pad;
                var $2662 = self.ani;
                var $2663 = self.dmg;
                var $2664 = self.bag;
                var $2665 = self.mon;
                var $2666 = self.bos;
                var $2667 = self.cap;
                var $2668 = self.idl;
                var $2669 = self.eff;
                var self = _hero$2;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $2671 = self.kin;
                        var $2672 = self.dir;
                        var $2673 = self.pad;
                        var $2674 = self.ani;
                        var $2675 = self.dmg;
                        var $2676 = self.bag;
                        var $2677 = self.mon;
                        var $2678 = self.bos;
                        var $2679 = self.cap;
                        var $2680 = self.idl;
                        var $2681 = self.eff;
                        var self = $2659;
                        switch (self._) {
                            case 'Mons.Kind.Mons':
                                var $2683 = self.ele;
                                var $2684 = self.boss;
                                var $2685 = self.pri_type;
                                var $2686 = self.agi;
                                var _qtd_mons$29 = Pair$fst$($2679);
                                var _mons_defeated$30 = Pair$snd$($2679);
                                var _new_cap$31 = Pair$new$(_qtd_mons$29, List$append$(_mons_defeated$30, _obj$1));
                                var $2687 = Mons$Object$set_cap$(_new_cap$31, _hero$2);
                                var $2682 = $2687;
                                break;
                            case 'Mons.Kind.Const':
                                var $2688 = self.ele;
                                var $2689 = _hero$2;
                                var $2682 = $2689;
                                break;
                            case 'Mons.Kind.Terrain':
                                var $2690 = self.ele;
                                var $2691 = _hero$2;
                                var $2682 = $2691;
                                break;
                            case 'Mons.Kind.Interactive':
                                var $2692 = self.ele;
                                var $2693 = self.on;
                                var $2694 = self.eff;
                                var $2695 = _hero$2;
                                var $2682 = $2695;
                                break;
                        };
                        var $2670 = $2682;
                        break;
                };
                var $2658 = $2670;
                break;
        };
        return $2658;
    };
    const Mons$Object$add_defeated_mon = x0 => x1 => Mons$Object$add_defeated_mon$(x0, x1);

    function Mons$Object$set_bos$(_bos$1, _obj$2) {
        var self = _obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $2697 = self.kin;
                var $2698 = self.dir;
                var $2699 = self.pad;
                var $2700 = self.ani;
                var $2701 = self.dmg;
                var $2702 = self.bag;
                var $2703 = self.mon;
                var $2704 = self.bos;
                var $2705 = self.cap;
                var $2706 = self.idl;
                var $2707 = self.eff;
                var $2708 = Mons$Object$new$($2697, $2698, $2699, $2700, $2701, $2702, $2703, _bos$1, $2705, $2706, $2707);
                var $2696 = $2708;
                break;
        };
        return $2696;
    };
    const Mons$Object$set_bos = x0 => x1 => Mons$Object$set_bos$(x0, x1);

    function Mons$Object$capture_boss$(_boss$1, _hero$2) {
        var self = _boss$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2710 = self.kin;
                var $2711 = self.dir;
                var $2712 = self.pad;
                var $2713 = self.ani;
                var $2714 = self.dmg;
                var $2715 = self.bag;
                var $2716 = self.mon;
                var $2717 = self.bos;
                var $2718 = self.cap;
                var $2719 = self.idl;
                var $2720 = self.eff;
                var self = _hero$2;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $2722 = self.kin;
                        var $2723 = self.dir;
                        var $2724 = self.pad;
                        var $2725 = self.ani;
                        var $2726 = self.dmg;
                        var $2727 = self.bag;
                        var $2728 = self.mon;
                        var $2729 = self.bos;
                        var $2730 = self.cap;
                        var $2731 = self.idl;
                        var $2732 = self.eff;
                        var self = $2710;
                        switch (self._) {
                            case 'Mons.Kind.Mons':
                                var $2734 = self.ele;
                                var $2735 = self.boss;
                                var $2736 = self.pri_type;
                                var $2737 = self.agi;
                                var _new_boss_bag$29 = List$append$($2729, _boss$1);
                                var $2738 = Mons$Object$set_bos$(_new_boss_bag$29, _hero$2);
                                var $2733 = $2738;
                                break;
                            case 'Mons.Kind.Const':
                                var $2739 = self.ele;
                                var $2740 = _hero$2;
                                var $2733 = $2740;
                                break;
                            case 'Mons.Kind.Terrain':
                                var $2741 = self.ele;
                                var $2742 = _hero$2;
                                var $2733 = $2742;
                                break;
                            case 'Mons.Kind.Interactive':
                                var $2743 = self.ele;
                                var $2744 = self.on;
                                var $2745 = self.eff;
                                var $2746 = _hero$2;
                                var $2733 = $2746;
                                break;
                        };
                        var $2721 = $2733;
                        break;
                };
                var $2709 = $2721;
                break;
        };
        return $2709;
    };
    const Mons$Object$capture_boss = x0 => x1 => Mons$Object$capture_boss$(x0, x1);

    function Mons$Game$delete_adve_obj$(_adve_obj$1, _hero_obj$2, _pos$3, _hero_idx$4, _adve_idx$5, _game$6) {
        var _game$7 = Mons$Game$map_del$(_pos$3, _adve_idx$5, _game$6);
        var _game$8 = Mons$Game$map_set$(_pos$3, _hero_idx$4, _hero_obj$2, _game$7);
        var $2747 = Mons$Game$set_stt$(Mons$Screen$game$(46, Mons$Turn$empty), _game$8);
        return $2747;
    };
    const Mons$Game$delete_adve_obj = x0 => x1 => x2 => x3 => x4 => x5 => Mons$Game$delete_adve_obj$(x0, x1, x2, x3, x4, x5);

    function Mons$Object$is_full_bag$(_obj$1) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2749 = self.kin;
                var $2750 = self.dir;
                var $2751 = self.pad;
                var $2752 = self.ani;
                var $2753 = self.dmg;
                var $2754 = self.bag;
                var $2755 = self.mon;
                var $2756 = self.bos;
                var $2757 = self.cap;
                var $2758 = self.idl;
                var $2759 = self.eff;
                var _len$13 = (list_length($2754));
                var $2760 = (_len$13 === 3n);
                var $2748 = $2760;
                break;
        };
        return $2748;
    };
    const Mons$Object$is_full_bag = x0 => Mons$Object$is_full_bag$(x0);

    function Mons$Screen$capture_mon$(_idx$1, _full_bag$2) {
        var $2761 = ({
            _: 'Mons.Screen.capture_mon',
            'idx': _idx$1,
            'full_bag': _full_bag$2
        });
        return $2761;
    };
    const Mons$Screen$capture_mon = x0 => x1 => Mons$Screen$capture_mon$(x0, x1);

    function Mons$Kind$get_pos$(_kin$1) {
        var self = Mons$Kind$attr$(_kin$1);
        switch (self._) {
            case 'Mons.Attr.new':
                var $2763 = self.blocks;
                var $2764 = self.mhp;
                var $2765 = self.atk;
                var $2766 = self.name;
                var $2767 = self.wlk;
                var $2768 = self.idl;
                var $2769 = self.pic;
                var $2770 = self.battle_spr;
                var $2771 = self.skills;
                var $2772 = self.pos;
                var $2773 = $2772;
                var $2762 = $2773;
                break;
        };
        return $2762;
    };
    const Mons$Kind$get_pos = x0 => Mons$Kind$get_pos$(x0);

    function Mons$Game$add_mon$(_kind_mon$1, _agi$2, _type$3, _game$4) {
        var $2774 = Mons$Game$move_obj$(Mons$global_scr_mid, 0, Mons$Kind$get_pos$(Mons$Kind$Mons$(_kind_mon$1, Bool$false, _type$3, _agi$2)), Mons$Object$new_of_kind$(Mons$Kind$Mons$(_kind_mon$1, Bool$false, _type$3, _agi$2)), _game$4);
        return $2774;
    };
    const Mons$Game$add_mon = x0 => x1 => x2 => x3 => Mons$Game$add_mon$(x0, x1, x2, x3);

    function List$delete_at$(_idx$2, _list$3) {
        var self = _idx$2;
        if (self === 0n) {
            var $2776 = List$tail$(_list$3);
            var $2775 = $2776;
        } else {
            var $2777 = (self - 1n);
            var self = _list$3;
            switch (self._) {
                case 'List.nil':
                    var $2779 = _list$3;
                    var $2778 = $2779;
                    break;
                case 'List.cons':
                    var $2780 = self.head;
                    var $2781 = self.tail;
                    var $2782 = List$cons$($2780, List$delete_at$($2777, $2781));
                    var $2778 = $2782;
                    break;
            };
            var $2775 = $2778;
        };
        return $2775;
    };
    const List$delete_at = x0 => x1 => List$delete_at$(x0, x1);

    function Mons$Object$delete_from_bag$(_idx$1, _hero_obj$2) {
        var _idx_nat$3 = U32$to_nat$(_idx$1);
        var self = _hero_obj$2;
        switch (self._) {
            case 'Mons.Object.new':
                var $2784 = self.kin;
                var $2785 = self.dir;
                var $2786 = self.pad;
                var $2787 = self.ani;
                var $2788 = self.dmg;
                var $2789 = self.bag;
                var $2790 = self.mon;
                var $2791 = self.bos;
                var $2792 = self.cap;
                var $2793 = self.idl;
                var $2794 = self.eff;
                var _qtd$15 = (list_length($2789));
                var self = (_qtd$15 === 0n);
                if (self) {
                    var $2796 = _hero_obj$2;
                    var $2795 = $2796;
                } else {
                    var _new_bag$16 = List$delete_at$(_idx_nat$3, $2789);
                    var _hero_obj$17 = Mons$Object$set_bag$(_new_bag$16, _hero_obj$2);
                    var $2797 = Mons$Object$set_mon$(0, _hero_obj$17);
                    var $2795 = $2797;
                };
                var $2783 = $2795;
                break;
        };
        return $2783;
    };
    const Mons$Object$delete_from_bag = x0 => x1 => Mons$Object$delete_from_bag$(x0, x1);
    const Mons$Screen$game_over = ({
        _: 'Mons.Screen.game_over'
    });

    function Mons$Turn$is_last_player_move$(_turn$1) {
        var self = _turn$1;
        switch (self._) {
            case 'Mons.Turn.new':
                var $2799 = self.exec_hero;
                var $2800 = self.hero_skill;
                var $2801 = self.adve_skill;
                var $2802 = self.play;
                var $2803 = ($2802 === 1);
                var $2798 = $2803;
                break;
        };
        return $2798;
    };
    const Mons$Turn$is_last_player_move = x0 => Mons$Turn$is_last_player_move$(x0);

    function Mons$Turn$hero_run$(_turn$1) {
        var self = _turn$1;
        switch (self._) {
            case 'Mons.Turn.new':
                var $2805 = self.exec_hero;
                var $2806 = self.hero_skill;
                var $2807 = self.adve_skill;
                var $2808 = self.play;
                var $2809 = ($2808 === 5);
                var $2804 = $2809;
                break;
        };
        return $2804;
    };
    const Mons$Turn$hero_run = x0 => Mons$Turn$hero_run$(x0);

    function Mons$Effect$upd_end_turn_eff$(_eff$1) {
        var self = _eff$1;
        switch (self._) {
            case 'Mons.Effect.new':
                var $2811 = self.sleep;
                var $2812 = self.burn;
                var $2813 = self.protect;
                var $2814 = self.minimize;
                var $2815 = self.invulnerable;
                var $2816 = self.hit;
                var $2817 = self.poison;
                var $2818 = self.swap_agi;
                var _sleep_turn$10 = Pair$fst$($2811);
                var _protect_turn$11 = Pair$fst$($2813);
                var _minimize_turn$12 = Pair$fst$($2814);
                var _invulnerable$13 = Pair$fst$($2815);
                var _update_turn_counter$14 = (_val$14 => {
                    var $2820 = Pair$new$((Math.max(_val$14 - 1, 0)), (_val$14 === 2));
                    return $2820;
                });
                var $2819 = Mons$Effect$new$(_update_turn_counter$14(_sleep_turn$10), $2812, _update_turn_counter$14(_protect_turn$11), _update_turn_counter$14(_minimize_turn$12), (() => {
                    var self = _invulnerable$13;
                    if (self) {
                        var $2821 = Pair$new$(Bool$false, Bool$true);
                        return $2821;
                    } else {
                        var $2822 = Pair$new$(Bool$false, Bool$false);
                        return $2822;
                    };
                })(), $2816, $2817, $2818);
                var $2810 = $2819;
                break;
        };
        return $2810;
    };
    const Mons$Effect$upd_end_turn_eff = x0 => Mons$Effect$upd_end_turn_eff$(x0);

    function Mons$Skill$apply_end_turn_eff$(_hero_idx$1, _adve_idx$2, _pos$3, _game$4) {
        var self = _game$4;
        switch (self._) {
            case 'Mons.Game.new':
                var $2824 = self.usr;
                var $2825 = self.pos;
                var $2826 = self.map;
                var $2827 = self.stt;
                var $2828 = self.tik;
                var _hero_obj$10 = Mons$Map$get$(_pos$3, _hero_idx$1, $2826);
                var _hero_mon_obj$11 = Mons$Object$get_current_mon$(_hero_obj$10);
                var _adve_obj$12 = Mons$Map$get$(_pos$3, _adve_idx$2, $2826);
                var self = _hero_mon_obj$11;
                switch (self._) {
                    case 'Mons.Object.new':
                        var $2830 = self.kin;
                        var $2831 = self.dir;
                        var $2832 = self.pad;
                        var $2833 = self.ani;
                        var $2834 = self.dmg;
                        var $2835 = self.bag;
                        var $2836 = self.mon;
                        var $2837 = self.bos;
                        var $2838 = self.cap;
                        var $2839 = self.idl;
                        var $2840 = self.eff;
                        var _eff_upd$24 = Mons$Effect$upd_end_turn_eff$($2840);
                        var _hero_mon_obj$25 = Mons$Object$set_eff$(_eff_upd$24, _hero_mon_obj$11);
                        var _game$26 = Mons$Skill$update_mon_obj$(_hero_obj$10, _hero_mon_obj$25, _pos$3, _hero_idx$1, _game$4);
                        var self = _adve_obj$12;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $2842 = self.kin;
                                var $2843 = self.dir;
                                var $2844 = self.pad;
                                var $2845 = self.ani;
                                var $2846 = self.dmg;
                                var $2847 = self.bag;
                                var $2848 = self.mon;
                                var $2849 = self.bos;
                                var $2850 = self.cap;
                                var $2851 = self.idl;
                                var $2852 = self.eff;
                                var _upd_effect$38 = Mons$Effect$upd_end_turn_eff$($2852);
                                var _adve_obj$39 = Mons$Object$set_eff$(_upd_effect$38, _adve_obj$12);
                                var _game$40 = Mons$Game$map_set$(_pos$3, _adve_idx$2, _adve_obj$39, _game$26);
                                var $2853 = _game$40;
                                var $2841 = $2853;
                                break;
                        };
                        var $2829 = $2841;
                        break;
                };
                var $2823 = $2829;
                break;
        };
        return $2823;
    };
    const Mons$Skill$apply_end_turn_eff = x0 => x1 => x2 => x3 => Mons$Skill$apply_end_turn_eff$(x0, x1, x2, x3);

    function Mons$Game$move_hero_down$(_usr$1, _hero_obj$2, _pos$3, _hero_idx$4, _game$5) {
        var _y$6 = (((_pos$3 >>> 12) & 0xFFF));
        var _x$7 = ((_pos$3 & 0xFFF));
        var _z$8 = ((_pos$3 >>> 24));
        var _new_pos$9 = ((0 | _x$7 | (((_y$6 + 1) >>> 0) << 12) | (_z$8 << 24)));
        var _game$10 = Mons$Game$move_obj$(_pos$3, _hero_idx$4, _new_pos$9, _hero_obj$2, _game$5);
        var $2854 = Mons$Game$set_user_pos$(_usr$1, _new_pos$9, _game$10);
        return $2854;
    };
    const Mons$Game$move_hero_down = x0 => x1 => x2 => x3 => x4 => Mons$Game$move_hero_down$(x0, x1, x2, x3, x4);
    const Mons$Kind$mons$ZOIO = ({
        _: 'Mons.Kind.mons.ZOIO'
    });
    const Mons$Kind$mons$MIMIC = ({
        _: 'Mons.Kind.mons.MIMIC'
    });
    const Mons$Kind$mons$MIMIC2 = ({
        _: 'Mons.Kind.mons.MIMIC2'
    });
    const Mons$Kind$mons$CYCLOPE = ({
        _: 'Mons.Kind.mons.CYCLOPE'
    });
    const Mons$Kind$mons$TROWL = ({
        _: 'Mons.Kind.mons.TROWL'
    });
    const Mons$Kind$mons$EMERELDER2 = ({
        _: 'Mons.Kind.mons.EMERELDER2'
    });

    function Mons$Game$add_boss$(_kind_mon$1, _agi$2, _type$3, _game$4) {
        var $2855 = Mons$Game$move_obj$(Mons$global_scr_mid, 0, Mons$Kind$get_pos$(Mons$Kind$Mons$(_kind_mon$1, Bool$true, _type$3, _agi$2)), Mons$Object$new_of_kind$(Mons$Kind$Mons$(_kind_mon$1, Bool$true, _type$3, _agi$2)), _game$4);
        return $2855;
    };
    const Mons$Game$add_boss = x0 => x1 => x2 => x3 => Mons$Game$add_boss$(x0, x1, x2, x3);
    const Mons$Kind$mons$BEHOLDER = ({
        _: 'Mons.Kind.mons.BEHOLDER'
    });

    function Mons$Game$add_mons_to_map$(_pos$1, _game$2) {
        var _lvl$3 = ((_pos$1 >>> 24));
        var self = (_lvl$3 === 1);
        if (self) {
            var _type$4 = Mons$Type$normal;
            var _game$5 = Mons$Game$add_mon$(Mons$Kind$mons$ZOIO, 2, _type$4, _game$2);
            var _game$6 = Mons$Game$add_mon$(Mons$Kind$mons$MIMIC, 0, _type$4, _game$5);
            var _game$7 = Mons$Game$add_mon$(Mons$Kind$mons$MIMIC2, 0, _type$4, _game$6);
            var _game$8 = Mons$Game$add_mon$(Mons$Kind$mons$POISOLICK, 2, _type$4, _game$7);
            var _game$9 = Mons$Game$add_mon$(Mons$Kind$mons$AZULA, 1, _type$4, _game$8);
            var _game$10 = Mons$Game$add_mon$(Mons$Kind$mons$CYCLOPE, 2, _type$4, _game$9);
            var _game$11 = Mons$Game$add_mon$(Mons$Kind$mons$TROWL, 0, _type$4, _game$10);
            var _game$12 = Mons$Game$add_mon$(Mons$Kind$mons$EMERELDER, 2, _type$4, _game$11);
            var _game$13 = Mons$Game$add_mon$(Mons$Kind$mons$EMERELDER2, 2, _type$4, _game$12);
            var $2857 = _game$13;
            var $2856 = $2857;
        } else {
            var self = (_lvl$3 === 2);
            if (self) {
                var $2859 = Mons$Game$add_boss$(Mons$Kind$mons$BEHOLDER, 2, Mons$Type$normal, _game$2);
                var $2858 = $2859;
            } else {
                var $2860 = _game$2;
                var $2858 = $2860;
            };
            var $2856 = $2858;
        };
        return $2856;
    };
    const Mons$Game$add_mons_to_map = x0 => x1 => Mons$Game$add_mons_to_map$(x0, x1);

    function Mons$Game$hero_inital_position$(_usr$1, _hero_obj$2, _pos$3, _hero_idx$4, _game$5) {
        var _x$6 = ((Mons$global_scr_mid & 0xFFF));
        var _y$7 = (((Mons$global_scr_mid >>> 12) & 0xFFF));
        var _z$8 = ((_pos$3 >>> 24));
        var self = (_z$8 === 0);
        if (self) {
            var _new_pos$9 = ((0 | _x$6 | (((_y$7 + 12) >>> 0) << 12) | (0 << 24)));
            var _game$10 = Mons$Game$move_obj$(_pos$3, _hero_idx$4, _new_pos$9, _hero_obj$2, _game$5);
            var $2862 = Mons$Game$set_user_pos$(_usr$1, _new_pos$9, _game$10);
            var $2861 = $2862;
        } else {
            var self = (_z$8 === 1);
            if (self) {
                var $2864 = ((0 | _x$6 | (((_y$7 + 38) >>> 0) << 12) | (1 << 24)));
                var _new_pos$9 = $2864;
            } else {
                var self = (_z$8 === 2);
                if (self) {
                    var $2866 = ((0 | _x$6 | (((_y$7 + 5) >>> 0) << 12) | (2 << 24)));
                    var $2865 = $2866;
                } else {
                    var $2867 = _pos$3;
                    var $2865 = $2867;
                };
                var _new_pos$9 = $2865;
            };
            var _game$10 = Mons$Game$move_obj$(Mons$global_scr_mid, _hero_idx$4, _new_pos$9, _hero_obj$2, _game$5);
            var _game$11 = Mons$Game$set_user_pos$(_usr$1, _new_pos$9, _game$10);
            var $2863 = Mons$Game$add_mons_to_map$(_new_pos$9, _game$11);
            var $2861 = $2863;
        };
        return $2861;
    };
    const Mons$Game$hero_inital_position = x0 => x1 => x2 => x3 => x4 => Mons$Game$hero_inital_position$(x0, x1, x2, x3, x4);

    function Mons$Object$get_adjacent_obj$(_pos$1, _dir$2, _map$3) {
        var _adjacent_pos$4 = Mons$Object$get_adjacent_pos$(_pos$1, _dir$2, _map$3);
        var $2868 = Mons$Map$get_top$(_adjacent_pos$4, _map$3);
        return $2868;
    };
    const Mons$Object$get_adjacent_obj = x0 => x1 => x2 => Mons$Object$get_adjacent_obj$(x0, x1, x2);

    function Mons$Object$hero_can_push_obj$(_pos$1, _dir$2, _map$3) {
        var self = Mons$Object$get_adjacent_obj$(_pos$1, _dir$2, _map$3);
        switch (self._) {
            case 'Mons.Object.new':
                var $2870 = self.kin;
                var $2871 = self.dir;
                var $2872 = self.pad;
                var $2873 = self.ani;
                var $2874 = self.dmg;
                var $2875 = self.bag;
                var $2876 = self.mon;
                var $2877 = self.bos;
                var $2878 = self.cap;
                var $2879 = self.idl;
                var $2880 = self.eff;
                var self = $2870;
                switch (self._) {
                    case 'Mons.Kind.Mons':
                        var $2882 = self.ele;
                        var $2883 = self.boss;
                        var $2884 = self.pri_type;
                        var $2885 = self.agi;
                        var $2886 = Bool$false;
                        var $2881 = $2886;
                        break;
                    case 'Mons.Kind.Const':
                        var $2887 = self.ele;
                        var $2888 = Bool$false;
                        var $2881 = $2888;
                        break;
                    case 'Mons.Kind.Terrain':
                        var $2889 = self.ele;
                        var $2890 = Bool$false;
                        var $2881 = $2890;
                        break;
                    case 'Mons.Kind.Interactive':
                        var $2891 = self.ele;
                        var $2892 = self.on;
                        var $2893 = self.eff;
                        var self = $2891;
                        switch (self._) {
                            case 'Mons.Kind.inter.LEVER':
                                var $2895 = self.id;
                                var $2896 = Bool$true;
                                var $2894 = $2896;
                                break;
                            case 'Mons.Kind.inter.MOVE':
                                var $2897 = Bool$true;
                                var $2894 = $2897;
                                break;
                            case 'Mons.Kind.inter.HEAL':
                                var $2898 = Bool$false;
                                var $2894 = $2898;
                                break;
                        };
                        var $2881 = $2894;
                        break;
                };
                var $2869 = $2881;
                break;
        };
        return $2869;
    };
    const Mons$Object$hero_can_push_obj = x0 => x1 => x2 => Mons$Object$hero_can_push_obj$(x0, x1, x2);

    function Mons$Kind$exec_eff$(_kind$1, _game$2) {
        var self = _kind$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $2900 = self.ele;
                var $2901 = self.boss;
                var $2902 = self.pri_type;
                var $2903 = self.agi;
                var $2904 = _game$2;
                var $2899 = $2904;
                break;
            case 'Mons.Kind.Const':
                var $2905 = self.ele;
                var $2906 = _game$2;
                var $2899 = $2906;
                break;
            case 'Mons.Kind.Terrain':
                var $2907 = self.ele;
                var $2908 = _game$2;
                var $2899 = $2908;
                break;
            case 'Mons.Kind.Interactive':
                var $2909 = self.ele;
                var $2910 = self.on;
                var $2911 = self.eff;
                var $2912 = $2911($2909)($2910)(_game$2);
                var $2899 = $2912;
                break;
        };
        return $2899;
    };
    const Mons$Kind$exec_eff = x0 => x1 => Mons$Kind$exec_eff$(x0, x1);

    function Mons$Object$set_kin$(_obj$1, _kin$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2914 = self.kin;
                var $2915 = self.dir;
                var $2916 = self.pad;
                var $2917 = self.ani;
                var $2918 = self.dmg;
                var $2919 = self.bag;
                var $2920 = self.mon;
                var $2921 = self.bos;
                var $2922 = self.cap;
                var $2923 = self.idl;
                var $2924 = self.eff;
                var $2925 = Mons$Object$new$(_kin$2, $2915, $2916, $2917, $2918, $2919, $2920, $2921, $2922, $2923, $2924);
                var $2913 = $2925;
                break;
        };
        return $2913;
    };
    const Mons$Object$set_kin = x0 => x1 => Mons$Object$set_kin$(x0, x1);

    function Mons$Object$update_interactive$(_obj$1, _fun$2) {
        var self = _obj$1;
        switch (self._) {
            case 'Mons.Object.new':
                var $2927 = self.kin;
                var $2928 = self.dir;
                var $2929 = self.pad;
                var $2930 = self.ani;
                var $2931 = self.dmg;
                var $2932 = self.bag;
                var $2933 = self.mon;
                var $2934 = self.bos;
                var $2935 = self.cap;
                var $2936 = self.idl;
                var $2937 = self.eff;
                var $2938 = Mons$Object$set_kin$(_obj$1, _fun$2($2927));
                var $2926 = $2938;
                break;
        };
        return $2926;
    };
    const Mons$Object$update_interactive = x0 => x1 => Mons$Object$update_interactive$(x0, x1);

    function Mons$Kind$set_on_interactive$(_kind$1) {
        var self = _kind$1;
        switch (self._) {
            case 'Mons.Kind.Mons':
                var $2940 = self.ele;
                var $2941 = self.boss;
                var $2942 = self.pri_type;
                var $2943 = self.agi;
                var $2944 = _kind$1;
                var $2939 = $2944;
                break;
            case 'Mons.Kind.Const':
                var $2945 = self.ele;
                var $2946 = _kind$1;
                var $2939 = $2946;
                break;
            case 'Mons.Kind.Terrain':
                var $2947 = self.ele;
                var $2948 = _kind$1;
                var $2939 = $2948;
                break;
            case 'Mons.Kind.Interactive':
                var $2949 = self.ele;
                var $2950 = self.on;
                var $2951 = self.eff;
                var $2952 = Mons$Kind$Interactive$($2949, Bool$true, $2951);
                var $2939 = $2952;
                break;
        };
        return $2939;
    };
    const Mons$Kind$set_on_interactive = x0 => Mons$Kind$set_on_interactive$(x0);

    function Mons$Game$cmd$(_cmd$1, _usr$2, _game$3) {
        var _pos$4 = Mons$Game$get_user_pos$(_usr$2, _game$3);
        var _set_stt_game$5 = (_game$5 => {
            var $2954 = Mons$Game$set_stt$(Mons$Screen$game$(46, Mons$Turn$empty), _game$5);
            return $2954;
        });
        var self = _pos$4;
        switch (self._) {
            case 'Maybe.none':
                var _pos$6 = ((0 | 2048 | (2048 << 12) | (0 << 24)));
                var _obj$7 = Mons$Object$hero;
                var _game$8 = Mons$Game$map_push$(_pos$6, _obj$7, _game$3);
                var _game$9 = Mons$Game$set_user_pos$(_usr$2, _pos$6, _game$8);
                var $2955 = _game$9;
                var $2953 = $2955;
                break;
            case 'Maybe.some':
                var $2956 = self.value;
                var self = _game$3;
                switch (self._) {
                    case 'Mons.Game.new':
                        var $2958 = self.usr;
                        var $2959 = self.pos;
                        var $2960 = self.map;
                        var $2961 = self.stt;
                        var $2962 = self.tik;
                        var _pos$12 = $2956;
                        var _hero_pair$13 = Mons$Map$get_hero$(_pos$12, $2960);
                        var _hero_obj$14 = Pair$fst$(_hero_pair$13);
                        var _hero_idx$15 = Pair$snd$(_hero_pair$13);
                        var _adve_idx$16 = 1;
                        var _adve_obj$17 = Mons$Map$get$(_pos$12, _adve_idx$16, $2960);
                        var _is_battling$18 = Mons$Object$is_battling$(_adve_obj$17, _hero_obj$14);
                        var _end_battle$19 = Mons$Object$ended_battle$(_adve_obj$17, _hero_obj$14);
                        var _curr_mon$20 = Mons$Object$get_current_mon$(_hero_obj$14);
                        var self = _curr_mon$20;
                        switch (self._) {
                            case 'Mons.Object.new':
                                var $2964 = self.kin;
                                var $2965 = self.dir;
                                var $2966 = self.pad;
                                var $2967 = self.ani;
                                var $2968 = self.dmg;
                                var $2969 = self.bag;
                                var $2970 = self.mon;
                                var $2971 = self.bos;
                                var $2972 = self.cap;
                                var $2973 = self.idl;
                                var $2974 = self.eff;
                                var _skills$32 = Mons$Kind$get_skills$($2964);
                                var self = _hero_obj$14;
                                switch (self._) {
                                    case 'Mons.Object.new':
                                        var $2976 = self.kin;
                                        var $2977 = self.dir;
                                        var $2978 = self.pad;
                                        var $2979 = self.ani;
                                        var $2980 = self.dmg;
                                        var $2981 = self.bag;
                                        var $2982 = self.mon;
                                        var $2983 = self.bos;
                                        var $2984 = self.cap;
                                        var $2985 = self.idl;
                                        var $2986 = self.eff;
                                        var self = _adve_obj$17;
                                        switch (self._) {
                                            case 'Mons.Object.new':
                                                var $2988 = self.kin;
                                                var $2989 = self.dir;
                                                var $2990 = self.pad;
                                                var $2991 = self.ani;
                                                var $2992 = self.dmg;
                                                var $2993 = self.bag;
                                                var $2994 = self.mon;
                                                var $2995 = self.bos;
                                                var $2996 = self.cap;
                                                var $2997 = self.idl;
                                                var $2998 = self.eff;
                                                var self = $2961;
                                                switch (self._) {
                                                    case 'Mons.Screen.welcome':
                                                        var $3000 = self.idx;
                                                        var self = ((_cmd$1 === 99) || (_cmd$1 === 67));
                                                        if (self) {
                                                            var self = ($3000 === 0);
                                                            if (self) {
                                                                var $3003 = Mons$Game$set_stt$(Mons$Screen$introduction$(0), _game$3);
                                                                var $3002 = $3003;
                                                            } else {
                                                                var $3004 = Mons$Game$set_stt$(Mons$Screen$credits, _game$3);
                                                                var $3002 = $3004;
                                                            };
                                                            var $3001 = $3002;
                                                        } else {
                                                            var self = ((_cmd$1 === 119) || (_cmd$1 === 87));
                                                            if (self) {
                                                                var $3006 = Mons$Game$set_stt$(Mons$Screen$welcome$(0), _game$3);
                                                                var $3005 = $3006;
                                                            } else {
                                                                var self = ((_cmd$1 === 115) || (_cmd$1 === 83));
                                                                if (self) {
                                                                    var $3008 = Mons$Game$set_stt$(Mons$Screen$welcome$(1), _game$3);
                                                                    var $3007 = $3008;
                                                                } else {
                                                                    var $3009 = _game$3;
                                                                    var $3007 = $3009;
                                                                };
                                                                var $3005 = $3007;
                                                            };
                                                            var $3001 = $3005;
                                                        };
                                                        var $2999 = $3001;
                                                        break;
                                                    case 'Mons.Screen.credits':
                                                        var self = ((_cmd$1 === 122) || (_cmd$1 === 90));
                                                        if (self) {
                                                            var $3011 = Mons$Game$set_stt$(Mons$Screen$welcome$(0), _game$3);
                                                            var $3010 = $3011;
                                                        } else {
                                                            var $3012 = _game$3;
                                                            var $3010 = $3012;
                                                        };
                                                        var $2999 = $3010;
                                                        break;
                                                    case 'Mons.Screen.introduction':
                                                        var $3013 = self.step;
                                                        var _can_walk$56 = ($3013 === 0);
                                                        var self = (_can_walk$56 && Mons$is_walk_cmd$(_cmd$1));
                                                        if (self) {
                                                            var $3015 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                            var $3014 = $3015;
                                                        } else {
                                                            var self = ((_cmd$1 === 99) && Mons$Kind$is_mage$($2988));
                                                            if (self) {
                                                                var self = ($3013 === 0);
                                                                if (self) {
                                                                    var _game$57 = Mons$initial_mons$(_hero_obj$14, _pos$12, 0, _game$3);
                                                                    var $3018 = Mons$Game$set_stt$(Mons$Screen$introduction$(1), _game$57);
                                                                    var $3017 = $3018;
                                                                } else {
                                                                    var self = ($3013 === 1);
                                                                    if (self) {
                                                                        var $3020 = Mons$Game$set_stt$(Mons$Screen$intro_select$(0), _game$3);
                                                                        var $3019 = $3020;
                                                                    } else {
                                                                        var self = ($3013 === 2);
                                                                        if (self) {
                                                                            var _game$57 = Mons$Game$map_del$(_pos$12, _adve_idx$16, _game$3);
                                                                            var _hero_obj$58 = Mons$Object$delete_init_mons$(_hero_obj$14);
                                                                            var _game$59 = Mons$Game$map_set$(_pos$12, _hero_idx$15, _hero_obj$58, _game$57);
                                                                            var $3022 = Mons$Game$set_stt$(Mons$Screen$game$(46, Mons$Turn$empty), _game$59);
                                                                            var $3021 = $3022;
                                                                        } else {
                                                                            var $3023 = Mons$Game$set_stt$(Mons$Screen$game$(46, Mons$Turn$empty), _game$3);
                                                                            var $3021 = $3023;
                                                                        };
                                                                        var $3019 = $3021;
                                                                    };
                                                                    var $3017 = $3019;
                                                                };
                                                                var $3016 = $3017;
                                                            } else {
                                                                var $3024 = _game$3;
                                                                var $3016 = $3024;
                                                            };
                                                            var $3014 = $3016;
                                                        };
                                                        var $2999 = $3014;
                                                        break;
                                                    case 'Mons.Screen.intro_select':
                                                        var $3025 = self.idx;
                                                        var self = (_cmd$1 === 99);
                                                        if (self) {
                                                            var $3027 = Mons$Game$set_stt$(Mons$Screen$introduction$(2), _game$3);
                                                            var $3026 = $3027;
                                                        } else {
                                                            var $3028 = _game$3;
                                                            var $3026 = $3028;
                                                        };
                                                        var $2999 = $3026;
                                                        break;
                                                    case 'Mons.Screen.game':
                                                        var $3029 = self.cmd;
                                                        var $3030 = self.turn;
                                                        var self = (_cmd$1 === 85);
                                                        if (self) {
                                                            var $3032 = Mons$Game$exec_turn$(_hero_obj$14, _adve_obj$17, _pos$12, _hero_idx$15, _adve_idx$16, 0n, $3030, _game$3);
                                                            var $3031 = $3032;
                                                        } else {
                                                            var self = (_cmd$1 === 73);
                                                            if (self) {
                                                                var $3034 = Mons$Game$exec_turn$(_hero_obj$14, _adve_obj$17, _pos$12, _hero_idx$15, _adve_idx$16, 1n, $3030, _game$3);
                                                                var $3033 = $3034;
                                                            } else {
                                                                var self = (_cmd$1 === 74);
                                                                if (self) {
                                                                    var $3036 = Mons$Game$exec_turn$(_hero_obj$14, _adve_obj$17, _pos$12, _hero_idx$15, _adve_idx$16, 2n, $3030, _game$3);
                                                                    var $3035 = $3036;
                                                                } else {
                                                                    var self = (_cmd$1 === 75);
                                                                    if (self) {
                                                                        var $3038 = Mons$Game$exec_turn$(_hero_obj$14, _adve_obj$17, _pos$12, _hero_idx$15, _adve_idx$16, 3n, $3030, _game$3);
                                                                        var $3037 = $3038;
                                                                    } else {
                                                                        var self = (_cmd$1 === 82);
                                                                        if (self) {
                                                                            var $3040 = Mons$Game$exec_turn$(_hero_obj$14, _adve_obj$17, _pos$12, _hero_idx$15, _adve_idx$16, 4n, $3030, _game$3);
                                                                            var $3039 = $3040;
                                                                        } else {
                                                                            var self = Mons$is_walk_cmd$(_cmd$1);
                                                                            if (self) {
                                                                                var self = Mons$Kind$is_mon_area$($2988);
                                                                                if (self) {
                                                                                    var _adve_pos$57 = Mons$Kind$area_mon_pos$($2988, _pos$12);
                                                                                    var _mon_area_obj$58 = Mons$Map$get$(_adve_pos$57, 0, $2960);
                                                                                    var self = _mon_area_obj$58;
                                                                                    switch (self._) {
                                                                                        case 'Mons.Object.new':
                                                                                            var $3044 = self.kin;
                                                                                            var $3045 = self.dir;
                                                                                            var $3046 = self.pad;
                                                                                            var $3047 = self.ani;
                                                                                            var $3048 = self.dmg;
                                                                                            var $3049 = self.bag;
                                                                                            var $3050 = self.mon;
                                                                                            var $3051 = self.bos;
                                                                                            var $3052 = self.cap;
                                                                                            var $3053 = self.idl;
                                                                                            var $3054 = self.eff;
                                                                                            var self = $3044;
                                                                                            switch (self._) {
                                                                                                case 'Mons.Kind.Mons':
                                                                                                    var $3056 = self.ele;
                                                                                                    var $3057 = self.boss;
                                                                                                    var $3058 = self.pri_type;
                                                                                                    var $3059 = self.agi;
                                                                                                    var _game$74 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                                                                    var self = ($2979 === 0);
                                                                                                    if (self) {
                                                                                                        var _game$75 = Mons$Game$move_obj$(_adve_pos$57, 0, _pos$12, _mon_area_obj$58, _game$74);
                                                                                                        var _game$76 = Mons$Game$move_obj$(_pos$12, 1, _pos$12, _hero_obj$14, _game$75);
                                                                                                        var $3061 = Mons$Game$set_user_pos$($2958, _pos$12, _game$76);
                                                                                                        var $3060 = $3061;
                                                                                                    } else {
                                                                                                        var $3062 = _game$74;
                                                                                                        var $3060 = $3062;
                                                                                                    };
                                                                                                    var $3055 = $3060;
                                                                                                    break;
                                                                                                case 'Mons.Kind.Const':
                                                                                                    var $3063 = self.ele;
                                                                                                    var $3064 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                                                                    var $3055 = $3064;
                                                                                                    break;
                                                                                                case 'Mons.Kind.Terrain':
                                                                                                    var $3065 = self.ele;
                                                                                                    var $3066 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                                                                    var $3055 = $3066;
                                                                                                    break;
                                                                                                case 'Mons.Kind.Interactive':
                                                                                                    var $3067 = self.ele;
                                                                                                    var $3068 = self.on;
                                                                                                    var $3069 = self.eff;
                                                                                                    var $3070 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                                                                    var $3055 = $3070;
                                                                                                    break;
                                                                                            };
                                                                                            var $3043 = $3055;
                                                                                            break;
                                                                                    };
                                                                                    var $3042 = $3043;
                                                                                } else {
                                                                                    var self = (Mons$Object$is_battling$(_adve_obj$17, _hero_obj$14) && (!Mons$Kind$is_mage$($2988)));
                                                                                    if (self) {
                                                                                        var self = ($2979 === 0);
                                                                                        if (self) {
                                                                                            var $3073 = Mons$Game$move_obj$(_pos$12, 0, _pos$12, _hero_obj$14, _game$3);
                                                                                            var $3072 = $3073;
                                                                                        } else {
                                                                                            var $3074 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                                                            var $3072 = $3074;
                                                                                        };
                                                                                        var $3071 = $3072;
                                                                                    } else {
                                                                                        var $3075 = Mons$Game$walk$(_cmd$1, _pos$12, _hero_idx$15, _game$3);
                                                                                        var $3071 = $3075;
                                                                                    };
                                                                                    var $3042 = $3071;
                                                                                };
                                                                                var $3041 = $3042;
                                                                            } else {
                                                                                var self = (_cmd$1 === 101);
                                                                                if (self) {
                                                                                    var self = (_is_battling$18 || _end_battle$19);
                                                                                    if (self) {
                                                                                        var $3078 = _game$3;
                                                                                        var $3077 = $3078;
                                                                                    } else {
                                                                                        var $3079 = Mons$Game$set_stt$(Mons$Screen$inventory$(0), _game$3);
                                                                                        var $3077 = $3079;
                                                                                    };
                                                                                    var $3076 = $3077;
                                                                                } else {
                                                                                    var self = (_cmd$1 === 99);
                                                                                    if (self) {
                                                                                        var self = $2988;
                                                                                        switch (self._) {
                                                                                            case 'Mons.Kind.Mons':
                                                                                                var $3082 = self.ele;
                                                                                                var $3083 = self.boss;
                                                                                                var $3084 = self.pri_type;
                                                                                                var $3085 = self.agi;
                                                                                                var self = Mons$Object$is_obj_defeated$(_adve_obj$17);
                                                                                                if (self) {
                                                                                                    var _game$61 = Mons$Skill$clear_after_battle$(_hero_idx$15, _adve_idx$16, _pos$12, _game$3);
                                                                                                    var _hero_obj$62 = Mons$Object$add_defeated_mon$(_adve_obj$17, _hero_obj$14);
                                                                                                    var self = $3083;
                                                                                                    if (self) {
                                                                                                        var _hero_obj$63 = Mons$Object$capture_boss$(_adve_obj$17, _hero_obj$62);
                                                                                                        var $3088 = Mons$Game$delete_adve_obj$(_adve_obj$17, _hero_obj$63, _pos$12, _hero_idx$15, _adve_idx$16, _game$61);
                                                                                                        var $3087 = $3088;
                                                                                                    } else {
                                                                                                        var self = Mons$Object$is_full_bag$(_hero_obj$62);
                                                                                                        if (self) {
                                                                                                            var _game$63 = Mons$Game$map_set$(_pos$12, _hero_idx$15, _hero_obj$62, _game$61);
                                                                                                            var $3090 = Mons$Game$set_stt$(Mons$Screen$capture_mon$(0, Bool$true), _game$63);
                                                                                                            var $3089 = $3090;
                                                                                                        } else {
                                                                                                            var _adve_obj$63 = Mons$Object$set_eff$(Mons$Effect$clear, _adve_obj$17);
                                                                                                            var _hero_obj$64 = Mons$Object$push_to_bag$(_adve_obj$63, _hero_obj$62);
                                                                                                            var $3091 = Mons$Game$delete_adve_obj$(_adve_obj$63, _hero_obj$64, _pos$12, _hero_idx$15, _adve_idx$16, _game$61);
                                                                                                            var $3089 = $3091;
                                                                                                        };
                                                                                                        var $3087 = $3089;
                                                                                                    };
                                                                                                    var $3086 = $3087;
                                                                                                } else {
                                                                                                    var self = Mons$Object$is_obj_defeated$(_curr_mon$20);
                                                                                                    if (self) {
                                                                                                        var _game$61 = Mons$Skill$clear_after_battle$(_hero_idx$15, _adve_idx$16, _pos$12, _game$3);
                                                                                                        var _game$62 = Mons$Game$add_mon$($3082, $3085, $3084, _game$61);
                                                                                                        var _hero_obj$63 = Mons$Object$delete_from_bag$($2982, _hero_obj$14);
                                                                                                        var _game$64 = Mons$Game$map_set$(_pos$12, _hero_idx$15, _hero_obj$63, _game$62);
                                                                                                        var self = ((list_length($2981)) === 0n);
                                                                                                        if (self) {
                                                                                                            var $3094 = Mons$Game$set_stt$(Mons$Screen$game_over, _game$64);
                                                                                                            var $3093 = $3094;
                                                                                                        } else {
                                                                                                            var _game$65 = Mons$Game$delete_adve_obj$(_adve_obj$17, _hero_obj$63, _pos$12, _hero_idx$15, _adve_idx$16, _game$64);
                                                                                                            var $3095 = _set_stt_game$5(_game$65);
                                                                                                            var $3093 = $3095;
                                                                                                        };
                                                                                                        var $3092 = $3093;
                                                                                                    } else {
                                                                                                        var self = $3030;
                                                                                                        switch (self._) {
                                                                                                            case 'Mons.Turn.new':
                                                                                                                var $3097 = self.exec_hero;
                                                                                                                var $3098 = self.hero_skill;
                                                                                                                var $3099 = self.adve_skill;
                                                                                                                var $3100 = self.play;
                                                                                                                var self = Mons$Turn$is_active$($3030);
                                                                                                                if (self) {
                                                                                                                    var self = (Mons$Turn$is_last_player_move$($3030) || Mons$Turn$hero_run$($3030));
                                                                                                                    if (self) {
                                                                                                                        var _game$65 = Mons$Skill$apply_end_turn_eff$(_hero_idx$15, _adve_idx$16, _pos$12, _game$3);
                                                                                                                        var self = Mons$Turn$hero_run$($3030);
                                                                                                                        if (self) {
                                                                                                                            var _game$66 = Mons$Skill$clear_after_battle$(_hero_idx$15, _adve_idx$16, _pos$12, _game$65);
                                                                                                                            var _game$67 = Mons$Game$move_obj$(_pos$12, _adve_idx$16, Mons$Kind$get_pos$($2988), _adve_obj$17, _game$66);
                                                                                                                            var _game$68 = Mons$Game$move_hero_down$($2958, _hero_obj$14, _pos$12, _hero_idx$15, _game$67);
                                                                                                                            var $3104 = _set_stt_game$5(_game$68);
                                                                                                                            var $3103 = $3104;
                                                                                                                        } else {
                                                                                                                            var $3105 = _set_stt_game$5(_game$65);
                                                                                                                            var $3103 = $3105;
                                                                                                                        };
                                                                                                                        var $3102 = $3103;
                                                                                                                    } else {
                                                                                                                        var _turn$65 = Mons$Turn$new$((!$3097), $3098, $3099, (Math.max($3100 - 1, 0)));
                                                                                                                        var $3106 = Mons$Game$set_stt$(Mons$Screen$game$(46, _turn$65), _game$3);
                                                                                                                        var $3102 = $3106;
                                                                                                                    };
                                                                                                                    var $3101 = $3102;
                                                                                                                } else {
                                                                                                                    var $3107 = _set_stt_game$5(_game$3);
                                                                                                                    var $3101 = $3107;
                                                                                                                };
                                                                                                                var $3096 = $3101;
                                                                                                                break;
                                                                                                        };
                                                                                                        var $3092 = $3096;
                                                                                                    };
                                                                                                    var $3086 = $3092;
                                                                                                };
                                                                                                var $3081 = $3086;
                                                                                                break;
                                                                                            case 'Mons.Kind.Const':
                                                                                                var $3108 = self.ele;
                                                                                                var self = Mons$Kind$is_portal$($2988);
                                                                                                if (self) {
                                                                                                    var _new_pos$58 = Pos32$add$(_pos$12, ((0 | 0 | (0 << 12) | (1 << 24))));
                                                                                                    var $3110 = Mons$Game$hero_inital_position$(_usr$2, _hero_obj$14, _new_pos$58, _hero_idx$15, _game$3);
                                                                                                    var $3109 = $3110;
                                                                                                } else {
                                                                                                    var $3111 = _game$3;
                                                                                                    var $3109 = $3111;
                                                                                                };
                                                                                                var $3081 = $3109;
                                                                                                break;
                                                                                            case 'Mons.Kind.Terrain':
                                                                                                var $3112 = self.ele;
                                                                                                var self = Mons$Object$hero_can_push_obj$(_pos$12, $2977, $2960);
                                                                                                if (self) {
                                                                                                    var _adjacent_obj$58 = Mons$Object$get_adjacent_obj$(_pos$12, $2977, $2960);
                                                                                                    var self = _adjacent_obj$58;
                                                                                                    switch (self._) {
                                                                                                        case 'Mons.Object.new':
                                                                                                            var $3115 = self.kin;
                                                                                                            var $3116 = self.dir;
                                                                                                            var $3117 = self.pad;
                                                                                                            var $3118 = self.ani;
                                                                                                            var $3119 = self.dmg;
                                                                                                            var $3120 = self.bag;
                                                                                                            var $3121 = self.mon;
                                                                                                            var $3122 = self.bos;
                                                                                                            var $3123 = self.cap;
                                                                                                            var $3124 = self.idl;
                                                                                                            var $3125 = self.eff;
                                                                                                            var $3126 = Mons$Kind$exec_eff$($3115, _game$3);
                                                                                                            var $3114 = $3126;
                                                                                                            break;
                                                                                                    };
                                                                                                    var $3113 = $3114;
                                                                                                } else {
                                                                                                    var $3127 = _set_stt_game$5(_game$3);
                                                                                                    var $3113 = $3127;
                                                                                                };
                                                                                                var $3081 = $3113;
                                                                                                break;
                                                                                            case 'Mons.Kind.Interactive':
                                                                                                var $3128 = self.ele;
                                                                                                var $3129 = self.on;
                                                                                                var $3130 = self.eff;
                                                                                                var _inter_obj$60 = Mons$Object$update_interactive$(_adve_obj$17, Mons$Kind$set_on_interactive);
                                                                                                var _game$61 = Mons$Game$map_set$(_pos$12, _adve_idx$16, _inter_obj$60, _game$3);
                                                                                                var self = _inter_obj$60;
                                                                                                switch (self._) {
                                                                                                    case 'Mons.Object.new':
                                                                                                        var $3132 = self.kin;
                                                                                                        var $3133 = self.dir;
                                                                                                        var $3134 = self.pad;
                                                                                                        var $3135 = self.ani;
                                                                                                        var $3136 = self.dmg;
                                                                                                        var $3137 = self.bag;
                                                                                                        var $3138 = self.mon;
                                                                                                        var $3139 = self.bos;
                                                                                                        var $3140 = self.cap;
                                                                                                        var $3141 = self.idl;
                                                                                                        var $3142 = self.eff;
                                                                                                        var $3143 = Mons$Kind$exec_eff$($3132, _game$61);
                                                                                                        var _game_eff_after_interact$60 = $3143;
                                                                                                        break;
                                                                                                };
                                                                                                var self = $3128;
                                                                                                switch (self._) {
                                                                                                    case 'Mons.Kind.inter.LEVER':
                                                                                                        var $3144 = self.id;
                                                                                                        var $3145 = _game_eff_after_interact$60;
                                                                                                        var $3131 = $3145;
                                                                                                        break;
                                                                                                    case 'Mons.Kind.inter.MOVE':
                                                                                                        var $3146 = _game_eff_after_interact$60;
                                                                                                        var $3131 = $3146;
                                                                                                        break;
                                                                                                    case 'Mons.Kind.inter.HEAL':
                                                                                                        var _game$61 = Mons$Kind$exec_eff$($2988, _game$3);
                                                                                                        var _inter_obj$62 = Mons$Object$update_interactive$(_adve_obj$17, Mons$Kind$set_on_interactive);
                                                                                                        var $3147 = Mons$Game$map_set$(_pos$12, _adve_idx$16, _inter_obj$62, _game$61);
                                                                                                        var $3131 = $3147;
                                                                                                        break;
                                                                                                };
                                                                                                var $3081 = $3131;
                                                                                                break;
                                                                                        };
                                                                                        var $3080 = $3081;
                                                                                    } else {
                                                                                        var self = (_cmd$1 === 122);
                                                                                        if (self) {
                                                                                            var self = $2988;
                                                                                            switch (self._) {
                                                                                                case 'Mons.Kind.Mons':
                                                                                                    var $3150 = self.ele;
                                                                                                    var $3151 = self.boss;
                                                                                                    var $3152 = self.pri_type;
                                                                                                    var $3153 = self.agi;
                                                                                                    var self = Mons$Object$is_obj_defeated$(_adve_obj$17);
                                                                                                    if (self) {
                                                                                                        var _hero_obj$61 = Mons$Object$add_defeated_mon$(_adve_obj$17, _hero_obj$14);
                                                                                                        var _game$62 = Mons$Game$map_del$(_pos$12, _adve_idx$16, _game$3);
                                                                                                        var _game$63 = Mons$Game$map_set$(_pos$12, _hero_idx$15, _hero_obj$61, _game$62);
                                                                                                        var $3155 = _set_stt_game$5(_game$63);
                                                                                                        var $3154 = $3155;
                                                                                                    } else {
                                                                                                        var $3156 = _game$3;
                                                                                                        var $3154 = $3156;
                                                                                                    };
                                                                                                    var $3149 = $3154;
                                                                                                    break;
                                                                                                case 'Mons.Kind.Const':
                                                                                                    var $3157 = self.ele;
                                                                                                    var $3158 = _set_stt_game$5(_game$3);
                                                                                                    var $3149 = $3158;
                                                                                                    break;
                                                                                                case 'Mons.Kind.Terrain':
                                                                                                    var $3159 = self.ele;
                                                                                                    var $3160 = _set_stt_game$5(_game$3);
                                                                                                    var $3149 = $3160;
                                                                                                    break;
                                                                                                case 'Mons.Kind.Interactive':
                                                                                                    var $3161 = self.ele;
                                                                                                    var $3162 = self.on;
                                                                                                    var $3163 = self.eff;
                                                                                                    var $3164 = _set_stt_game$5(_game$3);
                                                                                                    var $3149 = $3164;
                                                                                                    break;
                                                                                            };
                                                                                            var $3148 = $3149;
                                                                                        } else {
                                                                                            var $3165 = _game$3;
                                                                                            var $3148 = $3165;
                                                                                        };
                                                                                        var $3080 = $3148;
                                                                                    };
                                                                                    var $3076 = $3080;
                                                                                };
                                                                                var $3041 = $3076;
                                                                            };
                                                                            var $3039 = $3041;
                                                                        };
                                                                        var $3037 = $3039;
                                                                    };
                                                                    var $3035 = $3037;
                                                                };
                                                                var $3033 = $3035;
                                                            };
                                                            var $3031 = $3033;
                                                        };
                                                        var $2999 = $3031;
                                                        break;
                                                    case 'Mons.Screen.inventory':
                                                        var $3166 = self.idx;
                                                        var $3167 = _game$3;
                                                        var $2999 = $3167;
                                                        break;
                                                    case 'Mons.Screen.capture_mon':
                                                        var $3168 = self.idx;
                                                        var $3169 = self.full_bag;
                                                        var self = (_cmd$1 === 99);
                                                        if (self) {
                                                            var _hero_obj$57 = Mons$Object$delete_from_bag$($2982, _hero_obj$14);
                                                            var _hero_obj$58 = Mons$Object$push_to_bag$(_adve_obj$17, _hero_obj$57);
                                                            var _hero_obj$59 = Mons$Object$set_mon$(2, _hero_obj$58);
                                                            var _game$60 = Mons$Game$map_del$(_pos$12, _adve_idx$16, _game$3);
                                                            var _game$61 = Mons$Game$map_set$(_pos$12, _hero_idx$15, _hero_obj$59, _game$60);
                                                            var $3171 = _set_stt_game$5(_game$61);
                                                            var $3170 = $3171;
                                                        } else {
                                                            var self = (_cmd$1 === 122);
                                                            if (self) {
                                                                var self = Mons$Object$is_obj_defeated$(_adve_obj$17);
                                                                if (self) {
                                                                    var _game$57 = Mons$Game$map_del$(_pos$12, _adve_idx$16, _game$3);
                                                                    var _game$58 = Mons$Game$map_set$(_pos$12, _hero_idx$15, _hero_obj$14, _game$57);
                                                                    var $3174 = _set_stt_game$5(_game$58);
                                                                    var $3173 = $3174;
                                                                } else {
                                                                    var $3175 = _game$3;
                                                                    var $3173 = $3175;
                                                                };
                                                                var $3172 = $3173;
                                                            } else {
                                                                var $3176 = _game$3;
                                                                var $3172 = $3176;
                                                            };
                                                            var $3170 = $3172;
                                                        };
                                                        var $2999 = $3170;
                                                        break;
                                                    case 'Mons.Screen.game_over':
                                                        var $3177 = _game$3;
                                                        var $2999 = $3177;
                                                        break;
                                                };
                                                var $2987 = $2999;
                                                break;
                                        };
                                        var $2975 = $2987;
                                        break;
                                };
                                var $2963 = $2975;
                                break;
                        };
                        var $2957 = $2963;
                        break;
                };
                var $2953 = $2957;
                break;
        };
        return $2953;
    };
    const Mons$Game$cmd = x0 => x1 => x2 => Mons$Game$cmd$(x0, x1, x2);

    function App$new$(_init$2, _draw$3, _when$4) {
        var $3178 = ({
            _: 'App.new',
            'init': _init$2,
            'draw': _draw$3,
            'when': _when$4
        });
        return $3178;
    };
    const App$new = x0 => x1 => x2 => App$new$(x0, x1, x2);

    function Mons$start$(_online$1) {
        var _screen$2 = Image3D$alloc_capacity$(524288);
        var $3179 = App$new$((() => {
            var _game_usr$3 = Word$zero$(160n);
            var _game_pos$4 = Map$new;
            var _game_map$5 = Mons$Map$build$(Mons$map_source);
            var _game$6 = Mons$Game$new$(_game_usr$3, _game_pos$4, _game_map$5, Mons$Screen$welcome$(0), 0);
            var $3180 = _game$6;
            return $3180;
        })(), (_game$3 => {
            var $3181 = App$Render$pix$(Mons$draw$(_game$3, _screen$2));
            return $3181;
        }), (_event$3 => _game$4 => {
            var self = _online$1;
            if (self) {
                var self = _event$3;
                switch (self._) {
                    case 'App.Event.init':
                        var $3184 = self.time;
                        var $3185 = self.addr;
                        var $3186 = self.screen;
                        var $3187 = self.mouse;
                        var $3188 = List$cons$(App$Action$print$("Starting app."), List$cons$(App$Action$resize$(Mons$scr_w, Mons$scr_h), List$cons$(App$Action$state$(Mons$Game$set_usr$($3185, _game$4)), List$cons$(App$Action$watch$(Mons$App$room), List$cons$((() => {
                            var _chr$9 = Mons$Input$char$(Bool$true, 46);
                            var self = Mons$Input$serialize$(_chr$9);
                            switch (self._) {
                                case 'Maybe.none':
                                    var $3190 = App$Action$print$("");
                                    var $3189 = $3190;
                                    break;
                                case 'Maybe.some':
                                    var $3191 = self.value;
                                    var $3192 = App$Action$post$(Mons$App$room, $3191);
                                    var $3189 = $3192;
                                    break;
                            };
                            return $3189;
                        })(), List$nil)))));
                        var $3183 = $3188;
                        break;
                    case 'App.Event.tick':
                        var $3193 = self.time;
                        var $3194 = self.screen;
                        var $3195 = self.mouse;
                        var $3196 = List$cons$(App$Action$state$(Mons$Game$tick$(_game$4, $3193)), List$nil);
                        var $3183 = $3196;
                        break;
                    case 'App.Event.xkey':
                        var $3197 = self.time;
                        var $3198 = self.down;
                        var $3199 = self.code;
                        var _chr$8 = Mons$Input$char$($3198, $3199);
                        var self = Mons$Input$serialize$(_chr$8);
                        switch (self._) {
                            case 'Maybe.none':
                                var $3201 = List$nil;
                                var $3200 = $3201;
                                break;
                            case 'Maybe.some':
                                var $3202 = self.value;
                                var $3203 = List$cons$(App$Action$post$(Mons$App$room, $3202), List$nil);
                                var $3200 = $3203;
                                break;
                        };
                        var $3183 = $3200;
                        break;
                    case 'App.Event.post':
                        var $3204 = self.time;
                        var $3205 = self.room;
                        var $3206 = self.addr;
                        var $3207 = self.data;
                        var self = Mons$Input$deserialize$($3207);
                        switch (self._) {
                            case 'Maybe.none':
                                var $3209 = List$nil;
                                var $3208 = $3209;
                                break;
                            case 'Maybe.some':
                                var $3210 = self.value;
                                var $3211 = List$cons$((() => {
                                    var self = _game$4;
                                    switch (self._) {
                                        case 'Mons.Game.new':
                                            var $3212 = self.usr;
                                            var $3213 = self.pos;
                                            var $3214 = self.map;
                                            var $3215 = self.stt;
                                            var $3216 = self.tik;
                                            var $3217 = App$Action$state$(Mons$Game$cmd$($3210, $3206, _game$4));
                                            return $3217;
                                    };
                                })(), List$nil);
                                var $3208 = $3211;
                                break;
                        };
                        var $3183 = $3208;
                        break;
                };
                var $3182 = $3183;
            } else {
                var self = _event$3;
                switch (self._) {
                    case 'App.Event.init':
                        var $3219 = self.time;
                        var $3220 = self.addr;
                        var $3221 = self.screen;
                        var $3222 = self.mouse;
                        var $3223 = List$cons$(App$Action$resize$(Mons$scr_w, Mons$scr_h), List$cons$((() => {
                            var _game$9 = Mons$Game$set_usr$($3220, _game$4);
                            var _game$10 = Mons$Game$cmd$(100, $3220, _game$9);
                            var self = _game$10;
                            switch (self._) {
                                case 'Mons.Game.new':
                                    var $3225 = self.usr;
                                    var $3226 = self.pos;
                                    var $3227 = self.map;
                                    var $3228 = self.stt;
                                    var $3229 = self.tik;
                                    var self = Mons$Game$get_hero_pos$(_game$10);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            var $3231 = Mons$scr_mid;
                                            var _pos$16 = $3231;
                                            break;
                                        case 'Maybe.some':
                                            var $3232 = self.value;
                                            var $3233 = $3232;
                                            var _pos$16 = $3233;
                                            break;
                                    };
                                    var _hero_info$17 = Mons$Map$get_hero$(_pos$16, $3227);
                                    var _hero_obj$18 = Pair$fst$(_hero_info$17);
                                    var _hero_idx$19 = Pair$snd$(_hero_info$17);
                                    var _game$20 = Mons$Game$hero_inital_position$($3225, _hero_obj$18, _pos$16, 0, _game$10);
                                    var $3230 = App$Action$state$(_game$20);
                                    var $3224 = $3230;
                                    break;
                            };
                            return $3224;
                        })(), List$nil));
                        var $3218 = $3223;
                        break;
                    case 'App.Event.tick':
                        var $3234 = self.time;
                        var $3235 = self.screen;
                        var $3236 = self.mouse;
                        var $3237 = List$cons$(App$Action$state$(Mons$Game$tick$(_game$4, $3234)), List$nil);
                        var $3218 = $3237;
                        break;
                    case 'App.Event.xkey':
                        var $3238 = self.time;
                        var $3239 = self.down;
                        var $3240 = self.code;
                        var $3241 = List$cons$((() => {
                            var self = _game$4;
                            switch (self._) {
                                case 'Mons.Game.new':
                                    var $3242 = self.usr;
                                    var $3243 = self.pos;
                                    var $3244 = self.map;
                                    var $3245 = self.stt;
                                    var $3246 = self.tik;
                                    var _chr$13 = Mons$Input$char$($3239, $3240);
                                    var $3247 = App$Action$state$(Mons$Game$cmd$(_chr$13, $3242, _game$4));
                                    return $3247;
                            };
                        })(), List$nil);
                        var $3218 = $3241;
                        break;
                    case 'App.Event.post':
                        var $3248 = self.time;
                        var $3249 = self.room;
                        var $3250 = self.addr;
                        var $3251 = self.data;
                        var $3252 = List$nil;
                        var $3218 = $3252;
                        break;
                };
                var $3182 = $3218;
            };
            return $3182;
        }));
        return $3179;
    };
    const Mons$start = x0 => Mons$start$(x0);
    const Mons$off = Mons$start$(Bool$false);
    const Mons = Mons$off;
    return {
        'Buffer32.new': Buffer32$new,
        'Array': Array,
        'Array.tip': Array$tip,
        'Array.tie': Array$tie,
        'Array.alloc': Array$alloc,
        'U32.new': U32$new,
        'Word': Word,
        'Word.e': Word$e,
        'Word.o': Word$o,
        'Word.zero': Word$zero,
        'U32.zero': U32$zero,
        'Buffer32.alloc': Buffer32$alloc,
        'Bool.false': Bool$false,
        'Bool.true': Bool$true,
        'Cmp.as_eql': Cmp$as_eql,
        'Cmp.ltn': Cmp$ltn,
        'Cmp.gtn': Cmp$gtn,
        'Word.cmp.go': Word$cmp$go,
        'Cmp.eql': Cmp$eql,
        'Word.cmp': Word$cmp,
        'Word.eql': Word$eql,
        'Nat.succ': Nat$succ,
        'Nat.zero': Nat$zero,
        'U32.eql': U32$eql,
        'Nat.apply': Nat$apply,
        'Word.i': Word$i,
        'Word.inc': Word$inc,
        'U32.inc': U32$inc,
        'Nat.to_u32': Nat$to_u32,
        'U32.shr': U32$shr,
        'U32.needed_depth.go': U32$needed_depth$go,
        'Word.subber': Word$subber,
        'Word.sub': Word$sub,
        'U32.sub': U32$sub,
        'U32.needed_depth': U32$needed_depth,
        'Word.mul': Word$mul,
        'U32.mul': U32$mul,
        'Image3D.new': Image3D$new,
        'Image3D.alloc_capacity': Image3D$alloc_capacity,
        'Map.new': Map$new,
        'Word.adder': Word$adder,
        'Word.add': Word$add,
        'U32.add': U32$add,
        'List.ifor_u32': List$ifor_u32,
        'List': List,
        'Map': Map,
        'Mons.Map.new': Mons$Map$new,
        'List.length_u32_go': List$length_u32_go,
        'List.length_u32': List$length_u32,
        'U32.for': U32$for,
        'Word.div': Word$div,
        'U32.div': U32$div,
        'Word.or': Word$or,
        'U32.or': U32$or,
        'U32.shl': U32$shl,
        'Pos32.new': Pos32$new,
        'Word.fold': Word$fold,
        'Nat.add': Nat$add,
        'Nat.mul': Nat$mul,
        'Word.to_nat': Word$to_nat,
        'U32.to_nat': U32$to_nat,
        'String.nil': String$nil,
        'String.cons': String$cons,
        'String.take': String$take,
        'Nat.sub': Nat$sub,
        'String.drop': String$drop,
        'String.slice': String$slice,
        'Map.tie': Map$tie,
        'Maybe.some': Maybe$some,
        'Maybe.none': Maybe$none,
        'Map.set': Map$set,
        'Bits.e': Bits$e,
        'Bits.o': Bits$o,
        'Bits.i': Bits$i,
        'Word.to_bits': Word$to_bits,
        'U32.to_bits': U32$to_bits,
        'Mons.Map.set_list': Mons$Map$set_list,
        'Mons.Object.new': Mons$Object$new,
        'Mons.Dir.down': Mons$Dir$down,
        'Mons.Pad.new': Mons$Pad$new,
        'Mons.Pad.null': Mons$Pad$null,
        'List.nil': List$nil,
        'Pair.new': Pair$new,
        'Mons.Effect.new': Mons$Effect$new,
        'Mons.Effect.clear': Mons$Effect$clear,
        'Mons.Object.new_of_kind': Mons$Object$new_of_kind,
        'Mons.Kind.Terrain': Mons$Kind$Terrain,
        'Mons.Kind.new_terrain': Mons$Kind$new_terrain,
        'Mons.Kind.terrain.FLOOR': Mons$Kind$terrain$FLOOR,
        'Mons.Kind.terrain.PATH_BLOCKER': Mons$Kind$terrain$PATH_BLOCKER,
        'Bool.and': Bool$and,
        'U16.eql': U16$eql,
        'String.eql': String$eql,
        'Mons.Map.code_to_tile.aux': Mons$Map$code_to_tile$aux,
        'List.cons': List$cons,
        'Pair': Pair,
        'Mons.Kind.Mons': Mons$Kind$Mons,
        'Mons.Kind.new_mons': Mons$Kind$new_mons,
        'Mons.Kind.mons.MAGE': Mons$Kind$mons$MAGE,
        'Mons.Type.normal': Mons$Type$normal,
        'Mons.Kind.Const': Mons$Kind$Const,
        'Mons.Kind.new_const': Mons$Kind$new_const,
        'Mons.Kind.const.CRYSTAL': Mons$Kind$const$CRYSTAL,
        'Mons.Kind.const.FOUNTAIN': Mons$Kind$const$FOUNTAIN,
        'Mons.Kind.const.PORTAL': Mons$Kind$const$PORTAL,
        'Mons.Kind.terrain.VOID_BLACK': Mons$Kind$terrain$VOID_BLACK,
        'Mons.Kind.terrain.MID_CITY': Mons$Kind$terrain$MID_CITY,
        'Mons.Kind.terrain.STAIRS': Mons$Kind$terrain$STAIRS,
        'Mons.Kind.Interactive': Mons$Kind$Interactive,
        'Mons.Kind.new_interactive_tool': Mons$Kind$new_interactive_tool,
        'Mons.Kind.inter.HEAL': Mons$Kind$inter$HEAL,
        'Maybe': Maybe,
        'Map.get': Map$get,
        'Mons.Game.get_user_pos': Mons$Game$get_user_pos,
        'Mons.Game.get_hero_pos': Mons$Game$get_hero_pos,
        'Word.and': Word$and,
        'U32.and': U32$and,
        'Pos32.get_x': Pos32$get_x,
        'Pos32.get_y': Pos32$get_y,
        'Pos32.get_z': Pos32$get_z,
        'Mons.Map.get_list': Mons$Map$get_list,
        'Mons.Kind.is_hero': Mons$Kind$is_hero,
        'Mons.Object.get_kin': Mons$Object$get_kin,
        'List.ifind.go': List$ifind$go,
        'List.ifind': List$ifind,
        'Mons.Kind.terrain.VOID': Mons$Kind$terrain$VOID,
        'Mons.Object.void': Mons$Object$void,
        'Pair.fst': Pair$fst,
        'Pair.snd': Pair$snd,
        'Mons.Map.get_hero': Mons$Map$get_hero,
        'Mons.Kind.const.CHEST': Mons$Kind$const$CHEST,
        'Mons.Map.push': Mons$Map$push,
        'Mons.Game.new': Mons$Game$new,
        'Mons.Game.set_map': Mons$Game$set_map,
        'Mons.Game.map_push': Mons$Game$map_push,
        'Mons.Object.get_adjacent_pos': Mons$Object$get_adjacent_pos,
        'Mons.Game.get_tile': Mons$Game$get_tile,
        'Mons.Object.get_adjacent_obj_list': Mons$Object$get_adjacent_obj_list,
        'Nat.eql': Nat$eql,
        'List.length': List$length,
        'Mons.Object.can_move_forward': Mons$Object$can_move_forward,
        'List.tail': List$tail,
        'List.delete_at_u32': List$delete_at_u32,
        'Mons.Map.del': Mons$Map$del,
        'Mons.Game.map_del': Mons$Game$map_del,
        'Mons.Object.heal_all_mons': Mons$Object$heal_all_mons,
        'List.update_at': List$update_at,
        'Mons.Map.set': Mons$Map$set,
        'Mons.Game.map_set': Mons$Game$map_set,
        'Mons.Kind.inter_lever_eff': Mons$Kind$inter_lever_eff,
        'Mons.Kind.inter.LEVER': Mons$Kind$inter$LEVER,
        'Mons.Kind.terrain.GRASS_PLANT': Mons$Kind$terrain$GRASS_PLANT,
        'Mons.Kind.terrain.PLANT_0': Mons$Kind$terrain$PLANT_0,
        'Mons.Map.code_to_tile': Mons$Map$code_to_tile,
        'Mons.Map.build': Mons$Map$build,
        'Mons.map_source': Mons$map_source,
        'Mons.Screen.welcome': Mons$Screen$welcome,
        'App.Render.pix': App$Render$pix,
        'Image3D.set_length': Image3D$set_length,
        'Image3D.clear': Image3D$clear,
        'List.at': List$at,
        'Mons.Map.get': Mons$Map$get,
        'Mons.Game.dim': Mons$Game$dim,
        'Mons.Object.get_current_mon': Mons$Object$get_current_mon,
        'Mons.Attr.new': Mons$Attr$new,
        'Mons.Kind.set_static_sprites': Mons$Kind$set_static_sprites,
        'Image3D.empty': Image3D$empty,
        'Mons.Kind.set_pic': Mons$Kind$set_pic,
        'Mons.Kind.set_default_battle_spr': Mons$Kind$set_default_battle_spr,
        'Mons.global_scr_mid': Mons$global_scr_mid,
        'Mons.Attr.new_neutral': Mons$Attr$new_neutral,
        'Mons.Kind.attr': Mons$Kind$attr,
        'Mons.Object.get_ani': Mons$Object$get_ani,
        'Mons.Object.is_standing': Mons$Object$is_standing,
        'U32.length': U32$length,
        'U32.slice': U32$slice,
        'U32.read_base': U32$read_base,
        'Image3D.parse_byte': Image3D$parse_byte,
        'Col32.new': Col32$new,
        'Word.trim': Word$trim,
        'Unit.new': Unit$new,
        'Array.extract_tip': Array$extract_tip,
        'Array.extract_tie': Array$extract_tie,
        'Word.foldl': Word$foldl,
        'Array.mut': Array$mut,
        'Array.set': Array$set,
        'Buffer32.set': Buffer32$set,
        'Image3D.set_pos': Image3D$set_pos,
        'Image3D.set_col': Image3D$set_col,
        'Image3D.push': Image3D$push,
        'Image3D.parse': Image3D$parse,
        'Mons.Char_black.103': Mons$Char_black$103,
        'Image3D.get_length': Image3D$get_length,
        'Array.get': Array$get,
        'Buffer32.get': Buffer32$get,
        'Image3D.get_pos': Image3D$get_pos,
        'Image3D.get_col': Image3D$get_col,
        'Pos32.sub': Pos32$sub,
        'Pos32.add': Pos32$add,
        'Mons.vox_mid': Mons$vox_mid,
        'Mons.draw.image': Mons$draw$image,
        'List.for': List$for,
        'List.imap': List$imap,
        'List.indices.u32': List$indices$u32,
        'String.to_list': String$to_list,
        'U16.to_bits': U16$to_bits,
        'Mons.font.get_img': Mons$font$get_img,
        'Mons.draw.char': Mons$draw$char,
        'Mons.draw.text': Mons$draw$text,
        'Mons.draw.list.go': Mons$draw$list$go,
        'Mons.draw.list': Mons$draw$list,
        'Mons.font.set_img': Mons$font$set_img,
        'U16.new': U16$new,
        'U16.inc': U16$inc,
        'U16.zero': U16$zero,
        'Nat.to_u16': Nat$to_u16,
        'Mons.Char_black.100': Mons$Char_black$100,
        'Mons.Char_black.101': Mons$Char_black$101,
        'Mons.Char_black.102': Mons$Char_black$102,
        'Mons.Char_black.104': Mons$Char_black$104,
        'Mons.Char_black.105': Mons$Char_black$105,
        'Mons.Char_black.106': Mons$Char_black$106,
        'Mons.Char_black.107': Mons$Char_black$107,
        'Mons.Char_black.108': Mons$Char_black$108,
        'Mons.Char_black.109': Mons$Char_black$109,
        'Mons.Char_black.110': Mons$Char_black$110,
        'Mons.Char_black.111': Mons$Char_black$111,
        'Mons.Char_black.112': Mons$Char_black$112,
        'Mons.Char_black.113': Mons$Char_black$113,
        'Mons.Char_black.114': Mons$Char_black$114,
        'Mons.Char_black.115': Mons$Char_black$115,
        'Mons.Char_black.116': Mons$Char_black$116,
        'Mons.Char_black.117': Mons$Char_black$117,
        'Mons.Char_black.118': Mons$Char_black$118,
        'Mons.Char_black.119': Mons$Char_black$119,
        'Mons.Char_black.120': Mons$Char_black$120,
        'Mons.Char_black.121': Mons$Char_black$121,
        'Mons.Char_black.122': Mons$Char_black$122,
        'Mons.Char_black.123': Mons$Char_black$123,
        'Mons.Char_black.124': Mons$Char_black$124,
        'Mons.Char_black.125': Mons$Char_black$125,
        'Mons.Char_black.126': Mons$Char_black$126,
        'Mons.Char_black.32': Mons$Char_black$32,
        'Mons.Char_black.33': Mons$Char_black$33,
        'Mons.Char_black.34': Mons$Char_black$34,
        'Mons.Char_black.35': Mons$Char_black$35,
        'Mons.Char_black.36': Mons$Char_black$36,
        'Mons.Char_black.37': Mons$Char_black$37,
        'Mons.Char_black.38': Mons$Char_black$38,
        'Mons.Char_black.39': Mons$Char_black$39,
        'Mons.Char_black.40': Mons$Char_black$40,
        'Mons.Char_black.41': Mons$Char_black$41,
        'Mons.Char_black.42': Mons$Char_black$42,
        'Mons.Char_black.43': Mons$Char_black$43,
        'Mons.Char_black.44': Mons$Char_black$44,
        'Mons.Char_black.45': Mons$Char_black$45,
        'Mons.Char_black.46': Mons$Char_black$46,
        'Mons.Char_black.47': Mons$Char_black$47,
        'Mons.Char_black.48': Mons$Char_black$48,
        'Mons.Char_black.49': Mons$Char_black$49,
        'Mons.Char_black.50': Mons$Char_black$50,
        'Mons.Char_black.51': Mons$Char_black$51,
        'Mons.Char_black.52': Mons$Char_black$52,
        'Mons.Char_black.53': Mons$Char_black$53,
        'Mons.Char_black.54': Mons$Char_black$54,
        'Mons.Char_black.55': Mons$Char_black$55,
        'Mons.Char_black.56': Mons$Char_black$56,
        'Mons.Char_black.57': Mons$Char_black$57,
        'Mons.Char_black.58': Mons$Char_black$58,
        'Mons.Char_black.59': Mons$Char_black$59,
        'Mons.Char_black.60': Mons$Char_black$60,
        'Mons.Char_black.61': Mons$Char_black$61,
        'Mons.Char_black.62': Mons$Char_black$62,
        'Mons.Char_black.63': Mons$Char_black$63,
        'Mons.Char_black.64': Mons$Char_black$64,
        'Mons.Char_black.65': Mons$Char_black$65,
        'Mons.Char_black.66': Mons$Char_black$66,
        'Mons.Char_black.67': Mons$Char_black$67,
        'Mons.Char_black.68': Mons$Char_black$68,
        'Mons.Char_black.69': Mons$Char_black$69,
        'Mons.Char_black.70': Mons$Char_black$70,
        'Mons.Char_black.71': Mons$Char_black$71,
        'Mons.Char_black.72': Mons$Char_black$72,
        'Mons.Char_black.73': Mons$Char_black$73,
        'Mons.Char_black.74': Mons$Char_black$74,
        'Mons.Char_black.75': Mons$Char_black$75,
        'Mons.Char_black.76': Mons$Char_black$76,
        'Mons.Char_black.77': Mons$Char_black$77,
        'Mons.Char_black.78': Mons$Char_black$78,
        'Mons.Char_black.79': Mons$Char_black$79,
        'Mons.Char_black.80': Mons$Char_black$80,
        'Mons.Char_black.81': Mons$Char_black$81,
        'Mons.Char_black.82': Mons$Char_black$82,
        'Mons.Char_black.83': Mons$Char_black$83,
        'Mons.Char_black.84': Mons$Char_black$84,
        'Mons.Char_black.85': Mons$Char_black$85,
        'Mons.Char_black.86': Mons$Char_black$86,
        'Mons.Char_black.87': Mons$Char_black$87,
        'Mons.Char_black.88': Mons$Char_black$88,
        'Mons.Char_black.89': Mons$Char_black$89,
        'Mons.Char_black.90': Mons$Char_black$90,
        'Mons.Char_black.91': Mons$Char_black$91,
        'Mons.Char_black.92': Mons$Char_black$92,
        'Mons.Char_black.93': Mons$Char_black$93,
        'Mons.Char_black.94': Mons$Char_black$94,
        'Mons.Char_black.95': Mons$Char_black$95,
        'Mons.Char_black.96': Mons$Char_black$96,
        'Mons.Char_black.97': Mons$Char_black$97,
        'Mons.Char_black.98': Mons$Char_black$98,
        'Mons.Char_black.99': Mons$Char_black$99,
        'Mons.Char_black.normal': Mons$Char_black$normal,
        'Mons.Char_black.earth': Mons$Char_black$earth,
        'Mons.Char_black.fire': Mons$Char_black$fire,
        'Mons.Char_black.water': Mons$Char_black$water,
        'Mons.Char_black.grass': Mons$Char_black$grass,
        'Mons.Char_black.electric': Mons$Char_black$electric,
        'Mons.Char_black.psychic': Mons$Char_black$psychic,
        'Mons.Char_black.ice': Mons$Char_black$ice,
        'Mons.Char_black.light': Mons$Char_black$light,
        'Mons.Char_black.darkness': Mons$Char_black$darkness,
        'Mons.Char_black.s_72': Mons$Char_black$s_72,
        'Mons.Char_black.s_80': Mons$Char_black$s_80,
        'Mons.Char_black.burn': Mons$Char_black$burn,
        'Mons.Char_black.hit': Mons$Char_black$hit,
        'Mons.Char_black.invulnerable': Mons$Char_black$invulnerable,
        'Mons.Char_black.minimize': Mons$Char_black$minimize,
        'Mons.Char_black.poison': Mons$Char_black$poison,
        'Mons.Char_black.protect': Mons$Char_black$protect,
        'Mons.Char_black.sleep': Mons$Char_black$sleep,
        'Mons.Char_black.font': Mons$Char_black$font,
        'Mons.draw.list_selector': Mons$draw$list_selector,
        'Mons.Char_white.100': Mons$Char_white$100,
        'Mons.Char_white.101': Mons$Char_white$101,
        'Mons.Char_white.102': Mons$Char_white$102,
        'Mons.Char_white.103': Mons$Char_white$103,
        'Mons.Char_white.104': Mons$Char_white$104,
        'Mons.Char_white.105': Mons$Char_white$105,
        'Mons.Char_white.106': Mons$Char_white$106,
        'Mons.Char_white.107': Mons$Char_white$107,
        'Mons.Char_white.108': Mons$Char_white$108,
        'Mons.Char_white.109': Mons$Char_white$109,
        'Mons.Char_white.110': Mons$Char_white$110,
        'Mons.Char_white.111': Mons$Char_white$111,
        'Mons.Char_white.112': Mons$Char_white$112,
        'Mons.Char_white.113': Mons$Char_white$113,
        'Mons.Char_white.114': Mons$Char_white$114,
        'Mons.Char_white.115': Mons$Char_white$115,
        'Mons.Char_white.116': Mons$Char_white$116,
        'Mons.Char_white.117': Mons$Char_white$117,
        'Mons.Char_white.118': Mons$Char_white$118,
        'Mons.Char_white.119': Mons$Char_white$119,
        'Mons.Char_white.120': Mons$Char_white$120,
        'Mons.Char_white.121': Mons$Char_white$121,
        'Mons.Char_white.122': Mons$Char_white$122,
        'Mons.Char_white.123': Mons$Char_white$123,
        'Mons.Char_white.124': Mons$Char_white$124,
        'Mons.Char_white.125': Mons$Char_white$125,
        'Mons.Char_white.126': Mons$Char_white$126,
        'Mons.Char_white.32': Mons$Char_white$32,
        'Mons.Char_white.33': Mons$Char_white$33,
        'Mons.Char_white.34': Mons$Char_white$34,
        'Mons.Char_white.35': Mons$Char_white$35,
        'Mons.Char_white.36': Mons$Char_white$36,
        'Mons.Char_white.37': Mons$Char_white$37,
        'Mons.Char_white.38': Mons$Char_white$38,
        'Mons.Char_white.39': Mons$Char_white$39,
        'Mons.Char_white.40': Mons$Char_white$40,
        'Mons.Char_white.41': Mons$Char_white$41,
        'Mons.Char_white.42': Mons$Char_white$42,
        'Mons.Char_white.43': Mons$Char_white$43,
        'Mons.Char_white.44': Mons$Char_white$44,
        'Mons.Char_white.45': Mons$Char_white$45,
        'Mons.Char_white.46': Mons$Char_white$46,
        'Mons.Char_white.47': Mons$Char_white$47,
        'Mons.Char_white.48': Mons$Char_white$48,
        'Mons.Char_white.49': Mons$Char_white$49,
        'Mons.Char_white.50': Mons$Char_white$50,
        'Mons.Char_white.51': Mons$Char_white$51,
        'Mons.Char_white.52': Mons$Char_white$52,
        'Mons.Char_white.53': Mons$Char_white$53,
        'Mons.Char_white.54': Mons$Char_white$54,
        'Mons.Char_white.55': Mons$Char_white$55,
        'Mons.Char_white.56': Mons$Char_white$56,
        'Mons.Char_white.57': Mons$Char_white$57,
        'Mons.Char_white.58': Mons$Char_white$58,
        'Mons.Char_white.59': Mons$Char_white$59,
        'Mons.Char_white.60': Mons$Char_white$60,
        'Mons.Char_white.61': Mons$Char_white$61,
        'Mons.Char_white.62': Mons$Char_white$62,
        'Mons.Char_white.63': Mons$Char_white$63,
        'Mons.Char_white.64': Mons$Char_white$64,
        'Mons.Char_white.65': Mons$Char_white$65,
        'Mons.Char_white.66': Mons$Char_white$66,
        'Mons.Char_white.67': Mons$Char_white$67,
        'Mons.Char_white.68': Mons$Char_white$68,
        'Mons.Char_white.69': Mons$Char_white$69,
        'Mons.Char_white.70': Mons$Char_white$70,
        'Mons.Char_white.71': Mons$Char_white$71,
        'Mons.Char_white.72': Mons$Char_white$72,
        'Mons.Char_white.73': Mons$Char_white$73,
        'Mons.Char_white.74': Mons$Char_white$74,
        'Mons.Char_white.75': Mons$Char_white$75,
        'Mons.Char_white.76': Mons$Char_white$76,
        'Mons.Char_white.77': Mons$Char_white$77,
        'Mons.Char_white.78': Mons$Char_white$78,
        'Mons.Char_white.79': Mons$Char_white$79,
        'Mons.Char_white.80': Mons$Char_white$80,
        'Mons.Char_white.81': Mons$Char_white$81,
        'Mons.Char_white.82': Mons$Char_white$82,
        'Mons.Char_white.83': Mons$Char_white$83,
        'Mons.Char_white.84': Mons$Char_white$84,
        'Mons.Char_white.85': Mons$Char_white$85,
        'Mons.Char_white.86': Mons$Char_white$86,
        'Mons.Char_white.87': Mons$Char_white$87,
        'Mons.Char_white.88': Mons$Char_white$88,
        'Mons.Char_white.89': Mons$Char_white$89,
        'Mons.Char_white.90': Mons$Char_white$90,
        'Mons.Char_white.91': Mons$Char_white$91,
        'Mons.Char_white.92': Mons$Char_white$92,
        'Mons.Char_white.93': Mons$Char_white$93,
        'Mons.Char_white.94': Mons$Char_white$94,
        'Mons.Char_white.95': Mons$Char_white$95,
        'Mons.Char_white.96': Mons$Char_white$96,
        'Mons.Char_white.97': Mons$Char_white$97,
        'Mons.Char_white.98': Mons$Char_white$98,
        'Mons.Char_white.99': Mons$Char_white$99,
        'Mons.Char_white.font': Mons$Char_white$font,
        'List.reverse.go': List$reverse$go,
        'List.reverse': List$reverse,
        'Mons.Object.get_dir': Mons$Object$get_dir,
        'Mons.draw.global_xy': Mons$draw$global_xy,
        'Nat.mod.go': Nat$mod$go,
        'Nat.mod': Nat$mod,
        'Either': Either,
        'Either.left': Either$left,
        'Either.right': Either$right,
        'Nat.sub_rem': Nat$sub_rem,
        'Nat.div_mod.go': Nat$div_mod$go,
        'Nat.div_mod': Nat$div_mod,
        'Nat.div': Nat$div,
        'Mons.draw.cur_sprite': Mons$draw$cur_sprite,
        'Mons.Sprite.new': Mons$Sprite$new,
        'Mons.game_sprites': Mons$game_sprites,
        'Mons.scr_mid': Mons$scr_mid,
        'Cmp.as_lte': Cmp$as_lte,
        'Word.lte': Word$lte,
        'U32.lte': U32$lte,
        'Cmp.as_ltn': Cmp$as_ltn,
        'Word.ltn': Word$ltn,
        'U32.ltn': U32$ltn,
        'Bool.if': Bool$if,
        'Mons.Map.build_sprites': Mons$Map$build_sprites,
        'Mons.draw.text_screen_bg': Mons$draw$text_screen_bg,
        'Mons.draw.msg_screen.line_0': Mons$draw$msg_screen$line_0,
        'Mons.draw.msg_screen.line_1': Mons$draw$msg_screen$line_1,
        'Mons.draw.mage_talk': Mons$draw$mage_talk,
        'Mons.Object.get_images': Mons$Object$get_images,
        'Mons.Kind.get_name': Mons$Kind$get_name,
        'Mons.Object.get_names': Mons$Object$get_names,
        'Mons.draw.list_image.go': Mons$draw$list_image$go,
        'Mons.draw.list_image': Mons$draw$list_image,
        'Mons.draw.mon_img_selected': Mons$draw$mon_img_selected,
        'Mons.draw.initial_mons': Mons$draw$initial_mons,
        'String.concat': String$concat,
        'String.flatten.go': String$flatten$go,
        'String.flatten': String$flatten,
        'Mons.draw.img_type': Mons$draw$img_type,
        'Mons.draw.small_HP': Mons$draw$small_HP,
        'List.fold': List$fold,
        'Nat.to_base.go': Nat$to_base$go,
        'Nat.to_base': Nat$to_base,
        'Nat.gtn': Nat$gtn,
        'Nat.lte': Nat$lte,
        'Nat.show_digit': Nat$show_digit,
        'Nat.to_string_base': Nat$to_string_base,
        'U32.to_string': U32$to_string,
        'Bool.not': Bool$not,
        'Mons.Object.remaining_hp': Mons$Object$remaining_hp,
        'Mons.Object.is_obj_defeated': Mons$Object$is_obj_defeated,
        'Mons.Object.is_battling': Mons$Object$is_battling,
        'Mons.draw.background': Mons$draw$background,
        'Mons.draw.get_battle_bg': Mons$draw$get_battle_bg,
        'Mons.draw.battle_bg': Mons$draw$battle_bg,
        'Mons.draw.hero_hp': Mons$draw$hero_hp,
        'Mons.draw.adve_hp': Mons$draw$adve_hp,
        'Mons.draw.effect': Mons$draw$effect,
        'Mons.draw.effects': Mons$draw$effects,
        'Cmp.as_gtn': Cmp$as_gtn,
        'Word.gtn': Word$gtn,
        'U32.gtn': U32$gtn,
        'Mons.Turn.is_active': Mons$Turn$is_active,
        'Mons.Turn.hero_turn': Mons$Turn$hero_turn,
        'Mons.Skill.get_name': Mons$Skill$get_name,
        'Mons.Skill.short_description': Mons$Skill$short_description,
        'Mons.draw.turn': Mons$draw$turn,
        'Mons.Kind.get_skills': Mons$Kind$get_skills,
        'Mons.Skill.none': Mons$Skill$none,
        'Mons.Game.get_skills_at': Mons$Game$get_skills_at,
        'Mons.draw.battle_skills': Mons$draw$battle_skills,
        'Mons.draw.get_full_bg': Mons$draw$get_full_bg,
        'Mons.draw.capture_bg': Mons$draw$capture_bg,
        'Mons.draw.battle_win_bg': Mons$draw$battle_win_bg,
        'Mons.Kind.is_portal': Mons$Kind$is_portal,
        'Bool.or': Bool$or,
        'Mons.Game.defeated_lvl_mons': Mons$Game$defeated_lvl_mons,
        'Mons.Assets.void': Mons$Assets$void,
        'Mons.Object.qtd_mons_defeated': Mons$Object$qtd_mons_defeated,
        'Mons.draw.bag_select': Mons$draw$bag_select,
        'Mons.draw.bag': Mons$draw$bag,
        'Mons.draw.full_bag': Mons$draw$full_bag,
        'Mons.draw': Mons$draw,
        'App.Action': App$Action,
        'App.Action.print': App$Action$print,
        'App.Action.resize': App$Action$resize,
        'Mons.scr_w': Mons$scr_w,
        'Mons.scr_h': Mons$scr_h,
        'App.Action.state': App$Action$state,
        'Mons.Game.set_usr': Mons$Game$set_usr,
        'App.Action.watch': App$Action$watch,
        'Word.from_bits': Word$from_bits,
        'Bits.concat': Bits$concat,
        'String.to_bits': String$to_bits,
        'Mons.App.room': Mons$App$room,
        'Cmp.as_gte': Cmp$as_gte,
        'Word.gte': Word$gte,
        'U16.gte': U16$gte,
        'U16.lte': U16$lte,
        'U16.sub': U16$sub,
        'Char.to_upper': Char$to_upper,
        'U16.add': U16$add,
        'Char.to_lower': Char$to_lower,
        'Mons.Input.char': Mons$Input$char,
        'Mons.Input.list': Mons$Input$list,
        'Mons.Input.char_to_code_map': Mons$Input$char_to_code_map,
        'Mons.Input.serialize': Mons$Input$serialize,
        'App.Action.post': App$Action$post,
        'Mons.Object.set_ani': Mons$Object$set_ani,
        'Mons.Object.set_dir': Mons$Object$set_dir,
        'Mons.Object.is_free_to_move': Mons$Object$is_free_to_move,
        'Mons.Dir.up': Mons$Dir$up,
        'Mons.Dir.left': Mons$Dir$left,
        'Mons.Dir.right': Mons$Dir$right,
        'Mons.Object.tick': Mons$Object$tick,
        'Mons.Dir.move': Mons$Dir$move,
        'Mons.Map.pop': Mons$Map$pop,
        'Mons.Map.get_top': Mons$Map$get_top,
        'Mons.Object.is_walking': Mons$Object$is_walking,
        'Mons.Kind.get_blocks': Mons$Kind$get_blocks,
        'Mons.Game.move_obj': Mons$Game$move_obj,
        'Mons.Game.set_user_pos': Mons$Game$set_user_pos,
        'Mons.Game.tick_user': Mons$Game$tick_user,
        'Mons.Game.set_tik': Mons$Game$set_tik,
        'Mons.Game.tick_game': Mons$Game$tick_game,
        'Mons.Game.tick': Mons$Game$tick,
        'Bits.slice': Bits$slice,
        'Mons.Input.code_to_char_map': Mons$Input$code_to_char_map,
        'Mons.Input.deserialize': Mons$Input$deserialize,
        'Mons.Game.set_stt': Mons$Game$set_stt,
        'Mons.Screen.game': Mons$Screen$game,
        'Mons.Turn.new': Mons$Turn$new,
        'Mons.Turn.empty': Mons$Turn$empty,
        'Mons.Kind.mons.HERO': Mons$Kind$mons$HERO,
        'Mons.Type.fire': Mons$Type$fire,
        'Mons.Object.hero': Mons$Object$hero,
        'Mons.Object.ended_battle': Mons$Object$ended_battle,
        'Mons.Screen.introduction': Mons$Screen$introduction,
        'Mons.Screen.credits': Mons$Screen$credits,
        'List.elem': List$elem,
        'Char.eql': Char$eql,
        'Mons.is_walk_cmd': Mons$is_walk_cmd,
        'Mons.key_to_dir': Mons$key_to_dir,
        'Mons.Object.set_pad': Mons$Object$set_pad,
        'Mons.Pad.set_r': Mons$Pad$set_r,
        'Mons.Object.set_pad_r': Mons$Object$set_pad_r,
        'Mons.Pad.set_u': Mons$Pad$set_u,
        'Mons.Object.set_pad_u': Mons$Object$set_pad_u,
        'Mons.Pad.set_l': Mons$Pad$set_l,
        'Mons.Object.set_pad_l': Mons$Object$set_pad_l,
        'Mons.Pad.set_d': Mons$Pad$set_d,
        'Mons.Object.set_pad_d': Mons$Object$set_pad_d,
        'Mons.dir_to_set_pad': Mons$dir_to_set_pad,
        'Char.is_upper': Char$is_upper,
        'Mons.Game.update': Mons$Game$update,
        'Mons.Game.walk': Mons$Game$walk,
        'Mons.Kind.is_mage': Mons$Kind$is_mage,
        'Mons.Object.set_bag': Mons$Object$set_bag,
        'Mons.Kind.mons.POISOLICK': Mons$Kind$mons$POISOLICK,
        'Mons.Kind.mons.AZULA': Mons$Kind$mons$AZULA,
        'Mons.Kind.mons.EMERELDER': Mons$Kind$mons$EMERELDER,
        'Mons.Object.set_dmg': Mons$Object$set_dmg,
        'Nat.ltn': Nat$ltn,
        'List.pure': List$pure,
        'List.append': List$append,
        'Mons.Object.push_to_bag': Mons$Object$push_to_bag,
        'Mons.initial_mons': Mons$initial_mons,
        'Mons.Screen.intro_select': Mons$Screen$intro_select,
        'Mons.Type.earth': Mons$Type$earth,
        'Mons.Object.set_mon': Mons$Object$set_mon,
        'Mons.Object.delete_init_mons': Mons$Object$delete_init_mons,
        'U32.gte': U32$gte,
        'Word.mod': Word$mod,
        'U32.mod': U32$mod,
        'Mons.Game.adve_turn': Mons$Game$adve_turn,
        'Mons.Effect.upd_initial_eff': Mons$Effect$upd_initial_eff,
        'Mons.Object.set_eff': Mons$Object$set_eff,
        'Mons.Skill.update_mon_obj': Mons$Skill$update_mon_obj,
        'Mons.Effect.has_invulnerable': Mons$Effect$has_invulnerable,
        'Mons.Effect.has_burn': Mons$Effect$has_burn,
        'Mons.Effect.has_hit': Mons$Effect$has_hit,
        'Mons.Effect.has_poison': Mons$Effect$has_poison,
        'Mons.Skill.apply_inital_eff_dmg': Mons$Skill$apply_inital_eff_dmg,
        'Mons.Effect.has_protect': Mons$Effect$has_protect,
        'Mons.Effect.has_minimize': Mons$Effect$has_minimize,
        'Mons.Object.get_dmg': Mons$Object$get_dmg,
        'Mons.Object.hit': Mons$Object$hit,
        'Mons.Skill.damage_eff': Mons$Skill$damage_eff,
        'Mons.Skill.apply_inital_eff': Mons$Skill$apply_inital_eff,
        'Mons.Effect.has_sleep': Mons$Effect$has_sleep,
        'Mons.Type.skill_n_type': Mons$Type$skill_n_type,
        'Mons.Object.heal': Mons$Object$heal,
        'Mons.Skill.heal_eff': Mons$Skill$heal_eff,
        'Mons.Effect.set_invulnerable': Mons$Effect$set_invulnerable,
        'Mons.Skill.invulnerable_eff': Mons$Skill$invulnerable_eff,
        'Mons.Effect.set_hit': Mons$Effect$set_hit,
        'Mons.Skill.hit_next_eff': Mons$Skill$hit_next_eff,
        'Mons.Effect.set_burn': Mons$Effect$set_burn,
        'Mons.Skill.burn_eff': Mons$Skill$burn_eff,
        'Mons.Effect.set_protect': Mons$Effect$set_protect,
        'Mons.Skill.protect_eff': Mons$Skill$protect_eff,
        'Mons.Effect.set_poison': Mons$Effect$set_poison,
        'Mons.Skill.poison_eff': Mons$Skill$poison_eff,
        'Mons.Skill.critical_hit': Mons$Skill$critical_hit,
        'Mons.Skill.is_critical': Mons$Skill$is_critical,
        'Mons.Kind.get_agi': Mons$Kind$get_agi,
        'Mons.Effect.set_minimize': Mons$Effect$set_minimize,
        'Mons.Skill.minimize_eff': Mons$Skill$minimize_eff,
        'Mons.Effect.set_sleep': Mons$Effect$set_sleep,
        'Mons.Skill.sleep_eff': Mons$Skill$sleep_eff,
        'Mons.Skill.cast': Mons$Skill$cast,
        'Mons.Skill.run': Mons$Skill$run,
        'Mons.Game.hero_start_attacking': Mons$Game$hero_start_attacking,
        'Mons.Game.exec_turn': Mons$Game$exec_turn,
        'Mons.Kind.is_mon_area': Mons$Kind$is_mon_area,
        'Mons.Kind.area_mon_pos': Mons$Kind$area_mon_pos,
        'Mons.Screen.inventory': Mons$Screen$inventory,
        'Mons.Skill.clear_after_battle': Mons$Skill$clear_after_battle,
        'Mons.Object.set_cap': Mons$Object$set_cap,
        'Mons.Object.add_defeated_mon': Mons$Object$add_defeated_mon,
        'Mons.Object.set_bos': Mons$Object$set_bos,
        'Mons.Object.capture_boss': Mons$Object$capture_boss,
        'Mons.Game.delete_adve_obj': Mons$Game$delete_adve_obj,
        'Mons.Object.is_full_bag': Mons$Object$is_full_bag,
        'Mons.Screen.capture_mon': Mons$Screen$capture_mon,
        'Mons.Kind.get_pos': Mons$Kind$get_pos,
        'Mons.Game.add_mon': Mons$Game$add_mon,
        'List.delete_at': List$delete_at,
        'Mons.Object.delete_from_bag': Mons$Object$delete_from_bag,
        'Mons.Screen.game_over': Mons$Screen$game_over,
        'Mons.Turn.is_last_player_move': Mons$Turn$is_last_player_move,
        'Mons.Turn.hero_run': Mons$Turn$hero_run,
        'Mons.Effect.upd_end_turn_eff': Mons$Effect$upd_end_turn_eff,
        'Mons.Skill.apply_end_turn_eff': Mons$Skill$apply_end_turn_eff,
        'Mons.Game.move_hero_down': Mons$Game$move_hero_down,
        'Mons.Kind.mons.ZOIO': Mons$Kind$mons$ZOIO,
        'Mons.Kind.mons.MIMIC': Mons$Kind$mons$MIMIC,
        'Mons.Kind.mons.MIMIC2': Mons$Kind$mons$MIMIC2,
        'Mons.Kind.mons.CYCLOPE': Mons$Kind$mons$CYCLOPE,
        'Mons.Kind.mons.TROWL': Mons$Kind$mons$TROWL,
        'Mons.Kind.mons.EMERELDER2': Mons$Kind$mons$EMERELDER2,
        'Mons.Game.add_boss': Mons$Game$add_boss,
        'Mons.Kind.mons.BEHOLDER': Mons$Kind$mons$BEHOLDER,
        'Mons.Game.add_mons_to_map': Mons$Game$add_mons_to_map,
        'Mons.Game.hero_inital_position': Mons$Game$hero_inital_position,
        'Mons.Object.get_adjacent_obj': Mons$Object$get_adjacent_obj,
        'Mons.Object.hero_can_push_obj': Mons$Object$hero_can_push_obj,
        'Mons.Kind.exec_eff': Mons$Kind$exec_eff,
        'Mons.Object.set_kin': Mons$Object$set_kin,
        'Mons.Object.update_interactive': Mons$Object$update_interactive,
        'Mons.Kind.set_on_interactive': Mons$Kind$set_on_interactive,
        'Mons.Game.cmd': Mons$Game$cmd,
        'App.new': App$new,
        'Mons.start': Mons$start,
        'Mons.off': Mons$off,
        'Mons': Mons,
    };
})();

/***/ })

}]);
//# sourceMappingURL=index.c3902ca1fb6bb7151514.js.map