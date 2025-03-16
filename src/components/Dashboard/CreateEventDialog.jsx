/* eslint-disable react/display-name */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Textarea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import {
  AdditionalImages,
  AgendaItems,
  BasicEventForm,
  LineupItems,
  OrganizerForm,
  SponsorItems,
} from "./EventFormComponents";

const CreateEventDialog = React.memo(
  ({
    isOpen,
    setIsOpen,
    newEvent,
    setNewEvent,
    categoryOptions,
    agendaItems,
    addAgendaItem,
    updateAgendaItem,
    removeAgendaItem,
    sponsors,
    addSponsor,
    updateSponsor,
    removeSponsor,
    additionalImages,
    addAdditionalImage,
    updateAdditionalImage,
    removeAdditionalImage,
    lineup,
    addLineupItem,
    updateLineupItem,
    removeLineupItem,
    handleSubmit,
  }) => {
    // Memoized handler to prevent unnecessary re-renders
    const handleDescriptionChange = useCallback(
      (e) => {
        setNewEvent((prev) => ({ ...prev, description: e.target.value }));
      },
      [setNewEvent]
    );

    return (
      <Dialog
        open={isOpen}
        onOpenChange={(state) => {
          if (state !== isOpen) {
            setIsOpen(state);
          }
        }}
      >
        <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-primary/5 p-6 rounded-t-lg border-b">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Create New Event
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Fill in the details below to create a new event. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4 px-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                  <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                  Basic Information
                </h3>
                <BasicEventForm
                  newEvent={newEvent}
                  setNewEvent={setNewEvent}
                  categoryOptions={categoryOptions}
                />
              </div>

              {/* Event Description */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                  <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                  Event Description
                </h3>
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="description">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Event Description"
                    className="w-full min-h-[100px]"
                    value={newEvent.description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
              </div>

              {/* Organizer Information */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                  <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                  Organizer Information
                </h3>
                <OrganizerForm newEvent={newEvent} setNewEvent={setNewEvent} />
              </div>

              {/* Event Agenda */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                  <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                  Event Agenda
                </h3>
                <AgendaItems
                  agendaItems={agendaItems}
                  addAgendaItem={addAgendaItem}
                  updateAgendaItem={updateAgendaItem}
                  removeAgendaItem={removeAgendaItem}
                />
              </div>

              {/* Sponsors */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                  <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                  Sponsors
                </h3>
                <SponsorItems
                  sponsors={sponsors}
                  addSponsor={addSponsor}
                  updateSponsor={updateSponsor}
                  removeSponsor={removeSponsor}
                />
              </div>

              {/* Additional Images */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                  <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                  Additional Images
                </h3>
                <AdditionalImages
                  additionalImages={additionalImages}
                  addAdditionalImage={addAdditionalImage}
                  updateAdditionalImage={updateAdditionalImage}
                  removeAdditionalImage={removeAdditionalImage}
                />
              </div>

              {/* Artist Lineup (Only for Music Events) */}
              {newEvent.categoryId === "music" && (
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                    <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                    Artist Lineup
                  </h3>
                  <LineupItems
                    lineup={lineup}
                    addLineupItem={addLineupItem}
                    updateLineupItem={updateLineupItem}
                    removeLineupItem={removeLineupItem}
                  />
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <DialogFooter className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                Create Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CreateEventDialog;
