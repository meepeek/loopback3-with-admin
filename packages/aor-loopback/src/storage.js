
export default {
    save : function(key, value){
        if (typeof (Storage) == "undefined") { return false; }
        localStorage.setItem(key, value);
        return value;
    },
    load : function(key){
        if (typeof (Storage) == "undefined") { return false; }
        var token = localStorage.getItem(key);
        return {id: token}
    },
    remove : function(key){
        if (typeof (Storage) == "undefined") { return false; }
        localStorage.removeItem(key);
    }
};
