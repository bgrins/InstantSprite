
function rectpack(inputRectangles) {

	var rects = inputRectangles.slice(0).sort(function(a, b) { return b.height - a.height });
	var cutoffEfficiency = 0.9;
    var totalAreaAllImages = 0;
    var widthWidestImage = 0;
    var heightHeighestImage = 0;
    for (var i = 0; i < rects.length; i++) {
    	totalAreaAllImages += rects[i].height * rects[i].width;
    	widthWidestImage = Math.max(widthWidestImage, rects[i].width);
    	heightHeighestImage = Math.max(heightHeighestImage, rects[i].height);
    }
    
    
    var canvasMaxWidth = Number.MAX_VALUE;
    var canvasMaxHeight = heightHeighestImage;
    
    var bestMap = null;
    
    // we are going to try and pack, starting with wide and short, and moving to skinny and tall, and find the best one
    while (canvasMaxWidth >= widthWidestImage) {
    	var map = getMap(rects, canvasMaxWidth, canvasMaxHeight)
    	if (map) {
    		if (bestMap == null || map.area < bestMap.area) {
    			bestMap = map;
    			
	            var bestEfficiency = totalAreaAllImages / map.area;
	            if (bestEfficiency >= cutoffEfficiency) { break; }
	            
    		}
    	
    		canvasMaxWidth = bestMap.width - 1;
    		canvasMaxHeight++;
    	}
    	else {
    		canvasMaxHeight++;
    	}
    	
    	// Skip ones that don't need to be calculated
    	var bestSpriteArea = bestMap.Area;	
	    while (canvasMaxWidth >= widthWidestImage) {
	    	var feasible = canvasFeasible(canvasMaxWidth, canvasMaxHeight, bestSpriteArea, totalAreaAllImages);
	    	if (feasible.feasible) { break; }
	    	
	    	if (feasible.biggerThanBestSprite) { canvasMaxWidth--; }
	    	if (feasible.smallerThanCombinedImages) { canvasMaxHeight++; }
	    }
    }
    
    return bestMap;
}


function canvasFeasible(canvasMaxWidth, canvasMaxHeight, bestSpriteArea, totalAreaAllImages) {
	
	var candidateArea = canvasMaxWidth * canvasMaxHeight;
    var biggerThanBestSprite = (candidateArea > bestSpriteArea);
    var smallerThanCombinedImages = (candidateArea < totalAreaAllImages);
	
	return {
		feasible: !(candidateBiggerThanBestSprite || candidateSmallerThanCombinedImages),
		biggerThanBestSprite: biggerThanBestSprite,
		smallerThanCombinedImages: smallerThanCombinedImages
	};
}


function Map(rects, maxWidth, maxHeight) {
	this.map = { };
	this.rects = rects.slice(0);
	this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;
	this.totalWidth = 0;
	this.totalHeight = 0;
	this.currentX = 0;
	this.currentY = 0;
	this.addAttempts = 0;
	this.rows = [];
	this.cols = [];
	this.cells = [[]];
	this.failed = false;
}
Map.prototype.generate = function() {
	var rects = this.rects;
	for (var i = 0; i < rects.length; i++) {
		this.placeRect(rects[i]);	
	}
	
	if (this.failed) { return false; }
	
	
	return { 
		width: this.totalWidth, 
		height: this.totalHeight, 
		area: this.totalWidth * this.totalHeight,
		rects: this.rects
	}; 
};

Map.prototype.tryPlaceAtCell = function(cell, rect) {
	var nbrRequiredCellsHorizontally, nbrRequiredCellsVertically, leftOverWidth, leftOverHeight;
	
	return false;
};

Map.prototype.freeHeightDeficit = function(offsetY, requiredHeight) {
	var spaceLeftVertically = this.maxHeight - offsetY;
	var freeHeightDeficit = requiredHeight - spaceLeftVertically;
	return freeHeightDeficit;
};

Map.prototype.placeRect = function(rect) {
	
	if (this.failed) { return; }
	
	var rectXOffset = 0;
	var rectYOffset = 0;
	var offsetX = 0; 
	var offsetY = 0;
	var lowestFreeHeightDeficit = Number.MAX_VALUE;
	var requiredWidth = rect.width;
	var requiredHeight = rect.height;
	var rectangleWasPlaced = false;
	var rows = this.rows;
	var cols = this.cols;
	var cells = this.cells;
 	var x = 0;
 	var y = 0;
 	var _lowestFreeHeightDeficitSinceLastRedim = 0;
 	
	this.addAttempts++;
	
	while(true) {
	
		// Wait until an unoccupied cell is found in this column
		while( y < rows.length && cells[x][y].occupied ) {
			offsetY += rows[y].height;
			y++;
		}
		
		// If a plausible cell was found, see if it works
		if (y < rows.length && (this.freeHeightDeficit(offsetY, requiredHeight) <= 0) {
			var couldPlace = this.tryPlaceAtCell(cells[0][0], rect);
			if (couldPlace) {
				rectXOffset = xOffset;
				rectYOffset = yOffset;
				rectangleWasPlaced = true;
				break;
			}
			
			// Doesn't fit... go to next one
			offsetY += rows[y].height;
			y++;
		}
		
		// If we've come so close to the top of the canvas that there is no space for the
		// rectangle, go to the next column. 
		var freeHeightDeficit = this.freeHeightDeficit(offsetY, requiredHeight);
		if (freeHeightDeficit > 0) {
			
			offsetY = 0;
			y = 0;
			offsetX += cols[x].width;
			x++;
			
			if (_lowestFreeHeightDeficitSinceLastRedim > freeHeightDeficit) { 
				_lowestFreeHeightDeficitSinceLastRedim = freeHeightDeficit;  
			}
		}
		
		// Failed big time, checked all columns and couldn't fit the rectangle.
		if ((this.maxWidth - offsetX) < requiredWidth) {
			rectangleWasPlaced = false;
			break;
		}
	}
};

function getMap(rects, maxWidth, maxHeight) {
	
	return new Map(rects, maxWidth, maxHeight).generate();
	
}
