
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

function getMap() {
	return { area: 100 };
}
