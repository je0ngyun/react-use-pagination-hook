"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var usePagination = function usePagination(_ref) {
  var numOfPage = _ref.numOfPage,
      _ref$totalPage = _ref.totalPage,
      totalPage = _ref$totalPage === void 0 ? 0 : _ref$totalPage;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      listRefIndex = _useState2[0],
      setListRefIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(1),
      _useState4 = _slicedToArray(_useState3, 2),
      currentSection = _useState4[0],
      setCurrentSection = _useState4[1];

  var _useState5 = (0, _react.useState)(totalPage),
      _useState6 = _slicedToArray(_useState5, 2),
      currentTotalPage = _useState6[0],
      setCurrentTotalPage = _useState6[1];

  var section = Math.floor(currentTotalPage / numOfPage);
  var rest = currentTotalPage % numOfPage;
  var maxSection = rest ? section + 1 : section;
  (0, _react.useEffect)(function () {
    setCurrentTotalPage(totalPage);
  }, [totalPage]);
  var pagelist = (0, _react.useMemo)(function () {
    if (currentSection === maxSection && rest) {
      return Array.from({
        length: rest
      }, function (_, idx) {
        return idx + numOfPage * (currentSection - 1) + 1;
      });
    } else {
      if (currentTotalPage === 0) {
        return [1];
      } else {
        return Array.from({
          length: numOfPage
        }, function (_, idx) {
          return idx + numOfPage * (currentSection - 1) + 1;
        });
      }
    }
  }, [currentSection, maxSection, rest, currentTotalPage]);

  var hasNextSection = function hasNextSection() {
    return !(currentSection === maxSection);
  };

  var hasBeforeSection = function hasBeforeSection() {
    return !(currentSection === 1);
  };

  var goNextSection = function goNextSection() {
    if (!hasNextSection()) return;
    setCurrentSection(function (prev) {
      return prev + 1;
    });
    setListRefIndex(0);
  };

  var goBeforeSection = function goBeforeSection() {
    if (!hasBeforeSection()) return;
    setCurrentSection(function (prev) {
      return prev - 1;
    });
    setListRefIndex(0);
  };

  var goFirstSection = function goFirstSection() {
    if (!hasBeforeSection()) return;
    setCurrentSection(1);
    setListRefIndex(0);
  };

  var goLastSection = function goLastSection() {
    if (!hasNextSection()) return;
    setCurrentSection(maxSection);
    setListRefIndex(0);
  };

  var hasNext = function hasNext() {
    return !(listRefIndex === pagelist.length - 1);
  };

  var hasBefore = function hasBefore() {
    return !(listRefIndex === 0);
  };

  var goNext = function goNext() {
    if (!hasNext() && !hasNextSection()) {
      return;
    }

    if (!hasNext() && hasNextSection()) {
      goNextSection();
      setListRefIndex(0);
    } else {
      setListRefIndex(function (prev) {
        return prev + 1;
      });
    }
  };

  var goBefore = function goBefore() {
    if (!hasBefore() && !hasBeforeSection()) {
      return;
    }

    if (!hasBefore() && hasBeforeSection()) {
      goBeforeSection();
      setListRefIndex(numOfPage - 1);
    } else {
      setListRefIndex(function (prev) {
        return prev - 1;
      });
    }
  };

  var setPage = function setPage(pageNum) {
    if (pageNum < pagelist[0] || pageNum > pagelist[pagelist.length - 1]) {
      throw new Error("You cannot set a page to a value that is not in the pagelist");
    }

    setListRefIndex((pageNum - 1) % numOfPage);
  };

  return {
    pagelist: pagelist,
    goNextSection: goNextSection,
    goBeforeSection: goBeforeSection,
    goFirstSection: goFirstSection,
    goLastSection: goLastSection,
    goNext: goNext,
    goBefore: goBefore,
    setTotalPage: setCurrentTotalPage,
    setPage: setPage,

    get hasNextSection() {
      return hasNextSection();
    },

    get hasBeforeSection() {
      return hasBeforeSection();
    },

    get currentPage() {
      return pagelist[listRefIndex];
    }

  };
};

var _default = usePagination;
exports.default = _default;