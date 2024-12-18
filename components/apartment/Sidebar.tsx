import React from "react";
import { ApartmentData } from "../../types/apartment";

interface SidebarProps {
  apartmentData: ApartmentData;
}

const Sidebar = ({ apartmentData }: SidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-600">
            GH₵ {apartmentData.price}/month
          </h3>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Location Details</h3>
          <div className="space-y-2 text-gray-600">
            <p>Region: {apartmentData.loction.region}</p>
            <p>District: {apartmentData.loction.district}</p>
            <p>Area: {apartmentData.loction.area}</p>
            <p>Distance to Town: {apartmentData.loction.distanceToTown}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Lease Terms</h3>
          <div className="space-y-2 text-gray-600">
            <p>Minimum Stay: {apartmentData.leaseTerms.minimumStay}</p>
            <p>Security Deposit: GH₵ {apartmentData.leaseTerms.securityDeposit}</p>
            <p>Pets Allowed: {apartmentData.leaseTerms.petsAllowed ? "Yes" : "No"}</p>
            <p>Available From: {apartmentData.leaseTerms.availableFrom}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Agent Details</h3>
          <div className="space-y-2 text-gray-600">
            <p>Name: {apartmentData.agent.name}</p>
            <p>Experience: {apartmentData.agent.experience}</p>
            <p>Languages: {apartmentData.agent.languages.join(", ")}</p>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 