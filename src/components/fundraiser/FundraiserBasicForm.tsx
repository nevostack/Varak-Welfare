
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, DollarSign, Users, FileText, Target, MapPin, Calendar, Phone, User, GraduationCap, Briefcase, Radio } from "lucide-react";

interface FundraiserBasicFormProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const patientRelationOptions = [
  { value: 'self', label: 'Self' },
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'grandfather', label: 'GrandFather' },
  { value: 'grandmother', label: 'GrandMother' },
  { value: 'husband', label: 'Husband' },
  { value: 'wife', label: 'Wife' },
  { value: 'son', label: 'Son' },
  { value: 'daughter', label: 'Daughter' },
  { value: 'twins', label: 'Twins' },
  { value: 'grandson', label: 'Grandson' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
  { value: 'friend', label: 'Friend' },
  { value: 'friends_family', label: "Friend's Family" },
  { value: 'cousin', label: 'Cousin' },
  { value: 'uncle', label: 'Uncle' },
  { value: 'aunt', label: 'Aunt' },
  { value: 'nephew', label: 'Nephew' },
  { value: 'niece', label: 'Niece' },
  { value: 'colleague', label: 'Colleague' },
  { value: 'relative', label: 'Relative' },
  { value: 'legal_ward', label: 'Legal Ward' },
  { value: 'other', label: 'Other' },
];

const educationOptions = [
  { value: '10th_12th_pass', label: '10th/12th Pass' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate (Masters, PHD, etc.)' },
  { value: 'below_10th_pass', label: 'Below 10th Pass' },
];

const employmentOptions = [
  { value: 'salaried', label: 'Salaried' },
  { value: 'self_employed', label: 'Self-Employed' },
  { value: 'student', label: 'Student' },
  { value: 'homemaker', label: 'Homemaker' },
  { value: 'unemployed', label: 'Unemployed' },
];

const hearAboutOptions = [
  { value: 'search_engine', label: 'Search Engine (google, etc)' },
  { value: 'facebook_instagram', label: 'Facebook, Instagram Ad/Post' },
  { value: 'twitter', label: 'Twitter Ad/Post' },
  { value: 'youtube', label: 'Youtube Ad/Post' },
  { value: 'brochure_banner', label: 'brochure / Banner in Hospital' },
  { value: 'hospital_staff', label: 'Recommended by Hospital Staff Member' },
  { value: 'friend_family', label: 'Recommended by Friend / Family Member' },
  { value: 'representative', label: 'Representative' },
  { value: 'ngo', label: 'Recommended By NGO' },
  { value: 'whatsapp', label: 'WhatsApp DM/Group' },
  { value: 'influencer', label: 'Influencer / Content Creator' },
  { value: 'newspaper_tv', label: 'Newspaper/TV/Billboard' },
];

const FundraiserBasicForm = ({ formData, onInputChange, errors }: FundraiserBasicFormProps) => {
  return (
    <div className="space-y-4">
      {/* Purpose Display */}
      <Card className="border border-rose-200 bg-rose-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Medical Treatment</h4>
              <p className="text-sm text-rose-600">Healthcare fundraiser</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Amount */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-rose-500" />
          How much do you want to raise? *
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <Input
            type="number"
            placeholder="Should be minimum 1 2000"
            value={formData.goalAmount}
            onChange={(e) => onInputChange('goalAmount', e.target.value)}
            className={`pl-8 h-10 border ${
              errors.goalAmount ? 'border-red-400' : 'border-gray-300'
            } focus:border-rose-500`}
          />
        </div>
        {errors.goalAmount && <p className="text-red-500 text-xs">{errors.goalAmount}</p>}
      </div>

      {/* Patient Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <User className="h-4 w-4 text-rose-500" />
          Patient Name *
        </Label>
        <Input
          placeholder="Enter patient's full name"
          value={formData.patientName}
          onChange={(e) => onInputChange('patientName', e.target.value)}
          className={`h-10 border ${
            errors.patientName ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}
        />
        {errors.patientName && <p className="text-red-500 text-xs">{errors.patientName}</p>}
      </div>

      {/* Age */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-rose-500" />
          Patient Age *
        </Label>
        <Input
          type="number"
          placeholder="Enter age"
          value={formData.patientAge}
          onChange={(e) => onInputChange('patientAge', e.target.value)}
          className={`h-10 border ${
            errors.patientAge ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}
        />
        {errors.patientAge && <p className="text-red-500 text-xs">{errors.patientAge}</p>}
      </div>

      {/* Patient Relationship */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Users className="h-4 w-4 text-rose-500" />
          The Patient is my... *
        </Label>
        <Select value={formData.patientRelation} onValueChange={(value) => onInputChange('patientRelation', value)}>
          <SelectTrigger className={`h-10 border ${
            errors.patientRelation ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent className="max-h-48 overflow-y-auto">
            {patientRelationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.patientRelation && <p className="text-red-500 text-xs">{errors.patientRelation}</p>}
      </div>

      {/* Education Qualification */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-rose-500" />
          Your Education Qualification *
        </Label>
        <Select value={formData.educationQualification} onValueChange={(value) => onInputChange('educationQualification', value)}>
          <SelectTrigger className={`h-10 border ${
            errors.educationQualification ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}>
            <SelectValue placeholder="Select education qualification" />
          </SelectTrigger>
          <SelectContent>
            {educationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.educationQualification && <p className="text-red-500 text-xs">{errors.educationQualification}</p>}
      </div>

      {/* Employment Status */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-rose-500" />
          Your Employment Status *
        </Label>
        <Select value={formData.employmentStatus} onValueChange={(value) => onInputChange('employmentStatus', value)}>
          <SelectTrigger className={`h-10 border ${
            errors.employmentStatus ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}>
            <SelectValue placeholder="Select employment status" />
          </SelectTrigger>
          <SelectContent>
            {employmentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.employmentStatus && <p className="text-red-500 text-xs">{errors.employmentStatus}</p>}
      </div>

      {/* How did you hear about us */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Radio className="h-4 w-4 text-rose-500" />
          How did you first hear about us? *
        </Label>
        <Select value={formData.hearAbout} onValueChange={(value) => onInputChange('hearAbout', value)}>
          <SelectTrigger className={`h-10 border ${
            errors.hearAbout ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}>
            <SelectValue placeholder="Select how you heard about us" />
          </SelectTrigger>
          <SelectContent className="max-h-48 overflow-y-auto">
            {hearAboutOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.hearAbout && <p className="text-red-500 text-xs">{errors.hearAbout}</p>}
      </div>

      {/* Hospital/City */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-rose-500" />
          Hospital/City *
        </Label>
        <Input
          placeholder="Hospital name or city"
          value={formData.hospitalCity}
          onChange={(e) => onInputChange('hospitalCity', e.target.value)}
          className={`h-10 border ${
            errors.hospitalCity ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}
        />
        {errors.hospitalCity && <p className="text-red-500 text-xs">{errors.hospitalCity}</p>}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <FileText className="h-4 w-4 text-rose-500" />
          Fundraiser Title *
        </Label>
        <Input
          placeholder="e.g., Help Save Arya's Life - Medical Treatment"
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          className={`h-10 border ${
            errors.title ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      </div>

      {/* Brief Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <FileText className="h-4 w-4 text-rose-500" />
          Brief Description *
        </Label>
        <Textarea
          placeholder="Brief description about the medical condition and need..."
          value={formData.briefDescription}
          onChange={(e) => onInputChange('briefDescription', e.target.value)}
          className={`min-h-[80px] border ${
            errors.briefDescription ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500 resize-none`}
        />
        {errors.briefDescription && <p className="text-red-500 text-xs">{errors.briefDescription}</p>}
      </div>

      {/* Urgency */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Target className="h-4 w-4 text-rose-500" />
          Urgency Level *
        </Label>
        <Select value={formData.urgency} onValueChange={(value) => onInputChange('urgency', value)}>
          <SelectTrigger className={`h-10 border ${
            errors.urgency ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}>
            <SelectValue placeholder="Select urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="critical">Critical - Life threatening</SelectItem>
            <SelectItem value="urgent">Urgent - Few weeks needed</SelectItem>
            <SelectItem value="moderate">Moderate - Can wait</SelectItem>
          </SelectContent>
        </Select>
        {errors.urgency && <p className="text-red-500 text-xs">{errors.urgency}</p>}
      </div>

      {/* Contact Number */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Phone className="h-4 w-4 text-rose-500" />
          Contact Number *
        </Label>
        <Input
          type="tel"
          placeholder="Enter mobile number"
          value={formData.contactNumber}
          onChange={(e) => onInputChange('contactNumber', e.target.value)}
          className={`h-10 border ${
            errors.contactNumber ? 'border-red-400' : 'border-gray-300'
          } focus:border-rose-500`}
        />
        {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
      </div>
    </div>
  );
};

export default FundraiserBasicForm;
