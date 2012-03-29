var path = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [4, 3],
    [4, 4]
];
var I = path.length;
var J = path[0].length;
var fixed = [0,I-1];

/*
    TODO:
        1. visualise a single path (canvas haha) Do a tutorial now!
*/



log(path);
var snapshots = smooth(path);
log(snapshots[snapshots.length-1]);

function smooth(path, weight_data, weight_smooth) { 
    if (!weight_data) {
        weight_data = 0.5;
    }
    if (!weight_smooth) {
        weight_smooth = 0.1;
    }
    
    var newpath = clone(path);
    var snapshots = [];
    var tolerance = 0.0001;
    var change = tolerance;
    var iter = 0;
    
    while (change >= tolerance) {
        change = 0.0;
        for (var i=0; i<I; i++) {
            if ($.inArray(i, fixed) != -1) {
                continue;
            }
            for (var j=0; j<J; j++) {
                var aux = newpath[i][j];
                newpath[i][j] += (weight_data * (path[i][j] - newpath[i][j]));
                snapshots.push(clone(newpath));
                newpath[i][j] += (weight_smooth * (newpath[i+1][j] + newpath[i-1][j] - 2*newpath[i][j]));
                snapshots.push(clone(newpath));
                change += Math.abs(aux - newpath[i][j]);
            }
        }
        iter++;
    }
    console.log('converged in ' + iter + ' iterations');
    return snapshots;
}

function clone(path) {
    // Make a deep copy of path into newpath
    var newpath = [];
    for (var i in path) {
        newpath[i] = [];
        for (var j in path[0]) {
            newpath[i][j] = path[i][j];
        }
    }
    return newpath;
}

function log(path) {
    var s = "";
    for (var i=0; i<I; i++) {
        if (i>0) {
            s += "\n"; 
        }
        s += "[";
        for (var j=0; j<J; j++) {
            s += path[i][j];
            if (j < J-1) {
                s += ", ";   
            }
        }
        s += "]";
    }
    console.log(s);
}
