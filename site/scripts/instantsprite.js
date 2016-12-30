(function(window, undefined) {

var sprite = window.sprite = { };
var document = window.document;
var elements = sprite.elements = {
	fileInput: '#fileInput',
	fileInputShortcut: '#fileInputShortcut',
	fileSamples: '#fileSamples',
	dropbox: '#source',
	spriteContainer: '#sprite',
	fileContainer: '#files',
	addedFiles: '#added-files',
	fileWarnings: '#file-warnings',
	imageload: '#imageload',
	exportCss: '#exportCss',
	exportHtml: '#exportHtml',
	exportImageNewWindow: '#openInNewWindow',
	exportBase64: '#base64Image',
	preview: '#preview',
	result: '#result',
	cssTemplateInputs: '#css-template input',
	classPrefix: '#class-prefix',
	spriteClassName: '#sprite-classname',
	filenameMatch: '#filename-match',
	classSuffix: '#class-suffix',
	cssPrefix: '#css-prefix',
	options: '#options',
	optionOffset: '#offset',
	optionDirection: ':radio[name=direction]',
	optionExport: ':radio[name=export]',
	sections: 'section',
	app: '#app',
	noapp: '#noapp',
	progress: '#progress',
	intro: '#intro',
	sort: '#sort',
};

var settings = sprite.settings = {
	enabled: (function() {
		return FileReaderJS.enabled;
	})(),
	thumbnailWidth: 20,
	thumbnailHeight: 20,
	maxImageSize: 512000,
	canExportGif: (function() {
		var c = document.createElement("canvas");
		try {
			c.width = 1;
			c.height = 1;
			c.toDataURL("image/gif");
			return true;
		} catch(e) { }
		return false;
	})(),
	canImportTiff: (function() {
		return !$.browser.mozilla;
	})(),
	sampleImages: [
		{ src: 'styles/icons/comments.png', extra: { nameNoExtension: 'comments', prettySize: '557.00 bytes' }, name: 'comments.png', type: 'image/png' },
		{ src: 'styles/icons/group.png', extra: { nameNoExtension: 'group', prettySize: '753.00 bytes' }, name: 'group.png', type: 'image/png' },
		{ src: 'styles/icons/help.png', extra: { nameNoExtension: 'help', prettySize: '786.00 bytes' }, name: 'help.png', type: 'image/png' },
		{ src: 'styles/icons/delete.png', extra: { nameNoExtension: 'delete', prettySize: '715.00 bytes' }, name: 'delete.png', type: 'image/png' },
		{ src: 'styles/icons/github.png', extra: { nameNoExtension: 'github', prettySize: '389.00 bytes' }, name: 'github.png', type: 'image/png' },
		{ src: 'styles/icons/computer_add.png', extra: { nameNoExtension: 'computer_add', prettySize: '781.00 bytes' }, name: 'computer_add.png', type: 'image/png' }
	]
};

var resultCanvas = document.createElement("canvas"),
	resultBase64,
	loadingfiles = 0;

var templates = {
	'loadedImage': '<li class="clearfix"><div class="controls"><span class="remove">✖</span></div><canvas></canvas><span class="name">${name}</span><input class="hide" value="${extra.nameNoExtension}" /> <span class="details"><strong>type:</strong> ${type} | <strong>size:</strong> ${extra.prettySize}</span>',
	'fileNotImage': '<li><div class="controls"><span class="remove">✖</span></div>The file "${name}" is not identified as an image.  It\'s type is: ${type || "unknown"}.  Skipping the file.  If you think this is in error, please leave <a href="feedback/" target="_blank" class="normal">feedback</a> telling me what happened.</li>',
	'fileLoadError': '<li><div class="controls"><span class="remove">✖</span></div>Error loading file</li>',
	'fileTooBig': '<li><div class="controls"><span class="remove">✖</span></div>The file "${name}" is too big (${extra.prettySize}).  Spriting work best with small images (like icons or buttons).</li>',
	'duplicate': 'You have two images with the same name (${name}).  The class names are automatically generated based on your file name (but you can change them later).  It will be easier if you get rid of any duplicate images.'
};

var templateHelpers = {
	loadedImage: function(canvas, file) {
		var tmpl = $.tmpl( "loadedImage", file );

		// generate thumbnail, show in list
        var ratio = 1,
        	maxWidth = settings.thumbnailWidth,
        	maxHeight = settings.thumbnailHeight,
        	thumbnailCanvas = tmpl.find("canvas")[0],
        	thumbnailContext = thumbnailCanvas.getContext("2d");

        if(canvas.width > settings.thumbnailWidth) {
            ratio = maxWidth / canvas.width;
        }
        else if(canvas.height > maxHeight) {
            ratio = maxHeight / canvas.height;
		}

		// only allow letters, numbers, dashes, and underscores in the selector
		// should this come through in the FileReaderJS extra prop?
		canvas.fileName = file.extra.nameNoExtension.replace(/[^_a-zA-Z0-9-]/g, '');
		thumbnailCanvas.originalCanvas = canvas;
        thumbnailCanvas.width = canvas.width * ratio;
        thumbnailCanvas.height = canvas.height * ratio;

        thumbnailContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

        return tmpl;
	}
};

sprite.shrinkdropbox = function() {
	elements.dropbox.removeClass("full").removeAttr("style");
	elements.spriteContainer.addClass("active");
	elements.intro.slideUp();
};

sprite.loadimage = function(src, file) {
	var img = document.createElement("img");

	img.onload = function() {
		var canvas = document.createElement("canvas"),
	    	ctx = canvas.getContext('2d');

	    canvas.width = img.width;
	    canvas.height = img.height;
	    ctx.drawImage(img, 0, 0);

	    elements.addedFiles.append(templateHelpers.loadedImage(canvas, file));

	    $(img).remove();

	    delay(sprite.sortthumbnails, 100);
	    delay(sprite.mergefiles, 100);
	};

	sprite.shrinkdropbox();
	img.src = src;
	elements.imageload.append(img);
};

sprite.fileReaderOpts = {
	dragClass: 'drag',
	on: {
		load: function(e, file) {
			sprite.loadimage(e.target.result, file);
		},
		loadstart: function(e, file) {
			loadingfiles++;
		},
		loadend: function(e, file) {
			loadingfiles--;
		},
		beforestart: function(file) {

			var cantLoad = !settings.canImportTiff && file.type == 'image/tiff';
			if (cantLoad) {
				alert("Your browser does not support loading files of type: " + file.type);
			}

			if (!file.type.match(new RegExp("image/*")) || cantLoad) {
				elements.fileWarnings.append($.tmpl( "fileNotImage", file ));
				return false;
			}
			if (file.size > settings.maxImageSize) {
				elements.fileWarnings.append($.tmpl( "fileTooBig", file ));
				return false;
			}
		},
		progress: function(e) {
			//log("progress", e)
		},
		error: function(e) {
			elements.fileWarnings.append($.tmpl( "fileLoadError", e ));
		},
		skip: function(file) {

		},
		groupstart: function(files, groupID) {
			sprite.shrinkdropbox();
			elements.progress.show();
		},
		groupend: function(files, groupID) {
			elements.progress.hide();
		}
	}
};

sprite.px = function(val) {
	return val + (val == 0 ? '' : 'px');
};

sprite.gen = {
	rulebackground: function(url, width, height) {
		var backgroundAttr = "background: url('"+url+"') no-repeat top left; ",
			widthAttr = (width) ? 'width: ' + sprite.px(width) + '; ' : '',
			heightAttr = (height) ? 'height: ' + sprite.px(height) + '; ' : '';
		return ' { ' + backgroundAttr + widthAttr + heightAttr + ' } ';
	},
	demoelement: function(classname) {
		return "<div class='" + classname + "'></div>";
	},
	ruleindividual: function(selector, posX, posY, width, height) {
		var posAttr = 'background-position: ' + sprite.px(posX) + ' ' + sprite.px(posY) + '; ',
			widthAttr = (width) ? 'width: ' + sprite.px(width) + '; ' : '',
			heightAttr = (height) ? 'height: ' + sprite.px(height) + '; ' : '';
		return selector + ' { ' + posAttr + widthAttr + heightAttr + '} ';
	}
};

sprite.dimensionfrequency = function() {

	var heights = { }, widths = { };
	sprite.eachcanvas(function(canvas) {
		heights[canvas.height] = !heights[canvas.height] ? 1 : heights[canvas.height] + 1;
		widths[canvas.width] = !widths[canvas.width] ? 1 : widths[canvas.width] + 1;
	});

	var mostFrequentHeight = 0,
		heightCount = 0;
	for (var h in heights) {
		if (heightCount < heights[h]) {
			heightCount = heights[h];
			mostFrequentHeight = parseInt(h, 10);
		}
	}

	var mostFrequentWidth = 0,
		widthCount = 0;
	for (var w in widths) {
		if (widthCount < widths[w]) {
			widthCount = widths[w];
			mostFrequentWidth = parseInt(w, 10);
		}
	}

	return {
		mostFrequentWidth: mostFrequentWidth,
		mostFrequentHeight: mostFrequentHeight,
		mostFrequentWidthCount: widthCount,
		mostFrequentHeightCount: heightCount
	}
};

sprite.setrules = function() {
	var cssRules = [],
		htmlRules = [],
		cssprefix = $.trim(elements.cssPrefix.val()) + ' ',
		classprefix = $.trim(elements.classPrefix.val()),
		classsuffix = $.trim(elements.classSuffix.val()),
		spriteClassName = $.trim(elements.spriteClassName.val()) || 'sprite',
		mainSelector = $.trim(cssprefix + "." + spriteClassName),
		filenameMatch = $.trim(elements.filenameMatch.val()) || ".*",
		filenameMatchReg,
		filename = spriteClassName + '.' + sprite.getopts().exportAs,
		dimensionFrequency = sprite.dimensionfrequency(),
		defaultWidth = dimensionFrequency.mostFrequentWidthCount !== 1 ? dimensionFrequency.mostFrequentWidth : false,
		defaultHeight = dimensionFrequency.mostFrequentHeightCount !== 1 ? dimensionFrequency.mostFrequentHeight : false;

	try { elements.filenameMatch.removeClass("error"); filenameMatchReg = new RegExp(filenameMatch) }
	catch (e) { elements.filenameMatch.addClass("error"); filenameMatchReg = new RegExp('.*'); }

	// Each canvas needs its own rule
	sprite.eachcanvas(function(canvas) {
		var matchedArr = filenameMatchReg.exec(canvas.fileName),
			matchedFilename = matchedArr ? matchedArr[matchedArr.length-1] : canvas.fileName,
			canvasClassName = $.trim(classprefix + matchedFilename + classsuffix),
			canvasSelector = $.trim(mainSelector + '.' + canvasClassName),
			width = (canvas.width === defaultWidth) ? false : canvas.width,
			height = (canvas.height === defaultHeight) ? false : canvas.height;

		cssRules.push(sprite.gen.ruleindividual(canvasSelector, canvas.storeX, canvas.storeY, width, height));
		htmlRules.push(sprite.gen.demoelement(spriteClassName + ' ' + canvasClassName));
	});

	var outputRule = mainSelector + sprite.gen.rulebackground(filename, defaultWidth, defaultHeight) + "\n",
		outputCss = outputRule + cssRules.join('\n'),
		outputHtml = htmlRules.join('\n'),
		demoRule = mainSelector + sprite.gen.rulebackground(resultBase64, defaultWidth, defaultHeight) + "\n",
		demoCss = demoRule + cssRules.join('\n'),
		demoStyleTag = "<style type='text/css'>" + demoCss + "</style>";

	elements.exportHtml.val(outputHtml).attr('rows', htmlRules.length);
	elements.exportCss.val(outputCss).attr('rows', cssRules.length + 1);
	elements.preview.contents().find("body").html(demoStyleTag + outputHtml);
};

sprite.sortthumbnails = function() {
	elements.addedFiles.sortable({
		update: function() {
			sprite.mergefiles();
		}
	});
};

sprite.getopts = function() {
	var direction = elements.optionDirection.filter(":checked").val();
	return {
		spacing: parseInt(elements.optionOffset.val(), 10) || 0,
		direction: direction,
		exportAs: elements.optionExport.filter(":checked").val(),
		vertical: (direction == "vertical"),
		horizontal: (direction == "horizontal"),
		diagonal: (direction == "diagonal")
	}
};

sprite.getcanvases = function() {
	return elements.addedFiles.children().map(function(i, el) {
		return $(this).find("canvas")[0];
	});
};

sprite.eachcanvas = function(cb) {
	var canvases = sprite.getcanvases();
	for (var i = 0, len = canvases.length; i < len; i++) {
		cb(canvases[i].originalCanvas, i, (i == (len - 1)));
	}
};

sprite.mergefiles = function() {

	var opts = sprite.getopts(),
		isVertical = opts.vertical,
		isHorizontal = opts.horizontal,
		isDiagonal = opts.diagonal,
		totalWidth = 0,
		totalHeight = 0,
		resultContext = resultCanvas.getContext("2d");

	// Generate final canvas size and locations
	sprite.eachcanvas(function(canvas, i, islast) {

		var spacing = islast ? 0 : opts.spacing;
		canvas.storeX = canvas.storeY = 0;

		if (isDiagonal) {

			canvas.storeX = totalWidth;
			canvas.storeY = totalHeight;

			totalWidth += canvas.width + spacing;
			totalHeight += canvas.height + spacing;

		}
		else if (isVertical) {

			canvas.storeY = totalHeight;

			totalWidth = Math.max(canvas.width, totalWidth);
			totalHeight += canvas.height + spacing;

		}
		else if (isHorizontal) {

			canvas.storeX = totalWidth;

			totalHeight = Math.max(canvas.height, totalHeight);
			totalWidth += canvas.width + spacing;

		}
	});

	resultCanvas.width = totalWidth;
	resultCanvas.height = totalHeight;

	sprite.eachcanvas(function(canvas) {
		if (isDiagonal) {
			// need to set the reset the storeX now since we want it opposite
			// (starting at top right instead of top left)
			canvas.storeX = totalWidth - canvas.storeX - canvas.width;
		}

		resultContext.drawImage(canvas, canvas.storeX, canvas.storeY);

		// Need to be inverted now for background-position
		canvas.storeX = -canvas.storeX;
		canvas.storeY = -canvas.storeY;
	});

	if (totalWidth != 0) {
		resultBase64 = resultCanvas.toDataURL("image/" + opts.exportAs);
		elements.result.html("<img src='"+resultBase64+"'>");
		elements.exportImageNewWindow.removeClass('disabled');
		elements.exportBase64.removeClass('disabled');
		elements.exportBase64.attr("data-clipboard-text", resultBase64);
	}
	else {
		elements.result.html("");
		elements.exportImageNewWindow.addClass('disabled');
	}
	sprite.setrules();
};

sprite.init = function() {

	for (var i in sprite.elements) {
		sprite.elements[i] = $(sprite.elements[i]);
	}
	for (var i in templates) {
		$.template(i, templates[i]);
	}

	if (!settings.enabled) {
		// Show an error message, since the browser doesn't support necessary features
		// Using short circuit return to cut back on indentation for rest of app
		elements.app.hide();
		elements.noapp.show();
		return;
	}

	elements.fileInput.fileReaderJS(sprite.fileReaderOpts);
	$(document.body).fileReaderJS(sprite.fileReaderOpts);

	elements.exportCss.val("");
	elements.fileInputShortcut.click(function() { elements.fileInput.click(); return false; });
	elements.cssTemplateInputs.fitInputToWidth().keyup(sprite.setrules);
	elements.options.change(sprite.mergefiles).submit(false);
	elements.optionOffset.bind("keyup", function() {
		var val = $(this).val();
		if ($(this).data('old') != val) {
			$(this).data('old', val);
			sprite.mergefiles();
		}
	});
	elements.fileContainer.delegate(".remove", "click", function(e) {
		var isImage = $(this).closest("ul")[0] == elements.addedFiles[0];
		$(this).closest("li").remove();
		if (isImage) {
			sprite.mergefiles();
		}
	});

	var clip = new ZeroClipboard(elements.exportBase64[0]);

	clip.on('mouseover', function(c) {
		elements.exportBase64.tinytooltip({
			message: 'Copy image as base64',
			hover: false
		});

		elements.exportBase64.trigger('showtooltip');
	});

	clip.on('complete', function(c) {
		elements.exportBase64.trigger('destroy');
		elements.exportBase64.tinytooltip({
			message: 'Copied',
			hover: false
		});
		elements.exportBase64.trigger('showtooltip');
	});

	clip.on('mouseout', function(c) {
		elements.exportBase64.trigger('destroy');
	});

	elements.exportImageNewWindow.click(function() {
		if (!$(this).hasClass("disabled")) {
			window.open(resultBase64);
		}
		return false;
	});

	elements.fileSamples.click(function() {
		for (var i = 0; i < settings.sampleImages.length; i++) {
			sprite.loadimage(settings.sampleImages[i].src, settings.sampleImages[i]);
		}
		return false;
	});

	elements.sort.click(function() {
		var items = $("#added-files");
		var sorted = items.children("li").sort(function (a, b) {
			return $(a).children(".name").text() > $(b).children(".name").text();
		});
		sorted.each(function(i, item) { items.append(item); });
		sprite.mergefiles();
	});
	
	if (!settings.canExportGif) {
		// Firefox doesn't allow exporting as gif yet.  Chrome's gif export is pretty bad
		elements.optionExport.filter("[value=gif]").attr("disabled", "disabled").closest("label").attr("title", "Your browser does not support exporting to gif");
	}

	if ($.browser.mozilla) {
		// Firefox doesn't like clicking a link to file input, so just show the real thing
		elements.fileInput.removeClass('offscreen').before(elements.fileInputShortcut.text() + ":&nbsp;");
		elements.fileInputShortcut.hide();
	}

	fitDropboxToScreen();
	$(window).resize(fitDropboxToScreen);
	$("#initialload").remove();
	elements.dropbox.find("ul").removeClass("hide");
};


// ==============
// Utilities
// ==============

function fitDropboxToScreen() {
	if (elements.dropbox.hasClass("full")) {
		var height = Math.max(200, $(window).height() - elements.dropbox.offset().top - 60);
		elements.dropbox.height(height);
	}
}



})(window);
