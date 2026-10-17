import * as utils from '../common/utils.js';
import { doc } from '../common/constants.js';
import { getOptions } from '../common/options.js';
import { getAnchorsURL } from '../anchors/getAnchorsURL.js';
import { scrollHandler } from './scrollHandler.js';
import { scrollPageAndSlide } from './scrollPageAndSlide.js';
import { silentMoveTo } from './silentMove.js';
import { EventEmitter } from '../common/eventEmitter.js';
import { events } from '../common/events.js';

/**
* Scrolls to the anchor in the URL when loading the site
*/
export function scrollToAnchor(){
    utils.windowAddEvent('scroll', scrollHandler);
    doc.body.addEventListener('scroll', scrollHandler);

    var anchors = getAnchorsURL();
    var sectionAnchor = anchors.section;
    var slideAnchor = anchors.slide;

    if(sectionAnchor){  //if theres any #
        if(getOptions().animateAnchor){
            scrollPageAndSlide(sectionAnchor, slideAnchor);
        }else{
            silentMoveTo(sectionAnchor, slideAnchor);
        }
    }else{
        EventEmitter.emit(events.onAfterRenderNoAnchor, null);
    }
}