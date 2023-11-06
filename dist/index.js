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
      totalPage = _ref$totalPage === void 0 ? 0 : _ref$totalPage,
      _ref$initialPage = _ref.initialPage,
      initialPage = _ref$initialPage === void 0 ? 1 : _ref$initialPage,
      onPageChange = _ref.onPageChange;
  var mountedFlag = (0, _react.useRef)(false);
  var initialSection = Math.ceil(initialPage / numOfPage);
  var initialListRefIndex = initialPage - (initialSection - 1) * numOfPage - 1;

  var _useState = (0, _react.useState)(initialListRefIndex),
      _useState2 = _slicedToArray(_useState, 2),
      currentListRefIndex = _useState2[0],
      setCurrentListRefIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(initialSection),
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
  var listRefIndex = currentTotalPage ? currentListRefIndex : 0;
  var pageList = (0, _react.useMemo)(function () {
    if (currentSection === maxSection && rest) return Array.from({
      length: rest
    }, function (_, idx) {
      return idx + numOfPage * (currentSection - 1) + 1;
    });
    if (currentTotalPage === 0) return [initialPage];
    return Array.from({
      length: numOfPage
    }, function (_, idx) {
      return idx + numOfPage * (currentSection - 1) + 1;
    });
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
    setCurrentListRefIndex(0);
  };

  var goBeforeSection = function goBeforeSection() {
    if (!hasBeforeSection()) return;
    setCurrentSection(function (prev) {
      return prev - 1;
    });
    setCurrentListRefIndex(0);
  };

  var goFirstSection = function goFirstSection() {
    if (!hasBeforeSection()) return;
    setCurrentSection(1);
    setCurrentListRefIndex(0);
  };

  var goLastSection = function goLastSection() {
    if (!hasNextSection()) return;
    setCurrentSection(maxSection);
    setCurrentListRefIndex(0);
  };

  var hasNext = function hasNext() {
    return !(listRefIndex === pageList.length - 1);
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
      setCurrentListRefIndex(0);
    } else {
      setCurrentListRefIndex(function (prev) {
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
      setCurrentListRefIndex(numOfPage - 1);
    } else {
      setCurrentListRefIndex(function (prev) {
        return prev - 1;
      });
    }
  };

  var setPage = function setPage(pageNum) {
    if (pageNum < pageList[0] || pageNum > pageList[pageList.length - 1]) {
      throw new Error("You cannot set a page to a value that is not in the pageList");
    }

    setCurrentListRefIndex((pageNum - 1) % numOfPage);
  };

  (0, _react.useEffect)(function () {
    setCurrentTotalPage(totalPage);
  }, [totalPage]);
  (0, _react.useEffect)(function () {
    setCurrentSection(initialSection);
    setCurrentListRefIndex(initialListRefIndex);
  }, [initialPage]);
  (0, _react.useEffect)(function () {
    if (mountedFlag.current) onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(pageList[listRefIndex]);
    mountedFlag.current = true;
  }, [pageList[listRefIndex]]);
  return {
    pageList: pageList,
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
      return pageList[listRefIndex];
    }

  };
};

var _default = usePagination;
exports.default = _default;