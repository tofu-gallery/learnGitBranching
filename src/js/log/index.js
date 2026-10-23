// Tofu adaptation: keep the upstream logging API without collecting or sending
// commands, lesson progress, or view events to an analytics service.
var noop = function() {};

exports.viewInteracted = noop;
exports.showLevelSolution = noop;
exports.choseNextLevel = noop;
exports.levelSelected = noop;
exports.levelSolved = noop;
exports.commandEntered = noop;
