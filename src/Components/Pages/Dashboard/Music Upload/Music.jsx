import AudioUploadCard from '../Music Upload/components/AudioUploadCard';
import ArtworkUploadCard from '../Music Upload/components/ArtworkUploadCard';
import MetadataForm from '../Music Upload/components/MetadataForm';
import ReleaseDatePicker from '../Music Upload/components/ReleaseDatePicker';

const UploadMusic = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-5 px-2 font-display">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-normal text-gray-900 mb-5">Upload Music</h1>

        {/* Upload Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AudioUploadCard />
          <ArtworkUploadCard />
        </div>

        {/* Metadata + Calendar */}
        <div className="mb-16">
          <MetadataForm />
        </div>

          <ReleaseDatePicker />
      </div>
    </div>
  );
};

export default UploadMusic;