/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { format } from "date-fns";

import {
  X,
  Plus,
  Clock,
  DollarSign,
  Users,
  FileUp,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/Calendar";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

export const AgendaItems = ({
  agendaItems,
  addAgendaItem,
  updateAgendaItem,
  removeAgendaItem,
}) => {
  return (
    <div className="space-y-8">
      {agendaItems.map((item, index) => (
        <div key={`agenda-${index}`} className="flex items-center gap-4">
          <div className="flex-1">
            <label
              className="text-sm font-medium mb-2 block"
              htmlFor={`agenda-time-${index}`}
            >
              Time
            </label>
            <Input
              id={`agenda-time-${index}`}
              placeholder="e.g., 9:00 AM"
              value={item.time}
              onChange={(e) => updateAgendaItem(index, "time", e.target.value)}
            />
          </div>
          <div className="flex-[2]">
            <label
              className="text-sm font-medium mb-2 block"
              htmlFor={`agenda-activity-${index}`}
            >
              Activity
            </label>
            <Input
              id={`agenda-activity-${index}`}
              placeholder="e.g., Opening Keynote"
              value={item.activity}
              onChange={(e) =>
                updateAgendaItem(index, "activity", e.target.value)
              }
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mt-6"
            onClick={() => removeAgendaItem(index)}
            disabled={agendaItems.length <= 1}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addAgendaItem}
        className="w-full mt-6"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Agenda Item
      </Button>
    </div>
  );
};

export const SponsorItems = ({
  sponsors,
  addSponsor,
  updateSponsor,
  removeSponsor,
}) => {
  return (
    <div className="space-y-8">
      {sponsors.map((sponsor, index) => (
        <div key={`sponsor-${index}`} className="flex items-center gap-4">
          <div className="flex-1">
            <label
              className="text-sm font-medium mb-2 block"
              htmlFor={`sponsor-name-${index}`}
            >
              Sponsor Name
            </label>
            <Input
              id={`sponsor-name-${index}`}
              placeholder="e.g., Company Name"
              value={sponsor}
              onChange={(e) => updateSponsor(index, e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mt-6"
            onClick={() => removeSponsor(index)}
            disabled={sponsors.length <= 1}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addSponsor}
        className="w-full mt-6"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Sponsor
      </Button>
    </div>
  );
};

// export const AdditionalImages = ({
//   additionalImages = [], // Can be URLs or File objects
//   addAdditionalImage,
//   removeAdditionalImage,
// }) => {
//   const fileInputRef = useRef(null);
//   const [localFiles, setLocalFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   // 🔹 Convert File objects to Data URLs when additionalImages changes
//   useEffect(() => {
//     const processImages = async () => {
//       const validImages = [];

//       for (const item of additionalImages) {
//         if (typeof item === "string") {
//           validImages.push(item); // Keep URLs as they are
//         } else if (item instanceof File) {
//           const dataUrl = await readFileAsDataURL(item);
//           validImages.push(dataUrl);
//         }
//       }

//       setImagePreviews(validImages);
//     };

//     processImages();
//   }, [additionalImages]);

//   // 🔹 Read a File as Data URL (for preview)
//   const readFileAsDataURL = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (e) => resolve(e.target.result);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     if (files.length === 0) return;

//     const newFiles = [...localFiles, ...files];
//     setLocalFiles(newFiles);
//     addAdditionalImage(newFiles); // Send new files to parent component

//     // Convert files to previews
//     Promise.all(files.map(readFileAsDataURL)).then((imageUrls) => {
//       setImagePreviews((prev) => [...prev, ...imageUrls]);
//     });
//   };

//   return (
//     <div className="space-y-6 p-4 border rounded-lg bg-white shadow-sm">
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         className="hidden"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//       />

//       {/* Uploaded Images Grid */}
//       {console.log("imagePreviews:", imagePreviews)}
//       {imagePreviews.length > 0 ? (
//         <>
//           <div className="flex gap-3 flex-wrap">
//             {imagePreviews.map((image, index) =>
//               image ? (
//                 <div key={index} className="relative group">
//                   <img
//                     src={image}
//                     alt={`Uploaded image ${index + 1}`}
//                     className="h-24 w-24 object-cover rounded-md border shadow-sm"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/placeholder.svg";
//                     }}
//                   />
//                   {/* Delete Button */}
//                   <button
//                     onClick={() => {
//                       setImagePreviews((prev) =>
//                         prev.filter((_, i) => i !== index)
//                       );
//                       setLocalFiles((prev) =>
//                         prev.filter((_, i) => i !== index)
//                       );
//                       removeAdditionalImage(index);
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md opacity-100 transition"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ) : null
//             )}
//           </div>

//           {/* Upload Another Image */}
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => fileInputRef.current?.click()}
//             className="w-full py-4 flex items-center justify-center border-dashed border-2 rounded-lg hover:bg-gray-100 transition-all"
//           >
//             <Plus className="h-6 w-6 mr-2 text-gray-500" />
//             <span className="text-sm font-medium">Upload Another Image</span>
//           </Button>
//         </>
//       ) : (
//         // Show Upload Button Only If No Images Exist
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => fileInputRef.current?.click()}
//           className="w-full h-60 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
//         >
//           <FileUp
//             size={56}
//             className="text-gray-500 !h-10 !w-10 group-hover:text-gray-700 transition-colors"
//           />
//           <span className="text-lg font-semibold text-gray-700 mt-4">
//             Click to Upload Image
//           </span>
//           <span className="text-sm text-gray-500 mt-2">
//             PNG, JPG, or GIF up to 10MB
//           </span>
//         </Button>
//       )}
//     </div>
//   );
// };

export const AdditionalImages = ({
  additionalImages = [], // Can be URLs or File objects
  addAdditionalImage,
  removeAdditionalImage,
}) => {
  const fileInputRef = useRef(null);
  const [localFiles, setLocalFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // 🔹 Process URLs & Files on additionalImages change
  useEffect(() => {
    const processImages = async () => {
      const validImages = [];

      for (const item of additionalImages) {
        if (typeof item === "string") {
          validImages.push(item); // Keep URLs as they are
        } else if (item instanceof File) {
          const dataUrl = await readFileAsDataURL(item);
          validImages.push(dataUrl);
        }
      }

      setImagePreviews(validImages);
    };

    processImages();
  }, [additionalImages]);

  // 🔹 Read File as Data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // 🔹 Preserve existing URLs & new files when updating parent state
    const updatedFiles = [...localFiles, ...files];
    setLocalFiles(updatedFiles);
    addAdditionalImage([...additionalImages, ...files]); // Keep URLs & Add new files

    // Convert files to previews
    Promise.all(files.map(readFileAsDataURL)).then((imageUrls) => {
      setImagePreviews((prev) => [...prev, ...imageUrls]);
    });
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-white shadow-sm">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Uploaded Images Grid */}
      {console.log("imagePreviews:", imagePreviews)}
      {imagePreviews.length > 0 ? (
        <>
          <div className="flex gap-3 flex-wrap">
            {imagePreviews.map((image, index) =>
              image ? (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md border shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      const updatedImages = additionalImages.filter(
                        (_, i) => i !== index
                      );
                      setImagePreviews((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                      setLocalFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                      removeAdditionalImage(updatedImages); // Pass updated array to parent
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md opacity-100 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null
            )}
          </div>

          {/* Upload Another Image */}
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 flex items-center justify-center border-dashed border-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <Plus className="h-6 w-6 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Upload Another Image</span>
          </Button>
        </>
      ) : (
        // Show Upload Button Only If No Images Exist
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-60 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <FileUp
            size={56}
            className="text-gray-500 !h-10 !w-10 group-hover:text-gray-700 transition-colors"
          />
          <span className="text-lg font-semibold text-gray-700 mt-4">
            Click to Upload Image
          </span>
          <span className="text-sm text-gray-500 mt-2">
            PNG, JPG, or GIF up to 10MB
          </span>
        </Button>
      )}
    </div>
  );
};



export const LineupItems = ({
  lineup,
  addLineupItem,
  updateLineupItem,
  removeLineupItem,
}) => {
  return (
    <div className="space-y-8">
      {lineup.map((item, index) => (
        <div key={`lineup-${index}`} className="flex items-center gap-4">
          <div className="flex-1">
            <label
              className="text-sm font-medium mb-2 block"
              htmlFor={`artist-name-${index}`}
            >
              Artist Name
            </label>
            <Input
              id={`artist-name-${index}`}
              placeholder="e.g., DJ Sonic"
              value={item.artist}
              onChange={(e) =>
                updateLineupItem(index, "artist", e.target.value)
              }
            />
          </div>
          <div className="flex-1">
            <label
              className="text-sm font-medium mb-2 block"
              htmlFor={`artist-time-${index}`}
            >
              Performance Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={`artist-time-${index}`}
                placeholder="e.g., 18:00"
                className="pl-10"
                value={item.time}
                onChange={(e) =>
                  updateLineupItem(index, "time", e.target.value)
                }
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mt-6"
            onClick={() => removeLineupItem(index)}
            disabled={lineup.length <= 1}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addLineupItem}
        className="w-full mt-6"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Artist
      </Button>
    </div>
  );
};

export const DatePicker = ({ date, setDate, label, id }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(format(selectedDate, "MMMM d, yyyy")); // Format as "November 15, 2023"
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="space-y-2 mb-6">
      <label className="text-sm font-medium block" htmlFor={id}>
        {label}
      </label>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-11 px-4",
              !date && "text-muted-foreground"
            )}
            id={id}
            type="button"
          >
            <CalendarIcon className="mr-3 h-4 w-4" />
            {date ? (
              format(new Date(date), "MMMM d, yyyy")
            ) : (
              <span>Select date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto min-w-[300px] p-2 rounded-lg shadow-md bg-background"
          align="start"
          side="bottom"
          sideOffset={5}
          forceMount
        >
          <div className="relative flex flex-col items-center">
            <Calendar
              selectedDate={date} // No need to convert it to a new Date()
              onDateChange={handleDateSelect}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const TimePicker = ({ time, setTime, label, id }) => {
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const h = hour % 12 === 0 ? 12 : hour % 12;
        const m = minute.toString().padStart(2, "0");
        const period = hour < 12 ? "AM" : "PM";
        options.push(`${h}:${m} ${period}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="space-y-2 mb-6">
      <label className="text-sm font-medium block" htmlFor={id}>
        {label}
      </label>
      <Select value={time} onValueChange={setTime}>
        <SelectTrigger id={id} className="h-11">
          <div className="flex items-center">
            <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select time" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <div className="max-h-72 overflow-auto py-1">
            {timeOptions.map((timeOption) => (
              <SelectItem
                key={timeOption}
                value={timeOption}
                className={cn(
                  "cursor-pointer py-1.5",
                  time === timeOption && "bg-accent text-accent-foreground"
                )}
              >
                {timeOption}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export const ImageUploader = ({ image, setImage, label, id }) => {
  const [previewUrl, setPreviewUrl] = useState(image);

  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPreviewUrl(imageUrl);
      setImage(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 mb-8">
      <label className="text-sm font-medium block" htmlFor={id}>
        {label}
      </label>

      {previewUrl ? (
        <div className="rounded-xl overflow-hidden border border-gray-300 bg-white shadow-md p-3">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-700">
              Image Preview
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setPreviewUrl(null);
                setImage("");
              }}
              className="text-xs px-3 py-1 border-gray-400 hover:bg-gray-100 transition"
            >
              Change Image
            </Button>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <img
              src={previewUrl}
              alt="Image Preview"
              className="max-h-64 max-w-full object-contain rounded-lg shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                handleFileUpload(file);
              }
            };
            input.click();
          }}
          className="w-full h-60 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <FileUp
            size={56}
            className="text-gray-500 !h-10 !w-10 group-hover:text-gray-700 transition-colors"
          />
          <span className="text-lg font-semibold text-gray-700 mt-4">
            Click to Upload Image
          </span>
          <span className="text-sm text-gray-500 mt-2">
            PNG, JPG, or GIF up to 10MB
          </span>
        </Button>
      )}
    </div>
  );
};

// export const BasicEventForm = ({ newEvent, setNewEvent, categoryOptions }) => {
//   return (
//     <>
//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
//         <div className="space-y-2">
//           <label className="text-sm font-medium block" htmlFor="title">
//             Event Title
//           </label>
//           <Input
//             id="title"
//             placeholder="Event Title"
//             className="w-full"
//             value={newEvent.title}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, title: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium block" htmlFor="category">
//             Category
//           </label>
//           <Select
//             value={newEvent.categoryId}
//             onValueChange={(value) => {
//               const selectedCategory = categoryOptions.find(
//                 (cat) => cat.id === value
//               );
//               setNewEvent({
//                 ...newEvent,
//                 categoryId: value,
//                 category: selectedCategory ? selectedCategory.name : "",
//               });
//             }}
//           >
//             <SelectTrigger id="category" className="h-11">
//               <SelectValue placeholder="Select Category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categoryOptions.map((cat) => (
//                 <SelectItem key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
//         <DatePicker
//           date={newEvent.date}
//           setDate={(date) => setNewEvent({ ...newEvent, date })}
//           label="Date"
//           id="date"
//         />

//         <TimePicker
//           time={newEvent.time}
//           setTime={(time) => setNewEvent({ ...newEvent, time })}
//           label="Time"
//           id="time"
//         />
//       </div>

//       <div className="space-y-2 mb-8">
//         <label className="text-sm font-medium block" htmlFor="location">
//           Location
//         </label>
//         <Input
//           id="location"
//           placeholder="Event Location"
//           className="w-full"
//           value={newEvent.location}
//           onChange={(e) =>
//             setNewEvent({ ...newEvent, location: e.target.value })
//           }
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
//         <div className="space-y-2">
//           <label className="text-sm font-medium block" htmlFor="ticketPrice">
//             Ticket Price
//           </label>
//           <div className="relative">
//             <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="ticketPrice"
//               placeholder="e.g., 99.99 or Free"
//               className="w-full pl-10"
//               value={newEvent.ticketPrice}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, ticketPrice: e.target.value })
//               }
//               required
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium block" htmlFor="attendees">
//             Expected Attendees
//           </label>
//           <div className="relative">
//             <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="attendees"
//               type="number"
//               min="0"
//               placeholder="Expected number of attendees"
//               className="w-full pl-10"
//               value={newEvent.attendees}
//               onChange={(e) =>
//                 setNewEvent({
//                   ...newEvent,
//                   attendees: parseInt(e.target.value) || 0,
//                 })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
//         <div className="space-y-2">
//           <div className="flex items-center space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
//             <input
//               type="checkbox"
//               id="featured"
//               className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
//               checked={newEvent.featured}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, featured: e.target.checked })
//               }
//             />
//             <label
//               htmlFor="featured"
//               className="text-sm font-medium cursor-pointer"
//             >
//               Feature this event
//             </label>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
//             <input
//               type="checkbox"
//               id="upcoming"
//               className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
//               checked={newEvent.upcoming}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, upcoming: e.target.checked })
//               }
//             />
//             <label
//               htmlFor="upcoming"
//               className="text-sm font-medium cursor-pointer"
//             >
//               Mark as upcoming
//             </label>
//           </div>
//         </div>
//       </div>

//       <ImageUploader
//         image={newEvent.image}
//         setImage={(image) => setNewEvent({ ...newEvent, image })}
//         label="Main Image"
//         id="mainImage"
//       />
//     </>
//   );
// };

export const BasicEventForm = React.memo(
  ({ newEvent, setNewEvent, categoryOptions }) => {
    // Memoized Handlers to Prevent Re-renders
    const handleInputChange = useCallback(
      (key, value) => {
        setNewEvent((prev) => ({ ...prev, [key]: value }));
      },
      [setNewEvent]
    );

    const handleCheckboxChange = useCallback(
      (key) => {
        setNewEvent((prev) => ({ ...prev, [key]: !prev[key] }));
      },
      [setNewEvent]
    );

    return (
      <>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium block" htmlFor="title">
              Event Title
            </label>
            <Input
              id="title"
              placeholder="Event Title"
              className="w-full"
              value={newEvent.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block" htmlFor="category">
              Category
            </label>
            <Select
              value={newEvent.categoryId}
              onValueChange={(value) => {
                const selectedCategory = categoryOptions.find(
                  (cat) => cat.id === value
                );
                handleInputChange("categoryId", value);
                handleInputChange(
                  "category",
                  selectedCategory ? selectedCategory.name : ""
                );
              }}
            >
              <SelectTrigger id="category" className="h-11">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
          <DatePicker
            date={newEvent.date}
            setDate={(date) => handleInputChange("date", date)}
            label="Date"
            id="date"
          />
          <TimePicker
            time={newEvent.time}
            setTime={(time) => handleInputChange("time", time)}
            label="Time"
            id="time"
          />
        </div>

        <div className="space-y-2 mb-8">
          <label className="text-sm font-medium block" htmlFor="location">
            Location
          </label>
          <Input
            id="location"
            placeholder="Event Location"
            className="w-full"
            value={newEvent.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium block" htmlFor="ticketPrice">
              Ticket Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="ticketPrice"
                placeholder="e.g., 99.99 or Free"
                className="w-full pl-10"
                value={newEvent.ticketPrice}
                onChange={(e) =>
                  handleInputChange("ticketPrice", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block" htmlFor="attendees">
              Expected Attendees
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="attendees"
                type="number"
                min="0"
                placeholder="Expected number of attendees"
                className="w-full pl-10"
                value={newEvent.attendees}
                onChange={(e) =>
                  handleInputChange("attendees", parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
          <div className="space-y-2">
            <div
              className="flex items-center space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleCheckboxChange("featured")}
            >
              <input
                type="checkbox"
                id="featured"
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                checked={newEvent.featured}
                readOnly
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium cursor-pointer"
              >
                Feature this event
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <div
              className="flex items-center space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleCheckboxChange("upcoming")}
            >
              <input
                type="checkbox"
                id="upcoming"
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                checked={newEvent.upcoming}
                readOnly
              />
              <label
                htmlFor="upcoming"
                className="text-sm font-medium cursor-pointer"
              >
                Mark as upcoming
              </label>
            </div>
          </div>
        </div>

        <ImageUploader
          image={newEvent.image}
          setImage={(image) => handleInputChange("image", image)}
          label="Main Image"
          id="mainImage"
        />
      </>
    );
  }
);

// **Set Display Name to Fix the Warning**
BasicEventForm.displayName = "BasicEventForm";

export const OrganizerForm = ({ newEvent, setNewEvent }) => {
  return (
    <>
      <div className="space-y-2 mb-8">
        <label className="text-sm font-medium block" htmlFor="organizer">
          Organizer
        </label>
        <Input
          id="organizer"
          placeholder="Organizer Name"
          className="w-full"
          value={newEvent.organizer}
          onChange={(e) =>
            setNewEvent({ ...newEvent, organizer: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-sm font-medium block" htmlFor="website">
          Website URL
        </label>
        <Input
          id="website"
          placeholder="https://example.com"
          className="w-full"
          value={newEvent.website}
          onChange={(e) =>
            setNewEvent({ ...newEvent, website: e.target.value })
          }
        />
      </div>
    </>
  );
};
