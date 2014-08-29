// Copyright 2012 ysc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

    /**
     * Map object, implementing the function of Map.
     *
     * size() Get the length of Map elements.
     * isEmpty() Determine whether the Map is empty.
     * clear() Delete all the elements Map.
     * put(key, value) Add element to the Map by key and value.
     * remove(key) Removes the specified key element, if success return true, else return false.
     * get(key) Get the value of specified key element, if fail return null.
     * element(index) Get the element by specified index (using element.key and element.value to get key and value), if fail return null.
     * containsKey(key) Determine whether the Map contains the specified key elements.
     * containsValue(value) Determine whether it contains the element of Map by specified value.
     * getKeyByValue(value) Get the key element of Map by value.
     * keys() Get an array of all keys of the Map.
     * values() Get an array of all values of the Map.
     */
    function Map() {
        this.elements = [];

        // 鑾峰彇Map鍏冪礌涓暟
        this.size = function () {
            return this.elements.length;
        };

        // 鍒ゆ柇Map鏄惁涓虹┖
        this.isEmpty = function () {
            return (this.elements.length < 1);
        };

        // 鍒犻櫎Map鎵�湁鍏冪礌
        this.clear = function () {
            this.elements = [];
        };

        // 鍚慚ap涓鍔犲厓绱狅紙key, value)
        this.put = function (_key, _value) {
            if (this.containsKey(_key) === true) {
                if (this.containsValue(_value)) {
                    if (this.remove(_key) === true) {
                        this.elements.push({
                            key: _key,
                            value: _value
                        });
                    }
                } else {
                    this.elements.push({
                        key: _key,
                        value: _value
                    });
                }
            } else {
                this.elements.push({
                    key: _key,
                    value: _value
                });
            }
        };

        // 鍒犻櫎鎸囧畾key鐨勫厓绱狅紝鎴愬姛杩斿洖true锛屽け璐ヨ繑鍥瀎alse
        this.remove = function (_key) {
            var bln = false;
            try {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        this.elements.splice(i, 1);
                        return true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        };

        // 鑾峰彇鎸囧畾key鐨勫厓绱犲�value锛屽け璐ヨ繑鍥瀗ull
        this.get = function (_key) {
            try {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        return this.elements[i].value;
                    }
                }
            } catch (e) {
                return null;
            }
        };

        // 鑾峰彇鎸囧畾绱㈠紩鐨勫厓绱狅紙浣跨敤element.key锛宔lement.value鑾峰彇key鍜寁alue锛夛紝澶辫触杩斿洖null
        this.element = function (_index) {
            if (_index < 0 || _index >= this.elements.length) {
                return null;
            }
            return this.elements[_index];
        };

        // 鍒ゆ柇Map涓槸鍚﹀惈鏈夋寚瀹歬ey鐨勫厓绱�        
        this.containsKey = function (_key) {
            var bln = false;
            try {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        bln = true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        };

       // 鍒ゆ柇Map涓槸鍚﹀惈鏈夋寚瀹歷alue鐨勫厓绱�       
        this.containsValue = function (_value) {
            var bln = false;
            try {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].value == _value) {
                        bln = true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        };

        // 閫氳繃value鍊艰幏鍙朚ap涓璳ey鐨勫厓绱�       
        this.getKeyByValue = function (_value) {
            var elements = this.elements;
            var result;
            try {
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].value === _value) {
                        result = elements[i].key;
                        break;
                    }
                }
            } catch (e) {
            }
            return result;
        };

        // 鑾峰彇Map涓墍鏈塳ey鐨勬暟缁勶紙array锛�        
        this.keys = function () {
            var arr = [];
            for (var i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].key);
            }
            return arr;
        };

        // 鑾峰彇Map涓墍鏈塿alue鐨勬暟缁勶紙array锛�       
        this.values = function () {
            var arr = [];
            for (var i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].value);
            }
            return arr;
        };
    }


