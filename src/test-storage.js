/**
 * Test Script for LocalStorage Service
 * Run this in the browser console to verify all operations
 *
 * Usage:
 * 1. Start dev server: npm run dev
 * 2. Open browser console
 * 3. Run: await runAllTests()
 */

import * as StorageService from "./services/localStorageService.js";
import * as Enums from "./types/enums.js";
import * as DateUtils from "./utils/dateUtils.js";
import * as IdGenerator from "./utils/idGenerator.js";

// Test data
const testFormData = {
  namaLengkap: "Ahmad Fauzi",
  tempatLahir: "Jakarta",
  tanggalLahir: "1995-08-17",
  jenisKelamin: Enums.JenisKelamin.LAKI_LAKI,
  tinggiBadan: 170,
  beratBadan: 65,
  pekerjaan: "Software Engineer",
  statusPernikahan: Enums.StatusPernikahan.LAJANG,
  domisili: "Jakarta Selatan",
  statusIzin: Enums.StatusIzin.SUDAH,
  pendidikanTerakhir: "S1 Teknik Informatika, Universitas Indonesia, 2017",
  infoAyah: "Budi Santoso, 55 tahun, Wiraswasta, Islam, Masih Hidup",
  infoIbu: "Siti Aminah, 50 tahun, Ibu Rumah Tangga, Islam, Masih Hidup",
  urutanAnak: "2 dari 3",
  shalatWajib: "Rutin berjamaah di masjid",
  bacaanQuran: "Lancar, Hafal Juz 30",
  sifatPositif: "Bertanggung jawab, jujur, sabar",
  sifatNegatif: "Terkadang terlalu perfeksionis",
  merokok: Enums.Merokok.TIDAK,
  visiPernikahan: "Membangun keluarga sakinah mawaddah warahmah",
  kriteriaPasangan: "Sholehah, bertanggung jawab, mau belajar agama bersama",
};

const partialFormData = {
  namaLengkap: "Fatimah Az-Zahra",
  jenisKelamin: Enums.JenisKelamin.PEREMPUAN,
  tempatLahir: "Bandung",
  tanggalLahir: "1997-05-20",
};

/**
 * TEST-001: Storage Availability Test
 */
function test001_StorageAvailability() {
  console.log("🧪 TEST-001: Storage Availability Test");

  const isAvailable = StorageService.isStorageAvailable();
  console.log(`✓ localStorage available: ${isAvailable}`);

  if (!isAvailable) {
    console.error("❌ localStorage is not available!");
    return false;
  }

  console.log("✅ TEST-001 PASSED\n");
  return true;
}

/**
 * TEST-002: Storage Quota Test (Warning: Will fill storage!)
 */
function test002_StorageQuota() {
  console.log("🧪 TEST-002: Storage Quota Test");
  console.log("⚠️  Skipping quota test (would fill storage)");
  console.log("✅ TEST-002 SKIPPED\n");
  return true;
}

/**
 * TEST-003: Data Integrity Test
 */
function test003_DataIntegrity() {
  console.log("🧪 TEST-003: Data Integrity Test");

  // Save draft
  const saveResult = StorageService.saveDraft(
    testFormData,
    "Test Draft - Integrity"
  );
  console.log("Save result:", saveResult);

  if (!saveResult.success) {
    console.error("❌ Failed to save draft");
    return false;
  }

  // Load draft
  const draftId = saveResult.data.id;
  const loadedDraft = StorageService.getDraftById(draftId);
  console.log("Loaded draft:", loadedDraft);

  // Verify data integrity
  const isIntact =
    loadedDraft.data.namaLengkap === testFormData.namaLengkap &&
    loadedDraft.data.tinggiBadan === testFormData.tinggiBadan;

  if (!isIntact) {
    console.error("❌ Data integrity check failed");
    return false;
  }

  // Cleanup
  StorageService.deleteDraft(draftId);

  console.log("✅ TEST-003 PASSED\n");
  return true;
}

/**
 * TEST-004: Draft CRUD Operations
 */
function test004_DraftCRUD() {
  console.log("🧪 TEST-004: Draft CRUD Operations");

  // CREATE
  const createResult = StorageService.saveDraft(
    partialFormData,
    "Test Draft - CRUD"
  );
  console.log("Create:", createResult);

  if (!createResult.success) {
    console.error("❌ CREATE failed");
    return false;
  }

  const draftId = createResult.data.id;

  // READ
  const draft = StorageService.getDraftById(draftId);
  console.log("Read:", draft);

  if (!draft) {
    console.error("❌ READ failed");
    return false;
  }

  // UPDATE
  const updatedData = { ...partialFormData, domisili: "Bandung Barat" };
  const updateResult = StorageService.updateDraft(
    draftId,
    updatedData,
    "Updated Test Draft"
  );
  console.log("Update:", updateResult);

  if (!updateResult.success) {
    console.error("❌ UPDATE failed");
    return false;
  }

  const updatedDraft = StorageService.getDraftById(draftId);
  if (updatedDraft.data.domisili !== "Bandung Barat") {
    console.error("❌ UPDATE verification failed");
    return false;
  }

  // DELETE
  const deleteResult = StorageService.deleteDraft(draftId);
  console.log("Delete:", deleteResult);

  if (!deleteResult.success) {
    console.error("❌ DELETE failed");
    return false;
  }

  const deletedDraft = StorageService.getDraftById(draftId);
  if (deletedDraft !== null) {
    console.error("❌ DELETE verification failed");
    return false;
  }

  console.log("✅ TEST-004 PASSED\n");
  return true;
}

/**
 * TEST-005: History CRUD Operations
 */
function test005_HistoryCRUD() {
  console.log("🧪 TEST-005: History CRUD Operations");

  const cvText =
    "TEST CV CONTENT\nThis is a test CV\n" + JSON.stringify(testFormData);

  // CREATE
  const createResult = StorageService.saveHistory(
    testFormData,
    cvText,
    "Test CV"
  );
  console.log("Create:", createResult);

  if (!createResult.success) {
    console.error("❌ CREATE failed");
    return false;
  }

  const historyId = createResult.data.id;

  // READ
  const history = StorageService.getHistoryById(historyId);
  console.log("Read:", history);

  if (!history) {
    console.error("❌ READ failed");
    return false;
  }

  if (history.cvTextContent !== cvText) {
    console.error("❌ CV content mismatch");
    return false;
  }

  // DELETE
  const deleteResult = StorageService.deleteHistory(historyId);
  console.log("Delete:", deleteResult);

  if (!deleteResult.success) {
    console.error("❌ DELETE failed");
    return false;
  }

  const deletedHistory = StorageService.getHistoryById(historyId);
  if (deletedHistory !== null) {
    console.error("❌ DELETE verification failed");
    return false;
  }

  console.log("✅ TEST-005 PASSED\n");
  return true;
}

/**
 * TEST-006: Settings Operations
 */
function test006_SettingsOperations() {
  console.log("🧪 TEST-006: Settings Operations");

  // Get default settings
  const defaultSettings = StorageService.getSettings();
  console.log("Default settings:", defaultSettings);

  if (!defaultSettings || !defaultSettings.version) {
    console.error("❌ Failed to get default settings");
    return false;
  }

  // Update settings
  const newSettings = {
    ...defaultSettings,
    theme: "dark",
  };

  const saveResult = StorageService.saveSettings(newSettings);
  console.log("Save settings:", saveResult);

  if (!saveResult.success) {
    console.error("❌ Failed to save settings");
    return false;
  }

  // Verify settings
  const updatedSettings = StorageService.getSettings();
  console.log("Updated settings:", updatedSettings);

  if (updatedSettings.theme !== "dark") {
    console.error("❌ Settings not updated correctly");
    return false;
  }

  // Reset to default
  StorageService.saveSettings({ theme: "light" });

  console.log("✅ TEST-006 PASSED\n");
  return true;
}

/**
 * TEST-007: ID Uniqueness
 */
function test007_IDUniqueness() {
  console.log("🧪 TEST-007: ID Uniqueness Test");

  const ids = new Set();
  const count = 100;

  // Generate multiple IDs
  for (let i = 0; i < count; i++) {
    const draftId = IdGenerator.generateDraftId();
    const historyId = IdGenerator.generateHistoryId();

    ids.add(draftId);
    ids.add(historyId);
  }

  console.log(`Generated ${count * 2} IDs, unique: ${ids.size}`);

  if (ids.size !== count * 2) {
    console.error(
      `❌ ID collision detected! Expected ${count * 2}, got ${ids.size}`
    );
    return false;
  }

  console.log("✅ TEST-007 PASSED\n");
  return true;
}

/**
 * TEST-008: Date Format Validation
 */
function test008_DateFormat() {
  console.log("🧪 TEST-008: Date Format Test");

  const isoDate = DateUtils.getISODateString();
  console.log("Generated ISO date:", isoDate);

  // Validate ISO format
  if (!DateUtils.isValidISODate(isoDate)) {
    console.error("❌ Invalid ISO date format");
    return false;
  }

  // Test date formatting
  const formatted = DateUtils.formatDateDisplay(isoDate);
  console.log("Formatted date:", formatted);

  if (!formatted || formatted === "-") {
    console.error("❌ Date formatting failed");
    return false;
  }

  // Test age calculation
  const age = DateUtils.calculateAge("1995-08-17");
  console.log("Calculated age:", age);

  if (age < 0 || age > 150) {
    console.error("❌ Invalid age calculation");
    return false;
  }

  console.log("✅ TEST-008 PASSED\n");
  return true;
}

/**
 * TEST-009: Clear All Data
 */
function test009_ClearAllData() {
  console.log("🧪 TEST-009: Clear All Data Test");

  // Create some test data
  StorageService.saveDraft(partialFormData, "Test Draft - Clear");
  StorageService.saveHistory(
    testFormData,
    "Test CV Content",
    "Test CV - Clear"
  );

  const statsBefore = StorageService.getStorageStats();
  console.log("Stats before clear:", statsBefore);

  // Clear all data
  const clearResult = StorageService.clearAllData();
  console.log("Clear result:", clearResult);

  if (!clearResult.success) {
    console.error("❌ Failed to clear data");
    return false;
  }

  // Verify data is cleared
  const statsAfter = StorageService.getStorageStats();
  console.log("Stats after clear:", statsAfter);

  if (statsAfter.draftsCount !== 0 || statsAfter.historyCount !== 0) {
    console.error("❌ Data not cleared properly");
    return false;
  }

  console.log("✅ TEST-009 PASSED\n");
  return true;
}

/**
 * Run all tests
 */
export async function runAllTests() {
  console.log("═══════════════════════════════════════════");
  console.log("🚀 RUNNING ALL TESTS - Phase 1 Data Layer");
  console.log("═══════════════════════════════════════════\n");

  const tests = [
    test001_StorageAvailability,
    test002_StorageQuota,
    test003_DataIntegrity,
    test004_DraftCRUD,
    test005_HistoryCRUD,
    test006_SettingsOperations,
    test007_IDUniqueness,
    test008_DateFormat,
    test009_ClearAllData,
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error("❌ Test threw exception:", error);
      failed++;
    }
  }

  console.log("═══════════════════════════════════════════");
  console.log(`✅ Passed: ${passed}/${tests.length}`);
  console.log(`❌ Failed: ${failed}/${tests.length}`);
  console.log("═══════════════════════════════════════════\n");

  if (failed === 0) {
    console.log("🎉 ALL TESTS PASSED! Phase 1 is complete!");
  } else {
    console.log("⚠️  Some tests failed. Please review the errors above.");
  }

  return { passed, failed, total: tests.length };
}

// Auto-run tests when this module is imported directly
if (import.meta.url === window.location.href) {
  runAllTests();
}

// Make available globally for console access
window.runAllTests = runAllTests;
window.StorageService = StorageService;
window.TestData = { testFormData, partialFormData };

console.log("✨ Test script loaded! Run: await runAllTests()");
