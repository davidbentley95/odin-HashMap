class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
    this._entries = 0;
  }

  _isValidIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  _hash(key) {
    if (typeof key !== "string") {
      throw new Error("Trying to pass a non-string key");
    }

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    //convert key to hash
    const index = this._hash(key);
    //check index per assignment requirements, though redundant here
    this._isValidIndex(index);
    //check if already exists, if so update
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }
    //recalculate number of entries after this insertion and grow if at or above load factor.
    if((this._entries + 1) / this.capacity >= this.loadFactor) {
      this.capacity = this.capacity * 2;
      let entries = this.entries();
      entries.push([key, value]);
      this.buckets = Array.from({ length: this.capacity }, () => []);
       
      for(let i = 0; i < entries.length; i++) {
        const newIndex = this._hash(entries[i][0]);
        this.buckets[newIndex].push(entries[i]);
      }
      this._entries = entries.length;
      return;
    } 
    //add new entry to the bucket
    this.buckets[index].push([key, value]);

    //increment entries counter
    this._entries++;
  }

  get(key) {
    //convert key to hash
    const index = this._hash(key);
    //check that index is valid
    this._isValidIndex(index);
    //iterate over bucket until key match found, else return null;
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return this.buckets[index][i][1];
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    //convert key to hash index
    const index = this._hash(key);
    //validate index
    this._isValidIndex(index);
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1);
        this._entries--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this._entries;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this._entries = 0;
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        keys.push(this.buckets[i][j][0]);
      }
    }
    return keys;
  }
  
  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        values.push(this.buckets[i][j][1]);
      }
    }
    return values;
  }
  
  entries() {
    let entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        entries.push(this.buckets[i][j]);
      }
    }
    return entries;
  }
}