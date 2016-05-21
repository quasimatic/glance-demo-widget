import glanceSelector from "glance-selector";
import $ from 'jquery';

window.glanceSelector = glanceSelector;

var alreadySet = false;
var previousSelector = "";

function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

function clearHighlighted() {
    $('*[data-original-background-color]').each(function () {
        $(this).css("background-color", $(this).data("original-background-color"));
        $(this).removeAttr("data-original-background-color");
    });
}

function highlightElements(elements) {
    $(elements).each(function () {
        if (!$(this).is("*[data-original-background-color]"))
            $(this).attr("data-original-background-color", $(this).css('backgroundColor'));
    }).css("background-color", "#FACC0D");
}

glanceSelector.addExtension({
    beforeAll: function (selector) {
        clearHighlighted();

        previousSelector = selector;
        $("#glance-selector").val("");
    },

    afterAll: function ({elements}) {
        highlightElements(elements);
        
        $("#glance-selector").val(previousSelector);
    },

    afterFilters: function (elements, {scope}) {
        var nonDemoElements = elements.filter(function (e) {
            return !isDescendant($('#glance-demo')[0], e);
        });

        return nonDemoElements;
    }
});

$(function () {
    var toolbar = $("<div id='glance-demo'></div>")
        .prependTo("body")
        .css({
            "height": "40px",
            "margin-bottom": "10px",
            "font-family": "Helvetica Neue",
            "font-size": "20px"
        });

    var background = $("<div></div>")
        .appendTo(toolbar)
        .css({
            "position": "fixed",
            "top": 0,
            "left": 0,
            "right": 0,
            "background-color": "#3D5980",
            "padding": "6px 6px 6px 4px"
        });

    var label = $("<label>Glance:&nbsp;</label>")
        .appendTo(background)
        .css({
            "color": "white",
            "float": "left",
            "font-size": "20px",
            "line-height": "24px"
        });

    var wrapper = $("<span></span>")
        .appendTo(background)
        .css({
            "display": "block",
            "overflow": "hidden"
        });

    $("<input id='glance-selector'/>")
        .appendTo(wrapper)
        .css({
            "font-size": "20px",
            "padding": "0px 0px 1px 4px",
            "width": "100%",
            "outline-width": 0,
            "border": 0
        })
        .keyup(function () {
            var selector = $("#glance-selector").val();
            if (previousSelector == selector) return;

            previousSelector = selector;
            
            if (selector == "")
                clearHighlighted();
            else
                glanceSelector(selector);
        });
});

(function setDemoText() {
    if ($("#glance-selector").length == 0) {
        setTimeout(function () {
            setDemoText(previousSelector);
        }, 1);
    }
    else {
        if (!alreadySet) {
            $("#glance-selector").val(previousSelector);
            alreadySet = true;
        }
    }
})();