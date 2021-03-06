/*
 * It gives functionality  -drag&drop feature- to the plugin.
 */

const clase =
{
	getSupportedFlavours : function () 
			{
	    			var flavours = new FlavourSet();
			        flavours.appendFlavour("text/unicode");
			        return flavours;
			},

	onDrop : function (event)
	{
		var yval = event.clientY;
		
		var cat = core.getcategory();
		var lin = core.getlinks();
		var att = core.getattributes();
		
		if (yval >= 60 && yval <= lin.position())
		{ 
			var fin = cat;
			core.setselected(cat.label());
			lin.incrementYval();
			att.incrementYval();
		}
		if (yval >= lin.position() && yval <= att.position())
		{
			var fin = lin;
			core.setselected(lin.label());
			att.incrementYval();
		}
		if (yval >= att.position())
		{
			var fin = att;
			core.setselected(att.label());
		}
		fin.add(core,event.dataTransfer.getData("text/plain"),"attribute");
	}
}
