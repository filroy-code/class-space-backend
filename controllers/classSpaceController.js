exports.view_classes = function (req, res, next) {
  res.json({ message: "List of classes." });
};

exports.create_class = function (req, res, next) {
  res.json({ message: "Create a new class." });
};

exports.class_info = function (req, res, next) {
  res.json({ message: "Class information." });
};
