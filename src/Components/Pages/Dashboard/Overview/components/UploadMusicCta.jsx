import { ChevronRight, } from 'lucide-react';
import prop from 'prop-types';
const UploadMusicCTA = ({ onClick }) => (
  <div 
	onClick={onClick}
	className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 sm:p-6 shadow-lg flex items-center justify-between text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
  >
	<div className="flex items-center gap-3 sm:gap-4">
	  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
		<div className="w-0 h-0 border-t-8 sm:border-t-10 border-t-transparent border-l-12 sm:border-l-16 border-l-orange-500 border-b-8 sm:border-b-10 border-b-transparent ml-1" />
	  </div>
	  <h3 className="text-lg sm:text-xl font-bold">Upload Music</h3>
	</div>
	<ChevronRight size={24} className="flex-shrink-0" />
  </div>
);
export default UploadMusicCTA;
// PropTypes Validation
UploadMusicCTA.propTypes = {
  onClick: prop.func.isRequired,
};