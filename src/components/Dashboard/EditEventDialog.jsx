/* eslint-disable react/prop-types */

import React from "react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/TextArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";

import {
  BasicEventForm,
  OrganizerForm,
  AgendaItems,
  SponsorItems,
  AdditionalImages,
  LineupItems,
} from "./EventFormComponents";

const EditEventDialog = ({
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
  additionalImages = newEvent.extendedEventDetails.additionalImages,
  addAdditionalImage,
  updateAdditionalImage,
  removeAdditionalImage,
  lineup,
  addLineupItem,
  updateLineupItem,
  removeLineupItem,
  handleSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-primary/5 p-6 rounded-t-lg border-b">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Edit Event
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Update the details of your event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4 px-6">
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

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                Event Description
              </h3>
              <div className="space-y-1">
                <label
                  className="text-sm font-medium"
                  htmlFor="edit-description"
                >
                  Description
                </label>
                <Textarea
                  id="edit-description"
                  placeholder="Event Description"
                  className="w-full min-h-[100px]"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                Organizer Information
              </h3>
              <OrganizerForm newEvent={newEvent} setNewEvent={setNewEvent} />
            </div>

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

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                <span className="bg-primary w-1 h-6 rounded mr-2"></span>
                Additional Images
              </h3>
              <AdditionalImages
                additionalImages={
                  newEvent?.extendedEventDetails?.additionalImages
                }
                addAdditionalImage={addAdditionalImage}
                updateAdditionalImage={updateAdditionalImage}
                removeAdditionalImage={removeAdditionalImage}
              />
            </div>

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

          <DialogFooter className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
